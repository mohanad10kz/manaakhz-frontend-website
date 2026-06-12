"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlogDetailEntranceProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper that applies GSAP entrance animations
 * to the blog/notes detail page sections on mount.
 *
 * Sections animated (via data-anim attributes set on server):
 *   [data-anim="breadcrumb"]  — nav breadcrumb
 *   [data-anim="header"]      — h1 + underline span
 *   [data-anim="meta"]        — date / tags row
 *   [data-anim="body"]        — article rich-text
 *   [data-anim="nav-bottom"]  — bottom back-link
 */
export function BlogDetailEntrance({ children }: BlogDetailEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ── Breadcrumb ──────────────────────────────────── */
      tl.fromTo(
        "[data-anim='breadcrumb']",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.55 }
      );

      /* ── Title ───────────────────────────────────────── */
      tl.fromTo(
        "[data-anim='header']",
        { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.8 },
        "-=0.3"
      );

      /* ── Meta / Tags row ─────────────────────────────── */
      tl.fromTo(
        "[data-anim='meta']",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      );

      /* ── Tag pills (staggered) ───────────────────────── */
      tl.fromTo(
        "[data-anim='tag']",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.07,
          ease: "back.out(1.4)",
        },
        "-=0.25"
      );

      /* ── Article body ────────────────────────────────── */
      tl.fromTo(
        "[data-anim='body']",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.2"
      );

      /* ── Bottom nav ──────────────────────────────────── */
      tl.fromTo(
        "[data-anim='nav-bottom']",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.15"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex-grow pt-16 pb-20">
      {children}
    </div>
  );
}
