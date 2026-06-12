"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface DesignDetailEntranceProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper that applies GSAP entrance animations
 * to the design detail page sections on mount.
 *
 * Sections animated (via data-anim attributes set on server):
 *   [data-anim="breadcrumb"]  — nav breadcrumb
 *   [data-anim="header"]      — h1 + underline span
 *   [data-anim="meta"]        — date / category row
 *   [data-anim="body"]        — article rich-text
 *   [data-anim="nav-bottom"]  — bottom back-link(s)
 *   [data-anim="gallery"]     — right-column gallery / no-media placeholder
 */
export function DesignDetailEntrance({ children }: DesignDetailEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ── Breadcrumb ──────────────────────────────────── */
      tl.fromTo(
        "[data-anim='breadcrumb']",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.55 }
      );

      /* ── Title (h1) ──────────────────────────────────── */
      tl.fromTo(
        "[data-anim='header']",
        { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.75 },
        "-=0.25"
      );

      /* ── Meta row ────────────────────────────────────── */
      tl.fromTo(
        "[data-anim='meta']",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.35"
      );

      /* ── Article body ────────────────────────────────── */
      tl.fromTo(
        "[data-anim='body']",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65 },
        "-=0.3"
      );

      /* ── Bottom nav link(s) ──────────────────────────── */
      tl.fromTo(
        "[data-anim='nav-bottom']",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.2"
      );

      /* ── Gallery (slides in from right / top on mobile) ─ */
      tl.fromTo(
        "[data-anim='gallery']",
        {
          opacity: 0,
          x: () =>
            window.matchMedia("(min-width: 1024px)").matches ? 50 : 0,
          y: () =>
            window.matchMedia("(min-width: 1024px)").matches ? 0 : 30,
          scale: 0.97,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "expo.out",
        },
        0.15 // starts near the beginning, runs in parallel with text
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grow pt-16 pb-20">
      {children}
    </div>
  );
}
