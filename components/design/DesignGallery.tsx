"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Download, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { createPortal } from "react-dom";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface DesignGalleryProps {
  images: string[];
  videos: string[];
  title: string;
  isRtl: boolean;
}

/**
 * Converts a YouTube watch URL to an embed URL.
 * Handles formats: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/
 */
function toYouTubeEmbed(url: string): string {
  try {
    const u = new URL(url);
    let videoId = "";

    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    } else if (u.pathname.includes("/shorts/")) {
      videoId = u.pathname.split("/shorts/")[1]?.split("/")[0] || "";
    } else {
      videoId = u.searchParams.get("v") || "";
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
      : url;
  } catch {
    return url;
  }
}

export function DesignGallery({ images, videos, title, isRtl }: DesignGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasImages = images.length > 0;
  const hasVideos = videos.length > 0;

  const activeImage = hasImages ? images[activeIndex] : null;

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const handleDownload = () => {
    if (!activeImage) return;
    const link = document.createElement("a");
    link.href = activeImage;
    link.download = `${title}-${activeIndex + 1}.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* ────────── IMAGE GALLERY ────────── */}
      {hasImages && (
        <div className="gallery-section">
          {/* Main Image */}
          <div className="main-image-wrapper" onClick={() => setDialogOpen(true)}>
            <OptimizedImage
              src={activeImage!}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="main-image object-cover"
              priority
            />
            {/* Hover overlay */}
            <div className="main-image-overlay">
              <span className="zoom-hint">
                {isRtl ? "انقر للتكبير" : "Click to enlarge"}
              </span>
            </div>
            {/* Navigation arrows (only if more than 1 image) */}
            {images.length > 1 && (
              <>
                <button
                  className="nav-arrow nav-arrow-prev"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="nav-arrow nav-arrow-next"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <p className="image-counter">
              {activeIndex + 1} / {images.length}
            </p>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="thumbnails-row">
              {images.map((img, idx) => (
                <OptimizedImage
                  key={idx}
                  src={img}
                  alt={`${title} ${idx + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setActiveIndex(idx)}
                  className={`thumbnail ${idx === activeIndex ? "thumbnail-active" : ""}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ────────── VIDEO SECTION ────────── */}
      {hasVideos && (
        <div className="videos-section">
          <div className="videos-header">
            <Play className="w-5 h-5 videos-icon" />
            <h3 className="videos-title">
              {isRtl ? "فيديوهات" : "Videos"}
            </h3>
          </div>
          <div className="videos-grid">
            {videos.map((url, idx) => {
              const embedUrl = toYouTubeEmbed(url);
              return (
                <div key={idx} className="video-embed-wrapper">
                  <iframe
                    src={embedUrl}
                    title={`${title} — Video ${idx + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────── DIALOG ────────── */}
      {dialogOpen && activeImage && mounted && createPortal(
        <div
          className="dialog-backdrop"
          onClick={() => setDialogOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="dialog-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toolbar */}
            <div className="dialog-toolbar">
              <span className="dialog-counter">
                {activeIndex + 1} / {images.length}
              </span>
              <div className="dialog-actions">
                <button
                  className="dialog-btn download-btn"
                  onClick={handleDownload}
                  title={isRtl ? "تحميل الصورة" : "Download image"}
                >
                  <Download className="w-5 h-5" />
                  <span>{isRtl ? "تحميل" : "Download"}</span>
                </button>
                <button
                  className="dialog-btn close-btn"
                  onClick={() => setDialogOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="dialog-img-wrapper">
              {images.length > 1 && (
                <button
                  className="dialog-nav dialog-nav-prev"
                  onClick={goPrev}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              <OptimizedImage
                src={activeImage}
                alt={title}
                fill
                sizes="(max-width: 1440px) 95vw, 1440px"
                className="dialog-img object-contain"
                priority
              />
              {images.length > 1 && (
                <button
                  className="dialog-nav dialog-nav-next"
                  onClick={goNext}
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Thumbnails inside dialog */}
            {images.length > 1 && (
              <div className="dialog-thumbnails">
                {images.map((img, idx) => (
                  <OptimizedImage
                    key={idx}
                    src={img}
                    alt={`${idx + 1}`}
                    width={64}
                    height={64}
                    onClick={() => setActiveIndex(idx)}
                    className={`dialog-thumb ${idx === activeIndex ? "dialog-thumb-active" : ""}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* ────────── STYLES ────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Gallery ── */
        .gallery-section { margin-bottom: 1.5rem; }

        .main-image-wrapper {
          position: relative;
          cursor: zoom-in;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid var(--border);
          margin-bottom: 0.75rem;
          background: var(--card);
          aspect-ratio: 4/3;
        }

        .main-image {
          transition: transform 0.35s ease;
        }
        .main-image-wrapper:hover .main-image {
          transform: scale(1.02);
        }

        .main-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease;
          z-index: 10;
        }
        .main-image-wrapper:hover .main-image-overlay {
          background: rgba(0,0,0,0.25);
        }

        .zoom-hint {
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          opacity: 0;
          transition: opacity 0.25s ease;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .main-image-wrapper:hover .zoom-hint { opacity: 1; }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.85);
          border: none;
          border-radius: 50%;
          width: 2.25rem;
          height: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.2s ease, background 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .main-image-wrapper:hover .nav-arrow { opacity: 1; }
        .nav-arrow:hover { background: #fff; }
        .nav-arrow-prev { left: 0.75rem; }
        .nav-arrow-next { right: 0.75rem; }

        .image-counter {
          text-align: center;
          font-size: 0.8rem;
          color: var(--muted-foreground);
          margin: 0.25rem 0 0.75rem;
        }

        .thumbnails-row {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: none;
        }
        .thumbnails-row::-webkit-scrollbar { display: none; }

        .thumbnail {
          width: 5rem;
          height: 5rem;
          object-fit: cover;
          border-radius: 0.5rem;
          cursor: pointer;
          border: 2.5px solid transparent;
          opacity: 0.6;
          transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .thumbnail:hover { opacity: 0.9; transform: scale(1.05); }
        .thumbnail-active {
          border-color: var(--primary);
          opacity: 1;
          transform: scale(1.05);
        }

        /* ── Videos ── */
        .videos-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .videos-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .videos-icon { color: var(--primary); }

        .videos-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }

        .videos-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .video-embed-wrapper {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 */
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          border: 1px solid var(--border);
          background: #000;
        }

        .video-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* ── Dialog ── */
        .dialog-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
          padding: 1rem;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .dialog-content {
          background: #10100e;
          border-radius: 1rem;
          width: 95vw;
          max-width: 90rem;
          height: 90vh;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.25s ease;
          box-shadow: 0 25px 80px rgba(0,0,0,0.6);
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .dialog-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .dialog-counter {
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
        }

        .dialog-actions { display: flex; align-items: center; gap: 0.5rem; }

        .dialog-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .download-btn {
          background: var(--primary, #B5872A);
          color: #fff;
        }
        .download-btn:hover { opacity: 0.88; }

        .close-btn {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
        }
        .close-btn:hover { background: rgba(255,255,255,0.15); }

        .dialog-img-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 0;
          padding: 0.75rem;
          width: 100%;
        }

        .dialog-img {
          border-radius: 0.5rem;
          object-fit: contain;
        }

        .dialog-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          width: 2.75rem;
          height: 2.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: background 0.2s ease;
          z-index: 2;
        }
        .dialog-nav:hover { background: rgba(255,255,255,0.25); }
        .dialog-nav-prev { left: 0.5rem; }
        .dialog-nav-next { right: 0.5rem; }

        .dialog-thumbnails {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          overflow-x: auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .dialog-thumbnails::-webkit-scrollbar { display: none; }

        .dialog-thumb {
          width: 4rem;
          height: 4rem;
          object-fit: cover;
          border-radius: 0.375rem;
          cursor: pointer;
          opacity: 0.45;
          border: 2px solid transparent;
          transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .dialog-thumb:hover { opacity: 0.8; transform: scale(1.05); }
        .dialog-thumb-active {
          border-color: var(--primary, #B5872A);
          opacity: 1;
          transform: scale(1.05);
        }
      `}} />
    </>
  );
}
