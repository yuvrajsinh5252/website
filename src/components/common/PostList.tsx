import { Link } from 'react-router'
import { routes } from '@/config/site.config'
import type { Post, PostBlock } from '@/types'
import { cn, formatPostDate } from '@/lib'
import { Icon } from '@/components/ui'
import { StaggerGroup, StaggerItem } from '@/components/motion'

export interface PostRowProps {
  post: Post
  className?: string
}

/** One entry in the posts index. */
export function PostRow({ post, className }: PostRowProps) {
  return (
    <article className={cn('group relative flex items-start gap-4 py-8 sm:gap-7 sm:py-10', className)}>
      {/*
       * A glimpse of the piece itself, so the index is not a wall of text.
       * From `sm` up it stretches to the height of the copy beside it rather
       * than sitting as a small square against a much taller block; the crop
       * is `object-cover`, so the photograph is never squashed to fit.
       */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="size-16 shrink-0 rounded-[0.9rem] border border-border object-cover transition-[translate,border-color] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent-border sm:h-auto sm:w-40 sm:self-stretch sm:rounded-[1.15rem]"
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>

        {/*
         * The arrow rides alongside the title rather than sitting on its own row
         * underneath. It used to share a row with the tag line; once that went,
         * a lone arrow was left holding open an otherwise empty band.
         */}
        <div className="mt-3 flex items-start justify-between gap-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-heading transition-colors duration-200 group-hover:text-accent sm:text-3xl">
            <Link
              to={routes.post(post.slug)}
              className="focus-ring after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </Link>
          </h2>

          <Icon
            name="arrowRight"
            size={18}
            className="mt-1.5 shrink-0 text-muted transition-[color,translate] duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-accent"
          />
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {post.description}
        </p>
      </div>
    </article>
  )
}

export interface PostListProps {
  posts: Post[]
  className?: string
}

/** Hairline-separated list of post rows. */
export function PostList({ posts, className }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-muted">Nothing published yet. Check back soon.</p>
  }

  return (
    <StaggerGroup as="ol" stagger={0.06} className={cn('rule-list', className)}>
      {posts.map((post) => (
        <StaggerItem as="li" key={post.slug}>
          <PostRow post={post} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}

/** Reads an outbound link's host, so a link block can preview where it goes. */
function hostOf(href: string): string | undefined {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

/** Picks the mark of the place a link points at. */
function markFor(host: string | undefined): string {
  if (!host) return 'externalLink'
  if (host.includes('github')) return 'github'
  if (host.includes('linkedin')) return 'linkedin'
  if (host.includes('youtube')) return 'youtube'
  if (host.includes('x.com') || host.includes('twitter')) return 'x'
  return 'externalLink'
}

/** Renders a single typed content block. */
function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {block.text}
        </h2>
      )

    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-3 h-px w-5 shrink-0 bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <figure className="border-l-2 border-accent-border py-1 pl-5">
          <blockquote className="font-display text-lg leading-relaxed text-heading sm:text-xl">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-2 text-sm text-muted">— {block.cite}</figcaption>
          )}
        </figure>
      )

    case 'link': {
      const host = hostOf(block.href)

      return (
        <a
          href={block.href}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-ring group flex items-center gap-4 rounded-card border border-border bg-surface/60 p-4 transition-[border-color,translate,background-color] duration-300 ease-out-expo hocus:-translate-y-0.5 hocus:border-accent-border hocus:bg-accent-muted sm:p-5"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-pill border border-border text-accent transition-colors duration-300 group-hover:border-accent-border">
            <Icon name={markFor(host)} size={17} />
          </span>

          <span className="min-w-0 flex-1">
            {/* Where the link actually goes, so it can be judged before it is
             * followed. */}
            {host && (
              <span className="block truncate text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
                {host}
              </span>
            )}
            <span className="mt-0.5 block font-medium text-heading transition-colors duration-300 group-hover:text-accent">
              {block.label}
            </span>
            {block.description && (
              <span className="mt-0.5 block text-sm text-muted">{block.description}</span>
            )}
          </span>

          <Icon
            name="arrowUpRight"
            size={16}
            className="shrink-0 text-muted transition-[color,translate] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </a>
      )
    }

    case 'image':
      return (
        <figure>
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-card border border-border"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    default:
      return <p className="leading-relaxed">{block.text}</p>
  }
}

/** Renders a post's typed blocks as an article body. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-6 text-base sm:text-[1.05rem]">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}
