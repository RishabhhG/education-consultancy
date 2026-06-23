"use client";

import { useState, useEffect, useCallback } from "react";
import { SITE_CONFIG } from "@/data/site";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

// ─── types ───────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  category: string;
  title: string;
  aspectRatio: string;
  bgColor: string;
  emoji: string;
}

// ─── constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Workshops", "Placements", "Certifications", "IT Labs", "Events"];

const EMOJIS = ["🎓", "☁️", "🏢", "💻", "🚀", "🌍", "🔥", "📚", "📊", "🏆", "🤖", "🎙️", "💼", "🔷", "💡", "🎯", "🛡️", "🤝"];

const GALLERY_ITEMS: GalleryItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  category: CATEGORIES[1 + (i % (CATEGORIES.length - 1))],
  title: [
    "Full Stack Bootcamp — Batch 12 Graduation",
    "AWS Certification Day — 45 Students Certified",
    "Corporate Workshop at HCL Technologies",
    "IT Lab Inauguration — DPS Gurugram",
    "Placement Drive — 30 Companies, 1 Day",
    "German Language Batch B2 Celebration",
    "Project 999 Cohort 3 Kickoff",
    "Faculty Development Program — 3-Day",
    "Data Science Hackathon — 200 Participants",
    "IELTS Score Celebration — Band 8 Achievers",
    "School Robotics Competition — Annual 2024",
    "Industry Talk: Google Engineer on AI",
    "LinkedIn Masterclass — Career Week",
    "Azure Certification Ceremony",
    "Student Innovation Showcase",
    "Career Counselling Camp — Open Day",
    "Cybersecurity Workshop — Ethical Hacking",
    "Annual Alumni Meet 2024",
  ][i],
  aspectRatio: i % 3 === 0 ? "aspect-[4/3]" : i % 5 === 0 ? "aspect-square" : "aspect-[3/4]",
  bgColor: [
    "bg-blue-500/10",
    "bg-violet-500/10",
    "bg-amber-500/10",
    "bg-emerald-500/10",
    "bg-rose-500/10",
    "bg-cyan-500/10",
  ][i % 6],
  emoji: EMOJIS[i],
}));

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="relative z-10 max-w-2xl w-full rounded-3xl overflow-hidden border border-border shadow-2xl"
        style={{ animation: "scaleUp 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Big visual */}
        <div className={`${item.bgColor} w-full aspect-video flex flex-col items-center justify-center p-8`}>
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl">{item.emoji}</span>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-foreground/80 mb-3"
          >
            {item.category}
          </span>
          <p className="text-lg font-semibold text-foreground/90 text-center leading-snug max-w-sm">
            {item.title}
          </p>
        </div>

        {/* Footer */}
        <div className="bg-background/95 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Photo {item.id} of {GALLERY_ITEMS.length}</p>
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/70 border border-border flex items-center justify-center text-foreground hover:bg-background transition-all hover:scale-110 active:scale-95"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/70 border border-border flex items-center justify-center text-foreground hover:bg-background transition-all hover:scale-110 active:scale-95"
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

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 45);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        break-inside-avoid rounded-2xl overflow-hidden border border-border
        ${item.bgColor} ${item.aspectRatio}
        flex flex-col items-center justify-center p-4
        cursor-pointer relative group
        transition-all duration-500 ease-out
      `}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-6px) scale(1.03)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.96)",
        transition: visible
          ? "opacity 0.4s ease, transform 0.35s cubic-bezier(0.34,1.4,0.64,1)"
          : "opacity 0.4s ease, transform 0.4s ease",
        boxShadow: hovered ? "0 20px 40px -10px rgba(0,0,0,0.18)" : "none",
      }}
    >
      {/* Overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-3 z-10">
        {/* Emoji icon */}
        <div
          className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3"
          style={{
            transform: hovered ? "scale(1.15) rotate(-3deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <span className="text-lg">{item.emoji}</span>
        </div>

        <p className="text-xs font-medium text-foreground/70 leading-snug">{item.title}</p>

        <span
          className="mt-2 text-xs px-2 py-0.5 rounded-full bg-white/20 text-foreground/60"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
        >
          {item.category}
        </span>
      </div>

      {/* "View" label that slides up on hover */}
      <div
        className="absolute bottom-3 left-0 right-0 flex justify-center z-10"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          View
        </span>
      </div>
    </div>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((i) => i.id === id);
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevItem = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const nextItem = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
            A glimpse into the workshops, celebrations, placement drives, and campus life that make EduNexus more than just a consultancy.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section-py">
        <div className="section-container">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200
                    ${active
                      ? "bg-brand-600 text-white shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                    }
                  `}
                  style={{
                    transform: active ? "scale(1.06)" : "scale(1)",
                  }}
                >
                  {cat}
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full ring-2 ring-brand-600/40 animate-ping"
                      style={{ animationDuration: "1.5s", animationIterationCount: 1 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> {activeCategory !== "All" ? `${activeCategory} ` : ""}photos
          </p>

          {/* Masonry */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={idx}
                onClick={() => openLightbox(item.id)}
              />
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            Real event photos coming soon. Follow us on{" "}
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
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      <CTASection />
    </>
  );
}