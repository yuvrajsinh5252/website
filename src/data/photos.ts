import type { PhotoFrame } from '@/types'

/**
 * Photographs used by the About collage.
 *
 * Mostly astrophotography — shot by me, through a telescope or from the roof —
 * alongside the desk the rest of the work actually happens at. No work or
 * event photos here; those belong on the experience timeline.
 *
 * `subject` is the tag stencilled into the plate margin. `detail` is left off
 * on purpose: add the real exposure data (`1/125s · f/10 · 1200mm`) when it is
 * to hand and the margin rail will pick it up on its own.
 */
export const aboutFrames: PhotoFrame[] = [
  {
    id: 'moon-half',
    src: '/images/moon-half.jpg',
    alt: 'The moon at first quarter, photographed through my telescope',
    caption: 'First quarter',
    subject: 'Lunar',
    ratio: 'portrait',
  },
  {
    id: 'telescope',
    src: '/images/telescope-roof.jpg',
    alt: 'My telescope set up on the rooftop under a field of stars',
    caption: 'Rooftop, 2am',
    subject: 'Setup',
    ratio: 'landscape',
  },
  {
    id: 'star-field',
    src: '/images/star-field.jpg',
    alt: 'The telescope silhouetted against a field of stars',
    caption: 'Clear night',
    subject: 'Wide field',
    ratio: 'portrait',
  },
  {
    id: 'desk',
    src: '/images/frame-desk.jpg',
    alt: 'Elevated laptop glowing in the dark with a backlit mechanical keyboard',
    caption: 'Workspace',
    subject: 'Desk',
    ratio: 'landscape',
  },
]
