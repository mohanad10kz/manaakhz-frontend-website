"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function MobileNav() {
  const t = useTranslations("Layout.nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/design", label: t("design") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:bg-primary/10"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-background"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-6 mt-12">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary border-b border-border/50 pb-4",
                  isActive
                    ? "text-primary font-bold"
                    : "text-foreground/80",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
