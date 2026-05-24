import { setRequestLocale } from "next-intl/server";
import { mockContactInfo } from "@/lib/mock-data";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Link as LinkIcon } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { email, location_ar, location_en, social_links } = mockContactInfo;
  const isRtl = locale === "ar";
  const displayLocation = isRtl ? location_ar : location_en;

  return (
    <div className="container max-w-[1100px] mx-auto px-6 py-12 md:py-24 bg-background">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column - Contact Info (40%) */}
        <div className="md:w-[40%] flex flex-col">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">تواصل معي</h1>
            <div className="h-1 w-16 bg-primary rounded-full"></div>
          </div>
          
          <div className="flex flex-col gap-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-[#6B6B67] mb-1">البريد الإلكتروني</p>
                <a href={`mailto:${email}`} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-[#6B6B67] mb-1">الموقع</p>
                <p className="text-lg font-medium text-foreground">{displayLocation}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <p className="text-sm font-bold text-foreground mb-4">حساباتي الاجتماعية</p>
            <div className="flex items-center gap-4">
              {social_links.map((link) => {
                const Icon = LinkIcon;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Decorative circuit pattern */}
          <div className="mt-auto opacity-20 text-primary">
            <svg width="200" height="100" viewBox="0 0 200 100">
              <path d="M 0 50 L 40 50 L 60 20 L 100 20 M 100 80 L 140 80 L 160 50 L 200 50" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="20" r="4" fill="currentColor" />
              <circle cx="100" cy="80" r="4" fill="currentColor" />
              <path d="M 100 20 L 100 80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>

        {/* Right Column - Contact Form (60%) */}
        <div className="md:w-[60%]">
          <ContactForm />
        </div>
        
      </div>
    </div>
  );
}
