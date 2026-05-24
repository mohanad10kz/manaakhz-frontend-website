import { mockAbout, mockContactInfo } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link as LinkIcon } from "lucide-react";

export function BiographyCard({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const { name, bio_ar, bio_en, nationality } = mockAbout;

  // Use mockContactInfo for social links
  const socialLinks = mockContactInfo.social_links;

  return (
    <div className="container max-w-275 mx-auto px-6 py-20 bg-background">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left Column (40%) */}
        <div className="md:w-2/5 flex flex-col items-center text-center">
          <div className="w-50 h-50 rounded-full border-[3px] border-primary p-1 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80"
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold font-sans text-foreground mb-2">
            {name}
          </h1>
          <p className="text-lg text-secondary font-medium mb-3">
            مهندس إلكترونيات ومصمم دوائر
          </p>
          <p className="text-sm text-[#6B6B67] mb-6 flex items-center gap-2">
            <span>🇱🇾</span> {nationality}، ليبيا
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = LinkIcon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.platform}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column (60%) */}
        <div className="md:w-3/5 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-sans text-foreground mb-2">
              نبذة عني
            </h2>
            <div className="h-1 w-10 bg-primary rounded-full"></div>
          </div>

          <div className="text-[#6B6B67] text-lg mb-8 whitespace-pre-wrap">
            {isRtl ? bio_ar : bio_en}
          </div>

          <Separator className="mb-8 bg-border/50" />

          <div>
            <h3 className="uppercase text-sm font-bold text-primary mb-4 tracking-wider">
              المهارات
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "تصميم دوائر",
                "Altium Designer",
                "KiCad",
                "برمجة مضمّنة",
                "Arduino",
                "PCB Layout",
              ].map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="rounded-full border-primary text-primary bg-[#F7F4EF] hover:bg-primary hover:text-white px-4 py-1.5 text-sm font-medium transition-colors"
                  dir="ltr"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
