import type { JSX } from 'react'
import {
  ApertureMark,
  ApoapsisMark,
  CometMark,
  ConstellationMark,
  EyepieceMark,
  MeridianMark,
  PlateMark,
  PromptMark,
  SextantMark,
  SignalMark,
  StationMark,
  SunMark,
  TelescopeMark,
  WaxingMark,
  type MarkProps,
} from './marks'

/**
 * The brand mark candidates shown in the logo lab.
 */
export interface MarkCandidate {
  id: string
  name: string
  Mark: (props: MarkProps) => JSX.Element
  idea: string
  easterEgg: string
}

export const markCandidates: MarkCandidate[] = [
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
    id: 'apoapsis',
    name: 'Apoapsis',
    Mark: ApoapsisMark,
    idea: 'The monogram with a satellite tracking round it. Closest to a conventional logo, and the most obviously yours.',
    easterEgg: 'Hover completes one orbit.',
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
  {
    id: 'sun',
    name: 'Sun',
    Mark: SunMark,
    idea: 'The nearest star, and the only one anybody sees during a working day. A solid disc with four heavy rays on the cardinals and four orbs between them — the alternation is what keeps it legible at 16px, where eight matched spokes turn to mush.',
    easterEgg:
      'Hover throws off a corona, turns the flare a full step so the rays land where the orbs were, and blooms each element outward in sequence rather than all at once.',
  },
]
