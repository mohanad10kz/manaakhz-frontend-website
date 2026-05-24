# TODO — manaakhz.com
> حدّث هذا الملف بعد كل مهمة منجزة. المهمة الأولى في القائمة هي التالية دائماً.

---

## 🔴 المرحلة 1 — الإعداد والبيانات الوهمية


---

## 🟡 المرحلة 2 — الصفحات (بيانات وهمية)






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
