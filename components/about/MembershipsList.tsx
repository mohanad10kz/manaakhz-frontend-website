import { About } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

export function MembershipsList({ about, locale }: { about: About; locale: string }) {
  const isRtl = locale === "ar";
  const memberships = isRtl ? about.memberships_ar : about.memberships_en;

  if (!memberships || memberships.length === 0) return null;

  return (
    <div className="bg-[#3D5A4C]/5 rounded-xl p-6 border border-[#3D5A4C]/10">
      <ul className="flex flex-col gap-4">
        {memberships.map((membership, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#B5872A] shrink-0 mt-0.5" />
            <span className="text-foreground font-medium text-lg leading-snug">{membership}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
