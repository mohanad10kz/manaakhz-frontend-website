import { setRequestLocale } from "next-intl/server";
import { getContactInfo } from "@/lib/strapi";
import { ContactContent } from "@/components/contact/ContactContent";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contactInfo = await getContactInfo(locale);

  if (!contactInfo) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">{locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'}</p>
      </div>
    );
  }

  return <ContactContent contactInfo={contactInfo} locale={locale} />;
}
