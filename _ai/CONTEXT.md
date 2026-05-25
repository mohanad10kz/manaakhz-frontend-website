# CONTEXT — manaakhz.com

> ⚡ اقرأ هذا الملف أولاً فقط. لا تقرأ غيره إلا عند الحاجة.

## المشروع

موقع شخصي — Next.js 16 + Strapi 5 + next-intl (ar/en) + Tailwind CSS v4 + shadcn/ui
Static Export → رفع `/out` على web hosting عادي

## الألوان والخطوط

```
bg: #F7F4EF  |  text: #1A1A18  |  gold: #B5872A  |  green: #3D5A4C
ar-font: Cairo  |  en-font: Playfair Display + Source Serif 4
```

## هيكل الصفحات

```
/ → home      /about → about      /design → design grid
/blog → blog  /contact → contact  (كل صفحة لها /en/ مقابل)
```

## هيكل المجلدات (المهم فقط)

```
frontend/app/[locale]/
  layout.tsx | page.tsx | about/ | design/[slug]/ | blog/[slug]/ | contact/
frontend/components/layout/ → Header Footer Navbar LanguageSwitcher MobileNav ThemeToggle
frontend/components/{home,about,design,blog}/
frontend/lib/strapi.ts  ← جلب البيانات
frontend/lib/mock-data.ts  ← البيانات الوهمية (المرحلة الأولى)
frontend/lib/types.ts
messages/ar.json | messages/en.json
```

## قاعدة مهمة: مرحلتا البيانات

- **الآن:** كل الصفحات تستخدم `mock-data.ts` — لا اتصال بـ Strapi
- **لاحقاً:** استبدال mock بـ `strapi.ts` — الواجهة لا تتغير

## ملفات الـ AI

```
_ai/CONTEXT.md     ← هذا الملف (اقرأه دائماً أولاً)
_ai/TODO.md        ← المهام (حدّثه بعد كل خطوة)
_ai/MOCK_DATA.md   ← شكل البيانات الوهمية (ارجع إليه عند الحاجة)
```

## ملفات التوثيق (اقرأ فقط عند العمل على الصفحة المقابلة)

```
docs/layout.md     docs/home.md      docs/about.md
docs/design.md     docs/blog.md      docs/contact.md
```

## التعليمات

1. اقرأ CONTEXT.md + TODO.md + **DONE.md** قبل أي عمل
2. لا تلمس أي ملف مذكور في DONE.md تحت قسم ⛔
3. نفّذ المهمة الأولى في TODO فقط
4. بعد الانتهاء: حدّث TODO.md + أنشئ/حدّث ملف docs المناسب
5. لا تقرأ ملفات docs إلا للصفحة التي تعمل عليها الآن
