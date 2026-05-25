# DONE — الصفحات والملفات المكتملة

> ⛔ هذا الملف يُقرأ قبل أي تعديل. كل ما هو مذكور هنا **محظور لمسه** إلا بإذن صريح من المستخدم.

---

## ⛔ محظور التعديل — About

### الملفات المقفلة

```
frontend/app/[locale]/about/page.tsx
frontend/components/about/ProfileCard.tsx
frontend/components/about/HeroBento.tsx
frontend/components/about/InfoGrid.tsx
frontend/components/about/SkillsTags.tsx
frontend/components/about/SkillsLanguagesGrid.tsx
frontend/components/about/MembershipsList.tsx
frontend/components/about/ExperienceTimeline.tsx
frontend/lib/types.ts        ← interface About و WorkExperience
backend/scripts/seed-about.mjs
```

### Strapi Content Types المكتملة

```
About          (Single Type)  ✅ — بيانات حقيقية مُدخلة
WorkExperience (Collection)   ✅ — 5 سجلات مُدخلة
SocialLink     (Collection)   ✅ — مُدخلة
ContactInfo    (Single Type)  ✅ — مُدخلة
```

### ما تم إنجازه

- صفحة About مبنية بالكامل بالعربي والإنجليزي
- ExperienceTimeline مع بطاقات لكل وظيفة
- ProfileCard + InfoGrid + SkillsTags + MembershipsList + HeroBento + SkillsLanguagesGrid.tsx
- مربوطة بـ Strapi — `strapi.ts → getAbout()`
- الترجمات موجودة في `messages/ar.json` و `messages/en.json`
- الصور فارغة عمداً — يُضيفها صاحب الموقع يدوياً

### الاستثناء الوحيد المسموح

> إذا كان التعديل في ملف مشترك (مثل `types.ts` أو `strapi.ts`)
> يجب **إضافة** فقط — لا حذف ولا تعديل في الأجزاء الخاصة بـ About.

---

## 🟡 قيد التعديل — الصفحات الأخرى

| الصفحة                 | الحالة                | المطلوب         |
| ---------------------- | --------------------- | --------------- |
| Home `/`               | منشأة — تحتاج تعديل   | انتظر التعليمات |
| Design `/design`       | منشأة — تحتاج تعديل   | انتظر التعليمات |
| Blog `/blog`           | منشأة — تحتاج تعديل   | انتظر التعليمات |
| Contact `/contact`     | منشأة — تحتاج تعديل   | انتظر التعليمات |
| Layout (Header/Footer) | منشأ — قد يحتاج تعديل | انتظر التعليمات |

---

## قاعدة العمل من الآن

```
قبل أي تعديل، اسأل نفسك:
هل الملف الذي سأعدّله مذكور في قسم ⛔ أعلاه؟
  نعم → توقف، لا تلمسه
  لا  → تابع
```
