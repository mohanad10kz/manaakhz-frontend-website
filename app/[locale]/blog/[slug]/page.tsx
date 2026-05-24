import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPostBySlug, mockPosts } from "@/lib/mock-data";
import { Link } from "@/i18n/routing";
import { ChevronRight, Calendar, Tag } from "lucide-react";

export function generateStaticParams() {
  return mockPosts.map((post) => ({
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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isRtl = locale === "ar";
  const title = isRtl ? post.title_ar : post.title_en;
  const content = isRtl ? post.content_ar : post.content_en;

  const images = post.images || [];
  const mainImage = images[0] || "https://placehold.co/800x600?text=Post";
  const thumbnails = images.slice(0, 4);

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
          <Link href="/blog" className="hover:text-primary transition-colors">
            أفكاري ومذكراتي
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span aria-current="page" className="text-foreground font-medium">
            {title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Right Column (Text Content) */}
          <div className="lg:col-span-7">
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
            <article className="prose prose-lg max-w-none text-foreground/90 leading-relaxed font-sans prose-p:mb-6 prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
              <div className="whitespace-pre-wrap">{content}</div>
            </article>

            {/* Bottom Navigation */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group"
              >
                <span
                  className="transform group-hover:-translate-x-1 transition-transform"
                  dir="ltr"
                >
                  &rarr;
                </span>
                {isRtl ? "مقالات أخرى" : "Other Articles"}
              </Link>
            </div>
          </div>

          {/* Left Column (Image Gallery) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Featured Image */}
            <figure className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={title}
                className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm border border-border"
                src={mainImage}
              />
            </figure>

            {/* Thumbnail Slider */}
            {thumbnails.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                {thumbnails.map((img, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={idx}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-border snap-start shrink-0 opacity-70 hover:opacity-100 transition-all"
                    src={img}
                  />
                ))}
              </div>
            )}
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .hide-scrollbar::-webkit-scrollbar {
                  display: none;
              }
              .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
              }
            `,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
