import { PostList } from "@/components/blog/PostList";
import { getPostsPaginated } from "@/lib/strapi";
import { setRequestLocale } from "next-intl/server";
import Pagination from "@/components/shared/Pagination";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { posts, pagination } = await getPostsPaginated(1);
  const totalPages = pagination.pageCount;

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">{locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow">
      <PostList posts={posts} locale={locale} />
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        firstPagePath={`/blog`}
        otherPagePath={`/blog-page`}
      />
    </div>
  );
}
