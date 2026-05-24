"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className="font-medium flex items-center gap-2 rounded-full px-4 h-9 border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className="uppercase">{locale === "ar" ? "EN" : "عربي"}</span>
    </Button>
  );
}
