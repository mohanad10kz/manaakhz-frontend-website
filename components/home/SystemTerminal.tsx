"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Terminal, Send, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  whatsappNumber: string;
}

export function SystemTerminal({ whatsappNumber }: Props) {
  const t = useTranslations("Home.terminal");
  const [isRtl, setIsRtl] = useState(false);
  const [message, setMessage] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    setIsConnecting(true);
    
    // Add terminal logs simulating routing
    setConsoleLogs(prev => [
      ...prev,
      `$ send --payload="${message.slice(0, 15)}..."`,
      "[INFO] Packaging data frame...",
      "[OK] Redirecting to physical layer (WhatsApp)..."
    ]);

    setTimeout(() => {
      const text = encodeURIComponent(
        isRtl 
          ? `مرحباً مهندس مناع، أرسل لك رسالة من الموقع:\n\n${message}`
          : `Hello Engineer Manaa, sending you a message from your site:\n\n${message}`
      );
      const url = `https://wa.me/${whatsappNumber}?text=${text}`;
      window.open(url, "_blank");
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-background px-6 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-10 pointer-events-none" />

      <div className="container max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Story Text / Left Column (or Right if Arabic) */}
        <div className="lg:col-span-5 flex flex-col items-start lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 mb-6">
            <Terminal className="w-4 h-4 text-primary" />
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
        </div>

        {/* Terminal Form / Right Column (or Left if Arabic) */}
        <div className="lg:col-span-7 lg:order-2 w-full">
          <div className="w-full rounded-2xl overflow-hidden bg-[#0A0D14] border border-[#1E2530] shadow-2xl text-[#39FF14] font-mono text-sm leading-relaxed flex flex-col h-[400px]">
            {/* Terminal Header */}
            <div className="bg-[#111622] px-4 py-3 border-b border-[#1E2530] flex items-center justify-between">
              <span className="text-xs text-[#4F5B66] select-none font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> serial_interface@mcu:~$
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            {/* Terminal Screen */}
            <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto bg-[#0A0D14] scrollbar-thin">
              <div className="flex flex-col gap-2 text-xs sm:text-sm">
                <div className="text-[#4F5B66]">$ ping manaa-electronics.local</div>
                <div className="text-[#39FF14]">[OK] 64 bytes from 192.168.1.13: icmp_seq=1 ttl=64 time=12.4 ms</div>
                
                <div className="text-[#4F5B66]">$ connect --interface=whatsapp --baud=115200</div>
                <div className="text-[#39FF14]">[OK] Baudrate set. Connection established successfully.</div>
                <div className="text-[#39FF14]">[SYSTEM] Serial interface listening... Enter your message below.</div>
                
                {/* Dynamically added CLI logs */}
                {consoleLogs.map((log, index) => (
                  <div 
                    key={index} 
                    className={log.startsWith("$") ? "text-[#4F5B66] mt-2" : log.includes("[OK]") ? "text-[#39FF14]" : "text-[#E5C07B]"}
                  >
                    {log}
                  </div>
                ))}
              </div>

              {/* Message Input inside Terminal */}
              <div className="mt-4 border-t border-[#1E2530] pt-4 flex flex-col gap-3">
                <div className="flex items-start gap-2 bg-[#111622] rounded-lg p-3 border border-[#1E2530]">
                  <span className="text-primary font-bold select-none">&gt;</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isConnecting}
                    placeholder={t("placeholder")}
                    rows={2}
                    className="flex-1 bg-transparent text-foreground border-none outline-none resize-none text-xs sm:text-sm font-mono placeholder:text-[#4F5B66]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSend}
                    disabled={isConnecting || !message.trim()}
                    className="bg-[#39FF14] text-[#0A0D14] hover:bg-[#32e012] font-mono font-black text-xs h-9 px-4 rounded-lg flex items-center gap-1.5"
                  >
                    {t("send_btn")}
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
