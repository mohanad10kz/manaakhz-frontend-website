# TODO — manaakhz.com

> حدّث هذا الملف بعد كل مهمة منجزة. المهمة الأولى في القائمة هي التالية دائماً.

---

## 🔴 المرحلة 1 — الإعداد والبيانات الوهمية

---

## 🟡 المرحلة 2 — الصفحات (بيانات وهمية)

---

## 🟢 المرحلة 3 — ربط الباك إند (Strapi)

- [x] **3.1** إنشاء مشروع Strapi 5 + Content Types — ✅ 2026-05-24

  ```bash
  npx create-strapi-app@latest backend --quickstart
  ```

  Content Types: About, Design, Post, ContactInfo, SocialLink

- [x] **3.2** رفع بيانات About الحقيقية عبر Seed Script — ✅ 2026-05-24 (نقل من mock)

- [x] **3.3** إنشاء `strapi.ts` + إعداد API Token — ✅ 2026-05-24
  - ملف: `frontend/lib/strapi.ts`
  - متغيرات: `frontend/.env.local`

- [x] **3.4** استبدال mock-data بـ Strapi في كل صفحة — ✅ 2026-05-24
  - home ← about ← design ← blog ← contact

- [x] **3.5** ربط CKEditor في Strapi وتحديث صفحة المقالات بالكامل — ✅ 2026-05-25
  - الباك إند: إعداد `plugins.ts` و schema للـ `Post` لاستخدام CKEditor.
  - الواجهة: إنشاء مكون `RichTextRenderer` مع تعقيم `dompurify` وتنسيق Tailwind Typography.

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

- [x] **1.1** تهيئة هيكل المشروع (Git, Folders, .gitignore, README) — ✅ 2026-05-24
- [x] **1.2** إعداد `next.config.ts` للـ Static Export + i18n routing — ✅ 2026-05-24
- [x] **1.3** إنشاء ملفات الترجمة (ar.json / en.json) — ✅ 2026-05-24
- [x] **1.4** إنشاء `mock-data.ts` + `types.ts` — ✅ 2026-05-24
- [x] **1.5** بناء Layout المشترك (Header + Footer + Navbar + LanguageSwitcher) — ✅ 2026-05-24
- [x] **2.1** الصفحة الرئيسية (`HeroSection`, `SectionsPreview`) — ✅ 2026-05-24
- [x] **2.2** صفحة السيرة (`BiographyCard`) — ✅ 2026-05-24
- [x] **2.3** صفحة التصاميم (`DesignGrid`, `DesignCard`) — ✅ 2026-05-24
- [x] **2.4** صفحة المدونة (`PostList`, `PostCard`) — ✅ 2026-05-24
- [x] **2.5** صفحة التواصل — ✅ 2026-05-24
