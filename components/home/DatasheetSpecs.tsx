"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SkillRow {
  key: string;
  value: number;
  unit: string;
}

export function DatasheetSpecs() {
  const t = useTranslations("Home.datasheet");
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  const technicalSpecs: SkillRow[] = [
    { key: "pcb", value: 95, unit: "PCB" },
    { key: "medical", value: 94, unit: "MED" },
    { key: "mikroc", value: 90, unit: "MCU" },
    { key: "vb", value: 85, unit: "VB" },
    { key: "cctv", value: 92, unit: "SYS" },
    { key: "web", value: 80, unit: "WEB" },
  ];

  return (
    <section className="py-24 bg-muted/30 border-y border-border px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />

      <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text / Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 mb-6">
            <FileText className="w-4 h-4 text-secondary" />
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
            <Link href="/about" className="flex items-center gap-2">
              {isRtl ? "مراجعة السيرة الذاتية" : "View Technical CV"}
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </Button>
        </div>

        {/* Datasheet Table / Right Column */}
        <div className="lg:col-span-7 w-full">
          <div className="w-full rounded-xl bg-card border border-border shadow-lg overflow-hidden">
            {/* Datasheet Header */}
            <div className="bg-muted px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-mono font-bold text-sm tracking-widest text-primary uppercase">
                  MANAA-10KZ DATASHEET
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  TYPE: HARDWARE & SYSTEM DEVELOPER
                </p>
              </div>
              <div className="text-right sm:text-right font-mono text-xs text-muted-foreground">
                REV. 2026.06 | STATUS: ACTIVE
              </div>
            </div>

            {/* Core Specifications Table */}
            <div className="p-6">
              <h4 className="font-bold text-sm text-foreground mb-4 font-mono uppercase tracking-wider border-b border-border pb-2">
                1.0 {t("specs")}
              </h4>

              {/* Technical Grid info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-xs font-mono text-muted-foreground">
                <div className="p-3 bg-muted/50 rounded-lg border border-border/60">
                  <span className="block font-bold text-foreground">OPERATING TEMP</span>
                  -40°C to +85°C
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-border/60">
                  <span className="block font-bold text-foreground">INTERFACE</span>
                  UART / SPI / I2C
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-border/60">
                  <span className="block font-bold text-foreground">ARCHITECTURES</span>
                  ARM / ESP32 / AVR
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-border/60">
                  <span className="block font-bold text-foreground">POWER CONSUMP.</span>
                  Low-Power / Efficient
                </div>
              </div>

              <h4 className="font-bold text-sm text-foreground mb-4 font-mono uppercase tracking-wider border-b border-border pb-2">
                2.0 {isRtl ? "الخصائص الكهربائية والمهارات" : "Electrical Characteristics & Skills"}
              </h4>

              {/* Dynamic skills specs list */}
              <div className="overflow-x-auto w-full border border-border rounded-lg">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border text-muted-foreground text-[10px] sm:text-xs">
                      <th className="px-4 py-2 text-right sm:text-right">{isRtl ? "المعامل الفني" : "Parameter"}</th>
                      <th className="px-4 py-2 text-center">{isRtl ? "التقييم" : "Rating"}</th>
                      <th className="px-4 py-2 text-center">{isRtl ? "الوحدة" : "Unit"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicalSpecs.map((spec) => (
                      <tr key={spec.key} className="border-b border-border last:border-none hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-semibold text-foreground text-right sm:text-right">
                          {t(spec.key)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 w-full max-w-[200px] mx-auto">
                            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden border border-border">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-1000"
                                style={{ width: `${spec.value}%` }}
                              />
                            </div>
                            <span className="font-bold shrink-0">{spec.value}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground font-bold">
                          {spec.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
