import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPostBySlug, getAllPosts } from "@/lib/strapi";
import { Link } from "@/i18n/routing";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import SmartBackLink from "@/components/shared/SmartBackLink";


export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (!posts || posts.length === 0) {
    return [{ slug: 'empty' }];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const isRtl = locale === "ar";
  const title = isRtl ? post.title_ar : post.title_en;
  const content = isRtl ? post.content_ar : post.content_en;

  return (
    <div className="flex-grow pt-16 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-muted-foreground text-sm mb-8"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-4 h-4" />
          <SmartBackLink
            fallback={`/${locale}/blog`}
            sessionKey="last_blog_page"
            className="hover:text-primary transition-colors"
          >
            أفكاري ومذكراتي
          </SmartBackLink>
          <ChevronRight className="w-4 h-4" />
          <span aria-current="page" className="text-foreground font-medium">
            {title}
          </span>
        </nav>

        <div className="flex flex-col items-start">
            {/* Post Header */}
            <header className="mb-12">
              <h1 className="text-3xl md:text-5xl font-bold font-sans text-foreground mb-6 relative inline-block leading-tight">
                {title}
                <span className="absolute -bottom-2 right-0 w-full h-[3px] bg-primary rounded-full opacity-80"></span>
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mt-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground opacity-50"></span>
                <span className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {post.tags.split(",").map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-2 py-0.5 bg-secondary/10 text-secondary rounded text-xs font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </span>
              </div>
            </header>

            {/* Article Body */}
            <article className="max-w-none text-foreground/90 leading-relaxed font-sans">
              <RichTextRenderer
                content={content}
                dir={isRtl ? "rtl" : "ltr"}
                className="prose-lg text-foreground/90"
              />
            </article>

            {/* Bottom Navigation */}
            <div className="mt-16 pt-8 border-t border-border">
              <SmartBackLink
                fallback={`/${locale}/blog`}
                sessionKey="last_blog_page"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group"
              >
                <span
                  className="transform group-hover:-translate-x-1 transition-transform"
                  dir="ltr"
                >
                  &rarr;
                </span>
                {isRtl ? "مقالات أخرى" : "Other Articles"}
              </SmartBackLink>
            </div>
          </div>

      </div>
    </div>
  );
}
