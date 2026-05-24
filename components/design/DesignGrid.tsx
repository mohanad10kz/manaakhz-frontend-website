"use client";

import { useState } from "react";
import { Design } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Badge } from "@/components/ui/badge";

interface DesignGridProps {
  designs: Design[];
  locale: string;
}

export function DesignGrid({ designs, locale }: DesignGridProps) {
  const t = useTranslations("Design");
  const isRtl = locale === "ar";
  
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "power", label: "طاقة" },
    { id: "arduino", label: "أردوينو" },
    { id: "basic", label: "دوائر أساسية" },
  ];

  const filteredDesigns = activeCategory === "all" 
    ? designs 
    : designs.filter(d => d.category === activeCategory);

  return (
    <div className="container max-w-[1100px] mx-auto px-6 py-12 md:py-20">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">دوائر من تصميمي</h1>
        <div className="h-1 w-16 bg-primary rounded-full mb-6"></div>
        <p className="text-lg text-[#6B6B67] max-w-2xl">تصاميم دوائر إلكترونية أعمل عليها</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-full border transition-colors ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredDesigns.map((design) => {
          // Determine title and description based on locale
          const title = isRtl ? design.title_ar : design.title_en;
          const description = isRtl ? design.description_ar : design.description_en;
          
          return (
            <Link 
              href={`/design/${design.slug}`}
              key={design.id} 
              className="break-inside-avoid relative overflow-hidden rounded-[8px] border border-border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="p-6 flex flex-col gap-3">
                <span className="inline-block self-start bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {design.category}
                </span>
                <h3 className="text-xl font-bold font-sans text-card-foreground">{title}</h3>
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {description}
                </p>
                <span className="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-[4px] px-4 py-1.5 transition-colors w-fit text-sm font-bold">
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
