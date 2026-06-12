"use client";

import { useRef } from "react";
import { useGsapLazy } from "@/hooks/useGsapLazy";

interface BlogDetailEntranceProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper that applies GSAP entrance animations
 * to the blog/notes detail page sections on mount.
 * GSAP is lazy-loaded after the initial paint to keep FCP fast.
 */
export function BlogDetailEntrance({ children }: BlogDetailEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapLazy((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      "[data-anim='breadcrumb']",
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.55 }
    )
    .fromTo(
      "[data-anim='header']",
      { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.8 },
      "-=0.3"
    )
    .fromTo(
      "[data-anim='meta']",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.4"
    )
    .fromTo(
      "[data-anim='tag']",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.35, stagger: 0.07, ease: "back.out(1.4)" },
      "-=0.25"
    )
    .fromTo(
      "[data-anim='body']",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.2"
    )
    .fromTo(
      "[data-anim='nav-bottom']",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45 },
      "-=0.15"
    );
  }, containerRef);

  return (
    <div ref={containerRef} className="flex-grow pt-16 pb-20">
      {children}
    </div>
  );
}
