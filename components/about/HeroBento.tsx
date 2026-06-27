"use client";

import { About } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Cake, Users, GraduationCap, Award, MapPin } from "lucide-react";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { useRef } from "react";
import { useGsapLazy } from "@/hooks/useGsapLazy";

interface HeroBentoProps {
  about: About;
  locale: string;
}

export function HeroBento({ about, locale }: HeroBentoProps) {
  const t = useTranslations("About");
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  const name = isRtl ? about.name_ar : about.name_en;
  const title = isRtl ? about.title_ar : about.title_en;
  const bio = isRtl ? about.bio_ar : about.bio_en;
  const birthPlace = isRtl ? about.birth_place_ar : about.birth_place_en;
  const nationality = isRtl ? about.nationality_ar : about.nationality_en;
  const maritalStatus = isRtl
    ? about.marital_status_ar
    : about.marital_status_en;
  const education = isRtl ? about.education_ar : about.education_en;
  const memberships = isRtl ? about.memberships_ar : about.memberships_en;

  useGsapLazy((gsap, ScrollTrigger) => {
    // 1. Profile Core Card Reveal
    gsap.fromTo(".bento-profile",
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bento-profile",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 2. Profile Photo Elastic Reveal
    gsap.fromTo(".bento-photo",
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        delay: 0.15,
        scrollTrigger: {
          trigger: ".bento-profile",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 3. Name, Title, and details stagger
    gsap.fromTo(".bento-identity",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: ".bento-profile",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 4. Stagger for Right Side Info Cards
    gsap.fromTo(".bento-info-card",
      {
        opacity: 0,
        y: 30,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: ".bento-info-grid",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, containerRef);

  return (
    <section ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Profile Image & Core Identity - col-span 5 */}
      <div className="bento-profile col-span-1 lg:col-span-5 flex flex-col items-center text-center p-8 bg-linear-to-b from-card to-muted rounded-xl border border-border relative overflow-hidden">
        {/* Abstract Background Shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="bento-photo w-48 h-48 rounded-full border-4 border-primary p-1 bg-card overflow-hidden mb-6 relative z-10 shadow-lg">
          <OptimizedImage
            src={about.photo}
            alt={name}
            width={192}
            height={192}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h1 className="bento-identity font-arabic-headline text-display-lg-mobile lg:text-display-lg text-primary font-bold mb-2 relative z-10">
          {name}
        </h1>

        <p className="bento-identity text-secondary font-semibold text-lg mb-4 relative z-10">
          {title}
        </p>

        <div className="bento-identity flex items-center gap-2 text-muted-foreground text-sm mb-6 bg-muted/50 px-4 py-2 rounded-full relative z-10">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{nationality}</span>
        </div>

        <p className="bento-identity text-foreground leading-relaxed text-sm lg:text-base max-w-md relative z-10 mb-8 whitespace-pre-wrap">
          {bio}
        </p>
      </div>

      {/* Personal Info Grid - col-span 7 */}
      <div className="bento-info-grid col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-gutter content-start">
        {/* Info Card 1 */}
        <div className="bento-info-card bg-card border border-border rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Cake className="w-6 h-6" />
          </div>
          <h3 className="text-muted-foreground font-semibold text-sm">
            {t("birthDate")}
          </h3>
          <p className="text-foreground font-arabic-headline font-bold text-lg">
            {about.birth_date ? new Date(about.birth_date).getFullYear() : ""} -{" "}
            {birthPlace}
          </p>
        </div>

        {/* Info Card 2 */}
        <div className="bento-info-card bg-card border border-border rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-muted-foreground font-semibold text-sm">
            {t("maritalStatus")}
          </h3>
          <p className="text-foreground font-arabic-headline font-bold text-lg">
            {maritalStatus}
          </p>
        </div>

        {/* Info Card 3 */}
        <div className="bento-info-card bg-card border border-border rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-muted-foreground font-semibold text-sm">
            {t("education")}
          </h3>
          <p className="text-foreground font-arabic-headline font-bold text-lg leading-snug">
            {education}
          </p>
        </div>

        {/* Info Card 4 */}
        <div className="bento-info-card bg-card border border-border rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-muted-foreground font-semibold text-sm">
            {t("memberships")}
          </h3>
          <div className="text-foreground font-arabic-headline font-bold text-lg leading-snug">
            <ul className="space-y-1">
              {memberships?.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
