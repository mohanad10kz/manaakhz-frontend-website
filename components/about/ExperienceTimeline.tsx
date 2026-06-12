"use client";

import { About } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Briefcase, ChevronRight, ChevronLeft } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { useState, useRef } from "react";
import { useGsapLazy } from "@/hooks/useGsapLazy";

interface ExperienceTimelineProps {
  about: About;
  locale: string;
}

function TimelineCarousel({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 lg:h-64 rounded-lg overflow-hidden border border-border shadow-sm bg-muted/50 flex items-center justify-center">
        <span className="text-muted-foreground">No image</span>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Main Image */}
      <div className="relative w-full h-48 lg:h-64 rounded-lg overflow-hidden border border-border shadow-sm sepia-[.3] hover:sepia-0 transition-all duration-500 group">
        <ExportedImage
          src={images[activeImage]}
          alt="Experience image"
          fill
          className="object-cover transition-opacity duration-300"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/80 rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/80 rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 h-16">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative flex-1 rounded border overflow-hidden transition-all ${
                activeImage === index
                  ? "border-primary opacity-100"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <ExportedImage src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ExperienceTimeline({ about, locale }: ExperienceTimelineProps) {
  const t = useTranslations("About");
  const isRtl = locale === "ar";
  const experience = about.experience || [];
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapLazy((gsap, ScrollTrigger) => {
    // Animate Header
    gsap.fromTo(".timeline-header",
      { opacity: 0, x: isRtl ? 35 : -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Animate Timeline Rows
    const rows = Array.from(containerRef.current?.querySelectorAll(".timeline-row") || []);
    rows.forEach((row: any) => {
      // Bullet pop in
      gsap.fromTo(row.querySelector(".timeline-bullet"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Left column Info (Slide from left)
      gsap.fromTo(row.querySelector(".timeline-info"),
        { opacity: 0, x: isRtl ? 40 : -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Right column Media (Slide from right)
      gsap.fromTo(row.querySelector(".timeline-media"),
        { opacity: 0, x: isRtl ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });
  }, containerRef);

  return (
    <section ref={containerRef} className="flex flex-col gap-stack-lg">
      <div className="timeline-header flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Briefcase className="w-5 h-5" />
        </div>
        <h2 className="font-arabic-headline text-2xl lg:text-3xl text-primary font-bold">
          {t("experience")}
        </h2>
      </div>

      <div className={`relative ${isRtl ? 'border-r-2 pr-10' : 'border-l-2 pl-10'} border-primary/20 space-y-16`}>
        {experience.map((exp, index) => {
          const period = isRtl ? exp.period_ar : exp.period_en;
          const place = isRtl ? exp.place_ar : exp.place_en;
          const role = isRtl ? exp.role_ar : exp.role_en;
          const description = isRtl ? exp.description_ar : exp.description_en;
          const images = exp.images || [];

          return (
            <div key={index} className="timeline-row relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Timeline Bullet */}
              <div 
                className={`timeline-bullet absolute top-1 w-4 h-4 rounded-full bg-card border-2 border-primary shadow-sm ${isRtl ? '-right-[41px]' : '-left-[41px]'}`}
              ></div>
              
              {/* Info */}
              <div className="timeline-info">
                <div className="mb-1">
                  <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded text-sm font-bold mb-2">
                    {period}
                  </span>
                </div>
                <h3 className="font-arabic-headline text-2xl text-primary font-bold mb-1">
                  {place}
                </h3>
                <p className="text-muted-foreground font-semibold text-lg mb-3">
                  {role}
                </p>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {description}
                </p>
              </div>

              {/* Carousel */}
              <div className="timeline-media w-full">
                <TimelineCarousel images={images} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
