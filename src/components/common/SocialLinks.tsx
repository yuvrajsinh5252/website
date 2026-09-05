import type { SocialLink } from '@/types'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

export interface SocialLinksProps {
  links: SocialLink[]
  /** Show only entries flagged `primary`. */
  primaryOnly?: boolean
  size?: number
  className?: string
}

export function SocialLinks({
  links,
  primaryOnly = false,
  size = 18,
  className,
}: SocialLinksProps) {
  const visible = primaryOnly ? links.filter((link) => link.primary) : links

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {visible.map((link) => {
        const external = link.href.startsWith('http')

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer noopener' : undefined}
              aria-label={link.label}
              title={link.label}
              className="focus-ring group relative grid size-10 place-items-center rounded-pill border border-border bg-surface text-foreground transition-[color,border-color,background-color] duration-200 hocus:border-accent-border hocus:text-accent"
            >
              <span className="grid place-items-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-focus-visible:-translate-y-0.5 group-focus-visible:scale-110">
                <Icon name={link.icon} size={size} />
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
