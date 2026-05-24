"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative Geometric Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg
          width="600"
          height="600"
          viewBox="0 0 100 100"
          className="text-primary"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M 50 10 L 50 90 M 10 50 L 90 50"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="10" r="2" fill="currentColor" />
          <circle cx="50" cy="90" r="2" fill="currentColor" />
          <circle cx="10" cy="50" r="2" fill="currentColor" />
          <circle cx="90" cy="50" r="2" fill="currentColor" />
          <path
            d="M 22 22 L 78 78 M 22 78 L 78 22"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="container max-w-[1100px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 font-sans">
          مناع للإلكترونيات
        </h1>
        <p className="text-xl md:text-2xl text-[#6B6B67] mb-12 max-w-2xl font-medium">
          موقعي الشخصي
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 px-8"
          >
            <Link href="/design">{t("cta_primary")}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary font-bold h-12 px-8"
          >
            <Link href="/blog">{t("cta_secondary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
