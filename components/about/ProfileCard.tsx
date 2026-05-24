import Image from "next/image";
import { About } from "@/lib/types";
import { Phone, Link as LinkIcon } from "lucide-react";

export function ProfileCard({
  about,
  locale,
}: {
  about: About;
  locale: string;
}) {
  const isRtl = locale === "ar";
  const name = isRtl ? about.name_ar : about.name_en;
  const title = isRtl ? about.title_ar : about.title_en;

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-8 flex flex-col items-center text-center w-full">
      <div className="relative w-50 h-50 mb-6 rounded-full border-[3px] border-[#B5872A] overflow-hidden">
        <img src={about.photo} alt={name} className="object-cover" />
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-2 font-sans">
        {name}
      </h1>
      <h2 className="text-[#3D5A4C] text-lg font-medium mb-6 font-sans">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center gap-4 w-full">
        <a
          href={`tel:${about.phone}`}
          className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          title={about.phone}
        >
          <Phone className="w-5 h-5" />
        </a>

        {about.social_links &&
          about.social_links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border-2 border-[#B5872A] text-[#B5872A] flex items-center justify-center hover:bg-[#B5872A] hover:text-white transition-colors"
              title={link.label}
            >
              <LinkIcon className="w-5 h-5" />
            </a>
          ))}
      </div>
    </div>
  );
}
