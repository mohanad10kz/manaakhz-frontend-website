import { About } from "@/lib/types";
import { useTranslations } from "next-intl";

export function ExperienceTimeline({ about, locale }: { about: About; locale: string }) {
  const t = useTranslations("About");
  const isRtl = locale === "ar";
  
  if (!about.experience || about.experience.length === 0) return null;

  return (
    <div className="w-full relative mt-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold font-sans text-foreground mb-4">{t("experience")}</h2>
        <div className="h-1 w-16 bg-[#B5872A] rounded-full mx-auto"></div>
      </div>

      <div className="relative wrap overflow-hidden p-4 sm:p-10">
        {/* Vertical line */}
        <div 
          className={`absolute border-opacity-20 border-[#B5872A] h-full border ${isRtl ? 'border-r-2 right-4 sm:right-1/2' : 'border-l-2 left-4 sm:left-1/2'}`}
        ></div>

        {about.experience.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          const period = isRtl ? exp.period_ar : exp.period_en;
          const place = isRtl ? exp.place_ar : exp.place_en;
          const role = isRtl ? exp.role_ar : exp.role_en;
          const description = isRtl ? exp.description_ar : exp.description_en;

          return (
            <div key={idx} className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
              <div className="hidden sm:block sm:w-5/12"></div>
              
              <div className="z-20 w-8 h-8 flex items-center justify-center bg-[#B5872A] rounded-full shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>

              <div className={`w-full sm:w-5/12 ${isRtl ? 'pr-8 sm:pr-0' : 'pl-8 sm:pl-0'} ${isLeft ? (isRtl ? 'sm:pl-8' : 'sm:pr-8') : (isRtl ? 'sm:pr-8' : 'sm:pl-8')}`}>
                <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 hover:-translate-y-1 transition-transform border border-border">
                  <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-1">{role}</h3>
                      <h4 className="text-[#3D5A4C] font-bold">{place}</h4>
                    </div>
                    <span className="px-3 py-1 bg-[#B5872A]/10 text-[#B5872A] rounded-full text-sm font-bold whitespace-nowrap">
                      {period}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {description}
                  </p>
                  
                  {exp.image && (
                    <a href={exp.image} target="_blank" rel="noopener noreferrer" className="block mt-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={exp.image} 
                        alt={place} 
                        className="w-[120px] h-[80px] object-cover rounded-lg border border-border hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
