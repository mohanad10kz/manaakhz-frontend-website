"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { 
  Cpu, Layers, Terminal, ArrowLeft, ArrowRight, 
  Zap, Wrench, Settings, CheckCircle2, ShieldCheck,
  Activity
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface CinematicHomeProps {
  whatsappNumber: string;
}

export function CinematicHome({ whatsappNumber }: CinematicHomeProps) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [whatsappMsg, setWhatsappMsg] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);

  // GSAP animations using useGSAP for modern, responsive, lag-free scrolling reveals
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. INTRO / HERO ENTRANCE (Staggered 3D Zoom Reveal with ScrollTrigger for reverse)
    gsap.fromTo(".intro-word", 
      {
        opacity: 0,
        y: 40,
        rotationX: -10,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        transformOrigin: "50% 50% -55px",
        stagger: 0.06,
        duration: 0.8,
        ease: "back.out(1.15)",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo(".intro-sub",
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo(".cinematic-bar-top",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.7,
        ease: "power3.out",
        transformOrigin: "top"
      }
    );

    gsap.fromTo(".cinematic-bar-bottom",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.7,
        ease: "power3.out",
        transformOrigin: "bottom"
      }
    );

    // 2. ACT 1: CIRCUIT DESIGN (Robust viewport reveals with play/reverse on scroll)
    gsap.fromTo(".act1-text-reveal > *",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: act1Ref.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo(".act1-skills-reveal",
      {
        opacity: 0,
        x: isRtl ? 30 : -30,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: act1Ref.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Draw PCB traces relative to scroll progress (scrubbed - smooth under Lenis)
    gsap.fromTo(".pcb-trace", 
      { strokeDashoffset: 600 },
      {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: act1Ref.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.6,
        }
      }
    );

    // PCB hardware components scale in with elastic bounce
    gsap.fromTo(".pcb-component",
      {
        opacity: 0,
        scale: 0.75,
        y: 15,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: act1Ref.current,
          start: "top 65%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // 3. ACT 2: DIAGNOSIS & MAINTENANCE (Robust reveals & Wave Cross-Fade)
    gsap.fromTo(".act2-text-reveal > *",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: act2Ref.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo(".act2-skills-reveal",
      {
        opacity: 0,
        x: isRtl ? -30 : 30,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: act2Ref.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Cross-fade waves (Malfunctioning to Clean) on scroll - GPU accelerated & smooth
    gsap.fromTo(".malfunction-wave",
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: act2Ref.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        }
      }
    );

    gsap.fromTo(".clean-wave",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: act2Ref.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        }
      }
    );

    // Fade in and change diagnostic LEDs
    gsap.fromTo(".diagnostic-led",
      { fill: "var(--color-destructive)", opacity: 0.25 },
      {
        fill: "var(--color-secondary)",
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: act2Ref.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        }
      }
    );

    // 4. ACT 3: TERMINAL CONNECTION
    gsap.fromTo(".act3-text-reveal > *",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: act3Ref.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo(".terminal-window",
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: act3Ref.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    // Debounced layout refresh to handle translations layout adjustments
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(refreshTimer);
    };
  }, { scope: containerRef, dependencies: [] }); // Empty dependencies since isRtl is statically determined and stable // Empty dependencies since isRtl is statically determined and stable

  const handleSendToWhatsapp = () => {
    if (!whatsappMsg.trim()) return;
    const encodedText = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <div ref={containerRef} className="relative bg-background text-foreground overflow-hidden">
      {/* Cinematic Bars (Letterbox effect) - purely graphic bars can have will-change */}
      <div className="cinematic-bar-top fixed top-0 left-0 right-0 h-[3vh] sm:h-[4.5vh] bg-black z-45 pointer-events-none origin-top [will-change:transform]" />
      <div className="cinematic-bar-bottom fixed bottom-0 left-0 right-0 h-[3vh] sm:h-[4.5vh] bg-black z-45 pointer-events-none origin-bottom [will-change:transform]" />

      {/* ──────────────────────────────────────────────────────── */}
      {/* INTRO HERO SECTION (The Opening Shot)                     */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        ref={introRef} 
        className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-16 pb-12 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-muted/40"
      >
        {/* Retro Grid Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Continuous Flowing Traces SVG Background (Flow all the way Left-to-Right / Right-to-Left) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1920 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left to right flowing trace path */}
            <path
              d="M 0 180 L 500 180 L 620 280 L 1000 280 L 1120 180 L 1450 180 L 1570 280 L 1920 280"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeDasharray="16 8"
              className="flow-trace-fast [will-change:stroke-dashoffset]"
            />
            {/* Right to left flowing trace path */}
            <path
              d="M 1920 420 L 1400 420 L 1280 320 L 900 320 L 780 420 L 450 420 L 330 320 L 0 320"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="1.5"
              strokeDasharray="16 8"
              className="flow-trace-fast-reverse [will-change:stroke-dashoffset]"
            />
          </svg>
        </div>

        <div className="container max-w-[1100px] mx-auto text-center relative z-10 flex flex-col items-center gap-6 mt-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 animate-pulse mb-2">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest font-mono">
              System Online
            </span>
          </div>

          {/* Cinematic Large Headline (Solid colors to avoid background-clip transparency bugs and blurry text rendering) */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-foreground mb-4 tracking-tighter leading-none flex flex-wrap justify-center gap-x-6 gap-y-2 select-none">
            {t("hero.title").split(" ").map((word, i) => (
              <span key={i} className="intro-word inline-block drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-secondary">
                {word}
              </span>
            ))}
          </h1>

          <p className="intro-sub text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-medium mb-8">
            {t("hero.tagline")}
          </p>

          <div className="intro-sub flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/95 font-bold h-12 px-8 rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <a href="#act1" className="flex items-center justify-center gap-2">
                {t("hero.cta_primary")}
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary font-bold h-12 px-8 rounded-lg transition-all duration-300"
            >
              <a href="#act2">
                {isRtl ? "صيانة الأجهزة والمعدات" : "Device Maintenance & Repair"}
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 z-20">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
            {isRtl ? "مرر للبدء" : "Scroll to Initialize"}
          </span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1 flex justify-center">
            <div className="w-1.5 h-2.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* ACT 1: CIRCUIT DESIGN & PCB MANUFACTURING (Design Page)  */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act1"
        ref={act1Ref} 
        className="relative min-h-screen py-24 flex items-center bg-muted/20 border-t border-border px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1.5px,transparent_1.5px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />
        
        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Narrative text */}
          <div className="lg:col-span-6 flex flex-col items-start act1-text-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/15 border border-secondary/25 mb-6">
              <Layers className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary font-mono tracking-wider">
                {t("blueprint.phase")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {t("blueprint.title")}
            </h2>

            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              {t("blueprint.description")}
            </p>

            {/* Skills Checklist for Circuit Design */}
            <div className="space-y-3 mb-8 w-full">
              <div className="flex items-start gap-3 act1-skills-reveal">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isRtl ? "رسم وتصميم مخططات الدوائر الإلكترونية (Schematic Layout)" : "Designing schematic diagrams for electronic systems."}
                </span>
              </div>
              <div className="flex items-start gap-3 act1-skills-reveal">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isRtl ? "تصميم وتوجيه مسارات اللوحات الإلكترونية متعددة الطبقات (Multi-layer PCB Routing)" : "Routing multi-layer printed circuit boards with high precision."}
                </span>
              </div>
              <div className="flex items-start gap-3 act1-skills-reveal">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isRtl ? "إعداد وتصدير ملفات التصنيع (Gerber Files) ومتابعة التنفيذ" : "Generating Gerber files for manufacturing and overseeing execution."}
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="default"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-12 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              <Link href="/design" className="flex items-center gap-2">
                {t("blueprint.cta")}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </Button>
          </div>

          {/* Interactive animated PCB Graphic */}
          <div className="lg:col-span-6 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[450px] aspect-square rounded-2xl bg-gradient-to-br from-emerald-950/20 to-emerald-900/40 dark:from-emerald-950/40 dark:to-emerald-900/60 border-2 border-secondary/35 shadow-2xl p-6 flex items-center justify-center overflow-hidden group">
              {/* Silk grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-50" />
              
              <svg viewBox="0 0 300 300" className="w-full h-full relative z-10 select-none">
                {/* Copper trace pathways - Animated using GSAP ScrollTrigger */}
                <g fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
                  <path 
                    d="M 50 150 L 100 150 L 120 130 L 120 100" 
                    className="pcb-trace [will-change:stroke-dashoffset]" 
                    strokeDasharray="600" 
                    strokeDashoffset="600"
                  />
                  <path 
                    d="M 250 150 L 200 150 L 180 170 L 180 200" 
                    className="pcb-trace [will-change:stroke-dashoffset]" 
                    strokeDasharray="600" 
                    strokeDashoffset="600"
                  />
                  <path 
                    d="M 150 50 L 150 100" 
                    className="pcb-trace [will-change:stroke-dashoffset]" 
                    strokeDasharray="600" 
                    strokeDashoffset="600"
                  />
                  <path 
                    d="M 150 250 L 150 200" 
                    className="pcb-trace [will-change:stroke-dashoffset]" 
                    strokeDasharray="600" 
                    strokeDashoffset="600"
                  />
                </g>

                {/* Solder components, capacitors and chips scaling in */}
                <g className="pcb-component [will-change:transform,opacity]" opacity="0">
                  <rect x="135" y="75" width="30" height="12" rx="2" fill="var(--color-secondary)" />
                  <line x1="135" y1="81" x2="120" y2="81" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="165" y1="81" x2="180" y2="81" stroke="var(--color-primary)" strokeWidth="2" />
                </g>

                <g className="pcb-component [will-change:transform,opacity]" opacity="0">
                  <rect x="135" y="213" width="30" height="12" rx="2" fill="var(--color-secondary)" />
                  <line x1="135" y1="219" x2="120" y2="219" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="165" y1="219" x2="180" y2="219" stroke="var(--color-primary)" strokeWidth="2" />
                </g>

                {/* MCU main microchip */}
                <g className="pcb-component cursor-pointer group/mcu [will-change:transform,opacity]" opacity="0">
                  <rect 
                    x="105" 
                    y="105" 
                    width="90" 
                    height="90" 
                    rx="8" 
                    fill="var(--color-card)" 
                    stroke="var(--color-secondary)" 
                    strokeWidth="3.5"
                    className="transition-colors duration-300 group-hover/mcu:stroke-primary"
                  />
                  <rect x="125" y="125" width="50" height="50" rx="4" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.5" />
                  <Cpu className="w-10 h-10 text-primary animate-pulse" style={{ transform: "translate(125px, 125px)" }} />
                  
                  {/* Pin points */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <g key={i} stroke="var(--color-border)" strokeWidth="2">
                      {/* Top/Bottom */}
                      <line x1={115 + i * 16} y1="105" x2={115 + i * 16} y2="97" />
                      <line x1={115 + i * 16} y1="195" x2={115 + i * 16} y2="203" />
                      {/* Left/Right */}
                      <line x1="105" y1={115 + i * 16} x2="97" y2={115 + i * 16} />
                      <line x1="195" y1={115 + i * 16} x2="203" y2={115 + i * 16} />
                    </g>
                  ))}
                </g>
              </svg>

              {/* Glass overlay board outline */}
              <div className="absolute inset-0 border border-secondary/20 rounded-2xl pointer-events-none group-hover:border-primary/40 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* ACT 2: DIAGNOSIS & MAINTENANCE (Medical & Electronics)  */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act2"
        ref={act2Ref} 
        className="relative min-h-screen py-24 flex items-center bg-background border-t border-border px-6 overflow-hidden"
      >
        <div className="absolute left-0 top-0 w-96 h-96 bg-[radial-gradient(circle_at_top_left,var(--color-muted),transparent)] opacity-40 pointer-events-none" />

        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative text (Right on LTR, Left on RTL) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start act2-text-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 mb-6">
              <Wrench className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold text-primary font-mono tracking-wider">
                {t("datasheet.phase")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {isRtl ? "صيانة الأجهزة وإحياء العتاد الإلكتروني والطبي" : "Troubleshooting & Medical Device Maintenance"}
            </h2>

            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              {isRtl 
                ? "خبرة عملية متقدمة في فحص ومعايرة وصيانة الأجهزة الطبية والمخبرية الدقيقة والأجهزة الإلكترونية الصناعية. نقوم بتحديد المكونات التالفة بدقة متناهية واستبدالها بنجاح مع فحص مسارات الطاقة والإشارة." 
                : "Advanced diagnostics, calibration, and repair services for critical medical, laboratory, and industrial electronic equipment. Identifying and replacing faulty micro-components to restore peak operational efficiency."}
            </p>

            {/* Diagnostic Skills checklist */}
            <div className="space-y-3 mb-8 w-full">
              <div className="flex items-start gap-3 act2-skills-reveal">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isRtl ? "صيانة الأجهزة الطبية، أجهزة المختبرات، ومنظومات القياس الحساسة" : "Repairing advanced medical, diagnostic, and clinical lab equipment."}
                </span>
              </div>
              <div className="flex items-start gap-3 act2-skills-reveal">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isRtl ? "تحديد الأعطال باستخدام أجهزة قياس متقدمة ومعايرة الإشارات التناظرية والرقمية" : "Isolating component faults and calibrating analog/digital system paths."}
                </span>
              </div>
              <div className="flex items-start gap-3 act2-skills-reveal">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">
                  {isRtl ? "إعادة تأهيل وإصلاح اللوحات الإلكترونية التالفة دون الحاجة لاستبدالها بالكامل" : "Component-level circuit board rehabilitation to avoid full-board replacement costs."}
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              <Link href="/about" className="flex items-center gap-2">
                {isRtl ? "السيرة الذاتية والمواصفات" : "Credentials & Biography"}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </Button>
          </div>

          {/* Diagnostic repair monitor (Left on LTR, Right on RTL) */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl bg-card border border-border shadow-2xl p-6 flex flex-col gap-4 overflow-hidden">
              
              {/* Diagnostic header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-wider">
                    {isRtl ? "محلل تشخيص الأعطال الطبية" : "DIAGNOSTIC CALIBRATOR V2.0"}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/30 border border-destructive diagnostic-led" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500 diagnostic-led" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500 diagnostic-led" />
                </div>
              </div>

              {/* Simulated Oscilloscope Screen Grid */}
              <div className="flex-1 bg-black/95 dark:bg-black/80 rounded-lg relative overflow-hidden border border-border flex items-center justify-center p-2">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />
                
                {/* Wave morphs from error path to healthy path as the user scrolls */}
                <svg viewBox="0 0 400 150" className="w-full h-full relative z-10">
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Jagged error wave - GPU optimized (Cross-fading opacity instead of morphing path geometry) */}
                  <path
                    d="M 0 75 L 20 40 L 40 110 L 60 20 L 80 130 L 100 60 L 120 90 L 140 30 L 160 120 L 180 75 L 200 75 L 220 30 L 240 120 L 260 50 L 280 100 L 300 75 L 320 20 L 340 130 L 360 60 L 380 90 L 400 75"
                    fill="none"
                    stroke="var(--color-destructive)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="malfunction-wave [will-change:opacity]"
                    strokeDasharray="5 3"
                  />
                  {/* Clean healthy sine wave */}
                  <path
                    d="M 0 75 Q 25 25, 50 75 T 100 75 T 150 75 T 200 75 T 250 75 T 300 75 T 350 75 T 400 75"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="clean-wave opacity-0 [will-change:opacity]"
                  />
                </svg>

                <div className="absolute bottom-2.5 right-3 bg-black/70 px-2 py-1 rounded text-[10px] text-primary font-mono border border-primary/20">
                  STATUS: AUTO_CALIBRATING
                </div>
              </div>

              {/* Specs icons footer */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{isRtl ? "صيانة أجهزة طبية" : "Medical Repair"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{isRtl ? "صيانة أجهزة مخبرية" : "Lab Diagnostics"}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* ACT 3: CONTACT TERMINAL (Establish Link)                 */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act3"
        ref={act3Ref} 
        className="relative min-h-screen py-24 flex items-center bg-background border-t border-border px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--color-border)_0.5px,transparent_0.5px)] bg-[size:6rem_6rem] opacity-20 pointer-events-none" />

        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative text */}
          <div className="lg:col-span-5 flex flex-col items-start act3-text-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 mb-6 animate-pulse">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary font-mono tracking-wider">
                {t("terminal.phase")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {t("terminal.title")}
            </h2>

            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              {t("terminal.description")}
            </p>

            <Button
              asChild
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 font-bold h-12 px-6 rounded-lg transition-all duration-300"
            >
              <Link href="/contact" className="flex items-center gap-2">
                {isRtl ? "الانتقال لصفحة اتصل بنا" : "Go to Contact Page"}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </Button>
          </div>

          {/* Interactive Connection Terminal */}
          <div className="lg:col-span-7 w-full flex justify-center terminal-window">
            <div className="w-full max-w-[540px] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl text-foreground font-mono text-sm flex flex-col h-[350px]">
              
              {/* Header */}
              <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground select-none flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-primary" /> serial_interface.sh
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  CONNECTED
                </span>
              </div>

              {/* Terminal Area */}
              <div className="p-6 flex-1 flex flex-col gap-4 bg-card/40">
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {isRtl 
                    ? "$ echo \"تهيئة قناة الاتصال المباشر مع المهندس...\"" 
                    : "$ echo \"Initializing serial communications channel...\""}
                  <br />
                  <span className="text-primary font-semibold">
                    {isRtl 
                      ? ">> القناة جاهزة لإرسال الرسائل عبر الواتساب." 
                      : ">> Connection active. Ready to route message."}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <textarea
                    value={whatsappMsg}
                    onChange={(e) => setWhatsappMsg(e.target.value)}
                    placeholder={t("terminal.placeholder")}
                    className="w-full h-24 p-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm resize-none font-sans"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSendToWhatsapp}
                    disabled={!whatsappMsg.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/95 font-bold h-10 px-5 rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{t("terminal.send_btn")}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
