/**
 * Orbital mechanics for the hero's satellites.
 *
 * These are real two-body orbits rather than a spinning carousel, because the
 * difference is exactly what the eye reads as "natural":
 *
 *  - Orbits are ellipses. Kepler's second law makes a satellite sweep quickly
 *    through periapsis and linger at apoapsis, so the motion breathes instead
 *    of ticking round at a constant rate.
 *  - Each orbit sits in its own plane, set by an inclination away from the
 *    equator and a longitude of ascending node that swings that tilted plane
 *    about the vertical axis. No two tracks coincide.
 *  - Kepler's third law ties period to size, so wider orbits visibly lag.
 *
 * The planet's centre sits far below the viewport, so orbits are near-polar:
 * their planes contain the vertical axis, carrying each satellite up over the
 * visible cap rather than around an equator nobody can see. Each apoapsis is
 * placed near the top of its orbit, which is where satellites should dwell.
 */

export interface OrbitSpec {
  /** Semi-major axis, as a multiple of the planet's radius. */
  semiMajor: number
  /** 0 is a circle; higher values are more elongated. */
  eccentricity: number
  /** Tilt of the orbital plane away from the equator, in radians. */
  inclination: number
  /** Rotation of that plane about the vertical axis, in radians. */
  node: number
  /** Where periapsis sits within the plane, in radians. */
  argPeriapsis: number
  /** Mean anomaly at t = 0, in radians. */
  phase: number
  /** Direction of travel. */
  retrograde?: boolean
}

export interface OrbitPoint {
  /** Screen-space offsets from the planet's centre, in px. */
  x: number
  y: number
  /** Depth: positive is towards the viewer. */
  z: number
  /** Perspective scale factor at this depth. */
  scale: number
  /** True when the planet's body is between this point and the viewer. */
  occluded: boolean
}

/**
 * Mean motion, normalised so semi-major axis 1 completes one turn per unit of
 * time. Kepler's third law: period² scales with axis³.
 */
export function meanMotion(semiMajor: number): number {
  return semiMajor ** -1.5
}

/**
 * Solves Kepler's equation `M = E - e·sin E` for the eccentric anomaly.
 *
 * Newton–Raphson converges in a handful of iterations at these eccentricities,
 * and this runs a few times per frame, so the fixed iteration count is cheap
 * and avoids an unbounded loop.
 */
function eccentricAnomaly(meanAnomaly: number, eccentricity: number): number {
  let E = meanAnomaly

  for (let i = 0; i < 5; i += 1) {
    const delta =
      (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E))
    E -= delta
    if (Math.abs(delta) < 1e-6) break
  }

  return E
}

/**
 * Projects a satellite's position at `time` into screen space.
 *
 * `orbitRadius` is the length of one orbit-radius unit in px; the returned
 * offsets are relative to the planet's centre, so the caller adds its own
 * origin. `bodyRadius` is the planet itself, used only to decide occlusion —
 * it is a separate argument because the orbits are sized to the frame rather
 * than to the planet, so the two are no longer the same number.
 */
export function orbitPoint(
  spec: OrbitSpec,
  time: number,
  orbitRadius: number,
  bodyRadius: number = orbitRadius,
): OrbitPoint {
  const direction = spec.retrograde ? -1 : 1
  const meanAnomaly = spec.phase + time * meanMotion(spec.semiMajor) * direction

  const E = eccentricAnomaly(meanAnomaly, spec.eccentricity)
  const cosE = Math.cos(E)
  const sinE = Math.sin(E)

  /* Distance from the focus, and the angle from periapsis. */
  const radius = spec.semiMajor * orbitRadius * (1 - spec.eccentricity * cosE)
  const trueAnomaly = Math.atan2(
    Math.sqrt(1 - spec.eccentricity ** 2) * sinE,
    cosE - spec.eccentricity,
  )

  const angle = trueAnomaly + spec.argPeriapsis

  /* Start in the equatorial plane. */
  const ox = Math.cos(angle) * radius
  const oz = Math.sin(angle) * radius

  /* Tilt the plane about the X axis. */
  const cosI = Math.cos(spec.inclination)
  const sinI = Math.sin(spec.inclination)
  const y = -oz * sinI
  const tz = oz * cosI

  /* Swing the tilted plane about the Y axis. */
  const cosN = Math.cos(spec.node)
  const sinN = Math.sin(spec.node)
  const x = ox * cosN + tz * sinN
  const z = -ox * sinN + tz * cosN

  /*
   * Weak perspective: near satellites grow a little, far ones shrink. The
   * focal length is deliberately long so it reads as depth, not fisheye.
   */
  const focal = orbitRadius * 4.5
  const scale = focal / (focal - z)

  /* Hidden while the planet's body sits between the satellite and the eye. */
  const occluded = z < 0 && Math.hypot(x, y) < bodyRadius

  return { x: x * scale, y: y * scale, z, scale, occluded }
}

/**
 * How far the highest of these orbits reaches above the centre, in
 * orbit-radius units.
 *
 * Sampled rather than derived from apoapsis: the true crest is pulled off
 * apoapsis by the argument of periapsis and again by perspective, and using
 * the analytic value left the shorter tracks cresting lower than intended —
 * far enough, on some viewports, to turn back inside the planet.
 *
 * The caller sizes the whole set from this, so the topmost track crests at a
 * chosen height on screen no matter how wide the viewport is.
 */
export function orbitReach(orbits: OrbitSpec[], samples = 240): number {
  let highest = 0

  for (const orbit of orbits) {
    for (let step = 0; step < samples; step += 1) {
      const angle = (step / samples) * Math.PI * 2
      const { y } = orbitPoint({ ...orbit, phase: angle }, 0, 1)
      if (y > highest) highest = y
    }
  }

  return highest
}

/**
 * A deterministic spread of orbits.
 *
 * The set is deliberately varied rather than uniform. Two elements do the
 * work: the inclination decides how far the plane is tipped off polar, and the
 * node swings it about the vertical axis. A plane seen edge-on projects to a
 * narrow upright ellipse; tipping it away from polar shears that ellipse over
 * so the track runs on a diagonal. Spreading both means no two tracks share an
 * angle — they cross each other rather than lying parallel, which is what a
 * real set of orbital planes looks like from the ground.
 *
 * What is *not* varied is how high each track reaches. Tipping a plane off
 * polar shortens its projection, so orbits given a spread of apoapses ended up
 * with a spread of crest heights nearly twice as wide — and the shortest of
 * them turned back inside the planet instead of over it. Apoapsis is therefore
 * derived from the tip so that every track crests at the same height, and the
 * variety comes from the angles alone.
 */
export function createOrbits(count: number): OrbitSpec[] {
  const golden = Math.PI * (3 - Math.sqrt(5))

  return Array.from({ length: count }, (_, index) => {
    const eccentricity = 0.05 + ((index * 0.37) % 1) * 0.07

    /*
     * Tip off polar, alternating either side. This is what slants a track:
     * at exactly polar the projected ellipse stands upright, and the further
     * the plane is tipped the more it leans over into a diagonal.
     */
    const tip = (0.26 + ((index * 0.53) % 1) * 0.4) * (index % 2 === 0 ? 1 : -1)
    const inclination = Math.PI / 2 + tip

    /*
     * Undo the foreshortening the tip introduces, so every orbit reaches the
     * same height however far its plane is tipped over.
     */
    const apoapsis = 1 / Math.abs(Math.sin(inclination))

    /*
     * How far off vertical the track opens out, as |cos node|: near 0 is
     * edge-on and narrow, higher values open it into a broader sweep. Spread
     * wide so the set mixes tight tracks with open ones.
     */
    const lean = (0.16 + ((index * 0.41) % 1) * 0.4) * (index % 3 === 0 ? -1 : 1)

    /*
     * Offset each apoapsis around the zenith so they do not all slow down at
     * the same point overhead.
     */
    const apoOffset = ((index * golden) % 0.7) - 0.35

    return {
      semiMajor: apoapsis / (1 + eccentricity),
      eccentricity,
      inclination,
      node: Math.acos(lean),
      /*
       * In-plane angle −π/2 points up once inclined, so periapsis near +π/2
       * places apoapsis over the visible sky.
       */
      argPeriapsis: Math.PI / 2 + apoOffset,
      phase: index * golden * 2.7,
      retrograde: index % 3 === 2,
    }
  })
}
