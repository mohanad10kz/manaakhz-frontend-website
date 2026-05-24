# TODO — manaakhz.com
> حدّث هذا الملف بعد كل مهمة منجزة. المهمة الأولى في القائمة هي التالية دائماً.

---

## 🔴 المرحلة 1 — الإعداد والبيانات الوهمية

- [ ] **1.1** إنشاء مشروع Next.js + إعداد التبعيات
  ```bash
  npx create-next-app@latest frontend --typescript --tailwind --app
  npm install next-intl lucide-react react-markdown yet-another-react-lightbox
  npx shadcn@latest init
  npx shadcn@latest add card button badge separator sheet navigation-menu
  ```

- [ ] **1.2** إعداد `next.config.ts` للـ Static Export + i18n routing
  - ملف: `frontend/next.config.ts`
  - ملف: `frontend/src/i18n/routing.ts`
  - ملف: `frontend/src/i18n/request.ts`

- [ ] **1.3** إنشاء ملفات الترجمة
  - ملف: `messages/ar.json`
  - ملف: `messages/en.json`

- [ ] **1.4** إنشاء `mock-data.ts` + `types.ts`
  - ملف: `frontend/src/lib/types.ts`
  - ملف: `frontend/src/lib/mock-data.ts`
  - ارجع لـ `_ai/MOCK_DATA.md` لشكل البيانات

- [ ] **1.5** بناء Layout المشترك (Header + Footer + Navbar + LanguageSwitcher)
  - المكونات في: `frontend/src/components/layout/`
  - ملف التوثيق: `docs/layout.md` ← أنشئه بعد الانتهاء

---

## 🟡 المرحلة 2 — الصفحات (بيانات وهمية)

- [ ] **2.1** الصفحة الرئيسية `app/[locale]/page.tsx`
  - مكونات: `HeroSection.tsx` + `SectionsPreview.tsx`
  - توثيق: `docs/home.md`

- [ ] **2.2** صفحة السيرة `app/[locale]/about/page.tsx`
  - مكونات: `BiographyCard.tsx`
  - توثيق: `docs/about.md`

- [ ] **2.3** صفحة التصاميم `app/[locale]/design/page.tsx` + `[slug]/page.tsx`
  - مكونات: `DesignGrid.tsx` + `DesignCard.tsx`
  - توثيق: `docs/design.md`

- [ ] **2.4** صفحة المدونة `app/[locale]/blog/page.tsx` + `[slug]/page.tsx`
  - مكونات: `PostList.tsx` + `PostCard.tsx`
  - توثيق: `docs/blog.md`

- [ ] **2.5** صفحة التواصل `app/[locale]/contact/page.tsx`
  - توثيق: `docs/contact.md`

---

## 🟢 المرحلة 3 — ربط الباك إند (Strapi)

- [ ] **3.1** إنشاء مشروع Strapi 5 + Content Types
  ```bash
  npx create-strapi-app@latest backend --quickstart
  ```
  Content Types: About, Design, Post, ContactInfo, SocialLink

- [ ] **3.2** إدخال البيانات الحقيقية في Strapi (نقل من mock)

- [ ] **3.3** إنشاء `strapi.ts` + إعداد API Token
  - ملف: `frontend/src/lib/strapi.ts`
  - متغيرات: `frontend/.env.local`

- [ ] **3.4** استبدال mock-data بـ Strapi في كل صفحة
  - home ← about ← design ← blog ← contact

---

## 🔵 المرحلة 4 — الصقل والنشر

- [ ] **4.1** RTL/LTR اختبار شامل
- [ ] **4.2** SEO — metadata + sitemap.xml + robots.txt
- [ ] **4.3** إعداد `.htaccess` للاستضافة
- [ ] **4.4** Lighthouse audit (هدف: > 90)
- [ ] **4.5** رفع `/out` على الاستضافة

---

## ✅ منجز
<!-- أنقل المهام هنا بعد إنجازها مع تاريخ الإنجاز -->
<!-- مثال: - [x] 1.1 إنشاء مشروع Next.js — ✅ 2026-05-24 -->
