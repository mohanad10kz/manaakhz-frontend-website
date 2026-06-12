import { Link } from '@/i18n/routing'

interface Props {
  currentPage: number
  totalPages: number
  firstPagePath: string    // مثال: '/ar/design'
  otherPagePath: string    // مثال: '/ar/design-page'
}

export default function Pagination({
  currentPage,
  totalPages,
  firstPagePath,
  otherPagePath,
}: Props) {
  if (totalPages <= 1) return null

  // بناء قائمة أرقام الصفحات مع ... عند الحاجة
  const pages: (number | '...')[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  const getHref = (page: number) =>
    page === 1 ? firstPagePath : `${otherPagePath}/${page}`

  return (
    <nav
      aria-label="pagination"
      className="flex items-center justify-center gap-2 mt-12 mb-4 flex-wrap"
    >
      {/* السابق */}
      {currentPage > 1 ? (
        <Link
          href={getHref(currentPage - 1) as any}
          prefetch={false}
          className="px-3 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
        >
          ‹
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-md border border-border text-muted-foreground text-sm cursor-not-allowed opacity-40">
          ‹
        </span>
      )}

      {/* الأرقام */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-muted-foreground">…</span>
        ) : (
          <Link
            key={page}
            href={getHref(page) as any}
            prefetch={false}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              page === currentPage
                ? 'bg-primary text-primary-foreground font-bold border border-primary'
                : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* التالي */}
      {currentPage < totalPages ? (
        <Link
          href={getHref(currentPage + 1) as any}
          prefetch={false}
          className="px-3 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
        >
          ›
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-md border border-border text-muted-foreground text-sm cursor-not-allowed opacity-40">
          ›
        </span>
      )}
    </nav>
  )
}
