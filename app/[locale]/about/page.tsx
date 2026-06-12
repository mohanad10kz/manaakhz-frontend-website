import { setRequestLocale } from "next-intl/server";
import { getAbout } from "@/lib/strapi";
import { getTranslations } from "next-intl/server";
import { HeroBento } from "@/components/about/HeroBento";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { SkillsLanguagesGrid } from "@/components/about/SkillsLanguagesGrid";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");
  const about = await getAbout(locale);

  if (!about) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">{locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'}</p>
      </div>
    );
  }

  return (
    <main className="w-full grow bg-background relative overflow-x-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#C8C7BF 1px, transparent 1px)',
          backgroundSize: '24px 24px' 
        }}
      ></div>

      <div className="container mx-auto px-gutter py-section-padding max-w-max-width relative flex flex-col gap-section-padding">
        {/* Hero Bento Grid */}
        <HeroBento about={about} locale={locale} />

        {/* Professional Timeline */}
        <ExperienceTimeline about={about} locale={locale} />

        {/* Skills & Languages Grid */}
        <SkillsLanguagesGrid about={about} locale={locale} />
      </div>
    </main>
  );
}
