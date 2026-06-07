import { setRequestLocale } from "next-intl/server";
import { getContactInfo } from "@/lib/strapi";
import ContactForm from "@/components/contact/ContactForm";
import SocialIcons from "@/components/contact/SocialIcons";
import { Mail, MapPin, Phone } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contactInfo = await getContactInfo(locale);

  if (!contactInfo) {
    return (
      <div className="w-full grow flex items-center justify-center py-20">
        <p className="text-muted-foreground">{locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'}</p>
      </div>
    );
  }

  const { email, location_ar, location_en, phones, social_links, whatsapp_number } = contactInfo;
  const isRtl = locale === "ar";
  const displayLocation = isRtl ? location_ar : location_en;

  return (
    <div className="container max-w-[1100px] mx-auto px-6 py-12 md:py-24 bg-background">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column - Contact Info (40%) */}
        <div className="md:w-[40%] flex flex-col">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">
              {isRtl ? 'تواصل معي' : 'Contact Me'}
            </h1>
            <div className="h-1 w-16 bg-primary rounded-full"></div>
          </div>
          
          <div className="flex flex-col gap-8 mb-12">
            {/* البريد الإلكتروني */}
            <div className="flex items-center gap-4">
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
              <div key={i} className="flex items-center gap-4">
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
            <div className="flex items-center gap-4">
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
            <div className="mb-12">
              <p className="text-sm font-bold text-foreground mb-4">
                {isRtl ? 'حساباتي الاجتماعية' : 'Follow Me'}
              </p>
              <SocialIcons links={social_links} />
            </div>
          )}

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
          <div className="bg-white dark:bg-[#1a1a18] rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] p-6 md:p-8">
            <ContactForm whatsappNumber={whatsapp_number} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
