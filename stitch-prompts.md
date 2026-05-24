# Stitch Prompts — manaakhz.com
> استخدم كل prompt في Google Stitch لتصميم الصفحة المقابلة.
> أرسل الـ Design System أولاً في كل جلسة جديدة قبل أي prompt.

---

## ⚙️ Design System (أرسله أولاً دائماً)

```
Design system for manaakhz.com — a personal Arabic website.

Colors:
- Background: #F7F4EF (warm cream)
- Primary text: #1A1A18 (warm black)
- Accent / Gold: #B5872A (dark gold — Arabic heritage feel)
- Secondary: #3D5A4C (deep green)
- Surface: #FFFFFF
- Muted text: #6B6B67

Typography:
- Arabic headings & body: Cairo (Google Fonts)
- English headings: Playfair Display
- English body: Source Serif 4
- Base size: 16px | Line height: 1.7

Layout:
- Max content width: 1100px, centered
- Section padding: 80px vertical, 24px horizontal
- Border radius: 8px (cards), 4px (buttons)
- Card shadow: 0 2px 12px rgba(0,0,0,0.07)

Direction: RTL for Arabic (default), LTR for English
Language switcher visible in all pages (AR / EN toggle)
```

---

## 1️⃣ Layout — Header & Footer

```
Design a website header and footer for manaakhz.com (personal Arabic website).

HEADER:
- Right side: logo text "مناخز" in Cairo font, gold color #B5872A, large bold
- Center: horizontal navigation links — الرئيسية | السيرة الشخصية | دوائر من تصميمي | أفكاري ومذكراتي | اتصل بنا
- Left side: language switcher button showing "EN" (pill shape, outlined, small)
- Background: warm cream #F7F4EF
- Bottom border: 1px solid rgba(181,135,42,0.2) — subtle gold line
- Sticky on scroll, slight shadow appears on scroll
- Mobile: hamburger menu icon on left, logo on right

FOOTER:
- Dark background: #1A1A18
- Two columns:
  - Right: "مناخز" logo + short tagline "موقعي الشخصي" in muted text
  - Left: social icons row (Twitter, LinkedIn) in gold
- Bottom bar: "© 2026 مناخز — جميع الحقوق محفوظة" centered, small muted text
- Thin gold top border

Show desktop and mobile versions.
```

---

## 2️⃣ الصفحة الرئيسية — Home

```
Design the homepage for manaakhz.com — a personal Arabic website for an electronics engineer.

HERO SECTION (full viewport height):
- Background: warm cream #F7F4EF
- Large centered Arabic heading: "مناخز" in Cairo font, very bold, color #1A1A18
- Subtitle below: "موقعي الشخصي" smaller, muted color #6B6B67
- Decorative element: a subtle geometric circular pattern (inspired by circuit boards) in gold #B5872A, low opacity, behind the text
- Two CTA buttons below text:
  - Primary: "دوائر من تصميمي" — filled gold background, dark text
  - Secondary: "أفكاري ومذكراتي" — outlined, green #3D5A4C

SECTIONS PREVIEW (below hero, 3 cards in a row):
Each card has:
- Icon on top (circuit/blog/person icon)
- Arabic section title (bold)
- Short description text (2 lines, muted)
- "اكتشف المزيد ←" link in gold
Cards:
1. دوائر من تصميمي — تصاميم دوائر إلكترونية متنوعة
2. أفكاري ومذكراتي — مقالات وأفكار شخصية
3. السيرة الشخصية — تعرّف عليّ أكثر

Cards have white background, soft shadow, rounded 8px corners.
Background of this section: slightly darker cream #EDE9E2.

RTL layout. Show desktop and mobile.
```

---

## 3️⃣ صفحة السيرة الشخصية — About

```
Design the "About / السيرة الشخصية" page for manaakhz.com.

LAYOUT — two columns (desktop), stacked (mobile):

LEFT COLUMN (40%):
- Circular profile photo placeholder (200px diameter), gold border 3px
- Name below: "مناخز" bold large
- Title: "مهندس إلكترونيات ومصمم دوائر" in green #3D5A4C, medium
- Nationality & location: small muted text with flag emoji
- Social links row: Twitter, LinkedIn icons in gold

RIGHT COLUMN (60%):
- Section heading: "نبذة عني" with gold underline accent (4px wide, 40px long)
- Bio text paragraph (3–4 lines of Arabic placeholder text), good line height
- Divider line
- Skills section:
  - Heading: "المهارات" small caps gold
  - Skill tags as rounded pills: "تصميم دوائر", "Altium Designer", "KiCad", "برمجة مضمّنة", "Arduino", "PCB Layout"
  - Pills: gold border, gold text, cream background

Page background: #F7F4EF
RTL layout. Show desktop and mobile.
```

---

## 4️⃣ صفحة التصاميم — Design Grid

```
Design the "دوائر من تصميمي" (Circuit Designs) page for manaakhz.com.

PAGE HEADER:
- Page title: "دوائر من تصميمي" large bold, centered
- Subtitle: "تصاميم دوائر إلكترونية أعمل عليها" muted, centered
- Gold underline accent below title

FILTER BAR (below header):
- Horizontal pill buttons: الكل | طاقة | أردوينو | دوائر أساسية
- Active state: gold filled. Inactive: outlined, muted

MASONRY GRID (3 columns desktop, 2 tablet, 1 mobile):
Each design card:
- Image placeholder (varies in height for masonry effect — some tall, some short)
- Hover overlay: dark semi-transparent overlay slides up with:
  - Design title in white bold Arabic
  - Category badge (gold pill)
  - "عرض التفاصيل" button (outlined white)
- Card: white background, 8px radius, soft shadow

LIGHTBOX MODAL (show as overlay state):
- Dark backdrop
- Large image on left (60%)
- Details panel on right (40%): title, date, category badge, full description text, navigation arrows (prev/next)
- Close X button top right

RTL layout. Show grid page + lightbox state.
```

---

## 5️⃣ صفحة المدونة — Blog List & Post

```
Design the "أفكاري ومذكراتي" (Blog) page for manaakhz.com.

BLOG LIST PAGE:

Page header same style as design page.

POST CARDS (vertical list, not grid):
Each card is a horizontal row:
- Left: image thumbnail (160×120px) rounded 8px
- Right: content
  - Tags row: small gold pills (e.g. "إلكترونيات", "شخصي")
  - Post title: bold large Arabic
  - Excerpt: 2 lines muted text
  - Bottom row: date (small muted) + "اقرأ المزيد ←" in gold

Cards separated by subtle divider or gap.
Background alternates: white and #F7F4EF for visual rhythm.

---

SINGLE POST PAGE:

- Breadcrumb top: الرئيسية > أفكاري ومذكراتي > [عنوان المقال]
- Post title: very large bold, centered, with gold underline
- Meta row: date | tags (pills) | reading time — centered, muted small
- Featured image: full width, max height 400px, rounded 12px, shadow
- Article body: 720px max width centered, Cairo font, 18px, line-height 1.9
  Includes: headings (gold colored), paragraphs, occasional inline code style
- Bottom: "← مقالات أخرى" link in gold

RTL layout. Show list page and single post page.
```

---

## 6️⃣ صفحة التواصل — Contact

```
Design the "اتصل بنا" (Contact) page for manaakhz.com.

TWO COLUMNS layout (desktop), stacked (mobile):

LEFT COLUMN — Contact Info (40%):
- Section heading: "تواصل معي" bold large with gold underline
- Info rows with icons (gold icons):
  - 📧 hello@manaakhz.com
  - 📍 ليبيا
- Social links: Twitter + LinkedIn rounded icon buttons (gold border)
- Small decorative circuit-pattern illustration below, gold low opacity

RIGHT COLUMN — Contact Form (60%):
- White card, soft shadow, 16px padding, 8px radius
- Form fields (all RTL):
  - الاسم — full width text input
  - البريد الإلكتروني — full width email input
  - الموضوع — full width text input
  - الرسالة — textarea, 5 rows
- All inputs: cream background #F7F4EF, gold focus border, 8px radius
- Submit button: full width, gold background #B5872A, dark text, bold, 48px height
  Text: "إرسال الرسالة"
- Success state: green checkmark banner "تم الإرسال بنجاح! شكراً لتواصلك"

Page background: #F7F4EF
RTL layout. Show desktop and mobile.
```

---

## 💡 نصائح الاستخدام في Stitch

1. ابدأ كل محادثة بإرسال **Design System** أعلاه
2. أرسل prompt الصفحة المطلوبة
3. بعد الحصول على النتيجة، يمكنك طلب تعديلات مثل:
   - `"make the hero section taller with more whitespace"`
   - `"use a darker shade for card backgrounds"`
   - `"show the mobile version only"`
4. احفظ كل تصميم كـ screenshot أو export قبل الانتقال للصفحة التالية
