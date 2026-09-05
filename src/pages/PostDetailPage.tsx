import { Navigate, useParams } from 'react-router'
import { routes } from '@/config/site.config'
import { getPostBySlug, posts } from '@/data'
import type { PostLink } from '@/types'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { formatPostDate } from '@/lib'
import { Badge, Button, Container, Icon, type IconName } from '@/components/ui'
import { PostBody, PostList } from '@/components/common'
import { Reveal } from '@/components/motion'

/** Each link kind gets the mark of the place it points at. */
function postLinkIcon(kind: PostLink['kind']): IconName {
  switch (kind) {
    case 'repo':
      return 'github'
    case 'linkedin':
      return 'linkedin'
    default:
      return 'externalLink'
  }
}

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useDocumentMeta(post?.title, post?.description)

  if (!post) {
    return <Navigate to={routes.posts} replace />
  }

  const more = posts.filter((entry) => entry.slug !== post.slug).slice(0, 3)

  return (
    <div className="pt-header">
      <Container width="prose" className="pt-12 pb-16 sm:pt-16">
        <Button
          to={routes.posts}
          variant="ghost"
          size="sm"
          leadingIcon={<Icon name="arrowLeft" />}
          className="-ml-3"
        >
          All posts
        </Button>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-muted">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="font-display mt-4 text-4xl leading-[1.02] font-extrabold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline" size="sm">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          {post.links && post.links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {post.links.map((link) => (
                <Button
                  key={link.href}
                  href={link.href}
                  variant="secondary"
                  size="sm"
                  leadingIcon={<Icon name={postLinkIcon(link.kind)} />}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </Reveal>

        {post.coverImage && (
          <Reveal className="mt-10">
            <img
              src={post.coverImage}
              alt={post.coverAlt ?? ''}
              loading="eager"
              decoding="async"
              className="w-full rounded-card border border-border"
            />
          </Reveal>
        )}

        <Reveal className="mt-12">
          <PostBody blocks={post.body} />
        </Reveal>
      </Container>

      {more.length > 0 && (
        <div className="border-t border-border">
          <Container width="editorial" className="py-16 sm:py-20">
            <h2 className="eyebrow mb-8">Keep reading</h2>
            <PostList posts={more} />
          </Container>
        </div>
      )}
    </div>
  )
}
