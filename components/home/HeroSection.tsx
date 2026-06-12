"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const t = useTranslations("Home.hero");
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-background px-6 py-12">
      {/* Background Grid & Circuit Signals */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Animated circuit paths */}
        <svg className="absolute w-full h-full left-0 top-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M -100 200 L 300 200 L 400 300 L 400 500 L 600 500"
            fill="none"
            stroke="url(#traceGrad)"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="animate-dash"
          />
          <path
            d="M 1200 100 L 1000 100 L 900 200 L 900 400 L 700 400"
            fill="none"
            stroke="url(#traceGrad)"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="animate-dash-reverse"
          />
          <circle cx="300" cy="200" r="3.5" fill="var(--color-primary)" className="animate-pulse" />
          <circle cx="900" cy="200" r="3.5" fill="var(--color-secondary)" className="animate-pulse" />
        </svg>
      </div>

      <div className="container max-w-[1100px] mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Animated System Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 mb-8 animate-pulse">
          <Cpu className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest font-mono">
            System Online
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-foreground mb-6 tracking-tight leading-tight">
          {t("title")}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-medium leading-relaxed">
          {t("tagline")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/design" className="flex items-center justify-center gap-2">
              {t("cta_primary")}
              {isRtl ? <ArrowLeft className="w-5 h-5 shrink-0" /> : <ArrowRight className="w-5 h-5 shrink-0" />}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-secondary/40 text-secondary hover:bg-secondary/10 hover:text-secondary font-bold h-12 px-8 rounded-lg transition-all"
          >
            <Link href="/blog">
              {t("cta_secondary")}
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Scroll to Initialize</span>
        <div className="w-5 h-9 border-2 border-muted-foreground/60 rounded-full p-1 flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full animate-[bounce_1.5s_infinite]" />
        </div>
      </div>
    </section>
  );
}
