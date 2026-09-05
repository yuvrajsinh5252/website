import { posts } from '@/data'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Container, SectionHeading } from '@/components/ui'
import { PostList } from '@/components/common'

export default function PostsPage() {
  useDocumentMeta(
    'Posts',
    'I write occasionally — whatever feels worth noting down and sharing.',
  )

  return (
    <div className="pt-header">
      <Container width="editorial" className="py-20 sm:py-28">
        <SectionHeading
          as="h1"
          title="Posts"
          description="I write here occasionally, whatever feels worth noting down and sharing."
          className="mb-14 sm:mb-16"
        />

        <PostList posts={posts} />
      </Container>
    </div>
  )
}
