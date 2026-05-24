import { About } from "@/lib/types";

export function SkillsTags({ about, locale }: { about: About; locale: string }) {
  const isRtl = locale === "ar";
  const skills = isRtl ? about.skills_ar : about.skills_en;

  if (!skills || skills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, i) => {
        const isGold = i % 2 === 0;
        const colorClasses = isGold
          ? "border-[#B5872A] text-[#B5872A] bg-[#B5872A]/10"
          : "border-[#3D5A4C] text-[#3D5A4C] bg-[#3D5A4C]/10";
        
        return (
          <span
            key={i}
            className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors hover:bg-transparent ${colorClasses}`}
          >
            {skill}
          </span>
        );
      })}
    </div>
  );
}
