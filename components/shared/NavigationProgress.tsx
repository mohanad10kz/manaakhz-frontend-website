"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// NavigationProgress
// شريط تحميل علوي يعمل مع Static Export في Next.js App Router.
// لا يعتمد على أي مكتبة خارجية.
//
// آلية العمل:
//  1. يراقب تغيّر usePathname() — يبدأ الشريط عند تغيّر المسار
//  2. يعترض النقرات على وسوم <a> عبر event delegation — يبدأ الشريط فور النقر
//     قبل أن يكتمل الانتقال، مما يعطي استجابة فورية للمستخدم.
// ─────────────────────────────────────────────────────────────────────────────

const BAR_COLOR = "hsl(var(--primary))";
const SHADOW_COLOR = "hsl(var(--primary) / 0.4)";
const HEIGHT_PX = 3;
const ANIMATION_DURATION_MS = 200;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const isNavigatingRef = useRef(false);

  const cancelAll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ─── بدء الشريط ───────────────────────────────────────────────────────────
  const startProgress = useCallback(() => {
    if (isNavigatingRef.current) return; // تجنّب التكرار
    isNavigatingRef.current = true;
    cancelAll();

    setProgress(0);
    setVisible(true);
    startTimeRef.current = performance.now();

    // تحريك الشريط حتى 85% بشكل تدريجي (يتوقف ليُكمله إتمام الانتقال)
    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      // يصل لـ 85% في ~8 ثوانٍ بشكل متباطئ
      const rawT = Math.min(elapsed / 8000, 1);
      const t = easeOutCubic(rawT) * 0.85;
      setProgress(t);
      if (t < 0.85) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [cancelAll]);

  // ─── إتمام الشريط ─────────────────────────────────────────────────────────
  const completeProgress = useCallback(() => {
    if (!isNavigatingRef.current) return;
    isNavigatingRef.current = false;
    cancelAll();

    setProgress(1); // اقفز إلى 100%
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, ANIMATION_DURATION_MS + 100);
  }, [cancelAll]);

  // ─── مراقبة تغيّر pathname → إتمام الشريط ────────────────────────────────
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      completeProgress();
    }
  }, [pathname, searchParams, completeProgress]);

  // ─── اعتراض النقرات على <a> → بدء الشريط ───────────────────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      // تجاهل: روابط خارجية، target="_blank"، مفاتيح modifier، download
      if (
        !target.href ||
        target.target === "_blank" ||
        target.download ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      try {
        const url = new URL(target.href);
        // تجاهل روابط خارجة عن النطاق الحالي
        if (url.origin !== window.location.origin) return;
        // تجاهل نفس الصفحة (anchor links)
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash !== ""
        )
          return;
        // تجاهل نفس المسار بالكامل
        if (url.href === window.location.href) return;

        startProgress();
      } catch {
        // href غير قابل للتحليل (مثل javascript:void(0)) → تجاهل
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      cancelAll();
    };
  }, [startProgress, cancelAll]);

  // ─── تنظيف عند unmount ────────────────────────────────────────────────────
  useEffect(() => () => cancelAll(), [cancelAll]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="جارٍ التحميل"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: `${HEIGHT_PX}px`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: BAR_COLOR,
          boxShadow: `0 0 8px 1px ${SHADOW_COLOR}`,
          borderRadius: "0 2px 2px 0",
          transition: `width ${ANIMATION_DURATION_MS}ms ease-out, opacity ${ANIMATION_DURATION_MS}ms ease`,
          opacity: progress >= 1 ? 0 : 1,
        }}
      />
    </div>
  );
}
