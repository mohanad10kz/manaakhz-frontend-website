<!DOCTYPE html><html dir="rtl" lang="ar"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>المهندس الإلكتروني - أفكاري ومذكراتي</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&amp;family=Playfair+Display:wght@600;700&amp;family=Source+Serif+4:wght@400;600&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
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
                        "background": "#F7F4EF",
                        "on-surface": "#1c1b1b",
                        "surface-tint": "#5f5e5c",
                        "surface-bright": "#fdf8f7",
                        "inverse-surface": "#313030",
                        "on-tertiary-fixed": "#1d1b1c",
                        "surface-container": "#f1edec",
                        "primary": "#1A1A18",
                        "on-error": "#ffffff",
                        "surface-variant": "#e5e2e1",
                        "outline-variant": "#c8c7bf",
                        "on-tertiary-container": "#878384",
                        "surface": "#FFFFFF",
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
                        "secondary": "#3D5A4C",
                        "gold": "#B5872A",
                        "muted": "#6B6B67",
                        "border-color": "#E5E1D8"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem",
                        "card": "8px"
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
<body class="bg-background text-on-surface font-arabic-body min-h-screen flex flex-col">
<!-- TopNavBar -->
<header class="bg-surface border-b border-outline-variant w-full h-20 sticky top-0 z-50">
<div class="flex flex-row-reverse justify-between items-center max-w-max-width mx-auto px-margin-mobile md:px-gutter w-full h-full">
<a class="font-arabic-headline text-arabic-headline text-primary" href="#">المهندس الإلكتروني</a>
<nav class="hidden md:flex gap-6 flex-row-reverse">
<a class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-secondary transition-colors duration-200" href="#">الرئيسية</a>
<a class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-secondary transition-colors duration-200" href="#">عني</a>
<a class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-secondary transition-colors duration-200" href="#">تصاميم الدوائر</a>
<a class="text-primary border-b-2 border-primary pb-1 font-arabic-body text-arabic-body hover:text-secondary transition-colors duration-200" href="#">مدونة</a>
</nav>
<div class="flex items-center gap-4">
<button class="text-primary hover:text-secondary transition-colors duration-200">
<span class="material-symbols-outlined">search</span>
</button>
<button class="text-primary hover:text-secondary transition-colors duration-200">EN</button>
<button class="md:hidden text-primary hover:text-secondary transition-colors duration-200">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</header>
<main class="flex-grow pt-section-padding pb-section-padding">
<div class="max-w-max-width mx-auto px-margin-mobile md:px-gutter">
<!-- Breadcrumb -->
<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-muted text-sm mb-8 font-arabic-body">
<a class="hover:text-primary transition-colors" href="#">الرئيسية</a>
<span class="material-symbols-outlined text-[16px]">chevron_left</span>
<a class="hover:text-primary transition-colors" href="#">أفكاري ومذكراتي</a>
<span class="material-symbols-outlined text-[16px]">chevron_left</span>
<span aria-current="page" class="text-primary">فلسفة التصميم الهندسي</span>
</nav>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
<!-- Right Column (Text Content) -->
<div class="lg:col-span-7">
<!-- Post Header -->
<header class="mb-12">
<h1 class="font-arabic-headline text-display-lg-mobile md:text-display-lg text-primary mb-6 relative inline-block">
                                فلسفة التصميم الهندسي: بين الجمال والوظيفة
                                <span class="absolute -bottom-2 right-0 w-full h-[3px] bg-gold rounded-full opacity-80"></span>
</h1>
<!-- Meta -->
<div class="flex flex-wrap items-center gap-4 text-muted text-sm font-arabic-body mt-6">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
                                    ١٠ مايو ٢٠٢٤
                </span>
<span class="w-1 h-1 rounded-full bg-muted opacity-50"></span>
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">sell</span>
<span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant rounded text-xs">شخصي</span>
<span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant rounded text-xs">هندسة</span>
</span>
<span class="w-1 h-1 rounded-full bg-muted opacity-50"></span>

</div>
</header>
<!-- Article Body -->
<article class="prose prose-lg max-w-none prose-p:font-arabic-body prose-p:text-arabic-body prose-p:leading-[1.9] prose-p:text-on-surface prose-p:mb-6 prose-h2:font-arabic-headline prose-h2:text-[24px] prose-h2:text-gold prose-h2:mb-4 prose-h2:mt-10 prose-a:text-gold hover:prose-a:text-primary transition-colors">
<p class="">
                                في عالم حيث تتسارع التكنولوجيا بخطى مذهلة، غالباً ما ننسى أن وراء كل لوحة دوائر معقدة وكل جهاز ذكي يكمن فن حقيقي. الهندسة ليست مجرد أرقام ومعادلات؛ إنها سعي مستمر لتحقيق التوازن المثالي بين الوظيفة القاسية والجمال الهيكلي.
                            </p>
<h2 class="">التناغم في الفوضى</h2>
<p class="">
                                عندما تنظر إلى لوحة دوائر مطبوعة (PCB) مصممة جيداً، فإنك لا ترى مجرد خطوط نحاسية ومكونات إلكترونية. إنك ترى خريطة مدينة صغيرة، حيث كل مسار له هدف، وكل مكون يساهم في إيقاع كلي. هذا التناغم هو ما يميز التصميم العظيم عن التصميم الجيد.
                            </p>
<blockquote class="border-r-4 border-gold pr-6 pl-4 py-2 my-8 bg-surface-container-low rounded-l-lg italic text-on-surface-variant">
                                "التصميم الجيد ليس مجرد ما يبدو عليه وما تشعر به. التصميم هو كيف يعمل. ولكن عندما يعمل بجمال، فإنه يرتقي ليصبح فناً."
                            </blockquote>
<h2 class="">اللغة التقنية كأداة تعبير</h2>
<p class="">
                                حتى في كتابة الشفرات، هناك أناقة. الكود النظيف هو أشبه بالشعر. عندما نستخدم <code class="bg-surface-container border border-outline-variant px-1.5 py-0.5 rounded text-secondary font-mono text-sm">microcontrollers</code> مثل Arduino أو <code class="bg-surface-container border border-outline-variant px-1.5 py-0.5 rounded text-secondary font-mono text-sm">Raspberry Pi</code>، نحن نكتب لغة يفهمها الآلة، لكن يجب أن يقرأها الإنسان بوضوح.
                            </p>
<p class="">
                                في الختام، أدعو كل مهندس إلى النظر لأبعد من المتطلبات الوظيفية. دعونا نصمم أشياء لا تعمل فقط، بل تلهم أيضاً. لأن المستقبل لا يُبنى فقط بالمنطق، بل يُرسم بالخيال.
                            </p>
</article>
<!-- Bottom Navigation -->
<div class="mt-16 pt-8 border-t border-outline-variant">
<a class="inline-flex items-center gap-2 text-gold font-arabic-body hover:text-primary transition-colors group" href="#">
<span class="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">arrow_forward</span>
                                مقالات أخرى
            </a>
</div>
</div>
<!-- Left Column (Image Gallery) -->
<div class="lg:col-span-5 sticky top-28">
<!-- Featured Image -->
<figure class="mb-4">
<img alt="A close-up, high-quality photograph of a vintage electronics workbench with a soldering iron, some copper wires, and a small circuit board. Warm atmospheric lighting, shallow depth of field, professional photography style. Matches a heritage and engineering aesthetic." class="w-full aspect-[4/3] object-cover rounded-xl shadow-sm border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQygAYjMV7VEZ4buBH8UiizoZCjpLYDhxdXxplI74tU4m1DC4JdJXL6lCfcaI22I7IIjnkS7X9boz_yTXZh8Qw9jmOpMDNHUXOxkcScxI6gkkr3iezbDfxzg4Lw6pPZniu2nX8xeVMJpAXOgCedzx8NBoNKzXt902H021lXX7LntKAc5L5Fdb5PzAGRnYV8xAB68WB2UOlX5HR4oOs6YMBxXsqahvjZYF2KUSWxGcg-YOrOSGdwnoUz8lobwl58hLMScKLDP9wwWk">
</figure>
<!-- Thumbnail Slider -->
<div class="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
<img alt="Thumbnail 1" class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gold snap-start shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUOPhwXhIBsnwI4EW5Pdx61hkqie2LGMefRcoRdqmKFpCRHh1CI5oTtYanl7h-eadw3G94ZDiTJWZ1z-c-jDwgxb17y6K-HpnnK7GACZJyACFlFZ9h9JeQ72NVaeXWQM1EGXlodYDflgb9DxvHVl8C7QnhFZVxyIwmRLaUYZksjJWgwybrBYNLgnuIWmsiKzKE6Dm1vEX-iKBhbMQoQmHObJwwZtBncWI91NqtFUqAEuXStB6XP1PN3zzojmrt-8W5CBPbluqU-4s">
<img alt="Thumbnail 2" class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-outline-variant snap-start shrink-0 opacity-70 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVGJ097PeBEvnd8xA7Y09L5Hhfpjx9Vz8LWeUrccJKIANN5bHPg4oSgnBqh4YJQoGs8RaWyNURCLryyLOMLW1v3I8HH56IkXgxKjR5ww3yx-7KenMoScOfS46JHVKsspihywLmpPtUBkuL87jt-sCeNXz1eqZrk8O9pm9TypT9jfzTh02vCnbs5obURWfWe510fuHf9pDI9q-UJ2qZbbUeve2xVAK2xf_7O8xL-lxUrCgTSTUieTTcRkVG7_mrZYgAPJMncl7uu7E">
<img alt="Thumbnail 3" class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-outline-variant snap-start shrink-0 opacity-70 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD84LnuG_kcJrwg1avBM0YNtS_FtCb605xeyVJ7JMzPUlyiHUUQrQCDZDXlF6QOCmY8BuClkGt2-_FZtC7AQ1wKYTMT_mhrX1xjJisSBbM-qYn235ShCtjVIuo7mGaJKeuq0ZVX9liWMOeLVaaa0qETGnbmbf_BeG96GDs0NpxxPj4DoxWoARrvdsg8cSHVrDIxyYWXXlVF3FUR8CPHxjPWXH2OLsyqlihemthiTtCQGJCIMAIi8sMOx3qSLzeTN3MZ9d6_t5jUN60">
<img alt="Thumbnail 4" class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-outline-variant snap-start shrink-0 opacity-70 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwOJgPGZJE7gE3zBcyQmPK3nhRg7u4sgx3oC7tQxwJdkgiLmbrllC2e_urWQA_UodwnQ2Vk4iW3Oze9dInII5jDcksW4693TpQGHHqDzTM-eS7F4A2F7X8bLKkdkg3EHBT4RcZ0xE2tqgG7Jg8aX48P_2k1t0jqyuHQbOrSAO2bXJX6_u-No6k-4DHEYL_uKkkDeRfbfE54KZKXvbuYXKFA4_oj__AbKO0EVczTIoVHi0yjSZ6IOQCdm2h6Z7N6PkVxHOjl3Qh28g">
</div>
<style>
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        </style>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="bg-surface-container border-t border-outline-variant w-full mt-auto">
<div class="flex flex-col md:flex-row-reverse justify-between items-center max-w-max-width mx-auto py-stack-lg px-margin-mobile w-full">
<div class="font-arabic-headline text-arabic-headline text-primary mb-4 md:mb-0">المهندس الإلكتروني</div>
<div class="flex gap-6 mb-4 md:mb-0">
<a class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary underline decoration-secondary transition-opacity duration-300 hover:opacity-80" href="#">تويتر</a>
<a class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary underline decoration-secondary transition-opacity duration-300 hover:opacity-80" href="#">لينكدإن</a>
<a class="text-on-surface-variant font-arabic-body text-arabic-body hover:text-primary underline decoration-secondary transition-opacity duration-300 hover:opacity-80" href="#">البريد</a>
</div>
<div class="text-on-surface font-arabic-body text-arabic-body">
                © ٢٠٢٤ جميع الحقوق محفوظة لمهندس الإلكترونيات
            </div>
</div>
</footer>

</body></html>
