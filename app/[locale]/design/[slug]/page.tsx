import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getDesignBySlug, getAllDesigns } from "@/lib/strapi";
import { Link } from "@/i18n/routing";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { DesignGallery } from "@/components/design/DesignGallery";

export async function generateStaticParams() {
  const designs = await getAllDesigns();
  if (!designs || designs.length === 0) {
    return [{ slug: 'empty' }];
  }
  return designs.map((design) => ({
    slug: design.slug,
  }));
}

export default async function DesignPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const design = await getDesignBySlug(slug, locale);

  if (!design) {
    notFound();
  }

  const isRtl = locale === "ar";
  const title = isRtl ? design.title_ar : design.title_en;
  const description = isRtl ? design.description_ar : design.description_en;

  const images = design.images || [];
  const videos = design.videos || [];

  const hasMedia = images.length > 0 || videos.length > 0;

  return (
    <div className="grow pt-16 pb-20">
      <div className="max-w-275 mx-auto px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-muted-foreground text-sm mb-8"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/design" className="hover:text-primary transition-colors">
            تصاميم الدوائر
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
                  <span>{isRtl ? "مُضاف حديثاً" : "Recently Added"}</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground opacity-50"></span>
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {design.category ? (
                    <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded text-xs font-medium">
                      {isRtl ? design.category.name_ar : design.category.name_en}
                    </span>
                  ) : null}
                </span>
              </div>
            </header>

            {/* Article Body */}
            <article className="prose prose-lg max-w-none text-foreground/90 leading-relaxed font-sans prose-p:mb-6 prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
              <div className="whitespace-pre-wrap font-semibold text-lg">{description}</div>
            </article>

            {/* Bottom Navigation — Hidden on mobile (shown below gallery instead) */}
            <div className="hidden lg:block mt-16 pt-8 border-t border-border">
              <Link
                href="/design"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group"
              >
                <span
                  className="transform group-hover:-translate-x-1 transition-transform"
                  dir="ltr"
                >
                  &rarr;
                </span>
                {isRtl ? "تصاميم أخرى" : "Other Designs"}
              </Link>
            </div>
          </div>

          {/* Left Column (Gallery) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {hasMedia ? (
              <DesignGallery
                images={images}
                videos={videos}
                title={title}
                isRtl={isRtl}
              />
            ) : (
              /* No media placeholder */
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
                <span className="text-4xl mb-3">🖼️</span>
                <p className="text-sm font-medium">
                  {isRtl ? "لا توجد صور أو فيديوهات" : "No images or videos"}
                </p>
              </div>
            )}

            {/* Bottom Navigation — Visible on mobile only, after gallery */}
            <div className="lg:hidden mt-10 pt-8 border-t border-border">
              <Link
                href="/design"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group"
              >
                <span
                  className="transform group-hover:-translate-x-1 transition-transform"
                  dir="ltr"
                >
                  &rarr;
                </span>
                {isRtl ? "تصاميم أخرى" : "Other Designs"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
