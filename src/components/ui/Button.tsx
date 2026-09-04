import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/cn'
import { buttonVariants, type ButtonVariantProps } from './variants'

interface ButtonOwnProps extends ButtonVariantProps {
  className?: string
  children?: ReactNode
  /** Rendered before the label. */
  leadingIcon?: ReactNode
  /** Rendered after the label. */
  trailingIcon?: ReactNode
}

type NativeButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    to?: never
    href?: never
  }

type AnchorProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    /** External or hash link — renders an <a>. */
    href: string
    to?: never
  }

type RouterLinkButtonProps = ButtonOwnProps &
  Omit<LinkProps, keyof ButtonOwnProps> & {
    /** Internal route — renders a react-router <Link>. */
    to: LinkProps['to']
    href?: never
  }

export type ButtonProps = NativeButtonProps | AnchorProps | RouterLinkButtonProps

function isRouterLink(props: ButtonProps): props is RouterLinkButtonProps {
  return props.to !== undefined
}

function isAnchor(props: ButtonProps): props is AnchorProps {
  return props.href !== undefined
}

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

/**
 * One button for three elements — `<button>`, `<a href>` and router `<Link>`.
 * Pass `href` or `to` to switch; every other prop stays identical.
 */
export function Button(props: ButtonProps) {
  if (isRouterLink(props)) {
    const { to, variant, size, full, className, children, leadingIcon, trailingIcon, ...rest } =
      props

    return (
      <Link to={to} className={cn(buttonVariants({ variant, size, full }), className)} {...rest}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </Link>
    )
  }

  if (isAnchor(props)) {
    const {
      href,
      target,
      rel,
      variant,
      size,
      full,
      className,
      children,
      leadingIcon,
      trailingIcon,
      ...rest
    } = props
    const external = isExternalHref(href)

    return (
      <a
        href={href}
        target={target ?? (external ? '_blank' : undefined)}
        rel={rel ?? (external ? 'noreferrer noopener' : undefined)}
        className={cn(buttonVariants({ variant, size, full }), className)}
        {...rest}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    )
  }

  const {
    type = 'button',
    variant,
    size,
    full,
    className,
    children,
    leadingIcon,
    trailingIcon,
    ...rest
  } = props

  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  )
}
