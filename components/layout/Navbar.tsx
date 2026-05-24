"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Layout.nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/design", label: t("design") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav className="flex items-center gap-8 font-medium">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors hover:text-primary text-[15px]",
            pathname === link.href
              ? "text-primary font-bold"
              : "text-foreground/80",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
