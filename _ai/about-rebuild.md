# Prompt — إعادة بناء صفحة About بالبيانات الحقيقية

## التعليمات للـ AI

```
Read these files first:
1. _ai/CONTEXT.md
2. _ai/TODO.md
3. _ai/MOCK_DATA.md  ← pay attention to the full About type

Then rebuild the About page completely with real data.
```

---

## المهمة

### 1. حدّث `types.ts` — نوع About الجديد

```typescript
// frontend/src/lib/types.ts

export interface WorkExperience {
  period_ar: string
  period_en: string
  place_ar: string
  place_en: string
  role_ar: string
  role_en: string
  description_ar: string
  description_en: string
  image: string | null
}

export interface About {
  name_ar: string
  name_en: string
  title_ar: string
  title_en: string
  bio_ar: string
  bio_en: string
  birth_date: string
  birth_place_ar: string
  birth_place_en: string
  nationality_ar: string
  nationality_en: string
  marital_status_ar: string
  marital_status_en: string
  phone: string
  education_ar: string
  education_en: string
  memberships_ar: string[]
  memberships_en: string[]
  skills_ar: string[]
  skills_en: string[]
  experience: WorkExperience[]
  photo: string
  social_links: SocialLink[]
}
```

---

### 2. حدّث `mock-data.ts` — البيانات الحقيقية

انسخ البيانات من `_ai/MOCK_DATA.md` قسم About كاملاً.

---

### 3. أنشئ مكونات صفحة About

**هيكل الملفات:**
```
frontend/src/components/about/
  ProfileCard.tsx       ← الصورة + المعلومات الشخصية
  InfoGrid.tsx          ← التعليم، الجنسية، الحالة الاجتماعية
  SkillsTags.tsx        ← المهارات كـ pills
  MembershipsList.tsx   ← العضويات
  ExperienceTimeline.tsx ← المسيرة المهنية (الأهم)
```

---

### 4. تفاصيل كل مكون

#### `ProfileCard.tsx`
- صورة دائرية 200px مع border ذهبي 3px
- الاسم بالعربي والإنجليزي (حسب locale)
- المسمى الوظيفي بالأخضر `#3D5A4C`
- صف أيقونات: هاتف + تواصل اجتماعي
- استخدم `next/image` للصورة

#### `InfoGrid.tsx`
بطاقات صغيرة في grid 2×2 على desktop، 1 عمود على mobile:
```
[📅 تاريخ الميلاد]    [🌍 الجنسية]
[🎓 التعليم]          [👨‍👩‍👧‍👦 الحالة الاجتماعية]
```
كل بطاقة: أيقونة lucide-react + عنوان ذهبي + قيمة

#### `SkillsTags.tsx`
```tsx
// Pills مع ألوان متناوبة
const colors = ['gold-border', 'green-border']
skills.map((skill, i) => <Badge variant={i%2===0 ? 'gold' : 'green'}>{skill}</Badge>)
```

#### `MembershipsList.tsx`
قائمة بـ checkmark icon ذهبي قبل كل عنصر، خلفية خضراء فاتحة `#3D5A4C10`

#### `ExperienceTimeline.tsx` ← **المكون الرئيسي**

```
تصميم Timeline عمودي:

[خط ذهبي رأسي]
    │
    ●── [2015–الآن]  مركز طيبة للتصوير الطبي
    │    مهندس صيانة
    │    [وصف] [صورة مصغرة إن وجدت]
    │
    ●── [2012–2014]  شركة التقنية الجديدة
    │    مهندس صيانة وتركيب
    │    [وصف] [صورة]
    ...
```

- النقطة ● : دائرة ذهبية 14px
- الخط : border-right ذهبي للـ RTL
- كل entry: بطاقة بيضاء hover shadow
- الفترة الزمنية: badge ذهبي في أعلى يمين البطاقة
- الصورة: thumbnail 120×80 rounded، click يفتح في tab جديد

---

### 5. صفحة `app/[locale]/about/page.tsx`

```
Layout الصفحة (desktop):

┌─────────────────────────────────────────────┐
│  [ProfileCard]  │  [InfoGrid]               │
│   (40%)         │  [SkillsTags]             │
│                 │  [MembershipsList]  (60%) │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           [ExperienceTimeline]              │
│              (full width)                   │
└─────────────────────────────────────────────┘
```

Mobile: كل شيء stacked بالترتيب أعلاه.

---

### 6. الصور المطلوبة

ضع placeholders مؤقتة بهذه الأسماء تماماً:
```
public/images/manaa-profile.jpg    → https://placehold.co/400x500/3D5A4C/white?text=Profile
public/images/work/taibah.jpg      → https://placehold.co/300x200/B5872A/white?text=Taibah
public/images/work/aemc.jpg        → https://placehold.co/300x200/B5872A/white?text=AEMC
public/images/work/elahmar.jpg     → https://placehold.co/300x200/B5872A/white?text=Elahmar
public/images/work/china-trip.jpg  → https://placehold.co/300x200/B5872A/white?text=China
```
استخدم هذه الروابط مباشرة في mock-data حتى تتوفر الصور الحقيقية.

---

### 7. الترجمات — أضف لـ `messages/ar.json` و `messages/en.json`

```json
// ar.json
"about": {
  "pageTitle": "السيرة الشخصية",
  "bio": "نبذة عني",
  "personalInfo": "المعلومات الشخصية",
  "birthDate": "تاريخ الميلاد",
  "nationality": "الجنسية",
  "education": "المؤهل العلمي",
  "maritalStatus": "الوضع الاجتماعي",
  "skills": "المهارات",
  "memberships": "العضويات والمناصب",
  "experience": "المسيرة المهنية",
  "present": "حتى الآن"
}

// en.json
"about": {
  "pageTitle": "Biography",
  "bio": "About Me",
  "personalInfo": "Personal Information",
  "birthDate": "Date of Birth",
  "nationality": "Nationality",
  "education": "Education",
  "maritalStatus": "Marital Status",
  "skills": "Skills",
  "memberships": "Memberships & Positions",
  "experience": "Work Experience",
  "present": "Present"
}
```

---

### بعد الانتهاء

- حدّث `_ai/TODO.md` → mark 2.2 ✅ مع التاريخ
- حدّث `docs/about.md` بالمكونات التي أنشأتها
- Git commit: `feat(about): rebuild with real biography data and timeline`
