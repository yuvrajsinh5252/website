import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'
import { badgeVariants, type BadgeVariantProps } from './variants'

export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'color'>,
    BadgeVariantProps {}

/** Small label for tech stack, status and metadata. */
export function Badge({ variant, size, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

/** Renders a list of strings as badges — used for project stacks and skills. */
export function BadgeList({
  items,
  variant,
  size,
  className,
}: BadgeVariantProps & { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item}>
          <Badge variant={variant} size={size}>
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
