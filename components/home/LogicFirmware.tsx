"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export function LogicFirmware() {
  const t = useTranslations("Home.logic");
  const [isRtl, setIsRtl] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "config" | "log">("code");
  const [logLines, setLogLines] = useState<string[]>([]);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  // Simulate serial log activity when activeTab is "log"
  useEffect(() => {
    if (activeTab !== "log") {
      setLogLines([]);
      return;
    }

    const logs = [
      "[INFO] Core CPU initialized at 84MHz.",
      "[INFO] Sensor I2C interface detected at 0x3C.",
      "[OK] ADC Calibration successful.",
      "[OK] System power status: stable 3.3V.",
      "[DATA] Sensor reading - Temperature: 24.5°C | Humidity: 42%",
      "[DATA] Control loop iteration completed successfully.",
      "[OK] Watchdog timer reset."
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
    }, 1200);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="py-24 bg-background px-6 relative overflow-hidden">
      {/* Decorative circuitry lines */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,var(--color-primary-foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

      <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Mock IDE Terminal Column / Left on LG (if English, Right if Arabic) */}
        <div className="lg:col-span-7 order-2 lg:order-1 w-full">
          <div className="w-full rounded-2xl overflow-hidden bg-[#0F141C] border border-[#2B303B] shadow-2xl text-[#ABB2BF] font-mono text-sm leading-relaxed flex flex-col h-[380px]">
            {/* IDE Header */}
            <div className="bg-[#1A1F29] px-4 py-3 border-b border-[#2B303B] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-destructive/80" />
                <span className="w-3 h-3 rounded-full bg-[#E5C07B]" />
                <span className="w-3 h-3 rounded-full bg-secondary/80" />
              </div>
              <span className="text-xs text-[#5C6370] select-none flex items-center gap-1.5 font-bold">
                <Code className="w-3.5 h-3.5" /> IDE v16.2.6
              </span>
            </div>

            {/* IDE Tabs */}
            <div className="bg-[#151A24] px-2 flex border-b border-[#2B303B] overflow-x-auto scrollbar-none">
              <button 
                onClick={() => setActiveTab("code")}
                className={`px-4 py-2 text-xs border-r border-[#2B303B] flex items-center gap-1.5 transition-colors shrink-0 ${activeTab === 'code' ? 'bg-[#0F141C] text-primary border-t-2 border-t-primary' : 'text-[#5C6370] hover:text-[#ABB2BF]'}`}
              >
                main.cpp
              </button>
              <button 
                onClick={() => setActiveTab("config")}
                className={`px-4 py-2 text-xs border-r border-[#2B303B] flex items-center gap-1.5 transition-colors shrink-0 ${activeTab === 'config' ? 'bg-[#0F141C] text-primary border-t-2 border-t-primary' : 'text-[#5C6370] hover:text-[#ABB2BF]'}`}
              >
                config.h
              </button>
              <button 
                onClick={() => setActiveTab("log")}
                className={`px-4 py-2 text-xs border-r border-[#2B303B] flex items-center gap-1.5 transition-colors shrink-0 ${activeTab === 'log' ? 'bg-[#0F141C] text-primary border-t-2 border-t-primary' : 'text-[#5C6370] hover:text-[#ABB2BF]'}`}
              >
                <Terminal className="w-3 h-3" /> Serial Monitor
              </button>
            </div>

            {/* IDE Console Area */}
            <div className="p-5 flex-1 overflow-y-auto bg-[#0F141C]">
              {activeTab === "code" && (
                <pre className="text-xs sm:text-sm">
                  <code>
                    <span className="text-[#C678DD]">#include</span> <span className="text-[#98C379]">&lt;Arduino.h&gt;</span>{"\n"}
                    <span className="text-[#C678DD]">#include</span> <span className="text-[#98C379]">&quot;config.h&quot;</span>{"\n\n"}
                    <span className="text-[#C678DD]">void</span> <span className="text-[#61AFEF]">setup</span>() {"{"}{"\n"}
                    {"  "}<span className="text-[#E5C07B]">Serial</span>.<span className="text-[#61AFEF]">begin</span>(<span className="text-[#D19A66]">115200</span>);{"\n"}
                    {"  "}<span className="text-[#E5C07B]">pinMode</span>(LED_PIN, OUTPUT);{"\n"}
                    {"}"}{"\n\n"}
                    <span className="text-[#C678DD]">void</span> <span className="text-[#61AFEF]">loop</span>() {"{"}{"\n"}
                    {"  "}<span className="text-[#C678DD]">float</span> temp = <span className="text-[#61AFEF]">readTemperature</span>();{"\n"}
                    {"  "}<span className="text-[#E5C07B]">digitalWrite</span>(LED_PIN, HIGH);{"\n"}
                    {"  "}<span className="text-[#61AFEF]">delay</span>(TX_INTERVAL);{"\n"}
                    {"}"}
                  </code>
                </pre>
              )}

              {activeTab === "config" && (
                <pre className="text-xs sm:text-sm">
                  <code>
                    <span className="text-[#C678DD]">#define</span> <span className="text-[#E06C75]">LED_PIN</span> <span className="text-[#D19A66]">13</span>{"\n"}
                    <span className="text-[#C678DD]">#define</span> <span className="text-[#E06C75]">TX_INTERVAL</span> <span className="text-[#D19A66]">1000</span> <span className="text-[#5C6370]">// ms</span>{"\n"}
                    <span className="text-[#C678DD]">#define</span> <span className="text-[#E06C75]">BAUD_RATE</span> <span className="text-[#D19A66]">115200</span>{"\n"}
                    <span className="text-[#C678DD]">#define</span> <span className="text-[#E06C75]">MCU_ARCH</span> <span className="text-[#98C379]">&quot;ESP32&quot;</span>{"\n"}
                    <span className="text-[#C678DD]">#define</span> <span className="text-[#E06C75]">FIRMWARE_VER</span> <span className="text-[#98C379]">&quot;v1.0.4&quot;</span>
                  </code>
                </pre>
              )}

              {activeTab === "log" && (
                <div className="flex flex-col gap-1.5 text-xs text-[#98C379]">
                  {logLines.map((line, i) => (
                    <div key={i} className="flex gap-2 font-mono">
                      <span className="text-[#5C6370]">{(i + 1) * 10}ms</span>
                      <span className={line.includes("[OK]") ? "text-[#98C379]" : line.includes("[DATA]") ? "text-[#61AFEF]" : "text-[#E5C07B]"}>
                        {line}
                      </span>
                    </div>
                  ))}
                  <span className="inline-block w-2 h-4 bg-[#ABB2BF] animate-pulse ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Narrative / Right Column on LG */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 mb-6">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary font-mono tracking-wider">
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 px-6 rounded-lg shadow-md transition-all"
          >
            <Link href="/blog" className="flex items-center gap-2">
              {t("cta")}
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
