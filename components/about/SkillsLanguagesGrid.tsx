"use client";

import { About } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Cpu, Languages } from "lucide-react";
import { useRef } from "react";
import { useGsapLazy } from "@/hooks/useGsapLazy";

interface SkillsLanguagesGridProps {
  about: About;
  locale: string;
}

export function SkillsLanguagesGrid({ about, locale }: SkillsLanguagesGridProps) {
  const t = useTranslations("About");
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skills = isRtl ? about.skills_ar : about.skills_en;
  const languages = about.languages || [];

  useGsapLazy((gsap, ScrollTrigger) => {
    // 1. Skills container slide in
    gsap.fromTo(".skills-container",
      { opacity: 0, x: isRtl ? 35 : -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 2. Stagger skill list items
    gsap.fromTo(".skill-item",
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power1.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 3. Languages container slide in
    gsap.fromTo(".languages-container",
      { opacity: 0, x: isRtl ? -35 : 35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".languages-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 4. Animate progress bar widths when in view
    const bars = gsap.utils.toArray(".lang-bar");
    bars.forEach((bar: any) => {
      const pct = bar.getAttribute("data-percent") || "0";
      gsap.fromTo(bar,
        { width: "0%" },
        {
          width: `${pct}%`,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".languages-container",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });
  }, containerRef);

  return (
    <section ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      {/* Skills */}
      <div className="skills-container bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <h2 className="font-arabic-headline text-xl text-primary mb-6 flex items-center gap-2 border-b border-border pb-3">
          <Cpu className="text-primary w-6 h-6" />
          {t("skills")}
        </h2>
        <ul className="space-y-4">
          {skills?.map((skill, index) => (
            <li key={index} className="skill-item flex items-start gap-3">
              <div className="mt-2 w-2 h-2 rounded-sm bg-primary shrink-0 transform rotate-45"></div>
              <span className="text-foreground text-lg leading-relaxed">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Languages */}
      <div className="languages-container bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <h2 className="font-arabic-headline text-xl text-primary mb-6 flex items-center gap-2 border-b border-border pb-3">
          <Languages className="text-primary w-6 h-6" />
          {t("languages")}
        </h2>
        <div className="space-y-6">
          {languages.map((lang, index) => {
            const name = isRtl ? lang.name_ar : lang.name_en;
            const level = isRtl ? lang.level_ar : lang.level_en;
            
            return (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-foreground text-lg">{name}</span>
                  <span className={lang.percentage === 100 ? "text-primary text-sm font-medium" : "text-muted-foreground text-sm font-medium"}>
                    {level}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`lang-bar h-full rounded-full transition-all duration-1000 ${lang.percentage === 100 ? 'bg-primary' : 'bg-secondary opacity-80'}`} 
                    data-percent={lang.percentage}
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
