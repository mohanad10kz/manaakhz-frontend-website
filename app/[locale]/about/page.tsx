import { setRequestLocale } from "next-intl/server";
import { getAbout } from "@/lib/strapi";
import { ProfileCard } from "@/components/about/ProfileCard";
import { InfoGrid } from "@/components/about/InfoGrid";
import { SkillsTags } from "@/components/about/SkillsTags";
import { MembershipsList } from "@/components/about/MembershipsList";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { getTranslations } from "next-intl/server";

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

  const isRtl = locale === "ar";
  const bio = isRtl ? about.bio_ar : about.bio_en;

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container max-w-[1100px] mx-auto px-6">
        
        {/* Main 40/60 Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column - Profile Card (40%) */}
          <div className="w-full lg:w-[40%] sticky top-28">
            <ProfileCard about={about} locale={locale} />
          </div>

          {/* Right Column - Info, Skills, Memberships (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            
            <section>
              <h2 className="text-2xl font-bold font-sans text-foreground mb-4">{t("bio")}</h2>
              <div className="h-1 w-12 bg-[#B5872A] rounded-full mb-6"></div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                {bio}
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-sans text-foreground mb-4">{t("personalInfo")}</h2>
              <div className="h-1 w-12 bg-[#B5872A] rounded-full mb-6"></div>
              <InfoGrid about={about} locale={locale} />
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-sans text-foreground mb-4">{t("skills")}</h2>
              <div className="h-1 w-12 bg-[#B5872A] rounded-full mb-6"></div>
              <SkillsTags about={about} locale={locale} />
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-sans text-foreground mb-4">{t("memberships")}</h2>
              <div className="h-1 w-12 bg-[#B5872A] rounded-full mb-6"></div>
              <MembershipsList about={about} locale={locale} />
            </section>

          </div>
        </div>

        {/* Full width Experience Timeline */}
        <ExperienceTimeline about={about} locale={locale} />

      </div>
    </div>
  );
}
