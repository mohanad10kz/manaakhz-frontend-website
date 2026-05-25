import { About, ContactInfo, Design, Post } from "./types";

export const mockAbout: About = {
  name_ar: "مناع للإلكترونيات",
  name_en: "Manaa Electronics",
  title_ar: "مهندس إلكترونيات ومصمم دوائر",
  title_en: "Electronics Engineer & Circuit Designer",
  bio_ar: "مهتم بتصميم الدوائر الإلكترونية والكتابة التقنية منذ سنوات...",
  bio_en: "Electronics engineer passionate about circuit design and technical writing...",
  birth_date: "1975-01-01",
  birth_place_ar: "طرابلس",
  birth_place_en: "Tripoli",
  nationality_ar: "ليبي",
  nationality_en: "Libyan",
  marital_status_ar: "متزوج",
  marital_status_en: "Married",
  phone: "+218 91 000 0000",
  education_ar: "بكالوريوس هندسة إلكترونية",
  education_en: "BSc in Electronic Engineering",
  memberships_ar: ["نقابة المهن الهندسية", "جمعية المهندسين"],
  memberships_en: ["Engineering Syndicate", "Engineers Society"],
  skills_ar: ["تصميم دوائر إلكترونية", "برمجة مضمّنة", "Altium Designer", "KiCad"],
  skills_en: ["Electronic Circuit Design", "Embedded Programming", "Altium Designer", "KiCad"],
  languages: [
    { name_ar: "العربية", name_en: "Arabic", level_ar: "اللغة الأم", level_en: "Native", percentage: 100 },
    { name_ar: "الإنجليزية", name_en: "English", level_ar: "جيد", level_en: "Good", percentage: 65 }
  ],
  experience: [
    {
      period_ar: "2015–الآن",
      period_en: "2015–Present",
      place_ar: "مركز طيبة للتصوير الطبي",
      place_en: "Taibah Medical Imaging Center",
      role_ar: "مهندس صيانة",
      role_en: "Maintenance Engineer",
      description_ar: "صيانة أجهزة التصوير الطبي المتقدمة",
      description_en: "Maintenance of advanced medical imaging equipment",
      images: ["https://placehold.co/300x200/B5872A/white?text=Taibah"]
    },
    {
      period_ar: "2012–2014",
      period_en: "2012–2014",
      place_ar: "شركة التقنية الجديدة",
      place_en: "New Tech Company",
      role_ar: "مهندس صيانة وتركيب",
      role_en: "Installation & Maintenance Engineer",
      description_ar: "تركيب وصيانة أنظمة التحكم",
      description_en: "Installation and maintenance of control systems",
      images: ["https://placehold.co/300x200/B5872A/white?text=AEMC"]
    }
  ],
  social_links: [
    { platform: "linkedin", url: "https://linkedin.com/in/manaaelectronics", label: "LinkedIn" }
  ],
  photo: "https://placehold.co/400x500/3D5A4C/white?text=Profile"
};

export const mockDesigns: Design[] = [
  {
    id: 1, slug: "power-supply-5v",
    title_ar: "مصدر طاقة 5 فولت", title_en: "5V Power Supply",
    description_ar: "دائرة مصدر طاقة منظّمة بجهد 5 فولت...",
    description_en: "Regulated 5V power supply circuit...",
    category: { id: 1, slug: "power", name_ar: "طاقة", name_en: "Power" },
    date: "2024-03-15",
    images: ["https://placehold.co/800x600?text=Design+1"],
    videos: []
  },
  {
    id: 2, slug: "arduino-shield",
    title_ar: "درع أردوينو مخصص", title_en: "Custom Arduino Shield",
    description_ar: "درع لوحة أردوينو لقياس درجة الحرارة والرطوبة...",
    description_en: "Arduino shield for temperature and humidity sensing...",
    category: { id: 2, slug: "arduino", name_ar: "أردوينو", name_en: "Arduino" },
    date: "2024-01-20",
    images: ["https://placehold.co/800x600?text=Design+2"],
    videos: []
  },
  {
    id: 3, slug: "555-timer-circuit",
    title_ar: "دائرة مؤقت 555", title_en: "555 Timer Circuit",
    description_ar: "دائرة كلاسيكية باستخدام IC 555 لتوليد نبضات...",
    description_en: "Classic 555 timer IC circuit for pulse generation...",
    category: { id: 3, slug: "basic", name_ar: "دوائر أساسية", name_en: "Basic Circuits" },
    date: "2023-11-10",
    images: ["https://placehold.co/800x600?text=Design+3"],
    videos: []
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
