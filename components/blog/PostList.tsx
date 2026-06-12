"use client";

import { Post } from "@/lib/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGsapLazy } from "@/hooks/useGsapLazy";

interface PostListProps {
  posts: Post[];
  locale: string;
}

export function PostList({ posts, locale }: PostListProps) {
  const t = useTranslations("Blog");
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapLazy((gsap, ScrollTrigger) => {
    gsap.fromTo(".blog-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
    gsap.fromTo(".blog-post-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-list",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, containerRef);

  return (
    <div ref={containerRef} className="container max-w-[1100px] mx-auto px-6 py-12 md:py-20 overflow-x-hidden">
      {/* Page Header */}
      <div className="blog-header text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4 relative inline-block">
          {t("title")}
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary w-1/2 mx-auto rounded-full"></div>
        </h1>
        <p className="text-lg text-muted-foreground mt-6">{t("description")}</p>
      </div>

      {/* Post List */}
      <div className="blog-list flex flex-col gap-8">
        {posts.map((post, index) => {
          const title = isRtl ? post.title_ar : post.title_en;
          const contentBlocks = isRtl ? post.content_ar : post.content_en;
          // استخراج نص من أول فقرة في الـ blocks
          const excerpt = (() => {
            if (!Array.isArray(contentBlocks) || contentBlocks.length === 0) return '';
            const firstPara = contentBlocks.find((b: any) => b.type === 'paragraph');
            if (!firstPara || !Array.isArray(firstPara.children)) return '';
            const text = firstPara.children.map((c: any) => c.text || '').join('');
            return text.length > 150 ? text.substring(0, 150) + '...' : text;
          })();

          // Alternating background logic based on index
          const bgClass = index % 2 === 0 ? "bg-card" : "bg-muted/30";
          const hoverBgClass =
            index % 2 === 0 ? "hover:bg-muted/30" : "hover:bg-card";

          return (
            <article
              key={post.id}
              className={`blog-post-card ${bgClass} border border-border rounded-xl p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-0.5 ${hoverBgClass} group`}
            >
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {post.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary mx-1"></span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.split(",").map((tag) => (
                      <span
                        key={tag.trim()}
                        className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-xs font-medium"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-bold font-sans text-foreground mb-3 group-hover:text-primary transition-colors">
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem("last_blog_page", window.location.pathname);
                      }
                    }}
                    className="focus:outline-none"
                  >
                    {title}
                  </Link>
                </h2>

                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {excerpt}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
