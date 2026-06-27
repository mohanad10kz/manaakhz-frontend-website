"use client";

import { useRef, useState } from "react";
import { Post } from "@/lib/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useGsapLazy } from "@/hooks/useGsapLazy";
import Pagination from "@/components/shared/Pagination";
import { POSTS_PER_PAGE } from "@/lib/constants";

interface PostListProps {
  posts: Post[];
  locale: string;
}

export function PostList({ posts, locale }: PostListProps) {
  const t = useTranslations("Blog");
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate total pages for client-side pagination
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Slice posts to display only the current page
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
  }, containerRef, [paginatedPosts]);

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
      <div className="blog-list flex flex-col gap-8 mb-8">
        {paginatedPosts.map((post, index) => {
          const title = isRtl ? post.title_ar : post.title_en;
          const contentBlocks = isRtl ? post.content_ar : post.content_en;
          // Extract text from the first paragraph of the blocks for excerpt
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
                  >
                    {title}
                  </Link>
                </h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 text-primary font-bold hover:underline w-fit text-sm"
                >
                  {t("read_more")} &rarr;
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Client-Side Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
