"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SmartBackLinkProps {
  fallback: string; // e.g. "/ar/design"
  sessionKey: string; // e.g. "last_design_page"
  className?: string;
  children: React.ReactNode;
}

export default function SmartBackLink({
  fallback,
  sessionKey,
  className,
  children,
}: SmartBackLinkProps) {
  const [targetHref, setTargetHref] = useState(fallback);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPath = sessionStorage.getItem(sessionKey);
      if (savedPath) {
        setTargetHref(savedPath);
      }
    }
  }, [fallback, sessionKey]);

  return (
    <Link href={targetHref} className={className}>
      {children}
    </Link>
  );
}
