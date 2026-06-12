"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Cpu, Layers } from "lucide-react";
import { useEffect, useState } from "react";

export function CircuitBlueprint() {
  const t = useTranslations("Home.blueprint");
  const [isRtl, setIsRtl] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  const componentsInfo: Record<string, { ar: string; en: string }> = {
    mcu: {
      ar: "المعالج الدقيق: عقل اللوحة المشغل للمخارج والمداخل.",
      en: "Microcontroller Unit (MCU): The brain of the board coordinating all signals.",
    },
    filter: {
      ar: "مكثفات التنقية: تصفية الضوضاء الكهربائية وتثبيت الفولتية.",
      en: "Decoupling Capacitors: Filters high-frequency noise and stabilizes voltage.",
    },
    traces: {
      ar: "مسارات النحاس: الطرق الناقلة للإشارات الإلكترونية بدقة ميكروية.",
      en: "Copper Traces: Paths routing high-speed electronic signals with sub-micron precision.",
    },
    power: {
      ar: "منظم الجهد: يوفر طاقة ثابتة وخالية من التذبذب لجميع القطع.",
      en: "Voltage Regulator: Provides clean, ripple-free power to all onboard ICs.",
    },
  };

  return (
    <section className="py-24 bg-muted/30 border-y border-border px-6 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

      <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Story Text / Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 mb-6">
            <Layers className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold text-secondary font-mono tracking-wider">
              {t("phase")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6 leading-tight">
            {t("title")}
          </h2>

          <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
            {t("description")}
          </p>

          <Button
            asChild
            variant="default"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-11 px-6 rounded-lg transition-all"
          >
            <Link href="/design" className="flex items-center gap-2">
              {t("cta")}
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </Button>

          {/* Micro-information Panel for Interactive SVG */}
          <div className="mt-8 p-4 rounded-lg bg-card border border-border w-full min-h-[90px] transition-all">
            {activeComponent ? (
              <div>
                <span className="text-xs font-bold text-primary block mb-1 font-mono uppercase tracking-widest">
                  Active Component Link
                </span>
                <p className="text-sm font-medium text-foreground">
                  {isRtl ? componentsInfo[activeComponent].ar : componentsInfo[activeComponent].en}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                {isRtl 
                  ? "انقر أو مرر فوق عناصر اللوحة المجاورة لاستكشاف مكونات الدائرة الإلكترونية." 
                  : "Hover or tap elements on the circuit board model to explore component specifications."}
              </p>
            )}
          </div>
        </div>

        {/* Interactive PCB / Right Column */}
        <div className="lg:col-span-7 flex justify-center items-center w-full">
          <div className="relative w-full max-w-[480px] aspect-square rounded-2xl bg-[#1D3227] border-4 border-[#122019] shadow-2xl p-6 flex items-center justify-center overflow-hidden group">
            {/* PCB Silk Screen grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#253E31_1px,transparent_1px),linear-gradient(to_bottom,#253E31_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40" />

            <svg viewBox="0 0 300 300" className="w-full h-full relative z-10 select-none">
              {/* Copper Ground Plane Traces */}
              <g 
                className="cursor-pointer transition-opacity" 
                opacity={activeComponent === 'traces' ? '1' : '0.6'}
                onMouseEnter={() => setActiveComponent('traces')}
                onMouseLeave={() => setActiveComponent(null)}
              >
                <path d="M 50 150 L 110 150 L 130 130 L 130 110" fill="none" stroke="#B5872A" strokeWidth="2.5" />
                <path d="M 250 150 L 190 150 L 170 170 L 170 190" fill="none" stroke="#B5872A" strokeWidth="2.5" />
                <path d="M 150 50 L 150 110" fill="none" stroke="#B5872A" strokeWidth="2.5" />
                <path d="M 150 250 L 150 190" fill="none" stroke="#B5872A" strokeWidth="2.5" />
              </g>

              {/* decoupling capacitors */}
              <g 
                className="cursor-pointer"
                onMouseEnter={() => setActiveComponent('filter')}
                onMouseLeave={() => setActiveComponent(null)}
              >
                {/* Cap 1 */}
                <rect x="140" y="75" width="20" height="10" rx="2" fill={activeComponent === 'filter' ? '#B5872A' : '#777'} className="transition-colors" />
                <line x1="140" y1="80" x2="130" y2="80" stroke="#B5872A" strokeWidth="1.5" />
                <line x1="160" y1="80" x2="170" y2="80" stroke="#B5872A" strokeWidth="1.5" />

                {/* Cap 2 */}
                <rect x="140" y="215" width="20" height="10" rx="2" fill={activeComponent === 'filter' ? '#B5872A' : '#777'} className="transition-colors" />
                <line x1="140" y1="220" x2="130" y2="220" stroke="#B5872A" strokeWidth="1.5" />
                <line x1="160" y1="220" x2="170" y2="220" stroke="#B5872A" strokeWidth="1.5" />
              </g>

              {/* voltage regulator */}
              <g 
                className="cursor-pointer"
                onMouseEnter={() => setActiveComponent('power')}
                onMouseLeave={() => setActiveComponent(null)}
              >
                <rect x="40" y="135" width="25" height="30" rx="3" fill={activeComponent === 'power' ? '#B5872A' : '#333'} className="transition-colors" />
                {/* Solder pins */}
                <line x1="65" y1="142" x2="75" y2="142" stroke="#E0DBD3" strokeWidth="2" />
                <line x1="65" y1="150" x2="75" y2="150" stroke="#E0DBD3" strokeWidth="2" />
                <line x1="65" y1="158" x2="75" y2="158" stroke="#E0DBD3" strokeWidth="2" />
              </g>

              {/* main MCU chip */}
              <g 
                className="cursor-pointer group/mcu"
                onMouseEnter={() => setActiveComponent('mcu')}
                onMouseLeave={() => setActiveComponent(null)}
              >
                {/* Chip Body */}
                <rect 
                  x="110" 
                  y="110" 
                  width="80" 
                  height="80" 
                  rx="6" 
                  fill={activeComponent === 'mcu' ? '#B5872A' : '#111'} 
                  stroke="#252525" 
                  strokeWidth="2"
                  className="transition-colors duration-300"
                />
                
                {/* Chip Core / Die */}
                <rect x="130" y="130" width="40" height="40" rx="4" fill="none" stroke="#B5872A" strokeWidth="1" opacity="0.4" />
                <Cpu className="w-8 h-8 text-primary absolute" style={{ transform: 'translate(136px, 136px)', opacity: activeComponent === 'mcu' ? 1 : 0.7 }} />

                {/* Pins - Top */}
                <line x1="120" y1="110" x2="120" y2="100" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="135" y1="110" x2="135" y2="100" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="150" y1="110" x2="150" y2="100" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="165" y1="110" x2="165" y2="100" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="180" y1="110" x2="180" y2="100" stroke="#E0DBD3" strokeWidth="2.5" />

                {/* Pins - Bottom */}
                <line x1="120" y1="180" x2="120" y2="190" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="135" y1="180" x2="135" y2="190" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="150" y1="180" x2="150" y2="190" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="165" y1="180" x2="165" y2="190" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="180" y1="180" x2="180" y2="190" stroke="#E0DBD3" strokeWidth="2.5" />

                {/* Pins - Left */}
                <line x1="110" y1="120" x2="100" y2="120" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="110" y1="135" x2="100" y2="135" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="110" y1="150" x2="100" y2="150" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="110" y1="165" x2="100" y2="165" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="110" y1="180" x2="100" y2="180" stroke="#E0DBD3" strokeWidth="2.5" />

                {/* Pins - Right */}
                <line x1="190" y1="120" x2="200" y2="120" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="190" y1="135" x2="200" y2="135" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="190" y1="150" x2="200" y2="150" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="190" y1="165" x2="200" y2="165" stroke="#E0DBD3" strokeWidth="2.5" />
                <line x1="190" y1="180" x2="200" y2="180" stroke="#E0DBD3" strokeWidth="2.5" />
              </g>
            </svg>

            {/* Glowing active outline */}
            <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none group-hover:border-primary/50 transition-colors" />
          </div>
        </div>

      </div>
    </section>
  );
}
