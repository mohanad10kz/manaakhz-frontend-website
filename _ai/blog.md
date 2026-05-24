<!DOCTYPE html><html dir="rtl" lang="ar" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>أفكاري ومذكراتي - المهندس الإلكتروني</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&amp;family=Playfair+Display:wght@600;700&amp;family=Source+Serif+4:wght@400;600&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-container": "#1c1c1a",
                        "on-primary-fixed-variant": "#474744",
                        "secondary-fixed": "#c9ead8",
                        "tertiary-fixed-dim": "#cbc5c6",
                        "on-primary-fixed": "#1c1c1a",
                        "on-surface-variant": "#474741",
                        "on-primary": "#ffffff",
                        "secondary-container": "#c9ead8",
                        "on-secondary": "#ffffff",
                        "inverse-primary": "#c9c6c3",
                        "primary-fixed-dim": "#c9c6c3",
                        "on-secondary-fixed-variant": "#304d3f",
                        "surface-container-highest": "#e5e2e1",
                        "secondary-fixed-dim": "#aecebc",
                        "background": "#fdf8f7",
                        "on-surface": "#1c1b1b",
                        "surface-tint": "#5f5e5c",
                        "surface-bright": "#fdf8f7",
                        "inverse-surface": "#313030",
                        "on-tertiary-fixed": "#1d1b1c",
                        "surface-container": "#f1edec",
                        "primary": "#000000",
                        "on-error": "#ffffff",
                        "surface-variant": "#e5e2e1",
                        "outline-variant": "#c8c7bf",
                        "on-tertiary-container": "#878384",
                        "surface": "#fdf8f7",
                        "outline": "#777771",
                        "on-secondary-fixed": "#032015",
                        "error-container": "#ffdad6",
                        "inverse-on-surface": "#f4f0ef",
                        "on-primary-container": "#858481",
                        "on-error-container": "#93000a",
                        "on-secondary-container": "#4d6b5c",
                        "primary-fixed": "#e5e2de",
                        "surface-container-low": "#f7f3f2",
                        "on-background": "#1c1b1b",
                        "surface-container-high": "#ebe7e6",
                        "on-tertiary-fixed-variant": "#494647",
                        "error": "#ba1a1a",
                        "surface-container-lowest": "#ffffff",
                        "tertiary": "#000000",
                        "on-tertiary": "#ffffff",
                        "tertiary-fixed": "#e7e1e2",
                        "tertiary-container": "#1d1b1c",
                        "surface-dim": "#ddd9d8",
                        "secondary": "#476556",
                        "brand-gold": "#B5872A",
                        "brand-muted": "#6B6B67",
                        "brand-bg-alt": "#F7F4EF"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "section-padding": "80px",
                        "stack-md": "16px",
                        "max-width": "1100px",
                        "margin-mobile": "16px",
                        "stack-lg": "32px",
                        "stack-sm": "8px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-md": ["Playfair Display"],
                        "body-md": ["Source Serif 4"],
                        "headline-md-mobile": ["Playfair Display"],
                        "body-lg": ["Source Serif 4"],
                        "label-sm": ["Source Serif 4"],
                        "display-lg": ["Playfair Display"],
                        "display-lg-mobile": ["Playfair Display"],
                        "arabic-headline": ["Cairo"],
                        "arabic-body": ["Cairo"]
                    },
                    "fontSize": {
                        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "1.7", "fontWeight": "400" }],
                        "headline-md-mobile": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "1.7", "fontWeight": "400" }],
                        "label-sm": ["14px", { "lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }],
                        "arabic-headline": ["30px", { "lineHeight": "1.5", "fontWeight": "700" }],
                        "arabic-body": ["18px", { "lineHeight": "1.8", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-surface text-on-surface font-arabic-body antialiased min-h-screen flex flex-col">
<!-- TopNavBar -->
<header class="bg-surface dark:bg-surface-dim font-arabic-headline text-arabic-headline docked full-width top-0 border-b border-outline-variant dark:border-outline flat no shadows sticky z-50">
<nav class="flex flex-row-reverse justify-between items-center max-w-[1100px] mx-auto px-margin-mobile md:px-gutter w-full h-20">
<div class="font-arabic-headline text-arabic-headline text-primary dark:text-on-primary-fixed font-bold tracking-tight">
                مناع للالكترونات</div>
<div class="hidden md:flex flex-row-reverse items-center gap-gutter">
<a class="text-on-surface-variant dark:text-on-surface-variant font-arabic-body text-arabic-body hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">الرئيسية</a>
<a class="text-on-surface-variant dark:text-on-surface-variant font-arabic-body text-arabic-body hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">السيرة الشخصية</a>
<a class="text-on-surface-variant dark:text-on-surface-variant font-arabic-body text-arabic-body hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">دوتئر من تصميمي</a>
<a class="text-primary dark:text-on-primary-fixed border-b-2 border-primary dark:border-on-primary-fixed pb-1 hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">افكاري ومذكراتي</a>
</div>
<div class="flex items-center">
<button class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary transition-colors">
                    EN
                </button>
</div>
</nav>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-gutter py-section-padding">
<!-- Page Header -->
<div class="text-center mb-section-padding">
<h1 class="font-arabic-headline text-[48px] font-bold text-primary mb-stack-sm relative inline-block">
                أفكاري ومذكراتي
                <div class="absolute -bottom-2 left-0 right-0 h-1 bg-brand-gold w-1/2 mx-auto"></div>
</h1>
<p class="font-arabic-body text-arabic-body text-brand-muted mt-stack-md">مقالات وأفكار في التكنولوجيا والحياة</p>
</div>
<!-- Blog List -->
<div class="flex flex-col gap-stack-lg">
<!-- Post 1 -->
<article class="bg-surface border border-outline-variant rounded-xl p-stack-md md:p-gutter flex flex-col md:flex-row gap-gutter transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-bg-alt group">

<div class="flex flex-col justify-center">
<div class="flex items-center gap-stack-sm mb-2">
<span class="font-label-sm text-label-sm text-brand-muted">١٥ مايو ٢٠٢٤</span>
<span class="w-1 h-1 rounded-full bg-brand-gold"></span>
<div class="flex gap-2">
<span class="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded text-xs font-arabic-body">إلكترونيات</span>
<span class="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded text-xs font-arabic-body">تقنية</span>
</div>
</div>
<h2 class="font-arabic-headline text-[24px] font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
<a class="focus:outline-none" href="#">مستقبل الدوائر المطبوعة في عصر الذكاء الاصطناعي</a>
</h2>
<p class="font-arabic-body text-body-md text-on-surface-variant line-clamp-2">
                        كيف يغير الذكاء الاصطناعي طريقة تصميمنا وتصنيعنا للدوائر الإلكترونية المعقدة...
                    </p>
</div>
</article>
<!-- Post 2 -->
<article class="bg-brand-bg-alt border border-outline-variant rounded-xl p-stack-md md:p-gutter flex flex-col md:flex-row gap-gutter transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface group">

<div class="flex flex-col justify-center">
<div class="flex items-center gap-stack-sm mb-2">
<span class="font-label-sm text-label-sm text-brand-muted">١٠ مايو ٢٠٢٤</span>
<span class="w-1 h-1 rounded-full bg-brand-gold"></span>
<div class="flex gap-2">
<span class="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded text-xs font-arabic-body">شخصي</span>
<span class="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded text-xs font-arabic-body">هندسة</span>
</div>
</div>
<h2 class="font-arabic-headline text-[24px] font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
<a class="focus:outline-none" href="#">فلسفة التصميم الهندسي: بين الجمال والوظيفة</a>
</h2>
<p class="font-arabic-body text-body-md text-on-surface-variant line-clamp-2">
                        تأملات في التوازن المطلوب بين الأداء التقني والجمال البصري في المشاريع الهندسية...
                    </p>
</div>
</article>
<!-- Post 3 -->
<article class="bg-surface border border-outline-variant rounded-xl p-stack-md md:p-gutter flex flex-col md:flex-row gap-gutter transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-bg-alt group">

<div class="flex flex-col justify-center">
<div class="flex items-center gap-stack-sm mb-2">
<span class="font-label-sm text-label-sm text-brand-muted">٥ مايو ٢٠٢٤</span>
<span class="w-1 h-1 rounded-full bg-brand-gold"></span>
<div class="flex gap-2">
<span class="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded text-xs font-arabic-body">شخصي</span>
</div>
</div>
<h2 class="font-arabic-headline text-[24px] font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
<a class="focus:outline-none" href="#">مذكرات مهندس: رحلتي مع تصميم الدوائر</a>
</h2>
<p class="font-arabic-body text-body-md text-on-surface-variant line-clamp-2">
                        مجموعة من الدروس المستفادة من سنوات العمل في تصميم وتطوير الأنظمة المدمجة...
                    </p>
</div>
</article>
</div>
<!-- Pagination (Decorative) -->
<div class="mt-section-padding flex justify-center items-center gap-4">
<button class="text-brand-gold font-arabic-body border-b border-transparent hover:border-brand-gold transition-colors px-2 py-1 flex items-center gap-2">
<span class="material-symbols-outlined text-sm">arrow_forward</span>
                السابق
            </button>
<span class="text-on-surface font-arabic-headline font-bold">١</span>
<span class="text-brand-muted font-arabic-headline">٢</span>
<span class="text-brand-muted font-arabic-headline">٣</span>
<button class="text-brand-gold font-arabic-body border-b border-transparent hover:border-brand-gold transition-colors px-2 py-1 flex items-center gap-2">
                التالي
                <span class="material-symbols-outlined text-sm">arrow_back</span>
</button>
</div>
</main>
<!-- Footer -->
<footer class="bg-surface-container dark:bg-surface-container-high border-t border-outline-variant dark:border-outline flat no shadows mt-auto">
<div class="flex flex-col md:flex-row-reverse justify-between items-center max-w-[1100px] mx-auto py-stack-lg px-margin-mobile w-full">
<div class="font-arabic-headline text-arabic-headline text-primary mb-4 md:mb-0">
                المهندس الإلكتروني
            </div>
<div class="flex gap-gutter mb-4 md:mb-0">
<a class="text-on-surface-variant dark:text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary dark:hover:text-on-primary-fixed underline decoration-secondary Transition-opacity duration-300 hover:opacity-80" href="#">تويتر</a>
<a class="text-on-surface-variant dark:text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary dark:hover:text-on-primary-fixed underline decoration-secondary Transition-opacity duration-300 hover:opacity-80" href="#">لينكدإن</a>
<a class="text-on-surface-variant dark:text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary dark:hover:text-on-primary-fixed underline decoration-secondary Transition-opacity duration-300 hover:opacity-80" href="#">البريد</a>
</div>
<div class="text-on-surface dark:text-on-surface-variant font-arabic-body text-arabic-body text-sm text-center md:text-right">
                © ٢٠٢٤ جميع الحقوق محفوظة لمهندس الإلكترونيات
            </div>
</div>
</footer>

</body></html>
