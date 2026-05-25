# MOCK_DATA — شكل البيانات الوهمية

> ارجع لهذا الملف فقط عند إنشاء `mock-data.ts`
> كل الواجهات موجودة في `types.ts` — البيانات هنا نماذج فقط

---

## About
```typescript
export const mockAbout: About = {
  name_ar: "مناع خير حسن زيد",
  name_en: "Manaa Khair Hassan Zaid",
  title_ar: "مهندس إلكترونيات ومصمم دوائر",
  title_en: "Electronics Engineer & Circuit Designer",
  bio_ar: "مهندس إلكترونيات واتصالات خريج جامعة قاريونس عام 1994، أقيم في ليبيا منذ عام 1971. أعمل في مجال صيانة وتصميم الدوائر والأجهزة الإلكترونية منذ أكثر من ثلاثين عاماً، وأشغل حالياً منصب مهندس صيانة في مركز طيبة للتصوير الطبي بمدينة البيضاء.",
  bio_en: "Electronics and Communications Engineer, graduated from Qaryounis University in 1994. Residing in Libya since 1971. Over thirty years of experience in electronics maintenance and circuit design, currently working as a maintenance engineer at Taibah Medical Imaging Center in Al-Bayda.",
  birth_date: "1970-09-02",
  birth_place_ar: "لبنان - صور",
  birth_place_en: "Lebanon - Tyre",
  nationality_ar: "فلسطيني - مقيم في ليبيا",
  nationality_en: "Palestinian - Resident in Libya",
  marital_status_ar: "متزوج وأب لخمسة أطفال",
  marital_status_en: "Married with five children",
  phone: "+218 92 533 7531",
  education_ar: "بكالوريوس هندسة كهربائية وإلكترونية — جامعة قاريونس، كلية الهندسة، 1994",
  education_en: "B.Sc. in Electrical & Electronics Engineering — Qaryounis University, Faculty of Engineering, 1994",
  memberships_ar: [
    "عضو في نقابة المهندسين",
    "عضو في جمعية المخترعين الليبيين",
    "رئيس الجمعية العلمية بكلية الهندسة الإلكترونية — جامعة قاريونس (1992–1994)"
  ],
  memberships_en: [
    "Member of the Engineers Syndicate",
    "Member of the Libyan Inventors Society",
    "President of the Scientific Society, Faculty of Electronics Engineering — Qaryounis University (1992–1994)"
  ],
  skills_ar: ["تصميم دوائر إلكترونية", "صيانة أجهزة طبية", "برمجة MicroC", "برمجة Visual Basic", "منظومات مراقبة CCTV", "أجهزة إنذار", "تصميم مواقع إنترنت"],
  skills_en: ["Electronic Circuit Design", "Medical Equipment Maintenance", "MicroC Programming", "Visual Basic Programming", "CCTV Surveillance Systems", "Alarm Systems", "Web Design"],
  experience: [
    {
      period_ar: "2015 – حتى الآن",
      period_en: "2015 – Present",
      place_ar: "مركز طيبة للتصوير الطبي — البيضاء",
      place_en: "Taibah Medical Imaging Center — Al-Bayda",
      role_ar: "مهندس صيانة",
      role_en: "Maintenance Engineer",
      description_ar: "مركز متخصص في التصوير الطبي بكافة أنواعه: رنين مغناطيسي، أشعة مقطعية، أشعة إكس، ماموغرافي، بانوراما.",
      description_en: "Specialized center for all types of medical imaging: MRI, CT scan, X-ray, mammography, panorama.",
      image: "/images/work/taibah.jpg"
    },
    {
      period_ar: "2012 – 2014",
      period_en: "2012 – 2014",
      place_ar: "شركة التقنية الجديدة للإلكترونيات — بنغازي",
      place_en: "New Technology Electronics Company — Benghazi",
      role_ar: "مهندس صيانة وتركيب",
      role_en: "Installation & Maintenance Engineer",
      description_ar: "شركة متخصصة في بيع وتركيب الأجهزة الإلكترونية والكهربية: كاميرات مراقبة، أجهزة إنذار، شاشات عرض كبيرة. سافرت للصين مرتين لشراء بضاعة للشركة.",
      description_en: "Specialized in selling and installing electronics: surveillance cameras, alarm systems, large display screens. Traveled to China twice for procurement.",
      image: "/images/work/china-trip.jpg"
    },
    {
      period_ar: "2009 – 2012",
      period_en: "2009 – 2012",
      place_ar: "شركة المهندسون العرب لصيانة الأجهزة الطبية — بنغازي",
      place_en: "Arab Engineers Medical Equipment Co. — Benghazi",
      role_ar: "رئيس قسم التطوير والتصنيع",
      role_en: "Head of R&D Department",
      description_ar: "رأست قسم تطوير وتصنيع الأجهزة الطبية. عملنا على تصميم: جهاز قياس السكر، جهاز رسم القلب، ماكينة CNC، وجهاز قياس درجة الحرارة والرطوبة.",
      description_en: "Led the medical device R&D department. Worked on designing: glucometer, ECG machine, CNC machine, and temperature/humidity controller.",
      image: "/images/work/aemc.jpg"
    },
    {
      period_ar: "2003 – 2009",
      period_en: "2003 – 2009",
      place_ar: "مركز الأحمر لصيانة الأجهزة الإلكترونية — بنغازي",
      place_en: "Al-Ahmar Electronics Maintenance Center — Benghazi",
      role_ar: "مهندس متخصص",
      role_en: "Specialist Engineer",
      description_ar: "أول مركز في ليبيا لصيانة الأجهزة الإلكترونية وتوفير قطع الغيار الأصلية. وكيل معتمد لمكبرات الصوت AHUJA الهندية. عملت في: منظومات المراقبة المرئية، أنظمة التحكم، أجهزة الإنذار، الأجهزة الطبية.",
      description_en: "First electronics maintenance center in Libya with original spare parts. Authorized agent for Indian AHUJA amplifiers. Specialized in: CCTV systems, control systems, alarm devices, and medical equipment.",
      image: "/images/work/elahmar.jpg"
    },
    {
      period_ar: "1995 – 2002",
      period_en: "1995 – 2002",
      place_ar: "مركز قاريونس لصيانة الأجهزة الإلكترونية — بنغازي",
      place_en: "Qaryounis Electronics Maintenance Center — Benghazi",
      role_ar: "مهندس صيانة",
      role_en: "Maintenance Engineer",
      description_ar: "أول مركز عملت به بعد التخرج مباشرة، متخصص في صيانة الأجهزة الإلكترونية.",
      description_en: "First workplace after graduation, specialized in electronics maintenance.",
      image: null
    }
  ],
  photo: "/images/manaa-profile.jpg",
  social_links: [
    { platform: "twitter", url: "https://twitter.com/manaakhz", label: "Twitter" },
    { platform: "linkedin", url: "https://linkedin.com/in/manaakhz", label: "LinkedIn" }
  ]
}
```

## Design (×3 عينات)
```typescript
export const mockDesigns: Design[] = [
  {
    id: 1, slug: "power-supply-5v",
    title_ar: "مصدر طاقة 5 فولت", title_en: "5V Power Supply",
    description_ar: "دائرة مصدر طاقة منظّمة بجهد 5 فولت...",
    description_en: "Regulated 5V power supply circuit...",
    category: "power", date: "2024-03-15",
    images: ["/images/mock-design-1.jpg"]
  },
  {
    id: 2, slug: "arduino-shield",
    title_ar: "درع أردوينو مخصص", title_en: "Custom Arduino Shield",
    description_ar: "درع لوحة أردوينو لقياس درجة الحرارة والرطوبة...",
    description_en: "Arduino shield for temperature and humidity sensing...",
    category: "arduino", date: "2024-01-20",
    images: ["/images/mock-design-2.jpg"]
  },
  {
    id: 3, slug: "555-timer-circuit",
    title_ar: "دائرة مؤقت 555", title_en: "555 Timer Circuit",
    description_ar: "دائرة كلاسيكية باستخدام IC 555 لتوليد نبضات...",
    description_en: "Classic 555 timer IC circuit for pulse generation...",
    category: "basic", date: "2023-11-10",
    images: ["/images/mock-design-3.jpg"]
  }
]
```

## Post (×3 عينات)
```typescript
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
    images: ["/images/mock-pcb.jpg"]
  }
]
```

## ContactInfo
```typescript
export const mockContactInfo: ContactInfo = {
  email: "hello@manaakhz.com",
  phone: "+218 91 000 0000",
  location_ar: "ليبيا",
  location_en: "Libya",
  social_links: [
    { platform: "twitter", url: "https://twitter.com/manaakhz", label: "Twitter" },
    { platform: "linkedin", url: "https://linkedin.com/in/manaakhz", label: "LinkedIn" }
  ]
}
```

---

## ملاحظة للـ AI
- الصور المستخدمة في mock هي placeholder — استخدم `https://placehold.co/800x600`
- عند الانتقال لـ Strapi، نفس الـ types تُستخدم — فقط مصدر البيانات يتغير
- دالة `getDesignBySlug(slug)` تستخدم `mockDesigns.find(d => d.slug === slug)`
