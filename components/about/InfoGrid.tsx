import { About } from "@/lib/types";
import { Calendar, Globe, GraduationCap, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export function InfoGrid({ about, locale }: { about: About; locale: string }) {
  const t = useTranslations("About");
  const isRtl = locale === "ar";
  
  const birthPlace = isRtl ? about.birth_place_ar : about.birth_place_en;
  const nationality = isRtl ? about.nationality_ar : about.nationality_en;
  const education = isRtl ? about.education_ar : about.education_en;
  const maritalStatus = isRtl ? about.marital_status_ar : about.marital_status_en;

  const items = [
    {
      icon: Calendar,
      label: t("birthDate"),
      value: `${about.birth_date} (${birthPlace})`,
    },
    {
      icon: Globe,
      label: t("nationality"),
      value: nationality,
    },
    {
      icon: GraduationCap,
      label: t("education"),
      value: education,
    },
    {
      icon: Heart,
      label: t("maritalStatus"),
      value: maritalStatus,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-border flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#B5872A] font-bold mb-1">{item.label}</p>
              <p className="text-foreground font-medium">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
