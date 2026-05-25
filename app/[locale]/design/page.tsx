import { DesignGrid } from "@/components/design/DesignGrid";
import { getDesignsPaginated, getCategories } from "@/lib/strapi";
import { setRequestLocale } from "next-intl/server";
import Pagination from "@/components/shared/Pagination";

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch designs and categories in parallel
  const [{ designs, pagination }, categories] = await Promise.all([
    getDesignsPaginated(1),
    getCategories(),
  ]);

  const totalPages = pagination.pageCount;

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
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        firstPagePath={`/design`}
        otherPagePath={`/design-page`}
      />
    </div>
  );
}
