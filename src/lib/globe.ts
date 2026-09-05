/**
 * Maths for the hero's particle globe.
 *
 * Particles sit on the lower cap of a sphere, so only a "planet horizon"
 * shows above the fold. They assemble on load and unwind as the page scrolls.
 */

export const GLOBE_RADIUS = 275

/**
 * Where the hero's planet sits for a given canvas size.
 *
 * Shared so the particle sphere and anything orbiting it agree on one centre
 * and radius.
 *
 * The radius follows the viewport width so the visible arc keeps roughly the
 * same curvature at every size. The old flat floor of 640 was what ruined
 * phones: a dome that wide rises barely 30px across a 390px screen, so the
 * horizon read as a straight band of dots rather than the edge of a planet.
 */
export function heroGlobeGeometry(width: number, height: number) {
  const compact = width < 640

  const displayRadius = compact
    ? Math.max(width * 1.15, 420)
    : Math.max(width * 0.7, 640)

  /*
   * On wide screens the centre is pushed below the fold by a share of the
   * radius, which gives the shallow, distant horizon the hero is built around.
   *
   * On mobile, the horizon sits cleanly at the bottom of the viewport so the planet
   * grounds the base of the screen, leaving the vast sky open for the copy.
   */
  const originY = compact
    ? height * 0.83 + displayRadius
    : height + displayRadius * 0.72

  return { originX: width / 2, originY, displayRadius }
}

export interface GlobeParticle {
  x: number
  y: number
  z: number
  /** Deterministic unit vector used for the scatter/unwind offsets. */
  ax: number
  ay: number
  az: number
}

/** Cheap deterministic hash so a particle scatters the same way every frame. */
function hash(seed: number, salt: number): number {
  const value = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

/**
 * Distributes `count` particles over the cap of the sphere below `minY`
 * (expressed as a fraction of the radius).
 */
export function createGlobeParticles(count: number, minY = 0.62): GlobeParticle[] {
  const particles: GlobeParticle[] = []

  for (let index = 0; index < count; index += 1) {
    /* Bias towards the horizon so the rim reads as a crisp edge. */
    const yNorm = minY + (1 - minY) * Math.random() ** 0.55
    const theta = Math.random() * Math.PI * 2
    const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm))
    const radius = GLOBE_RADIUS * (0.988 + Math.random() * 0.02)
    const seed = Math.random()

    particles.push({
      x: radius * radiusAtY * Math.cos(theta),
      y: radius * yNorm,
      z: radius * radiusAtY * Math.sin(theta),
      ax: hash(seed, 1) * 2 - 1,
      ay: hash(seed, 2) * 2 - 1,
      az: hash(seed, 3) * 2 - 1,
    })
  }

  return particles
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * How the globe behaves as the hero scrolls away.
 *
 * The camera reads as lifting off the surface: the horizon rises, the sphere
 * swells and its particles disperse radially while the whole thing fades out.
 * Every term is eased so nothing snaps at either end of the range.
 *
 * The fade completes early, by 55% of the hero's height. The hero clips its
 * own overflow, so anything still painted when its bottom edge reaches the
 * viewport would be cut off along a hard horizontal line; finishing the fade
 * well before then keeps the join with the next section invisible.
 */
export function globeScrollTransform(scroll: number, displayRadius: number) {
  /* Ease-in so the first few pixels of scroll barely move anything. */
  const t = scroll * scroll * (3 - 2 * scroll)
  const late = smoothstep(0.15, 0.6, scroll)

  return {
    t,
    /* The horizon climbs, slower than the page itself, for parallax depth. */
    lift: t * displayRadius * 0.85,
    /* The sphere swells as if approaching the camera. */
    swell: 1 + t * 0.42,
    /* Particles break formation and drift outward from the centre. */
    disperse: late * 0.55,
    /* Rotation accelerates into the exit. */
    spin: t * 2.6,
    /* Individual particles shrink as they scatter. */
    shrink: 1 - t * 0.35,
    fade: 1 - smoothstep(0.12, 0.55, scroll),
  }
}

export interface DrawGlobeOptions {
  context: CanvasRenderingContext2D
  particles: GlobeParticle[]
  originX: number
  originY: number
  displayRadius: number
  /** Accumulated rotation in radians. */
  rotation: number
  /** 0 → 1 assembly progress on first paint. */
  intro: number
  /** 0 → 1 scroll progress through the hero. */
  scroll: number
  /** CSS colour for the particles. */
  color: string
  /** Multiplier on every particle's alpha, to compensate for theme contrast. */
  opacityScale?: number
}

/** Projects and paints the globe. Returns false when nothing was drawn. */
export function drawGlobeParticles({
  context,
  particles,
  originX,
  originY,
  displayRadius,
  rotation,
  intro,
  scroll,
  color,
  opacityScale = 1,
}: DrawGlobeOptions): boolean {
  const scale = displayRadius / GLOBE_RADIUS
  const assemble = 1 - (1 - intro) ** 3
  const scatter = (1 - assemble) * GLOBE_RADIUS * 3.4
  const unwind = globeScrollTransform(scroll, displayRadius)
  const fade = assemble * unwind.fade

  if (fade < 0.02) return false

  const cos = Math.cos(rotation + unwind.spin)
  const sin = Math.sin(rotation + unwind.spin)
  const dispersal = unwind.disperse * GLOBE_RADIUS

  context.fillStyle = color

  for (const particle of particles) {
    /*
     * Two offsets are in play: `scatter` collapses inward on load, while
     * `dispersal` pushes outward along the particle's own axis on scroll.
     */
    const x = particle.x + particle.ax * (scatter + dispersal)
    const y = particle.y + particle.ay * (scatter * 0.55 + dispersal * 0.5)
    const z = particle.z + particle.az * (scatter + dispersal)

    /* Rotate about the Y axis. */
    const rx = x * cos - z * sin
    const rz = x * sin + z * cos

    const px = rx * scale * unwind.swell
    const py = y * scale * unwind.swell
    const depth = (rz + GLOBE_RADIUS) / (2 * GLOBE_RADIUS)
    const facing = Math.max(0, depth)
    const rim = Math.min(Math.hypot(px, py) / (displayRadius * 0.96 + 0.001), 1) ** 2.1
    const opacity = (0.08 + 0.14 * facing + 0.4 * rim) * fade * opacityScale

    if (opacity < 0.04) continue

    context.globalAlpha = Math.min(1, opacity)
    context.beginPath()
    context.arc(
      originX + px,
      originY - py - unwind.lift,
      Math.max(0.6, (1.15 + 0.55 * facing) * unwind.shrink),
      0,
      Math.PI * 2,
    )
    context.fill()
  }

  context.globalAlpha = 1
  return true
}
