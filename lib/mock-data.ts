import { About, ContactInfo, Design, Post } from "./types";

export const mockAbout: About = {
  name: "مناع للإلكترونيات",
  title: "مهندس إلكترونيات ومصمم دوائر",
  bio_ar: "مهتم بتصميم الدوائر الإلكترونية والكتابة التقنية منذ سنوات...",
  bio_en: "Electronics engineer passionate about circuit design and technical writing...",
  birth_date: "1975-01-01",
  nationality: "ليبي",
  skills: ["تصميم دوائر إلكترونية", "برمجة مضمّنة", "Altium Designer", "KiCad"],
  social_links: [
    { platform: "linkedin", url: "https://linkedin.com/in/manaaelectronics", label: "LinkedIn" }
  ],
  photo: "https://placehold.co/800x600?text=Avatar"
};

export const mockDesigns: Design[] = [
  {
    id: 1, slug: "power-supply-5v",
    title_ar: "مصدر طاقة 5 فولت", title_en: "5V Power Supply",
    description_ar: "دائرة مصدر طاقة منظّمة بجهد 5 فولت...",
    description_en: "Regulated 5V power supply circuit...",
    category: "power", date: "2024-03-15",
    images: ["https://placehold.co/800x600?text=Design+1"]
  },
  {
    id: 2, slug: "arduino-shield",
    title_ar: "درع أردوينو مخصص", title_en: "Custom Arduino Shield",
    description_ar: "درع لوحة أردوينو لقياس درجة الحرارة والرطوبة...",
    description_en: "Arduino shield for temperature and humidity sensing...",
    category: "arduino", date: "2024-01-20",
    images: ["https://placehold.co/800x600?text=Design+2"]
  },
  {
    id: 3, slug: "555-timer-circuit",
    title_ar: "دائرة مؤقت 555", title_en: "555 Timer Circuit",
    description_ar: "دائرة كلاسيكية باستخدام IC 555 لتوليد نبضات...",
    description_en: "Classic 555 timer IC circuit for pulse generation...",
    category: "basic", date: "2023-11-10",
    images: ["https://placehold.co/800x600?text=Design+3"]
  }
];

export const mockPosts: Post[] = [
  {
    id: 1, slug: "why-i-love-electronics",
    title_ar: "لماذا أعشق الإلكترونيات", title_en: "Why I Love Electronics",
    content_ar: "منذ صغري وأنا مفتون بكيف تعمل الأجهزة...",
    content_en: "Since childhood, I've been fascinated by how devices work...",
    date: "2024-04-10", tags: "إلكترونيات, شخصي",
    images: []
  },
  {
    id: 2, slug: "altium-vs-kicad",
    title_ar: "Altium مقابل KiCad: تجربتي", title_en: "Altium vs KiCad: My Experience",
    content_ar: "بعد سنوات من استخدام كلا البرنامجين...",
    content_en: "After years of using both tools...",
    date: "2024-02-05", tags: "أدوات, PCB",
    images: []
  },
  {
    id: 3, slug: "my-first-pcb",
    title_ar: "أول لوحة PCB أصممها", title_en: "My First PCB Design",
    content_ar: "أتذكر حين رأيت أول لوحة طبعية صممتها...",
    content_en: "I remember seeing my first printed circuit board design...",
    date: "2023-09-18", tags: "PCB, ذكريات",
    images: ["https://placehold.co/800x600?text=PCB"]
  }
];

export const mockContactInfo: ContactInfo = {
  email: "hello@manaaelectronics.com",
  phone: "+218 91 000 0000",
  location_ar: "ليبيا",
  location_en: "Libya",
  social_links: [
    { platform: "linkedin", url: "https://linkedin.com/in/manaaelectronics", label: "LinkedIn" }
  ]
};

export function getDesignBySlug(slug: string): Design | undefined {
  return mockDesigns.find(d => d.slug === slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find(p => p.slug === slug);
}
