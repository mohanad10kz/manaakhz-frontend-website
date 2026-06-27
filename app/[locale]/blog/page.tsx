import { PostList } from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/strapi";
import { setRequestLocale } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch all posts at build time for client-side pagination (SSG Option A)
  const posts = await getAllPosts(locale);

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">
          {locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow">
      <PostList posts={posts} locale={locale} />
    </div>
  );
}
