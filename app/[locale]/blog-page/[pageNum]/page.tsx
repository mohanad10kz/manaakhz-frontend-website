import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Pagination from '@/components/shared/Pagination'
import { getPostsPaginated, getPostsTotalPages } from '@/lib/strapi'
import { PostList } from '@/components/blog/PostList'

export async function generateStaticParams() {
  const totalPages = await getPostsTotalPages()
  const locales = ['ar', 'en']
  const params: { locale: string; pageNum: string }[] = []

  const maxPages = Math.max(2, totalPages)

  for (const locale of locales) {
    for (let i = 2; i <= maxPages; i++) {
      params.push({
        locale,
        pageNum: String(i),
      })
    }
  }
  return params
}

export default async function BlogPageNum({
  params,
}: {
  params: Promise<{ locale: string; pageNum: string }>
}) {
  const { locale, pageNum } = await params
  setRequestLocale(locale)

  const page = parseInt(pageNum)
  const totalPages = await getPostsTotalPages()

  if (isNaN(page) || page < 2 || page > totalPages) {
    notFound()
  }

  const { posts, pagination } = await getPostsPaginated(page)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <div className="w-full flex-grow">
      <PostList posts={posts} locale={locale} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        firstPagePath={`/blog`}
        otherPagePath={`/blog-page`}
      />
    </div>
  )
}
