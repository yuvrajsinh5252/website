import { cn } from '@/lib/cn'
import { Button, type ButtonProps } from './Button'

export type IconButtonProps = Omit<ButtonProps, 'size' | 'full' | 'aria-label'> & {
  /** Required — icon-only controls need an accessible name. */
  label: string
}

/** Square, icon-only button. */
export function IconButton({ label, className, ...props }: IconButtonProps) {
  return (
    <Button
      {...(props as ButtonProps)}
      size="icon"
      aria-label={label}
      title={label}
      className={cn('shrink-0', className)}
    />
  )
}
