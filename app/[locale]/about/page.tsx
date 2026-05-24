import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { BiographyCard } from "@/components/about/BiographyCard";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Note: we can't easily use useTranslations inside Server Components without passing it
  // or using unstable_setRequestLocale. Since BiographyCard is a client component or handles
  // translation itself, we can let it handle the content. Wait, BiographyCard uses `useTranslations`,
  // which works in Server Components in App Router if setup correctly, but it's simpler to just 
  // render the card.

  return (
    <div className="container px-4 md:px-6 py-12 md:py-24">
      <BiographyCard locale={locale} />
    </div>
  );
}
