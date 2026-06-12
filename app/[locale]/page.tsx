import { CinematicHome } from "@/components/home/CinematicHome";
import { setRequestLocale } from "next-intl/server";
import { getContactInfo } from "@/lib/strapi";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contactInfo = await getContactInfo(locale);
  const whatsappNumber = contactInfo?.whatsapp_number || "";

  return (
    <main className="overflow-x-hidden">
      <CinematicHome whatsappNumber={whatsappNumber} />
    </main>
  );
}

