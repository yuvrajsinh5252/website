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
  const isLogo = Boolean(project.logo)
  const art = project.logo ?? project.cover

  if (isLogo && art) {
    return (
      <span
        aria-hidden="true"
        style={brandVars(project)}
        className={cn(
          'relative grid shrink-0 place-items-center',
          'transition-[translate,filter] duration-500 ease-out-expo',
          tile,
          className,
        )}
      >
        <img
          src={art}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="size-full object-contain drop-shadow-sm transition-transform duration-500 ease-out-expo group-hover:scale-105"
        />
      </span>
    )
  }

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
          className="size-full object-cover transition-transform duration-700 ease-out-expo"
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
  const isLogo = Boolean(project.logo)
  const art = project.logo ?? project.cover

  return (
    <div
      style={brandVars(project)}
      className={cn('group/plate relative mx-auto w-full max-w-[13rem]', className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%] rounded-full opacity-65 blur-3xl transition-opacity duration-500 group-hover/plate:opacity-100"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--brand) 50%, transparent), transparent 70%)',
        }}
      />

      <div className="relative aspect-square transition-transform duration-500 ease-out-expo group-hover/plate:-translate-y-1">
        {art ? (
          isLogo ? (
            <img
              src={art}
              alt={`${project.title} logo`}
              loading="eager"
              decoding="async"
              draggable={false}
              className="size-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out-expo group-hover/plate:scale-105"
            />
          ) : (
            <div className="size-full overflow-hidden rounded-[1.75rem] border border-border-strong bg-surface shadow-card">
              <img
                src={art}
                alt={`${project.title} cover`}
                loading="eager"
                decoding="async"
                draggable={false}
                className="size-full object-cover"
              />
            </div>
          )
        ) : (
          <div className="grid size-full place-items-center rounded-[1.75rem] border border-border-strong bg-surface shadow-card">
            <Icon
              name={project.icon ?? 'sparkles'}
              size={64}
              style={{ color: 'var(--brand)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
