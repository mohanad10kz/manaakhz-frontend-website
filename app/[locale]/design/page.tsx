import { DesignGrid } from "@/components/design/DesignGrid";
import { getAllDesigns, getCategories } from "@/lib/strapi";
import { setRequestLocale } from "next-intl/server";

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch all designs and categories in parallel for client-side pagination/filtering (Option A)
  const [designs, categories] = await Promise.all([
    getAllDesigns(locale),
    getCategories(),
  ]);

  if (!designs || designs.length === 0) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">
          {locale === "ar" ? "لا يوجد محتوى متاح." : "No content available."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grow">
      <DesignGrid designs={designs} categories={categories} locale={locale} />
    </div>
  );
}
