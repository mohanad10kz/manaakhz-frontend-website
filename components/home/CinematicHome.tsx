"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { 
  Cpu, Layers, Code, Activity, Terminal, 
  ArrowLeft, ArrowRight, Zap, Wrench, Settings 
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicHomeProps {
  whatsappNumber: string;
}

export function CinematicHome({ whatsappNumber }: CinematicHomeProps) {
  const t = useTranslations("Home");
  const [isRtl, setIsRtl] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "config" | "log">("code");
  const [logLines, setLogLines] = useState<string[]>([]);
  const [whatsappMsg, setWhatsappMsg] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);
  const act4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  // Simulate logs for serial monitor in Act 2
  useEffect(() => {
    if (activeTab !== "log") {
      setLogLines([]);
      return;
    }

    const logs = [
      "[INFO] System Initializing...",
      "[INFO] Main controller running at 120MHz.",
      "[INFO] I2C Device detected at address 0x3C.",
      "[OK] EEPROM check: PASS.",
      "[DATA] ADC Channel 0: 3.29V | stable.",
      "[OK] Watchdog Timer initialized.",
      "[DATA] Pulse diagnostics: OK."
    ];

    setLogLines([logs[0]]);
    let index = 1;

    const interval = setInterval(() => {
      if (index < logs.length) {
        setLogLines(prev => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // GSAP Animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cinematic Intro animation (Entrance)
    const ctx = gsap.context(() => {
      // 1. Initial fade-in of elements
      gsap.fromTo(
        ".intro-word", 
        { opacity: 0, y: 50, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.15, duration: 1.2, ease: "power4.out" }
      );

      gsap.fromTo(
        ".intro-sub", 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, delay: 0.8, duration: 1.5, ease: "power3.out" }
      );

      gsap.fromTo(
        ".cinematic-bar-top",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "power4.out", transformOrigin: "top" }
      );

      gsap.fromTo(
        ".cinematic-bar-bottom",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "power4.out", transformOrigin: "bottom" }
      );

      // 2. Parallax and animations for Act 1 (Hardware / PCB)
      gsap.fromTo(
        ".act1-title",
        { opacity: 0, x: isRtl ? 100 : -100 },
        { 
          opacity: 1, 
          x: 0,
          scrollTrigger: {
            trigger: act1Ref.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        ".pcb-trace",
        { strokeDashoffset: 400 },
        { 
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: act1Ref.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        ".pcb-component",
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: act1Ref.current,
            start: "top 55%",
            end: "bottom 90%",
            scrub: true,
          }
        }
      );

      // 3. Oscilloscope & IDE animations for Act 2 (Logic & Firmware)
      gsap.fromTo(
        ".act2-title",
        { opacity: 0, x: isRtl ? -100 : 100 },
        { 
          opacity: 1, 
          x: 0,
          scrollTrigger: {
            trigger: act2Ref.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        ".ide-box",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: act2Ref.current,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          }
        }
      );

      // Oscilloscope wave path animation (GSAP continuous morph or standard wave scroll)
      gsap.to(".oscilloscope-wave", {
        strokeDashoffset: -200,
        duration: 4,
        repeat: -1,
        ease: "linear"
      });

      // 4. Act 3 Diagnostics & Repair Animations
      gsap.fromTo(
        ".act3-title",
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: act3Ref.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          }
        }
      );

      // Malfunctioning wave morphing to clean wave on scroll
      gsap.fromTo(
        ".malfunction-wave",
        { strokeDasharray: "5 5", stroke: "var(--color-destructive)" },
        {
          strokeDasharray: "0 0",
          stroke: "var(--color-primary)",
          scrollTrigger: {
            trigger: act3Ref.current,
            start: "top 70%",
            end: "bottom 90%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        ".diagnostic-led",
        { fill: "var(--color-destructive)" },
        {
          fill: "var(--color-secondary)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: act3Ref.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // 5. Act 4 Terminal Connection
      gsap.fromTo(
        ".terminal-window",
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: act4Ref.current,
            start: "top 80%",
            end: "top 55%",
            scrub: true,
          }
        }
      );

    }, container);

    return () => ctx.revert();
  }, [isRtl]);

  const handleSendToWhatsapp = () => {
    if (!whatsappMsg.trim()) return;
    const encodedText = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <div ref={containerRef} className="relative bg-background text-foreground overflow-hidden">
      {/* Cinematic Bars (Letterbox effect) */}
      <div className="cinematic-bar-top fixed top-0 left-0 right-0 h-[3vh] sm:h-[5vh] bg-black z-40 pointer-events-none origin-top" />
      <div className="cinematic-bar-bottom fixed bottom-0 left-0 right-0 h-[3vh] sm:h-[5vh] bg-black z-40 pointer-events-none origin-bottom" />

      {/* ──────────────────────────────────────────────────────── */}
      {/* INTRO HERO SECTION                                       */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        ref={introRef} 
        className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-16 pb-12 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-muted/40"
      >
        {/* Retro Grid Background - styled dynamically with existing primary/secondary borders */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Animated Custom SVG Circuit Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M -100 300 Q 200 150 400 300 T 800 300 T 1200 400"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeDasharray="10 5"
              className="oscilloscope-wave"
            />
            <path
              d="M 100 600 Q 400 450 700 600 T 1300 600"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              className="oscilloscope-wave"
              style={{ animationDirection: "reverse" }}
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

          {/* Cinematic Large Headline (GTA 6 Trailer Vibe, Styled with existing Colors) */}
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
                {t("hero.cta_secondary")}
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
      {/* ACT 1: HARDWARE SPARK (PCB & Circuits)                   */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act1"
        ref={act1Ref} 
        className="relative min-h-screen py-24 sm:py-32 flex items-center bg-muted/20 border-t border-border px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
        
        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Narrative text (Left on LTR, Right on RTL) */}
          <div className="lg:col-span-5 flex flex-col items-start act1-title">
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
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[480px] aspect-square rounded-2xl bg-gradient-to-br from-emerald-950/20 to-emerald-900/40 dark:from-emerald-950/40 dark:to-emerald-900/60 border-2 border-secondary/35 shadow-2xl p-6 flex items-center justify-center overflow-hidden group">
              {/* Silk grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-50" />
              
              <svg viewBox="0 0 300 300" className="w-full h-full relative z-10 select-none">
                {/* Copper trace pathways - Animated using GSAP ScrollTrigger */}
                <g fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.8">
                  <path 
                    d="M 50 150 L 100 150 L 120 130 L 120 100" 
                    className="pcb-trace" 
                    strokeDasharray="400" 
                    strokeDashoffset="400"
                  />
                  <path 
                    d="M 250 150 L 200 150 L 180 170 L 180 200" 
                    className="pcb-trace" 
                    strokeDasharray="400" 
                    strokeDashoffset="400"
                  />
                  <path 
                    d="M 150 50 L 150 100" 
                    className="pcb-trace" 
                    strokeDasharray="400" 
                    strokeDashoffset="400"
                  />
                  <path 
                    d="M 150 250 L 150 200" 
                    className="pcb-trace" 
                    strokeDasharray="400" 
                    strokeDashoffset="400"
                  />
                </g>

                {/* Solder components, capacitors and chips scaling in */}
                <g className="pcb-component" opacity="0">
                  <rect x="135" y="75" width="30" height="12" rx="2" fill="var(--color-secondary)" />
                  <line x1="135" y1="81" x2="120" y2="81" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="165" y1="81" x2="180" y2="81" stroke="var(--color-primary)" strokeWidth="2" />
                </g>

                <g className="pcb-component" opacity="0">
                  <rect x="135" y="213" width="30" height="12" rx="2" fill="var(--color-secondary)" />
                  <line x1="135" y1="219" x2="120" y2="219" stroke="var(--color-primary)" strokeWidth="2" />
                  <line x1="165" y1="219" x2="180" y2="219" stroke="var(--color-primary)" strokeWidth="2" />
                </g>

                {/* MCU main microchip */}
                <g className="pcb-component cursor-pointer group/mcu" opacity="0">
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
                  <Cpu className="w-10 h-10 text-primary" style={{ transform: "translate(125px, 125px)" }} />
                  
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
      {/* ACT 2: LOGIC & FIRMWARE (Programming)                    */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act2"
        ref={act2Ref} 
        className="relative min-h-screen py-24 sm:py-32 flex items-center bg-background border-t border-border px-6 relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 w-96 h-96 bg-[radial-gradient(circle_at_top_left,var(--color-muted),transparent)] opacity-40 pointer-events-none" />

        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative description (Right on LTR, Left on RTL) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start act2-title">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 mb-6">
              <Code className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold text-primary font-mono tracking-wider">
                {t("logic.phase")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {t("logic.title")}
            </h2>

            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              {t("logic.description")}
            </p>

            <Button
              asChild
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              <Link href="/blog" className="flex items-center gap-2">
                {t("logic.cta")}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </Button>
          </div>

          {/* Code Compiler IDE (Left on LTR, Right on RTL) */}
          <div className="lg:col-span-7 order-2 lg:order-1 w-full flex justify-center ide-box">
            <div className="w-full max-w-[560px] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl text-foreground font-mono text-xs sm:text-sm leading-relaxed flex flex-col h-[400px]">
              
              {/* IDE Header */}
              <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-muted-foreground select-none flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5" /> Compiler Monitor v2.1
                </span>
              </div>

              {/* IDE Tabs */}
              <div className="bg-muted/50 px-2 flex border-b border-border overflow-x-auto">
                <button 
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-2 text-xs border-r border-border flex items-center gap-1.5 transition-colors shrink-0 ${activeTab === 'code' ? 'bg-card text-primary font-bold border-t-2 border-t-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  main.cpp
                </button>
                <button 
                  onClick={() => setActiveTab("config")}
                  className={`px-4 py-2 text-xs border-r border-border flex items-center gap-1.5 transition-colors shrink-0 ${activeTab === 'config' ? 'bg-card text-primary font-bold border-t-2 border-t-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  config.h
                </button>
                <button 
                  onClick={() => setActiveTab("log")}
                  className={`px-4 py-2 text-xs border-r border-border flex items-center gap-1.5 transition-colors shrink-0 ${activeTab === 'log' ? 'bg-card text-primary font-bold border-t-2 border-t-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Activity className="w-3 h-3" /> Realtime Serial
                </button>
              </div>

              {/* IDE Code console */}
              <div className="p-5 flex-1 overflow-y-auto bg-card/60 backdrop-blur-sm">
                {activeTab === "code" && (
                  <pre className="text-[11px] sm:text-[13px] leading-relaxed">
                    <code>
                      <span className="text-secondary font-semibold">#include</span> <span className="text-primary">&lt;ESP32Hardware.h&gt;</span>{"\n"}
                      <span className="text-secondary font-semibold">#include</span> <span className="text-primary">&quot;pins_config.h&quot;</span>{"\n\n"}
                      <span className="text-muted-foreground">// Logic diagnostics initialization</span>{"\n"}
                      <span className="text-primary">void</span> <span className="text-secondary">setup</span>() {"{"}{"\n"}
                      {"  "}Serial.<span className="text-secondary">begin</span>(115200);{"\n"}
                      {"  "}pinMode(SIGNAL_INPUT, INPUT);{"\n"}
                      {"  "}pinMode(STATUS_LED, OUTPUT);{"\n"}
                      {"}"}{"\n\n"}
                      <span className="text-primary">void</span> <span className="text-secondary">loop</span>() {"{"}{"\n"}
                      {"  "}float voltage = analogRead(SIGNAL_INPUT) * (3.3 / 4095.0);{"\n"}
                      {"  "}if (voltage &gt; 3.0) {"{"}{"\n"}
                      {"    "}digitalWrite(STATUS_LED, HIGH);{"\n"}
                      {"  "}{"}"} else {"{"}{"\n"}
                      {"    "}digitalWrite(STATUS_LED, LOW);{"\n"}
                      {"  "}{"}"}{"\n"}
                      {"  "}delay(50);{"\n"}
                      {"}"}
                    </code>
                  </pre>
                )}

                {activeTab === "config" && (
                  <pre className="text-[11px] sm:text-[13px] leading-relaxed">
                    <code>
                      <span className="text-secondary font-semibold">#define</span> <span className="text-primary">SIGNAL_INPUT</span> <span className="text-foreground">34</span>{"\n"}
                      <span className="text-secondary font-semibold">#define</span> <span className="text-primary">STATUS_LED</span> <span className="text-foreground">2</span>{"\n"}
                      <span className="text-secondary font-semibold">#define</span> <span className="text-primary">BAUD_RATE</span> <span className="text-foreground">115200</span>{"\n"}
                      <span className="text-secondary font-semibold">#define</span> <span className="text-primary">DEVICE_NAME</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;Manaa_OS_Controller&quot;</span>{"\n"}
                      <span className="text-secondary font-semibold">#define</span> <span className="text-primary">FIRMWARE_REV</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;v2.0.8-stable&quot;</span>
                    </code>
                  </pre>
                )}

                {activeTab === "log" && (
                  <div className="flex flex-col gap-1.5 text-xs text-secondary font-semibold">
                    {logLines.map((line, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-muted-foreground">+{i * 100}ms</span>
                        <span className={line.includes("[OK]") ? "text-emerald-600 dark:text-emerald-400" : line.includes("[DATA]") ? "text-primary" : "text-foreground"}>
                          {line}
                        </span>
                      </div>
                    ))}
                    <span className="inline-block w-2.5 h-4 bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* ACT 3: DIAGNOSIS & REPAIR (Maintenance & CV Link)        */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act3"
        ref={act3Ref} 
        className="relative min-h-screen py-24 sm:py-32 flex items-center bg-muted/20 border-t border-border px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative description (Left on LTR, Right on RTL) */}
          <div className="lg:col-span-5 flex flex-col items-start act3-title">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/15 border border-secondary/25 mb-6">
              <Wrench className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary font-mono tracking-wider">
                {t("datasheet.phase")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {isRtl ? "صيانة الأجهزة وإحياء العتاد الإلكتروني" : "Hardware Maintenance & Diagnostic Rehabilitation"}
            </h2>

            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              {isRtl 
                ? "خبرة واسعة في فحص وصيانة وإعادة تشغيل الأجهزة الإلكترونية الطبية، المخبرية، والصناعية المعقدة. نقوم بتشخيص الأعطال بدقة ميكروية وإعادة الأجهزة لكفاءتها التشغيلية الكاملة." 
                : "Comprehensive experience in troubleshooting, diagnosing, and repairing medical, laboratory, and complex industrial electronics. Restoring functionality with strict engineering standards."}
            </p>

            <Button
              asChild
              variant="default"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-12 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              <Link href="/about" className="flex items-center gap-2">
                {t("datasheet.description") ? (isRtl ? "تفاصيل السيرة الذاتية" : "View Resume & Specs") : "السيرة الذاتية"}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </Button>
          </div>

          {/* Diagnostic repair simulation board */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl bg-card border border-border shadow-2xl p-6 flex flex-col gap-4 overflow-hidden">
              
              {/* Screen grid header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-wider">
                    {isRtl ? "محلل الإشارات وصيانة الأعطال" : "DIAGNOSTIC SIGNAL INTERFACE"}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/30 border border-destructive diagnostic-led" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500 diagnostic-led" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500 diagnostic-led" />
                </div>
              </div>

              {/* Simulated Oscilloscope Grid & Oscilloscope Lines */}
              <div className="flex-1 bg-black/90 dark:bg-black/70 rounded-lg relative overflow-hidden border border-border flex items-center justify-center p-2">
                {/* Custom oscilloscope mesh background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                
                {/* Wave display */}
                <svg viewBox="0 0 400 150" className="w-full h-full relative z-10">
                  {/* Stable reference line */}
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Diagnostic target path - morphing from glitchy to clean sine on scroll */}
                  <path
                    d="M 0 75 Q 50 10, 100 75 T 200 75 T 300 75 T 400 75"
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="malfunction-wave"
                  />
                </svg>

                <div className="absolute bottom-2.5 right-3 bg-black/60 px-2 py-1 rounded text-[10px] text-primary font-mono border border-primary/20">
                  MODE: AUTO_REPAIR
                </div>
              </div>

              {/* Specs display list */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{isRtl ? "صيانة أجهزة طبية" : "Medical Repair"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{isRtl ? "صيانة أجهزة مخبرية" : "Lab Diagnostics"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{isRtl ? "تصميم ومحاكاة PCB" : "PCB Simulation"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{isRtl ? "كتابة الـ Firmware" : "Firmware Coding"}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* ACT 4: TERMINAL CONNECTION (Contact Us form)             */}
      {/* ──────────────────────────────────────────────────────── */}
      <section 
        id="act4"
        ref={act4Ref} 
        className="relative min-h-screen py-24 sm:py-32 flex items-center bg-background border-t border-border px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--color-border)_0.5px,transparent_0.5px)] bg-[size:6rem_6rem] opacity-25 pointer-events-none" />

        <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative text */}
          <div className="lg:col-span-5 flex flex-col items-start">
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
