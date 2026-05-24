import { setRequestLocale } from "next-intl/server";
import { BiographyCard } from "@/components/about/BiographyCard";
import { getAbout } from "@/lib/strapi";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const aboutData = await getAbout(locale);

  if (!aboutData) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">{locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'}</p>
      </div>
    );
  }

  return (
    <div className="w-full grow">
      <BiographyCard locale={locale} about={aboutData} />
    </div>
  );
}
