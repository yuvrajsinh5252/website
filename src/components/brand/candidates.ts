import type { JSX } from 'react'
import {
  ApertureMark,
  ApoapsisMark,
  ApoapsisYGBadgeMark,
  ApoapsisYGBoldMark,
  ApoapsisYGMark,
  CircuitSunMark,
  CodeYMark,
  CometMark,
  ConstellationMark,
  CrownYMark,
  EyepieceMark,
  FacetedSunMark,
  InterlockingYGMark,
  LionYMark,
  MeridianMark,
  MobiusYMark,
  PlateMark,
  PrismYMark,
  PromptMark,
  QuantumYMark,
  RajputDhalMark,
  SegmentedSealMark,
  SextantMark,
  SignalMark,
  SolarDawnYMark,
  StarryCodeYMark,
  StationMark,
  SunMark,
  SwordYMark,
  TelescopeMark,
  TerminalChevronYMark,
  WaxingMark,
  WingedYMark,
  ZenithYMark,
  type MarkProps,
} from './marks'

/**
 * The brand mark candidates shown in the logo lab.
 */
export interface MarkCandidate {
  id: string
  name: string
  category?: string
  Mark: (props: MarkProps) => JSX.Element
  idea: string
  easterEgg: string
}

export const markCandidates: MarkCandidate[] = [
  /* --------------------------------------------------------------------------
   * Selected Brand Identity
   * ------------------------------------------------------------------------ */
  {
    id: 'apoapsis-yg-stroke',
    name: 'Apoapsis YG (Selected Logo)',
    category: 'Personal + Orbit (Selected)',
    Mark: ApoapsisYGMark,
    idea: 'The monogram "Y" with a tracking "G" (Gohil) in elliptical orbit. Seamlessly unites your personal initials into an astronomical brand mark.',
    easterEgg: 'Hover orbits the "G" 360° around the "Y".',
  },
  {
    id: 'apoapsis',
    name: 'Apoapsis (Previous - Dot)',
    category: 'Personal + Orbit (Apoapsis)',
    Mark: ApoapsisMark,
    idea: 'The monogram with a satellite dot tracking round it on an elliptical orbit.',
    easterEgg: 'Hover completes one orbit.',
  },
  {
    id: 'apoapsis-yg-badge',
    name: 'Apoapsis YG Badge (Knockout "G")',
    category: 'Personal + Orbit (Apoapsis)',
    Mark: ApoapsisYGBadgeMark,
    idea: 'Preserves the celestial orb/satellite silhouette while engraving the letter "G" into its core for high-contrast visibility at every scale.',
    easterEgg: 'Hover orbits the celestial badge 360° around the "Y".',
  },
  {
    id: 'apoapsis-yg-bold',
    name: 'Apoapsis YG Bold (Heavyweight "G")',
    category: 'Personal + Orbit (Apoapsis)',
    Mark: ApoapsisYGBoldMark,
    idea: 'A bold, solid typographic "G" counterweight at the apoapsis point, matching the heavy 3.8px stroke of the primary monogram "Y".',
    easterEgg: 'Hover orbits the bold "G" 360° around the "Y".',
  },

  /* --------------------------------------------------------------------------
   * Personal Monograms (Yuvraj / YG / Kshatriya Heritage)
   * ------------------------------------------------------------------------ */
  {
    id: 'crown-y',
    name: 'Sovereign Y (Crown Prince)',
    category: 'Personal Monogram',
    Mark: CrownYMark,
    idea: 'Honors the Sanskrit meaning of your name — Yuvraj means Crown Prince. An architectural monogram "Y" whose upper geometry forms a 3-peak royal coronet with a floating apex diamond crest.',
    easterEgg: 'Hover elevates the coronet peaks and illuminates the crown diamond crest.',
  },
  {
    id: 'lion-y',
    name: 'Lion Y (Kshatriya Sinh)',
    category: 'Personal + Heritage',
    Mark: LionYMark,
    idea: 'Honors the second half of your name — Yuvraj-Sinh ("Sinh" means Lion in Sanskrit and Kshatriya tradition). A geometric lion’s head contour whose brow and facial bridge form an imposing architectural "Y".',
    easterEgg: 'Hover illuminates the almond lion eyes and elevates the crown crest.',
  },
  {
    id: 'solar-dawn-y',
    name: 'Solar Dawn Y',
    category: 'Personal + Solar Fusion',
    Mark: SolarDawnYMark,
    idea: 'The ultimate synthesis of personal identity and solar heritage: an architectural "Y" cradle vessel holding a rising sun orb with coronal dawn beams.',
    easterEgg: 'Hover causes the dawn sun to ascend and cast out its radiant solar beams.',
  },
  {
    id: 'yg-cipher',
    name: 'YG Monogram Cipher',
    category: 'Personal Monogram',
    Mark: InterlockingYGMark,
    idea: 'A modern luxury tech monogram interlocking your initials Y and G (Yuvrajsinh Gohil) in continuous geometric ribbons.',
    easterEgg: 'Hover smoothly rotates the circular "G" halo while scaling the inner "Y" monogram.',
  },
  {
    id: 'winged-y',
    name: 'Winged Y (Ascendant Wings)',
    category: 'Personal Monogram',
    Mark: WingedYMark,
    idea: 'A dynamic soaring monogram: three tiers of aerodynamic wings spreading outward from an ascending central fuselage to form a proud "Y". Inspired by Kshatriya emblems and aerial precision.',
    easterEgg: 'Hover lifts the ascending wings into high flight.',
  },
  {
    id: 'mobius-y',
    name: 'Mobius Y (Infinite Loop)',
    category: 'Personal Monogram',
    Mark: MobiusYMark,
    idea: 'An impossible isometric ribbon monogram: three continuous loops intertwining in 3D space to form the letter "Y". Represents continuous systems, resilience, and software engineering depth.',
    easterEgg: 'Hover turns the infinite ribbon through a 120-degree continuous isometric rotation.',
  },
  {
    id: 'sword-y',
    name: 'Talwar Blade Y',
    category: 'Personal + Heritage',
    Mark: SwordYMark,
    idea: 'A Kshatriya heraldic monogram: the stem of the "Y" forms a double-edged Talwar blade, flanked by curved protective quillon crossguards.',
    easterEgg: 'Hover flashes a vertical gleam down the spine of the talwar blade.',
  },
  {
    id: 'rajput-dhal',
    name: 'Rajput Dhal (Kshatriya Shield)',
    category: 'Personal + Heritage',
    Mark: RajputDhalMark,
    idea: 'Traditional Kshatriya warrior shield (Dhal) bearing four sacred brass bosses, with a sharp modern chevron "Y" emblem forged into the center faceplate.',
    easterEgg: 'Hover scales the inner chevron crest while the outer perimeter shield locks into guard.',
  },
  {
    id: 'terminal-chevron-y',
    name: 'Terminal Chevron Y',
    category: 'Personal Monogram',
    Mark: TerminalChevronYMark,
    idea: 'The developer’s signature: a command-line prompt chevron (>) meeting its mirrored syntax to form the upper arms of "Y", grounded by a pulsing terminal block cursor stem.',
    easterEgg: 'Hover pulses the terminal cursor and blinks the execution spark.',
  },
  {
    id: 'code-y',
    name: 'Branching Code Y (Bold)',
    category: 'Personal Monogram',
    Mark: CodeYMark,
    idea: 'A software engineer’s monogram: Git commit branches and AST syntax trees (\\ / |) converging into a bold, thick-stemmed architectural "Y" with active commit nodes and subtle constellation sparkles.',
    easterEgg: 'Hover illuminates each branching commit node in sequence and activates the celestial background sparkles.',
  },
  {
    id: 'starry-code-y',
    name: 'Starry Branch Code Y (Tab Icon)',
    category: 'Personal + Celestial Badge',
    Mark: StarryCodeYMark,
    idea: 'The definitive tab icon: a deep cosmic midnight squircle badge with an atmospheric nebula glow and twinkling starfield, framing the bold Branching Code Y monogram in starlight.',
    easterEgg: 'Hover expands the cosmic nebula and triggers a celestial twinkle across the starfield.',
  },
  {
    id: 'prism-y',
    name: 'Prism Y (Optical Dispersion)',
    category: 'Personal Monogram',
    Mark: PrismYMark,
    idea: 'Where astrophysics and optics meet personal identity: a laser beam enters an equilateral triangular prism and refracts into two divergent rays, forming a pure scientific "Y".',
    easterEgg: 'Hover excites the dispersion prism and fans the refracted spectral rays.',
  },
  {
    id: 'quantum-y',
    name: 'Quantum Y (Orbital Shell)',
    category: 'Personal Monogram',
    Mark: QuantumYMark,
    idea: 'Deep physics in a monogram: dual intersecting elliptical electron orbital tracks converge over an atomic nucleus core, anchored by an energy particle beam stem.',
    easterEgg: 'Hover rotates the orbital shells into alignment around the core nucleus.',
  },
  {
    id: 'zenith-y',
    name: 'Zenith Compass Y',
    category: 'Personal Monogram',
    Mark: ZenithYMark,
    idea: 'A 4-point solar navigation star whose diamond facets form an iconic monogram "Y". Stands for true north and architectural precision.',
    easterEgg: 'Hover rotates the navigation star by 45 degrees.',
  },

  /* --------------------------------------------------------------------------
   * Geometric Sun Marks (User References & Surya Heritage)
   * ------------------------------------------------------------------------ */
  {
    id: 'circuit-sun',
    name: 'U-Track Sun',
    category: 'Geometric Sun',
    Mark: CircuitSunMark,
    idea: 'Inspired by your uploaded reference: concentric solar core encircled by alternating straight spokes and geometric U-track hairpin loops.',
    easterEgg: 'Hover rotates the U-track energy loops in counter-balance with the radiant core.',
  },
  {
    id: 'segmented-seal',
    name: 'Radial Aperture Seal',
    category: 'Geometric Sun',
    Mark: SegmentedSealMark,
    idea: 'Inspired by your uploaded reference: high-contrast negative-space radial cuts with segmented outer rim blocks and a solid inner core disc.',
    easterEgg: 'Hover rotates the segmented outer ring like a camera lens aperture.',
  },
  {
    id: 'faceted-sun',
    name: 'Diamond Sol',
    category: 'Geometric Sun',
    Mark: FacetedSunMark,
    idea: 'Inspired by your uploaded reference: 8 sharp rhomboid diamond rays radiating from a central core, catching light like a brilliant solar jewel.',
    easterEgg: 'Hover turns the diamond rays by 45 degrees, revealing their alternate facet symmetry.',
  },
  {
    id: 'surya-kshatriya',
    name: 'Surya (Kshatriya)',
    category: 'Heritage Emblem',
    Mark: SunMark,
    idea: 'The Suryavanshi Kshatriya Royal Sun emblem: an authentic 16-ray solar crown with 8 sharp Talwar (sword) rays alternating with 8 dynamic Agni (flame) tongues.',
    easterEgg: 'Hover ignites the solar crown: flame rays drift with celestial solar wind, sword rays elevate with sharp spring physics, and the royal corona blooms.',
  },

  /* --------------------------------------------------------------------------
   * Celestial & Instrument Marks
   * ------------------------------------------------------------------------ */
  {
    id: 'waxing',
    name: 'Waxing',
    Mark: WaxingMark,
    idea: 'The moon you actually photograph. The most personal mark here — it points at the telescope on your roof, not at a generic space theme.',
    easterEgg:
      'Hover runs the phase from gibbous to full, like a time-lapse of your own photo series.',
  },
  {
    id: 'station',
    name: 'Station',
    Mark: StationMark,
    idea: 'Your hero, distilled: a planet limb with one satellite above it. The tab icon and the landing page become the same picture.',
    easterEgg: 'Hover sends the satellite round one full orbit.',
  },
  {
    id: 'constellation',
    name: 'Constellation',
    Mark: ConstellationMark,
    idea: 'The Y of your name plotted as an asterism. Reads as four stars at a glance, and as a monogram once you know.',
    easterEgg: 'Hover traces the lines between the stars, naming the constellation.',
  },
  {
    id: 'eyepiece',
    name: 'Eyepiece',
    Mark: EyepieceMark,
    idea: 'The view down the eyepiece, crosshairs and all. The boldest silhouette here, so it survives 16px best.',
    easterEgg: 'Hover pulls the drifting star into the crosshairs — acquiring focus.',
  },
  {
    id: 'prompt',
    name: 'Prompt',
    Mark: PromptMark,
    idea: 'A shell prompt whose cursor is a star: “somewhere between a terminal and a telescope”, as one glyph.',
    easterEgg: 'Hover makes the star flare and turn, the way a cursor blinks.',
  },
  {
    id: 'telescope',
    name: 'Telescope',
    Mark: TelescopeMark,
    idea: 'The instrument itself, on its tripod, aimed at a star. The most literal of the set and the easiest to explain — it says exactly what you do on the roof.',
    easterEgg: 'Hover raises the tube to catch the star, which flares as it is acquired.',
  },
  {
    id: 'aperture',
    name: 'Aperture',
    Mark: ApertureMark,
    idea: 'An iris of three blades around a bright centre. Optics without the telescope — it reads as a lens, a shutter and an eye at once, and the silhouette is unmistakable at 16px.',
    easterEgg: 'Hover stops the aperture down, the blades turning as they close.',
  },
  {
    id: 'meridian',
    name: 'Meridian',
    Mark: MeridianMark,
    idea: 'A globe with its meridian drawn on — the coordinates in your footer as a mark. Quietly says "somewhere specific on this planet" rather than "space".',
    easterEgg: 'Hover swings the meridian round, so the globe turns under it.',
  },
  {
    id: 'signal',
    name: 'Signal',
    Mark: SignalMark,
    idea: 'Three arcs leaving a source. The simplest possible drawing of something being transmitted, and it doubles as the "getting in touch" idea the footer ends on.',
    easterEgg: 'Hover sends the arcs out one after another.',
  },
  {
    id: 'comet',
    name: 'Comet',
    Mark: CometMark,
    idea: 'A head and a tail, nothing else. The boldest shape here — mostly solid, so it survives a favicon better than any outline mark, and it carries motion while standing still.',
    easterEgg: 'Hover sends it on across the frame.',
  },
  {
    id: 'sextant',
    name: 'Sextant',
    Mark: SextantMark,
    idea: 'A graduated limb and an index arm. Navigation by star rather than observation of one — the instrument for working out where you are, which suits a portfolio.',
    easterEgg: 'Hover swings the arm up until it sights the star.',
  },
  {
    id: 'plate',
    name: 'Plate',
    Mark: PlateMark,
    idea: 'A glass plate holding one bright star, after the photographs the site is built around. The only mark here that points at the pictures rather than the sky.',
    easterEgg: 'Hover brings the faint stars up around it.',
  },
]
