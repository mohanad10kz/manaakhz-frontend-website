"use client";

import { Cpu, BookOpen, User } from "lucide-react";
import { Link } from "@/src/i18n/routing";

export function SectionsPreview() {
  const sections = [
    {
      title: "دوائر من تصميمي",
      description: "تصاميم دوائر إلكترونية متنوعة",
      href: "/design",
      icon: Cpu,
    },
    {
      title: "أفكاري ومذكراتي",
      description: "مقالات وأفكار شخصية",
      href: "/blog",
      icon: BookOpen,
    },
    {
      title: "السيرة الشخصية",
      description: "تعرّف عليّ أكثر",
      href: "/about",
      icon: User,
    }
  ];

  return (
    <section className="py-20 bg-[#EDE9E2]">
      <div className="container max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.href}
                className="bg-white rounded-lg p-8 flex flex-col items-start shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">{section.title}</h3>
                <p className="text-[#6B6B67] mb-6 line-clamp-2 h-14">{section.description}</p>
                <Link 
                  href={section.href}
                  className="mt-auto text-primary font-bold hover:underline inline-flex items-center gap-2"
                >
                  اكتشف المزيد
                  <span dir="ltr">&larr;</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
