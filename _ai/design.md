<!DOCTYPE html><html dir="rtl" lang="ar"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>دوائر من تصميمي - مناخز</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&amp;family=Playfair+Display:wght@600;700&amp;family=Source+Serif+4:wght@400;600&amp;display=swap" rel="stylesheet">
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
    </style>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "outline-variant": "#c8c7bf",
                        "primary-container": "#1c1c1a",
                        "secondary-container": "#c9ead8",
                        "error": "#ba1a1a",
                        "on-secondary-fixed": "#032015",
                        "on-surface": "#1c1b1b",
                        "tertiary-fixed-dim": "#cbc5c6",
                        "on-surface-variant": "#474741",
                        "on-primary-container": "#858481",
                        "surface": "#fdf8f7",
                        "primary-fixed-dim": "#c9c6c3",
                        "primary": "#000000",
                        "on-tertiary-container": "#878384",
                        "surface-tint": "#5f5e5c",
                        "surface-container-highest": "#e5e2e1",
                        "on-secondary-container": "#4d6b5c",
                        "background": "#fdf8f7",
                        "tertiary-fixed": "#e7e1e2",
                        "on-error-container": "#93000a",
                        "surface-container-low": "#f7f3f2",
                        "tertiary-container": "#1d1b1c",
                        "surface-container-lowest": "#ffffff",
                        "on-primary-fixed-variant": "#474744",
                        "on-secondary": "#ffffff",
                        "surface-container-high": "#ebe7e6",
                        "tertiary": "#000000",
                        "surface-bright": "#fdf8f7",
                        "on-background": "#1c1b1b",
                        "inverse-surface": "#313030",
                        "surface-container": "#f1edec",
                        "on-primary": "#ffffff",
                        "secondary-fixed-dim": "#aecebc",
                        "on-tertiary": "#ffffff",
                        "primary-fixed": "#e5e2de",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#1c1c1a",
                        "on-tertiary-fixed-variant": "#494647",
                        "on-error": "#ffffff",
                        "outline": "#777771",
                        "inverse-primary": "#c9c6c3",
                        "secondary": "#476556",
                        "on-secondary-fixed-variant": "#304d3f",
                        "surface-variant": "#e5e2e1",
                        "surface-dim": "#ddd9d8",
                        "inverse-on-surface": "#f4f0ef",
                        "secondary-fixed": "#c9ead8",
                        "on-tertiary-fixed": "#1d1b1c"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "max-width": "1100px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "stack-sm": "8px",
                        "stack-lg": "32px",
                        "section-padding": "80px",
                        "stack-md": "16px"
                    },
                    "fontFamily": {
                        "display-lg-mobile": ["Playfair Display"],
                        "display-lg": ["Playfair Display"],
                        "headline-md-mobile": ["Playfair Display"],
                        "body-lg": ["Source Serif 4"],
                        "arabic-headline": ["Cairo"],
                        "body-md": ["Source Serif 4"],
                        "arabic-body": ["Cairo"],
                        "label-sm": ["Source Serif 4"],
                        "headline-md": ["Playfair Display"]
                    },
                    "fontSize": {
                        "display-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }],
                        "display-lg": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-md-mobile": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "1.7", "fontWeight": "400" }],
                        "arabic-headline": ["30px", { "lineHeight": "1.5", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "1.7", "fontWeight": "400" }],
                        "arabic-body": ["18px", { "lineHeight": "1.8", "fontWeight": "400" }],
                        "label-sm": ["14px", { "lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col font-arabic-body selection:bg-secondary-container selection:text-on-secondary-container">
<!-- TopNavBar -->
<header class="bg-surface border-b border-outline-variant docked full-width top-0 sticky z-50 shadow-none">
<div class="flex flex-row-reverse justify-between items-center px-margin-mobile md:px-gutter max-w-max-width mx-auto w-full h-20">
<a class="font-arabic-headline text-arabic-headline text-primary hover:opacity-80 transition-opacity" href="#">
                مناخز
            </a>
<nav class="hidden md:flex flex-row-reverse items-center gap-gutter">
<a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">الرئيسية</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">عني</a>
<a aria-current="page" class="font-body-md text-body-md text-primary border-b-2 border-secondary pb-1 pointer-events-none" href="#">الأعمال</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">المدونة</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">التواصل</a>
</nav>
<button class="font-body-md text-body-md text-primary hover:text-secondary transition-colors duration-200">
                EN
            </button>
</div>
</header>
<!-- Main Content -->
<main class="flex-grow">
<!-- Page Header -->
<section class="pt-section-padding pb-stack-lg px-margin-mobile md:px-gutter max-w-max-width mx-auto text-center">
<h1 class="font-arabic-headline text-arabic-headline text-primary mb-stack-sm">دوائر من تصميمي</h1>
<p class="font-arabic-body text-arabic-body text-on-surface-variant max-w-2xl mx-auto">تصاميم دوائر إلكترونية أعمل عليها</p>
<div class="h-1 w-16 bg-secondary mx-auto mt-6 rounded-full"></div>
</section>
<!-- Filter Bar -->
<section class="pb-stack-lg px-margin-mobile md:px-gutter max-w-max-width mx-auto flex flex-wrap justify-center gap-4">
<button class="filter-btn active bg-secondary text-on-secondary px-6 py-2 rounded-full font-arabic-body text-arabic-body border border-secondary transition-colors" data-filter="all">الكل</button>
<button class="filter-btn bg-transparent text-on-surface-variant px-6 py-2 rounded-full font-arabic-body text-arabic-body border border-outline-variant hover:border-secondary hover:text-secondary transition-colors" data-filter="power">طاقة</button>
<button class="filter-btn bg-transparent text-on-surface-variant px-6 py-2 rounded-full font-arabic-body text-arabic-body border border-outline-variant hover:border-secondary hover:text-secondary transition-colors" data-filter="arduino">أردوينو</button>
<button class="filter-btn bg-transparent text-on-surface-variant px-6 py-2 rounded-full font-arabic-body text-arabic-body border border-outline-variant hover:border-secondary hover:text-secondary transition-colors" data-filter="basic">دوائر أساسية</button>
</section>
<!-- Masonry Grid -->
<section class="pb-section-padding px-margin-mobile md:px-gutter max-w-max-width mx-auto">
<div class="columns-1 sm:columns-2 lg:columns-3 gap-gutter space-y-gutter">
<!-- Card 1 -->
<div class="break-inside-avoid relative overflow-hidden rounded-[8px] border border-outline-variant bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"><div class="p-6 flex flex-col gap-3">
<span class="inline-block self-start bg-[#D4AF37] text-white px-3 py-1 rounded-full font-label-sm text-label-sm">أردوينو</span>
<h3 class="font-arabic-headline text-lg font-bold text-[#1A1A18]">نظام تحكم بالري</h3>
<p class="font-arabic-body text-on-surface-variant line-clamp-2">نظام ذكي يعتمد على حساسات الرطوبة للتحكم في صمامات المياه بشكل آلي وموفر للطاقة.</p>
<button class="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-DEFAULT px-4 py-1.5 font-arabic-body text-arabic-body transition-colors w-fit text-sm">عرض التفاصيل</button>
</div></div>
<!-- Card 2 (Taller) -->
<div class="break-inside-avoid relative overflow-hidden rounded-[8px] border border-outline-variant bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"><div class="p-6 flex flex-col gap-3">
<span class="inline-block self-start bg-[#D4AF37] text-white px-3 py-1 rounded-full font-label-sm text-label-sm">دوائر أساسية</span>
<h3 class="font-arabic-headline text-lg font-bold text-[#1A1A18]">مكبر صوت بسيط</h3>
<p class="font-arabic-body text-on-surface-variant line-clamp-2">تصميم لمكبر صوت ترانزستوري بسيط عالي النقاء مصمم للاستخدام في المشاريع التعليمية الصغيرة.</p>
<button class="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-DEFAULT px-4 py-1.5 font-arabic-body text-arabic-body transition-colors w-fit text-sm">عرض التفاصيل</button>
</div></div>
<!-- Card 3 -->
<div class="break-inside-avoid relative overflow-hidden rounded-[8px] border border-outline-variant bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"><div class="p-6 flex flex-col gap-3">
<span class="inline-block self-start bg-[#D4AF37] text-white px-3 py-1 rounded-full font-label-sm text-label-sm">طاقة</span>
<h3 class="font-arabic-headline text-lg font-bold text-[#1A1A18]">مزود طاقة 12 فولت</h3>
<p class="font-arabic-body text-on-surface-variant line-clamp-2">دائرة تحويل تيار متردد إلى مستمر 12 فولت مستقرة للغاية مع حماية من قصر الدائرة الكهربائية.</p>
<button class="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-DEFAULT px-4 py-1.5 font-arabic-body text-arabic-body transition-colors w-fit text-sm">عرض التفاصيل</button>
</div></div>
<!-- Card 4 -->
<div class="break-inside-avoid relative overflow-hidden rounded-[8px] border border-outline-variant bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"><div class="p-6 flex flex-col gap-3">
<span class="inline-block self-start bg-[#D4AF37] text-white px-3 py-1 rounded-full font-label-sm text-label-sm">دوائر أساسية</span>
<h3 class="font-arabic-headline text-lg font-bold text-[#1A1A18]">راديو تناظري</h3>
<p class="font-arabic-body text-on-surface-variant line-clamp-2">استقبال موجات AM باستخدام تقنيات كلاسيكية ومكونات تقليدية لإظهار جمال التصميم الإلكتروني القديم.</p>
<button class="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-DEFAULT px-4 py-1.5 font-arabic-body text-arabic-body transition-colors w-fit text-sm">عرض التفاصيل</button>
</div></div>
<!-- Card 5 -->
<div class="break-inside-avoid relative overflow-hidden rounded-[8px] border border-outline-variant bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"><div class="p-6 flex flex-col gap-3">
<span class="inline-block self-start bg-[#D4AF37] text-white px-3 py-1 rounded-full font-label-sm text-label-sm">أردوينو</span>
<h3 class="font-arabic-headline text-lg font-bold text-[#1A1A18]">متتبع مسار روبوتي</h3>
<p class="font-arabic-body text-on-surface-variant line-clamp-2">روبوت صغير يعتمد على الحساسات تحت الحمراء لتتبع الخطوط المرسومة بدقة عالية وسرعة استجابة.</p>
<button class="mt-2 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-DEFAULT px-4 py-1.5 font-arabic-body text-arabic-body transition-colors w-fit text-sm">عرض التفاصيل</button>
</div></div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-primary-container full-width bottom-0">
<div class="flex flex-col md:flex-row-reverse justify-between items-center py-stack-lg px-margin-mobile md:px-gutter max-w-max-width mx-auto w-full">
<div class="font-arabic-headline text-arabic-headline text-on-primary-container mb-stack-sm md:mb-0">
                مناخز
            </div>
<p class="font-arabic-body text-arabic-body text-on-primary-container text-center md:text-right mb-stack-sm md:mb-0">
                © 2024 مناخز. جميع الحقوق محفوظة للمهندس الإلكتروني.
            </p>
<div class="flex flex-row-reverse gap-4">
<a class="font-arabic-body text-arabic-body text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">LinkedIn</a>
<a class="font-arabic-body text-arabic-body text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">GitHub</a>
<a class="font-arabic-body text-arabic-body text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">X</a>
<a class="font-arabic-body text-arabic-body text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">Email</a>
</div>
</div>
</footer>
<script>
        // Simple script to handle filter button active states
        document.addEventListener('DOMContentLoaded', () => {
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active styles from all
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-secondary', 'text-on-secondary');
                        b.classList.add('bg-transparent', 'text-on-surface-variant');
                    });
                    
                    // Add active styles to clicked
                    btn.classList.remove('bg-transparent', 'text-on-surface-variant');
                    btn.classList.add('bg-secondary', 'text-on-secondary');
                });
            });
        });
    </script>
</body></html>
