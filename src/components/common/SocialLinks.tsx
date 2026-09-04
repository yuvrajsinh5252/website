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
              className="focus-ring grid size-10 place-items-center rounded-pill border border-border bg-surface text-foreground transition-[color,border-color,translate] duration-200 hocus:-translate-y-0.5 hocus:border-accent-border hocus:text-accent"
            >
              <Icon name={link.icon} size={size} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
