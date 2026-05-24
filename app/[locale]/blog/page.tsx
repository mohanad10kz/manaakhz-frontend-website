import { PostList } from "@/components/blog/PostList";
import { mockPosts } from "@/lib/mock-data";
import { setRequestLocale } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full grow">
      <PostList posts={mockPosts} locale={locale} />
    </div>
  );
}
