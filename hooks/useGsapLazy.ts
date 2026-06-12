"use client";
/**
 * useGsapLazy
 * -----------
 * Loads GSAP + ScrollTrigger dynamically (after initial paint) and runs
 * the provided setup function inside a scoped gsap.context().
 *
 * WHY: Importing gsap at the module level adds ~280 KB to the critical JS
 * bundle, blocking FCP on mobile. This hook lazy-loads gsap only after the
 * component mounts, so the browser can paint the page first.
 *
 * USAGE:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useGsapLazy((gsap, ScrollTrigger) => {
 *     gsap.fromTo(".my-el", { opacity: 0 }, { opacity: 1, duration: 0.5 });
 *   }, containerRef);
 */

import { useEffect, useRef, RefObject } from "react";

type SetupFn = (
  gsap: typeof import("gsap").gsap,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
) => void | (() => void);

let gsapPromise: Promise<{
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
}> | null = null;

function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.config({ nullTargetWarn: false });
      return { gsap, ScrollTrigger };
    });
  }
  return gsapPromise;
}

export function useGsapLazy(
  setup: SetupFn,
  scope?: RefObject<HTMLElement | null>,
  deps: any[] = []
) {
  // Keep a stable reference to the setup function to avoid re-running
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    let active = true;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;
    let cleanupFn: (() => void) | void = undefined;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (!active) return;
      ctx = gsap.context(() => {
        cleanupFn = setupRef.current(gsap, ScrollTrigger);
      }, scope?.current ?? undefined);
    });

    return () => {
      active = false;
      ctx?.revert();
      if (cleanupFn) {
        cleanupFn();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}



