"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Metadata } from "next";
import { Building2, School, Factory, Heart, Search, X } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { SITE_CONFIG } from "@/data/site";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    "Icon": Building2,
    "title": "Educational Institutions",
    "metric": "50+ Universities",
    "description": "Universities and colleges where our counselled students are admitted and from which we draw academic collaboration.",
    "color": "from-blue-500 to-cyan-500",
    "colorVar": "59 130 246",
    "partners": [
      { "name": "Monard University, Uttar Pradesh", "size": "md" },
      { "name": "Sunrise University, Rajasthan", "size": "md" },
      { "name": "Sanskriti University, Uttar Pradesh", "size": "md" },
      { "name": "IIMT University, Uttar Pradesh", "size": "md" },
      { "name": "ABES Engineering College, Ghaziabad", "size": "md" },
      { "name": "Gurukulam, Barsana", "size": "sm" },
      { "name": "Subharti Inter College, Kithore", "size": "sm" },
      { "name": "R.K. Public School, Meerut", "size": "sm" },
      { "name": "Azad Public School, BSR", "size": "sm" },
      { "name": "S.C. Memorial Public School, Gulaothi", "size": "sm" },
      { "name": "Lawrance Academy, Gulaothi", "size": "sm" },
      { "name": "Modern Public School, Hapur", "size": "sm" },
      { "name": "Vidya Public School, Meerut", "size": "sm" },
      { "name": "J.P. Institute of Engineering & Technology, Meerut", "size": "md" },
      { "name": "J.P. Academy, Meerut", "size": "sm" },
      { "name": "J.P. Institute of Management, Meerut", "size": "md" },
      { "name": "Deewan Group of Colleges, Meerut", "size": "md" }
    ]
  },
  {
    "Icon": School,
    "title": "Schools & Colleges",
    "metric": "300+ Schools Engaged",
    "description": "Schools partnered under our IT Incubation Cell program and colleges hosting our student workshops.",
    "color": "from-violet-500 to-purple-600",
    "colorVar": "139 92 246",
    "partners": [
      { "name": "FIT Engineering College, Meerut", "size": "md" },
      { "name": "DIT University, Dehradun", "size": "md" },
      { "name": "St. Teresa Group of Schools, Vasundhara", "size": "md" },
      { "name": "R.D. Memorial Public School, Vasundhara", "size": "sm" },
      { "name": "Basanti Devi Inter College, Devli", "size": "sm" },
      { "name": "Arya Kanya Inter College, Gulaothi", "size": "sm" },
      { "name": "D.N. Inter College, Gulaothi", "size": "sm" },
      { "name": "GNIOT Group of Institutions, Greater Noida", "size": "md" },
      { "name": "Asia Pacific Institute of Management, Delhi", "size": "md" },
      { "name": "Accurate Institute of Management and Technology, Greater Noida", "size": "md" },
      { "name": "Lloyd Institute of Engineering and Technology, Greater Noida", "size": "md" },
      { "name": "Institute of Technology & Science, Mohan Nagar", "size": "md" },
      { "name": "ITS Engineering College, Greater Noida", "size": "md" },
      { "name": "IAMR Group of Institutions, Ghaziabad", "size": "md" },
      { "name": "Vidyamandir Group of Schools, Ghaziabad", "size": "md" }
    ]
  },
  {
    "Icon": Factory,
    "title": "Industry Partners",
    "metric": "Industry Hiring Network",
    "description": "Technology companies and corporates that actively recruit from open mind learning and co-develop our curriculum.",
    "color": "from-amber-500 to-orange-500",
    "colorVar": "245 158 11",
    "partners": [
      { "name": "Indian Industries Association", "size": "md" },
      { "name": "Bhartiya Majdoor Sangh (BMS)", "size": "md" },
      { "name": "Noida Entrepreneur Association", "size": "md" },
      { "name": "Greater Noida Industries Association", "size": "md" },
      { "name": "Laghu Udyog Bharti", "size": "md" },
      { "name": "U.P. Corrugated Box Manufacturing Association", "size": "md" },
      { "name": "MSME Industrial Association", "size": "md" },
      { "name": "Apparel Export Cluster", "size": "md" },
      { "name": "Ecotech-12 Industrial Association", "size": "md" },
      { "name": "Handloom Handicraft Exporters Welfare Association", "size": "md" },
      { "name": "Association of Indian Manufacturers", "size": "md" },
      { "name": "U.P. Yuva Vyapaar Mandal", "size": "md" }
    ]
  },
  {
    "Icon": Heart,
    "title": "Social Organisations",
    "metric": "Project 999 Partners",
    "description": "NGOs and social organisations through which we identify and support Project 999 candidates.",
    "color": "from-rose-500 to-pink-600",
    "colorVar": "244 63 94",
    "partners": [
      { "name": "Bharat Vikas Parishad", "size": "sm" },
      { "name": "Jan Shiksha Evam Sanskaar Samiti", "size": "sm" },
      { "name": "Pragati Care Foundation", "size": "sm" },
      { "name": "Prakahar Foundation", "size": "sm" },
      { "name": "Vigor Council", "size": "sm" },
      { "name": "Shri Ram Sewa Trust", "size": "sm" },
      { "name": "Indian Industries Association", "size": "sm" },
      { "name": "Uttar Pradesh Udyog Vyapar Mandal", "size": "sm" }
    ]
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── Ecosystem Background ─────────────────────────────────────────────────────

function EcosystemBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const NODE_COUNT = 15;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(var(--brand-rgb, 99 102 241) / ${0.06 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(var(--brand-rgb, 99 102 241) / 0.12)";
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

// ─── Partner Tag ─────────────────────────────────────────────────────────────

type PartnerSize = "sm" | "md" | "lg";

function PartnerTag({
  name,
  size,
  colorVar,
  index,
  visible,
  dimmed,
  highlighted,
}: {
  name: string;
  size: PartnerSize;
  colorVar: string;
  index: number;
  visible: boolean;
  dimmed: boolean;
  highlighted: boolean;
}) {
  const sizeClass =
    size === "lg"
      ? "text-sm font-semibold px-4 py-2"
      : size === "md"
        ? "text-sm font-medium px-3.5 py-1.5"
        : "text-xs font-medium px-3 py-1.5";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-xl border transition-all duration-500 cursor-default select-none
        ${sizeClass}
        ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3"
        }
        ${highlighted
          ? "border-[rgba(var(--tag-color)/0.6)] bg-[rgba(var(--tag-color)/0.12)] text-foreground shadow-[0_0_12px_rgba(var(--tag-color)/0.25)]"
          : dimmed
            ? "opacity-30 border-border bg-muted/20 text-muted-foreground"
            : "border-border bg-muted/40 text-muted-foreground hover:border-[rgba(var(--tag-color)/0.4)] hover:text-foreground hover:bg-[rgba(var(--tag-color)/0.08)] hover:shadow-[0_0_10px_rgba(var(--tag-color)/0.2)] hover:-translate-y-0.5"
        }
      `}
      style={{
        // @ts-ignore
        "--tag-color": colorVar,
        transitionDelay: visible ? `${index * 45}ms` : "0ms",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
        style={{
          background: highlighted
            ? `rgb(${colorVar})`
            : `rgba(${colorVar} / 0.4)`,
        }}
      />
      {name}
    </span>
  );
}

// ─── Category Card (new 2×2 bento layout) ────────────────────────────────────

function CategoryCard({
  category,
  index,
  searchQuery,
  hoveredCategory,
  onHover,
}: {
  category: (typeof CATEGORIES)[0];
  index: number;
  searchQuery: string;
  hoveredCategory: number | null;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  const { Icon, title, metric, description, color, colorVar, partners } = category;

  const [expanded, setExpanded] = useState(false);
  const MAX_VISIBLE = 12;

  const isHovered = hoveredCategory === index;
  const otherHovered = hoveredCategory !== null && !isHovered;

  const q = searchQuery.toLowerCase().trim();

  const matchingPartners = new Set(
    q
      ? partners
        .filter((p) => p.name.toLowerCase().includes(q))
        .map((p) => p.name)
      : []
  );

  const categoryMatches = q
    ? title.toLowerCase().includes(q) ||
    partners.some((p) => p.name.toLowerCase().includes(q))
    : true;

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${q && !categoryMatches
          ? "opacity-20 scale-[0.97]"
          : "opacity-100 scale-100"
        } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`
          relative rounded-2xl border overflow-hidden cursor-default group
          transition-all duration-400 ease-out
          h-full flex flex-col
          ${isHovered
            ? "shadow-2xl -translate-y-2 border-[rgba(var(--card-color)/0.4)]"
            : "shadow-md border-border"
          }
          ${otherHovered
            ? "opacity-50 scale-[0.98]"
            : "opacity-100 scale-100"
          }
        `}
        style={{
          // @ts-ignore
          "--card-color": colorVar,
          background: "hsl(var(--background))",
          minHeight: "260px",
        }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
      >
        {/* ── Decorative gradients ── */}
        <div
          className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${color} transition-all duration-500 ${isHovered ? "opacity-20 scale-125" : "opacity-10 scale-100"
            }`}
          aria-hidden
        />
        <div
          className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${color} transition-all duration-500 ${isHovered ? "opacity-30 scale-110" : "opacity-15 scale-100"
            }`}
          aria-hidden
        />

        {/* ── Watermark Icon ── */}
        <div
          className={`absolute bottom-4 right-4 transition-all duration-500 pointer-events-none ${isHovered
              ? "opacity-8 scale-110 rotate-6"
              : "opacity-5 scale-100 rotate-0"
            }`}
          aria-hidden
        >
          <Icon
            size={96}
            strokeWidth={1}
            style={{ color: `rgb(${colorVar})` }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className={`
                w-11 h-11 rounded-xl bg-gradient-to-br ${color}
                flex items-center justify-center shrink-0
                transition-all duration-300
                ${isHovered ? "scale-110 shadow-[0_4px_20px_rgba(var(--card-color)/0.5)]" : "scale-100"}
              `}
            >
              <Icon size={18} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-lg text-foreground leading-tight">
                {title}
              </h2>

              <span
                className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${color} text-white`}
              >
                {metric}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Partners */}
          <div
            className={`flex flex-wrap gap-1.5 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-70"
              }`}
          >
            {partners
              .slice(0, expanded ? partners.length : MAX_VISIBLE)
              .map((p, i) => (
                <PartnerTag
                  key={p.name}
                  name={p.name}
                  size={p.size as PartnerSize}
                  colorVar={colorVar}
                  index={i}
                  visible={visible}
                  dimmed={q ? !matchingPartners.has(p.name) : false}
                  highlighted={
                    (q && matchingPartners.has(p.name)) ||
                    (!q && isHovered)
                  }
                />
              ))}
          </div>

          {/* Show more / less */}
          {partners.length > MAX_VISIBLE && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-auto text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded
                ? "Show less"
                : `Show more (${partners.length - MAX_VISIBLE})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative max-w-md">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search partners… e.g. IIT, Microsoft"
        className="
          w-full pl-9 pr-9 py-2.5 rounded-xl border border-border bg-background
          text-sm text-foreground placeholder:text-muted-foreground
          focus:outline-none focus:border-[hsl(var(--brand-500))] focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.15)]
          transition-all duration-200
        "
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssociatesPage() {
  const [search, setSearch] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const handleHover = useCallback((i: number | null) => setHoveredCategory(i), []);

  const totalMatches = search.trim()
    ? CATEGORIES.flatMap((c) =>
      c.partners.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    ).length
    : null;

  return (
    <>
      <style>{`
        @keyframes iconBreath {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.04) rotate(1.5deg); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 bg-muted/20 border-b border-border overflow-hidden">
        <EcosystemBackground />
        <div className="section-container relative z-10">
          <span className="badge-brand mb-3">Our Associates</span>
          <h1 className="font-display font-black text-5xl md:text-6xl text-foreground mt-4 mb-5 leading-tight">
            An ecosystem built on{" "}
            <span className="gradient-text">trust</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed mb-8">
            150+ institutions, companies, and organisations trust Open Mind Learning to
            bridge education and opportunity. These partnerships are what make
            our placements, certifications, and programs genuinely effective.
          </p>

          <SearchBar value={search} onChange={setSearch} />

          {totalMatches !== null && (
            <p className="mt-3 text-sm text-muted-foreground">
              {totalMatches === 0
                ? "No partners match that search."
                : `${totalMatches} partner${totalMatches !== 1 ? "s" : ""} found across all categories`}
            </p>
          )}
        </div>
      </section>

      {/* ── Categories ── */}

      <section className="section-py relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <EcosystemBackground />
        </div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.title}
                category={cat}
                index={i}
                searchQuery={search}
                hoveredCategory={hoveredCategory}
                onHover={handleHover}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Gradient bridge into CTA ── */}
      <div className="h-20 bg-gradient-to-b from-transparent via-muted/10 to-muted/30 pointer-events-none" />

      <CTASection />
    </>
  );
}