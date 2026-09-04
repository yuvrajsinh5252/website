import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'
import { cardVariants, type CardVariantProps } from './variants'

export interface CardProps extends ComponentPropsWithoutRef<'div'>, CardVariantProps {}

/**
 * Panel surface. `interactive` adds the shared hover lift, and the card is a
 * container-query root so its contents can respond to the card's own width
 * (`@md:grid-cols-2`) rather than the viewport.
 */
export function Card({ variant, padding, interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex flex-col gap-1.5', className)} {...props} />
}

export function CardTitle({ className, ...props }: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      className={cn('text-lg font-semibold tracking-tight @md:text-xl', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('text-sm leading-relaxed text-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mt-4', className)} {...props} />
}

export function CardFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mt-5 flex flex-wrap items-center gap-3', className)} {...props} />
}
