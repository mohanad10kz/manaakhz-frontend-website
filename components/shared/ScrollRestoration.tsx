"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function ScrollRestoration() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lastPathname = useRef(pathname);

  useEffect(() => {
    // Flag to detect popstate (browser back/forward button clicks)
    const handlePopState = () => {
      (window as any).isPopState = true;
    };
    
    window.addEventListener("popstate", handlePopState);
    
    // Set scrollRestoration to manual so browser doesn't flash-scroll during load,
    // but still let us control it.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (lastPathname.current !== pathname) {
      lastPathname.current = pathname;
      
      const isPop = (window as any).isPopState;
      if (isPop) {
        // This is a browser back/forward action! Reset the flag and do NOT scroll to top.
        // The browser or next.js will naturally restore the scroll position.
        (window as any).isPopState = false;
      } else {
        // This is a new page navigation! Scroll immediately to the top.
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    }
  }, [pathname, lenis]);

  return null;
}
