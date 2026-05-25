# توثيق: نظام التصاميم (Design) والفئات الديناميكية (Dynamic Categories)

> أُنشئت بتاريخ: 2026-05-24 | آخر تحديث: 2026-05-25

تم تطوير نظام التصاميم ليكون ديناميكياً بالكامل ومربوطاً بـ **Strapi Backend**، بما يشمل إدارة الصور، الفيديوهات المتعددة، والفئات الديناميكية ثنائية اللغة (العربية والانجليزية) بشكل اختياري.

---

## الملفات المُنشأة / المعدَّلة

### Backend (Strapi)
```
backend/src/api/category/content-types/category/schema.json  ← هيكل بيانات الفئة (Category)
backend/src/api/category/controllers/category.ts             ← متحكم الفئات
backend/src/api/category/routes/category.ts                  ← مسارات الفئات
backend/src/api/category/services/category.ts                ← خدمات الفئات
backend/src/api/design/content-types/design/schema.json      ← هيكل بيانات التصميم (معدّل لعلاقة Category)
```

### Frontend (Next.js)
```
frontend/lib/types.ts                           ← تحديث أنواع البيانات لدعم Category كعلاقة
frontend/lib/strapi.ts                          ← تحديث جلب البيانات ودعم populate للـ Category
frontend/lib/mock-data.ts                       ← تحديث البيانات الوهمية للمحاكاة المحلية
frontend/components/design/DesignGrid.tsx       ← شبكة عرض التصاميم مع الفلترة بالفئات الديناميكية
frontend/app/[locale]/design/page.tsx           ← جلب الفئات والتصاميم وتمريرها للمكون
frontend/app/[locale]/design/[slug]/page.tsx    ← عرض تفاصيل التصميم مع الفئة ثنائية اللغة
frontend/components/design/DesignGallery.tsx    ← معرض الصور والفيديوهات
```

---

## المكونات الرئيسية

| المكون | الملف | الوصف |
|--------|-------|-------|
| `DesignGrid` | `components/design/DesignGrid.tsx` | شبكة عرض التصاميم مع فلترة بالفئات الديناميكية المجلوبة من Strapi |
| `DesignGallery` | `components/design/DesignGallery.tsx` | معرض تفاعلي للصور وفيديوهات YouTube المتعددة مع تحميل وصور مصغرة |

---

## نظام الفئات الديناميكي (Dynamic Categories System)

تم استبدال نظام الفئات القديم (Enum المكوّد يدوياً) بنظام فئات ديناميكي مرن يدار بالكامل من Strapi.

### 1. في Backend (Strapi)
تم إنشاء نوع محتوى جديد باسم **`Category`** يحتوي على الحقول التالية:
- `slug` (Text): معرف فريد للرابط (مثال: `power-supplies`).
- `name_ar` (Text): اسم الفئة باللغة العربية (مثال: `مصادر الطاقة`).
- `name_en` (Text): اسم الفئة باللغة الانجليزية (مثال: `Power Supplies`).

تم تعديل حقل `category` في **`Design`** ليكون علاقة اختيارية (Relation) من نوع **Many-to-One** (كل تصميم يمكن أن ينتمي لفئة واحدة اختيارية، أو بدون فئة).

### 2. في Frontend (Next.js)

#### أ. أنواع البيانات (`lib/types.ts`):
```typescript
export type Category = {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
};

export type Design = {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  category: Category | null; // فئة اختيارية ديناميكية
  date: string;
  images: string[];
  videos: string[];
};
```

#### ب. جلب البيانات من Strapi (`lib/strapi.ts`):
- دالة `getCategories()`: لجلب قائمة جميع الفئات المتاحة لفلترة الواجهة بها.
- دوال `getAllDesigns()` و `getDesignBySlug()`: تم تحديثها لعمل `populate` لحقل الـ `category` تلقائياً.
- إضافة ميزة استخراج وحفظ بيانات العلاقة ديناميكياً:
```typescript
const extractCategory = (categoryData: any): Category | null => {
  if (!categoryData || !categoryData.documentId) return null;
  return {
    id: categoryData.id,
    slug: categoryData.slug,
    name_ar: categoryData.name_ar,
    name_en: categoryData.name_en,
  };
};
```

#### ج. الفلترة الديناميكية والعرض (`DesignGrid.tsx`):
- يقرأ الفئات ديناميكياً من Strapi ويعرضها كـ Tabs للفلترة.
- يعرض التبويب الافتراضي "الكل" (All) أو "الجميع" باللغة العربية والإنجليزية.
- يعرض اسم الفئة باللغة الحالية للمستخدم (`name_ar` أو `name_en`).
- في بطاقات التصاميم، إذا كان التصميم يحتوي على فئة، يتم عرض شارة (Badge) باسم الفئة مترجماً، وإذا لم يحتوي على فئة لا تظهر الشارة بسلاسة.

---

## DesignGallery (معرض الصور والفيديوهات)

**Client Component** — يُستخدم داخل صفحة `[slug]` لعرض الوسائط بشكل تفاعلي وممتاز.

### الخصائص (Props)

```typescript
interface DesignGalleryProps {
  images: string[];   // روابط الصور
  videos: string[];   // روابط YouTube (watch أو embed أو youtu.be)
  title: string;      // عنوان التصميم (للـ alt والتحميل)
  isRtl: boolean;     // لتحديد اتجاه النصوص
}
```

### الميزات

#### 1. معرض الصور
- **صور مصغّرة** أسفل الصورة الرئيسية — النقر عليها يغيّر الصورة الكبيرة.
- **أسهم تنقل** تظهر عند التحويم على الصورة الرئيسية (للأمام/للخلف).
- **عداد صور** (مثل: `2 / 5`) يظهر أسفل الصورة الرئيسية.
- **انتقال سلس** بين الصور مع تأثير تكبير خفيف عند التحويم.

#### 2. Dialog التكبير (Lightbox)
- النقر على الصورة الرئيسية يفتح **Dialog** بخلفية شفافة داكنة مذهلة.
- إمكانية التنقل بين الصور داخل الـ Dialog باستخدام الأسهم أو الصور المصغرة بالأسفل.
- **زر تحميل** الصورة النشطة مباشرة بجودة كاملة (`<a download>`).
- زر إغلاق عائم أو إمكانية الإغلاق عند النقر على الخلفية.

#### 3. فيديوهات YouTube المتعددة
- يعرض قسم الفيديوهات أسفل الصور بعنوان "فيديوهات التصميم" بطريقة منسقة وجميلة.
- يدعم **أكثر من فيديو** (مصفوفة ديناميكية) مضافة من Strapi.
- تحويل تلقائي لأي صيغة رابط يوتيوب يتم إدخالها:
  ```
  youtube.com/watch?v=ID  →  youtube.com/embed/ID
  youtu.be/ID             →  youtube.com/embed/ID
  youtube.com/shorts/ID   →  youtube.com/embed/ID
  ```
- نسبة عرض ثابتة `16:9` استجابة ممتازة للهواتف.

### السلوك عند غياب الوسائط
- تصاميم **بدون صور وبدون فيديوهات** → placeholder ذكي مع رسالة "لا توجد صور أو فيديوهات".
- تصاميم **بصورة واحدة فقط** → تُعرض الصورة بشكل ثابت وبدون تنقل أو صور مصغّرة.
- تصاميم **بفيديوهات فقط** → يُعرض قسم الفيديوهات مباشرة وبشكل متكامل دون حاجة لقسم الصور.

---

## صفحة التفاصيل `[slug]/page.tsx`

**Server Component** — يجلب البيانات ويمرّرها لـ `DesignGallery`.

### الهيكل والتخطيط
- يتم عرض اسم الفئة بشكل متكامل ثنائي اللغة في جزء تفاصيل التصميم (تحت العنوان مباشرة بجانب الأيقونة).
- **زر "تصاميم أخرى":**
  - في شاشات الموبايل: ينتقل ليكون بالأسفل تماماً تحت قسم الصور وقسم الفيديوهات ليوفر تجربة تصفح مثالية.
  - في شاشات الحاسوب: يكون في العمود الجانبي للنصوص بشكل ثابت وممتاز.

---

## مصدر البيانات وطريقة الإدخال في Strapi

### 1. إضافة الفئات (Categories)
من خلال لوحة تحكم Strapi:
1. اذهب إلى **Category**.
2. اضغط **Create new entry**.
3. أدخل:
   - `slug`: مثلاً `power-supplies`.
   - `name_ar`: مثلاً `دوائر التغذية الكهربائية`.
   - `name_en`: مثلاً `Power Supply Circuits`.
4. اضغط حفظ ونشر.

### 2. إضافة تصميم وربطه بالفئة والوسائط
1. اذهب إلى **Design**.
2. اضغط **Create new entry**.
3. املأ الحقول ثنائية اللغة (`title_ar`, `title_en`, `description_ar`, `description_en`).
4. **حقل Category:** اختر الفئة المناسبة من القائمة المنسدلة (اختياري).
5. **حقل Images:** ارفع الصور الخاصة بالتصميم.
6. **حقل Videos:** أدخل روابط الفيديوهات كـ **JSON Array** في حقل الـ JSON المخصص:
   ```json
   [
     "https://www.youtube.com/watch?v=XXXXX",
     "https://youtu.be/YYYYY"
   ]
   ```
7. اضغط حفظ ونشر.

---

## ملاحظات تقنية وإضافات المستقبل

- استخدام `setRequestLocale` بشكل كامل في صفحات dynamic routes لضمان التوافق التام مع Static Site Generation (SSG).
- فلترة وتخزين آمن لبيانات Strapi لتفادي أي خطأ حال حذف الفئة أو غيابها.
