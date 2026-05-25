import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Pagination from '@/components/shared/Pagination'
import { getDesignsPaginated, getDesignsTotalPages, getCategories } from '@/lib/strapi'
import { DesignGrid } from '@/components/design/DesignGrid'

export async function generateStaticParams() {
  const totalPages = await getDesignsTotalPages()
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

export default async function DesignPageNum({
  params,
}: {
  params: Promise<{ locale: string; pageNum: string }>
}) {
  const { locale, pageNum } = await params
  setRequestLocale(locale)

  const page = parseInt(pageNum)
  const totalPages = await getDesignsTotalPages()

  if (isNaN(page) || page < 2 || page > totalPages) {
    notFound()
  }

  const [{ designs, pagination }, categories] = await Promise.all([
    getDesignsPaginated(page),
    getCategories(),
  ])

  if (!designs || designs.length === 0) {
    notFound()
  }

  return (
    <div className="w-full grow">
      <DesignGrid designs={designs} categories={categories} locale={locale} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        firstPagePath={`/design`}
        otherPagePath={`/design-page`}
      />
    </div>
  )
}
