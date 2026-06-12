"use client";

import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import SocialIcons from "@/components/contact/SocialIcons";
import { useGsapLazy } from "@/hooks/useGsapLazy";

import { ContactInfo } from "@/lib/types";

interface ContactContentProps {
  contactInfo: ContactInfo;
  locale: string;
}

export function ContactContent({ contactInfo, locale }: ContactContentProps) {
  const { email, location_ar, location_en, phones, social_links, whatsapp_number } = contactInfo;
  const isRtl = locale === "ar";
  const displayLocation = isRtl ? location_ar : location_en;
  
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapLazy((gsap, ScrollTrigger) => {
    // 1. Left column Header Reveal
    gsap.fromTo(".contact-header",
      { opacity: 0, x: isRtl ? 35 : -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 2. Stagger reveal contact channels (Email, Phone, Location)
    gsap.fromTo(".contact-channel",
      { opacity: 0, x: isRtl ? 30 : -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-channels-container",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 3. Social Follow Reveal
    gsap.fromTo(".contact-social",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-social",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 4. SVG decorative circuit pattern animate
    gsap.fromTo(".contact-svg",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".contact-svg",
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 5. Right Column Form Wrapper Elastic Pop
    gsap.fromTo(".contact-right-col",
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: ".contact-right-col",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, containerRef);

  return (
    <div ref={containerRef} className="container max-w-[1100px] mx-auto px-6 py-12 md:py-24 bg-background overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column - Contact Info (40%) */}
        <div className="md:w-[40%] flex flex-col">
          <div className="contact-header mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">
              {isRtl ? 'تواصل معي' : 'Contact Me'}
            </h1>
            <div className="h-1 w-16 bg-primary rounded-full"></div>
          </div>
          
          <div className="contact-channels-container flex flex-col gap-8 mb-12">
            {/* البريد الإلكتروني */}
            <div className="contact-channel flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-[#6B6B67] dark:text-[#9a9a97] mb-1">
                  {isRtl ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <a
                  href={`mailto:${email}`}
                  dir="ltr"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* أرقام الهاتف — قد يكون أكثر من رقم */}
            {phones && phones.map((phone, i) => (
              <div key={i} className="contact-channel flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6B67] dark:text-[#9a9a97] mb-1">
                    {isRtl ? (phone.label_ar || 'الهاتف') : (phone.label_en || 'Phone')}
                  </p>
                  <a
                    href={`tel:${phone.number}`}
                    dir="ltr"
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {phone.number}
                  </a>
                </div>
              </div>
            ))}
            
            {/* الموقع */}
            <div className="contact-channel flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-[#6B6B67] dark:text-[#9a9a97] mb-1">
                  {isRtl ? 'الموقع' : 'Location'}
                </p>
                <p className="text-lg font-medium text-foreground">{displayLocation}</p>
              </div>
            </div>
          </div>
          
          {/* أيقونات التواصل الاجتماعي */}
          {social_links && social_links.length > 0 && (
            <div className="contact-social mb-12">
              <p className="text-sm font-bold text-foreground mb-4">
                {isRtl ? 'حساباتي الاجتماعية' : 'Follow Me'}
              </p>
              <SocialIcons links={social_links} />
            </div>
          )}

          {/* Decorative circuit pattern */}
          <div className="contact-svg mt-auto opacity-20 text-primary">
            <svg width="200" height="100" viewBox="0 0 200 100">
              <path d="M 0 50 L 40 50 L 60 20 L 100 20 M 100 80 L 140 80 L 160 50 L 200 50" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="20" r="4" fill="currentColor" />
              <circle cx="100" cy="80" r="4" fill="currentColor" />
              <path d="M 100 20 L 100 80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>

        {/* Right Column - Contact Form (60%) */}
        <div className="contact-right-col md:w-[60%]">
          <div className="bg-white dark:bg-[#1a1a18] rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] p-6 md:p-8">
            <ContactForm whatsappNumber={whatsapp_number} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
