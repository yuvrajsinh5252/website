import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Central variant definitions for the UI primitives.
 *
 * Keeping them out of the component files means they can be reused (e.g. to
 * style a plain <a> like a button) without breaking fast refresh.
 */

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-medium',
    'whitespace-nowrap select-none focus-ring',
    'transition-[background-color,color,border-color,box-shadow,translate] duration-200 ease-out-expo',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:size-[1.05em] [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary:
          'rounded-pill bg-accent text-accent-foreground hocus:bg-accent-hover hocus:-translate-y-0.5 hocus:shadow-glow',
        secondary:
          'rounded-pill border border-border bg-surface text-heading hocus:border-accent-border hocus:text-accent',
        outline:
          'rounded-pill border border-accent-border text-accent bg-transparent hocus:bg-accent-muted',
        ghost: 'rounded-pill text-muted hocus:bg-surface-muted hocus:text-heading',
        /* The editorial link used throughout the old site. */
        quiet:
          'text-[0.8125rem] tracking-[0.14em] uppercase text-accent hocus:text-heading gap-1.5',
        link: 'text-accent link-underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10 p-0',
        /* Text-only variants supply their own rhythm. */
        none: '',
      },
      full: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      full: false,
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-pill font-medium leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border border-border bg-surface-muted text-foreground',
        accent: 'surface-accent',
        outline: 'border border-border-strong text-muted',
        success:
          'border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
        warning:
          'border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      },
      size: {
        sm: 'px-2 py-1 text-[0.6875rem]',
        md: 'px-2.5 py-1.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>

export const cardVariants = cva('relative @container', {
  variants: {
    variant: {
      solid: 'surface-card',
      muted: 'rounded-card border border-border bg-surface-muted',
      ghost: 'rounded-card border border-transparent',
      outline: 'rounded-card border border-border bg-transparent',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    },
    interactive: {
      true: 'card-hover',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
    padding: 'md',
    interactive: false,
  },
})

export type CardVariantProps = VariantProps<typeof cardVariants>

export const sectionVariants = cva('relative scroll-mt-header', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-14 sm:py-20',
      md: 'py-20 sm:py-28',
      lg: 'py-28 sm:py-36',
    },
    surface: {
      none: '',
      muted: 'bg-surface-muted',
      surface: 'bg-surface',
    },
    bordered: {
      true: 'border-t border-border',
      false: '',
    },
  },
  defaultVariants: {
    spacing: 'md',
    surface: 'none',
    bordered: false,
  },
})

export type SectionVariantProps = VariantProps<typeof sectionVariants>
