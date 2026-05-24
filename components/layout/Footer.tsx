import { mockContactInfo } from "@/lib/mock-data";
import { Link as LinkIcon } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A18] border-t border-primary/30 text-white pt-12 pb-6">
      <div className="container max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Right Column: Logo & Tagline */}
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-3xl tracking-tight text-primary">مناع للإلكترونيات</h2>
            <p className="text-[#6B6B67]">موقعي الشخصي</p>
          </div>
          
          {/* Left Column: Social Icons */}
          <div className="flex items-center gap-4">
            {mockContactInfo.social_links.map((social) => {
              const Icon = LinkIcon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-[#6B6B67] text-sm">
            &copy; {currentYear} مناع للإلكترونيات — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
