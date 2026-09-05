import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/motion'
import { Container } from './Container'
import { sectionVariants, type SectionVariantProps } from './variants'

export interface SectionHeadingProps {
  /** Small letterspaced label above the title. */
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  align?: 'start' | 'center'
  /** Use `h1` when the section is the main heading of a standalone page. */
  as?: 'h1' | 'h2'
  /** Section id, used to build the heading's own id. */
  id?: string
  className?: string
}

/**
 * The heading block that opens every section: eyebrow, display title and an
 * optional lede. Used directly by `Section`, or standalone on a page.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  as: Heading = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex max-w-2xl flex-col',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}

      {title && (
        <Heading
          id={id ? `${id}-title` : undefined}
          className="font-display text-4xl leading-[0.95] font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </Heading>
      )}

      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </Reveal>
  )
}

export interface SectionProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'title'>,
    SectionVariantProps {
  /** DOM id — also used to label the section for assistive tech. */
  id?: string
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  /** Set false to render children without the page container. */
  contained?: boolean
  width?: 'content' | 'editorial' | 'prose' | 'full'
  headerAlign?: 'start' | 'center'
  titleAs?: 'h1' | 'h2'
  /** Gap between the heading block and the section body. */
  headerGap?: 'sm' | 'md' | 'lg'
}

const headerGaps = {
  sm: 'mb-10 sm:mb-12',
  md: 'mb-12 sm:mb-16',
  lg: 'mb-16 sm:mb-24',
} as const

/**
 * A page section: consistent vertical rhythm, scroll offset for the sticky
 * header, an optional animated heading block, and the page container.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  spacing,
  surface,
  bordered,
  contained = true,
  width = 'content',
  headerAlign = 'start',
  titleAs = 'h2',
  headerGap = 'md',
  className,
  children,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description)

  const body = (
    <>
      {hasHeader && (
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={headerAlign}
          as={titleAs}
          className={headerGaps[headerGap]}
        />
      )}
      {children}
    </>
  )

  return (
    <section
      id={id}
      aria-labelledby={id && title ? `${id}-title` : undefined}
      className={cn(sectionVariants({ spacing, surface, bordered }), className)}
      {...props}
    >
      {contained ? <Container width={width}>{body}</Container> : body}
    </section>
  )
}
