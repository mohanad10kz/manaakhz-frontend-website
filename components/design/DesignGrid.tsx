"use client";

import { useState, useRef } from "react";
import { Category, Design } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useGsapLazy } from "@/hooks/useGsapLazy";

interface DesignGridProps {
  designs: Design[];
  categories: Category[];
  locale: string;
}

export function DesignGrid({ designs, categories, locale }: DesignGridProps) {
  const t = useTranslations("Design");
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSlug, setActiveSlug] = useState<string>("all");

  const filteredDesigns =
    activeSlug === "all"
      ? designs
      : designs.filter((d) => d.category?.slug === activeSlug);

  useGsapLazy((gsap, ScrollTrigger) => {
    // 1. Header Reveal
    gsap.fromTo(".design-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".design-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 2. Filter Buttons Reveal
    gsap.fromTo(".filter-btn",
      { opacity: 0, scale: 0.95, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".design-filter-bar",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 3. Grid Cards Entrance
    gsap.fromTo(".design-card",
      { opacity: 0, y: 35, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".design-grid",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, containerRef, [filteredDesigns]);

  return (
    <div ref={containerRef} className="container max-w-275 mx-auto px-6 py-12 md:py-20 overflow-x-hidden">
      {/* Page Header */}
      <div className="design-header flex flex-col items-center text-center mb-12">
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
        <div className="design-filter-bar flex flex-wrap justify-center gap-3 mb-12">
          {/* "All" button */}
          <button
            onClick={() => setActiveSlug("all")}
            className={`filter-btn px-6 py-2 rounded-full border transition-colors ${
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
              className={`filter-btn px-6 py-2 rounded-full border transition-colors ${
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
      <div className="design-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((design) => {
          const title = isRtl ? design.title_ar : design.title_en;
          const descBlocks = isRtl
            ? design.description_ar
            : design.description_en;
          // استخراج نص من أول فقرة في الـ blocks للمقتطف
          const excerpt = (() => {
            if (!Array.isArray(descBlocks) || descBlocks.length === 0) return '';
            const firstPara = descBlocks.find((b: any) => b.type === 'paragraph');
            if (!firstPara || !Array.isArray(firstPara.children)) return '';
            const text = firstPara.children.map((c: any) => c.text || '').join('');
            return text.length > 120 ? text.substring(0, 120) + '...' : text;
          })();
          const categoryLabel = design.category
            ? isRtl
              ? design.category.name_ar
              : design.category.name_en
            : null;

          return (
            <Link
              href={`/design/${design.slug}`}
              key={design.id}
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("last_design_page", window.location.pathname);
                }
              }}
              className="design-card break-inside-avoid relative overflow-hidden rounded-[8px] border border-border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="p-6 flex flex-col gap-3">
                {/* Category badge — only if category exists */}
                
                  <span className="inline-block self-start bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {categoryLabel || "<>"}
                  </span>
                
                <h3 className={`text-xl font-bold font-sans text-card-foreground ${
                  categoryLabel ? "mt-0" : "mt-0"
                }`}>
                  {title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {excerpt}
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
