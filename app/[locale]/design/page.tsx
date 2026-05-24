import { DesignGrid } from "@/components/design/DesignGrid";
import { mockDesigns } from "@/lib/mock-data";
import { setRequestLocale } from "next-intl/server";

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full grow">
      <DesignGrid designs={mockDesigns} locale={locale} />
    </div>
  );
}
