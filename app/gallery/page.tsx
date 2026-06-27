"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site";
import { CTASection } from "@/components/sections/CTASection";

// ─── types ────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

// ─── constants ────────────────────────────────────────────────────────────────
const GALLERY_ITEMS: GalleryItem[] = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/IMG-20260627-WA00${i + 2 < 10 ? "0" : ""}${i + 2}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}));

// Alternate aspect ratios for visual variety in masonry
const ASPECT_CLASSES = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.2s ease" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Image card */}
      <div
        className="relative z-10 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ animation: "scaleUp 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        <div className="relative w-full bg-black" style={{ maxHeight: "80vh" }}>
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={900}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "80vh" }}
            priority
          />
        </div>

        {/* Footer */}
        <div className="bg-background/95 px-6 py-3 flex items-center justify-between border-t border-border">
          <p className="text-sm text-muted-foreground">
            {item.id} / {total}
          </p>
          <button
            onClick={onClose}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Close ×
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={onPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/70 border border-border flex items-center justify-center text-foreground text-xl hover:bg-background transition-all hover:scale-110 active:scale-95"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/70 border border-border flex items-center justify-center text-foreground text-xl hover:bg-background transition-all hover:scale-110 active:scale-95"
        aria-label="Next"
      >
        ›
      </button>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.88) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const aspectClass = ASPECT_CLASSES[index % ASPECT_CLASSES.length];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 40);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        break-inside-avoid rounded-2xl overflow-hidden border border-border
        ${aspectClass} cursor-pointer relative group bg-muted/30
      `}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-5px) scale(1.02)"
            : "translateY(0) scale(1)"
          : "translateY(20px) scale(0.97)",
        transition: visible
          ? "opacity 0.4s ease, transform 0.3s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease"
          : "opacity 0.4s ease, transform 0.4s ease",
        boxShadow: hovered ? "0 16px 36px -8px rgba(0,0,0,0.22)" : "none",
      }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        loading={index < 8 ? "eager" : "lazy"}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* "View" label */}
      <div
        className="absolute bottom-3 left-0 right-0 flex justify-center"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
          View
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevItem = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, []);

  const nextItem = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % GALLERY_ITEMS.length
    );
  }, []);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-muted/20 border-b border-border">
        <div className="section-container">
          <span className="badge-brand mb-3">Gallery</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-foreground mt-4 mb-5 leading-tight">
            Stories told in{" "}
            <span className="gradient-text">pictures</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
            A glimpse into the workshops, celebrations, placement drives, and
            campus life that make EduNexus more than just a consultancy.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section-py">
        <div className="section-container">
          {/* Count */}
          <p className="text-sm text-muted-foreground mb-8">
            <span className="font-semibold text-foreground">{GALLERY_ITEMS.length}</span> photos
          </p>

          {/* Masonry */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {GALLERY_ITEMS.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={idx}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            Follow us on{" "}
            <a
              href={SITE_CONFIG.socialLinks.instagram}
              className="text-brand-600 dark:text-brand-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            for the latest updates.
          </p>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          item={GALLERY_ITEMS[lightboxIndex]}
          total={GALLERY_ITEMS.length}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      <CTASection />
    </>
  );
}