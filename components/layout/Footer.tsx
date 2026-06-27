"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin, Cpu } from "lucide-react";
import { ContactInfo } from "@/lib/types";
import { mockContactInfo } from "@/lib/mock-data";
import SocialIcons from "@/components/contact/SocialIcons";

interface FooterProps {
  contactInfo: ContactInfo | null;
}

export function Footer({ contactInfo }: FooterProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const currentYear = new Date().getFullYear();

  // Merge backend data with fallback values
  const email = contactInfo?.email || mockContactInfo.email;
  const whatsappNumber = contactInfo?.whatsapp_number || mockContactInfo.whatsapp_number;
  const location = isRtl
    ? (contactInfo?.location_ar || mockContactInfo.location_ar)
    : (contactInfo?.location_en || mockContactInfo.location_en);
  const phones = contactInfo?.phones && contactInfo.phones.length > 0
    ? contactInfo.phones
    : mockContactInfo.phones;
  
  // Construct dynamic social links
  // Start with whatever Strapi backend returned
  let socialLinks = contactInfo?.social_links && contactInfo.social_links.length > 0
    ? [...contactInfo.social_links]
    : [...mockContactInfo.social_links];

  // If whatsapp is defined separately but not present in social_links list, append it
  if (whatsappNumber && !socialLinks.some(s => s.platform.toLowerCase() === "whatsapp")) {
    // Standardize URL
    const digitsOnly = whatsappNumber.replace(/[^\d+]/g, "");
    const cleanNumber = digitsOnly.startsWith("+") ? digitsOnly.slice(1) : digitsOnly;
    socialLinks.push({
      platform: "whatsapp",
      url: `https://wa.me/${cleanNumber}`,
      label: "WhatsApp"
    });
  }

  return (
    <footer className="bg-[#F1ECE4] dark:bg-[#1A1A18] border-t border-border/80 dark:border-primary/20 text-foreground pt-16 pb-8">
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="font-sans font-bold text-2xl tracking-tight text-primary">
                {isRtl ? "مناع للإلكترونيات" : "Manaa Electronics"}
              </h2>
            </div>
            <p className="text-muted-foreground dark:text-[#A1A19D] text-sm leading-relaxed">
              {isRtl
                ? "منصة هندسية لمشاركة الأفكار وتوثيق تصميم الدوائر الإلكترونية والأنظمة المدمجة، وتحويل المفاهيم إلى واقع مادي ملموس."
                : "An engineering platform for sharing ideas, documenting circuit designs, embedded systems, and bringing electronic concepts to life."}
            </p>
            {/* Social Links Row */}
            <div className="mt-2">
              <SocialIcons links={socialLinks} />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-primary border-b border-primary/10 pb-2">
              {isRtl ? "روابط سريعة" : "Quick Links"}
            </h3>
            <nav className="flex flex-col gap-2.5 text-muted-foreground dark:text-[#A1A19D] text-sm">
              <Link href="/" className="hover:text-primary transition-colors">
                {isRtl ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                {isRtl ? "السيرة الشخصية" : "Resume"}
              </Link>
              <Link href="/design" className="hover:text-primary transition-colors">
                {isRtl ? "دوائر من تصميمي" : "My Designs"}
              </Link>
              <Link href="/blog" className="hover:text-primary transition-colors">
                {isRtl ? "أفكاري ومذكراتي" : "Thoughts & Notes"}
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                {isRtl ? "تواصل معي" : "Contact Me"}
              </Link>
            </nav>
          </div>

          {/* Column 3: Core Focus */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-primary border-b border-primary/10 pb-2">
              {isRtl ? "مجالات التركيز" : "Core Focus"}
            </h3>
            <ul className="flex flex-col gap-2.5 text-muted-foreground dark:text-[#A1A19D] text-sm list-none p-0 m-0">
              <li>{isRtl ? "رسم المخططات الإلكترونية" : "Circuit Schematics"}</li>
              <li>{isRtl ? "تصميم لوحات الـ PCB" : "PCB Layout Design"}</li>
              <li>{isRtl ? "برمجة الأنظمة المدمجة" : "Embedded Systems Firmware"}</li>
              <li>{isRtl ? "إصلاح وصيانة الأجهزة الطبية" : "Medical Hardware Maintenance"}</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-primary border-b border-primary/10 pb-2">
              {isRtl ? "معلومات الاتصال" : "Contact Info"}
            </h3>
            <div className="flex flex-col gap-3.5 text-muted-foreground dark:text-[#A1A19D] text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{location}</span>
              </div>
              {phones.map((p, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {isRtl ? p.label_ar : p.label_en}: <span dir="ltr">{p.number}</span>
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 dark:border-white/5 text-center">
          <p className="text-muted-foreground/75 dark:text-muted-foreground/50 text-sm">
            &copy; {currentYear} {isRtl ? "مناع للإلكترونيات" : "Manaa Electronics"} — {isRtl ? "جميع الحقوق محفوظة" : "All rights reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}
