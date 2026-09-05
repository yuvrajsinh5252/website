import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerOwnProps<T extends ElementType> = {
  as?: T
  /**
   * `content` (72rem) for wide sections, `editorial` (56rem) for text-led
   * pages, `prose` (44rem) for long-form reading.
   */
  width?: 'content' | 'editorial' | 'prose' | 'full'
  className?: string
  children?: ReactNode
}

export type ContainerProps<T extends ElementType = 'div'> = ContainerOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerOwnProps<T>>

const widths = {
  content: 'max-w-(--container-content)',
  editorial: 'max-w-(--container-editorial)',
  prose: 'max-w-(--container-prose)',
  full: 'max-w-none',
} as const

/** Horizontal gutter + max width. Wraps the content of every section. */
export function Container<T extends ElementType = 'div'>({
  as,
  width = 'content',
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? 'div') as ElementType

  return (
    <Component className={cn('container-page', widths[width], className)} {...props}>
      {children}
    </Component>
  )
}
