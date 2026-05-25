"use client";

import { useState } from "react";
import { Category, Design } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface DesignGridProps {
  designs: Design[];
  categories: Category[];
  locale: string;
}

export function DesignGrid({ designs, categories, locale }: DesignGridProps) {
  const t = useTranslations("Design");
  const isRtl = locale === "ar";

  const [activeSlug, setActiveSlug] = useState<string>("all");

  const filteredDesigns =
    activeSlug === "all"
      ? designs
      : designs.filter((d) => d.category?.slug === activeSlug);

  return (
    <div className="container max-w-275 mx-auto px-6 py-12 md:py-20">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">
          {isRtl ? "دوائر من تصميمي" : "My Circuit Designs"}
        </h1>
        <div className="h-1 w-16 bg-primary rounded-full mb-6"></div>
        <p className="text-lg text-[#6B6B67] max-w-2xl">
          {isRtl
            ? "تصاميم دوائر إلكترونية أعمل عليها"
            : "Electronic circuit designs I work on"}
        </p>
      </div>

      {/* Filter Bar — shown only if categories exist */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {/* "All" button */}
          <button
            onClick={() => setActiveSlug("all")}
            className={`px-6 py-2 rounded-full border transition-colors ${
              activeSlug === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {isRtl ? "الكل" : "All"}
          </button>

          {/* Dynamic categories from Strapi */}
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
              className={`px-6 py-2 rounded-full border transition-colors ${
                activeSlug === cat.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {isRtl ? cat.name_ar : cat.name_en}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredDesigns.map((design) => {
          const title = isRtl ? design.title_ar : design.title_en;
          const description = isRtl
            ? design.description_ar
            : design.description_en;
          const categoryLabel = design.category
            ? isRtl
              ? design.category.name_ar
              : design.category.name_en
            : null;

          return (
            <Link
              href={`/design/${design.slug}`}
              key={design.id}
              className="break-inside-avoid relative overflow-hidden rounded-[8px] border border-border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="p-6 flex flex-col gap-3">
                {/* Category badge — only if category exists */}
                {categoryLabel && (
                  <span className="inline-block self-start bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {categoryLabel}
                  </span>
                )}
                <h3 className="text-xl font-bold font-sans text-card-foreground">
                  {title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {description}
                </p>
                <span className="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-lg px-4 py-1.5 transition-colors w-fit text-sm font-bold">
                  {t("view_details")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
