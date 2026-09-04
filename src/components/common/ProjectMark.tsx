import { brandVars, type ProjectArt } from '@/lib/brand'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

const sizes = {
  sm: { tile: 'size-9 rounded-[0.7rem]', icon: 16 },
  md: { tile: 'size-13 rounded-[1rem] sm:size-16 sm:rounded-[1.2rem]', icon: 26 },
} as const

export interface ProjectMarkProps {
  project: ProjectArt
  size?: 'sm' | 'md'
  className?: string
}

/**
 * A project's mark, in order of preference: its generated cover art, its own
 * logo, or the brand icon of the thing it is built on.
 *
 * Cover art fills the tile edge to edge because it carries its own background;
 * a bare logo or icon gets a tile tinted with the project's brand colour, so a
 * list of projects reads as a set of distinct things rather than a column of
 * identical accent-coloured chips.
 */
export function ProjectMark({ project, size = 'md', className }: ProjectMarkProps) {
  const { tile, icon } = sizes[size]
  const art = project.cover ?? project.logo

  return (
    <span
      aria-hidden="true"
      style={{
        ...brandVars(project),
        ...(art
          ? undefined
          : {
              background: 'color-mix(in oklab, var(--brand) 14%, transparent)',
              borderColor: 'color-mix(in oklab, var(--brand) 32%, transparent)',
            }),
      }}
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden',
        'transition-[translate,box-shadow,border-color] duration-500 ease-out-expo',
        art ? 'border border-border-strong' : 'border',
        tile,
        className,
      )}
    >
      {art ? (
        <img
          src={art}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn(
            'size-full transition-transform duration-700 ease-out-expo',
            project.cover ? 'object-cover' : 'scale-[0.68] object-contain',
          )}
        />
      ) : (
        <Icon name={project.icon ?? 'sparkles'} size={icon} style={{ color: 'var(--brand)' }} />
      )}
    </span>
  )
}

export interface ProjectPlateProps {
  project: ProjectArt
  className?: string
}

/**
 * The project's cover at display size, for the head of a case study.
 *
 * Light is thrown behind it in the project's own colour, which is the one
 * thing that makes each case study open differently from the last.
 */
export function ProjectPlate({ project, className }: ProjectPlateProps) {
  const art = project.cover ?? project.logo

  return (
    <div
      style={brandVars(project)}
      className={cn('group/plate relative mx-auto w-full max-w-[13rem]', className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] rounded-[40%] opacity-70 blur-3xl transition-opacity duration-500 group-hover/plate:opacity-100"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--brand) 45%, transparent), transparent 70%)',
        }}
      />

      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface shadow-card transition-transform duration-500 ease-out-expo group-hover/plate:-translate-y-1">
        {art ? (
          <img
            src={art}
            alt={`${project.title} cover`}
            loading="eager"
            decoding="async"
            draggable={false}
            className="size-full object-cover"
          />
        ) : (
          <span className="grid size-full place-items-center">
            <Icon
              name={project.icon ?? 'sparkles'}
              size={64}
              style={{ color: 'var(--brand)' }}
            />
          </span>
        )}
      </div>
    </div>
  )
}
