"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Code2,
  Award,
  Globe,
  Briefcase,
  Languages,
  Sparkles,
  ArrowRight,
  Building2,
  Users,
  Target,
  Phone,
} from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";

// ─── Static metadata (move to a separate metadata.ts if needed) ───────────────
// export const metadata: Metadata = {
//   title: "Services — Career Guidance, Training & Certifications | Open Mind Learning",
//   description:
//     "Explore our full range of services: admission counselling, technical training, international certifications, foreign languages, and placement assistance.",
//   alternates: { canonical: `${SITE_CONFIG.url}/services` },
// };

// ─── Services data (replace with your SERVICES import if preferred) ──────────
const SERVICES = [
  {
    id: "admission",
    icon: GraduationCap,
    title: "Admission Counselling",
    badge: "Most Popular",
    color: "from-violet-500 to-purple-600",
    accentColor: "violet",
    description:
      "Choosing the right educational path can feel overwhelming. Our expert counsellors guide students through college and university options aligned with their academic goals — including CSR-backed programs where students can pursue B.Tech, MBA, BBA, BCA, and MCA without paying tuition fees.",
    features: ["B.Tech", "MBA", "BBA", "BCA", "MCA", "CSR Scholarships"],
  },
  {
    id: "technical",
    icon: Code2,
    title: "High-End Technical Trainings",
    badge: "In Demand",
    color: "from-blue-500 to-cyan-500",
    accentColor: "blue",
    description:
      "Industry-designed training modules covering the latest technologies. From AR/VR and Blockchain to Data Science and Full-Stack Development — we ensure students are job-ready before they graduate.",
    features: [
      "AR / VR / MR",
      "Data Science",
      "Machine Learning",
      "Cyber Security",
      "Blockchain & dApps",
      "Full Stack Dev",
      "IoT",
      "RPA",
    ],
  },
  {
    id: "management",
    icon: Building2,
    title: "Corporate Management Trainings",
    badge: null,
    color: "from-emerald-500 to-teal-600",
    accentColor: "emerald",
    description:
      "Equip future business leaders with certifications and frameworks used in modern enterprises. Our management training covers quality, analytics, compliance, and leadership — the skills employers actively look for.",
    features: [
      "ZED Certification",
      "Lean Six Sigma",
      "Total Quality Management",
      "Tableau & PowerBI",
      "IPR",
      "Stress Management",
    ],
  },
  {
    id: "certifications",
    icon: Award,
    title: "International Certifications",
    badge: "Global Edge",
    color: "from-amber-500 to-orange-500",
    accentColor: "amber",
    description:
      "Stand out in the global job market with certifications from Microsoft, Google, Amazon, Cisco, Adobe, IBM, SAP, and more. We facilitate end-to-end preparation and examination support.",
    features: [
      "Microsoft",
      "Google",
      "AWS",
      "Cisco",
      "Adobe",
      "IBM",
      "SAP",
      "EC-Council",
      "PMP",
    ],
  },
  {
    id: "languages",
    icon: Languages,
    title: "Foreign Languages",
    badge: null,
    color: "from-pink-500 to-rose-500",
    accentColor: "pink",
    description:
      "Language is the bridge to global opportunity. We offer structured foreign language programs that go beyond grammar — building cultural fluency, international communication skills, and career reach across borders.",
    features: [
      "French",
      "German",
      "Spanish",
      "Japanese",
      "Mandarin",
      "Cultural Fluency",
    ],
  },
  {
    id: "skills",
    icon: Sparkles,
    title: "Skill Development Programs",
    badge: "New",
    color: "from-indigo-500 to-violet-500",
    accentColor: "indigo",
    description:
      "Future-proof your students with practical skills the classroom rarely teaches. From digital marketing and graphic design to financial literacy and UPSC preparation — holistic development for every aspiration.",
    features: [
      "Digital Marketing",
      "Graphic Design",
      "Financial Markets",
      "UPSC Preparation",
      "Adobe Suite",
      "YouTube / LinkedIn Growth",
    ],
  },
  {
    id: "placements",
    icon: Briefcase,
    title: "Placement Assistance",
    badge: "Guaranteed",
    color: "from-teal-500 to-green-500",
    accentColor: "teal",
    description:
      "Our three-tier placement engine connects candidates, colleges, and employers. Whether you're placement-ready now or just starting your degree, we have a structured program with written guarantees.",
    features: [
      "Resume Building",
      "Interview Prep",
      "Immediate Placement",
      "6–8 Month Program",
      "Guaranteed Package",
      "Industry Network",
    ],
  },
];

const STATS = [
  { label: "Students Placed", value: "2,000+", icon: Users },
  { label: "Training Programs", value: "30+", icon: Target },
  { label: "Industry Partners", value: "50+", icon: Building2 },
  { label: "Cities Active", value: "4", icon: Globe },
];

// ─── Animated counter hook ────────────────────────────────────────────────────
function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ─── Animated hero visual (right side) ───────────────────────────────────────
function HeroVisual() {
  const icons = [
    { Icon: Code2, label: "Tech Training", delay: "0s", pos: "top-4 left-8" },
    { Icon: Award, label: "Certifications", delay: "0.4s", pos: "top-4 right-4" },
    { Icon: Globe, label: "International", delay: "0.8s", pos: "bottom-20 left-0" },
    { Icon: Briefcase, label: "Placements", delay: "1.2s", pos: "bottom-4 right-8" },
    { Icon: GraduationCap, label: "Admissions", delay: "1.6s", pos: "top-1/2 -translate-y-1/2 right-0" },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto h-72 md:h-80 select-none">
      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-10"
          style={{ background: "linear-gradient(135deg, var(--color-brand-500, #6366f1), var(--color-brand-700, #4338ca))" }}
        >
          <Sparkles size={28} className="mb-1" />
          <span className="text-xs font-bold leading-tight text-center px-2">Open Mind Learning</span>
        </div>
        {/* Orbit rings */}
        <div className="absolute w-52 h-52 rounded-full border border-dashed border-brand-500/20 animate-spin" style={{ animationDuration: "20s" }} />
        <div className="absolute w-72 h-72 rounded-full border border-dashed border-brand-500/10 animate-spin" style={{ animationDuration: "35s", animationDirection: "reverse" }} />
      </div>

      {/* Floating icon chips */}
      {icons.map(({ Icon, label, delay, pos }) => (
        <div
          key={label}
          className={cn("absolute flex items-center gap-1.5 bg-background border border-border rounded-xl px-3 py-2 shadow-lg", pos)}
          style={{ animation: `floatChip 3s ease-in-out ${delay} infinite alternate` }}
        >
          <Icon size={15} className="text-brand-500" />
          <span className="text-xs font-semibold text-foreground">{label}</span>
        </div>
      ))}

      <style>{`
        @keyframes floatChip {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-background border border-border">
      <Icon size={20} className="text-brand-500 mb-1" />
      <span className="font-display font-black text-2xl text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </div>
  );
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const { icon: Icon, title, badge, color, description, features } = service;

  return (
    <div
      ref={ref}
      className="group relative flex flex-col md:flex-row gap-6 p-7 rounded-2xl border border-border bg-background hover:border-brand-500/40 hover:shadow-2xl transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, box-shadow 0.3s, border-color 0.3s`,
      }}
    >
      {/* Gradient shimmer on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, transparent 60%, rgba(99,102,241,0.04) 100%)` }}
      />

      {/* Icon */}
      <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300", color)}>
        <Icon size={26} className="text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h2 className="font-display font-bold text-xl text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h2>
          {badge && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              {badge}
            </span>
          )}
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">{description}</p>
        <div className="flex flex-wrap gap-2">
          {features.map((f) => (
            <span key={f} className="tag">{f}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center shrink-0 mt-2 md:mt-0">
        <Link
          href="/contact"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2.5 rounded-xl transition-all duration-200 hover:gap-3 whitespace-nowrap shadow-md hover:shadow-brand-500/30"
        >
          <Phone size={14} />
          Contact Now
        </Link>
      </div>
    </div>
  );
}

// ─── Placement highlight section ──────────────────────────────────────────────
function PlacementHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  const tiers = [
    {
      title: "Immediate Placement",
      subtitle: "For ready candidates",
      description:
        "Pay only a registration fee upfront. Once you're successfully placed, we charge 15 days of your monthly salary — after it's credited to your account.",
      accent: "border-blue-500/30 hover:border-blue-500/60",
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      badgeText: "Fast Track",
    },
    {
      title: "Guaranteed Placement",
      subtitle: "For final year & 6–8 month candidates",
      description:
        "We analyze your profile, upgrade your skills and certifications, and place you in the right domain. Charges vary based on your specific needs and package.",
      accent: "border-brand-500/30 hover:border-brand-500/60",
      badge: "bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20",
      badgeText: "Most Chosen",
    },
    {
      title: "Comprehensive Program",
      subtitle: "For first-year students",
      description:
        "We take complete charge from day one — personality, communication, technical skills, international certifications — and guarantee your job package in writing at 30% of the assured salary.",
      accent: "border-emerald-500/30 hover:border-emerald-500/60",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      badgeText: "Written Guarantee",
    },
  ];

  return (
    <div
      ref={ref}
      className="mt-20 p-8 md:p-12 rounded-3xl border border-border bg-muted/20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
          <Briefcase size={20} className="text-white" />
        </div>
        <span className="badge-brand">Placement Programs</span>
      </div>
      <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mt-3 mb-2">
        Three paths to your <span className="gradient-text">first paycheck</span>
      </h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        No matter where you are in your journey, we have a placement tier that meets you there — with real written agreements and performance-backed guarantees.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {tiers.map((tier, i) => (
          <div
            key={tier.title}
            className={cn("relative p-6 rounded-2xl border bg-background transition-all duration-300 hover:shadow-xl", tier.accent)}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.15 + 0.2}s, transform 0.5s ease ${i * 0.15 + 0.2}s, box-shadow 0.3s`,
            }}
          >
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 inline-block", tier.badge)}>
              {tier.badgeText}
            </span>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">{tier.title}</h3>
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">{tier.subtitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/contact"
          className="flex items-center gap-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-xl transition-all duration-200 hover:gap-3 shadow-lg hover:shadow-brand-500/30"
        >
          <Phone size={15} />
          Discuss Your Placement Path
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-brand-500, #6366f1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <span className="badge-brand mb-3 inline-block">Since 2019 · Greater Noida</span>
              <h1 className="font-display font-black text-5xl md:text-6xl text-foreground mt-4 mb-5 leading-tight">
                Every service you need,{" "}
                <span className="gradient-text">in one place</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed mb-8">
                From admission to placement — Open Mind Learning covers every step of your academic and professional journey across NCR and beyond.
              </p>

              {/* Stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-5 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-brand-500/30"
                >
                  <Phone size={15} />
                  Talk to a Counsellor
                </Link>
                <a
                  href="#services"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground border border-border hover:border-brand-500/40 bg-background px-5 py-3 rounded-xl transition-all duration-200"
                >
                  Browse Services
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right: animated visual */}
            <div className="hidden md:flex items-center justify-center">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services list ── */}
      <section id="services" className="section-py scroll-mt-20">
        <div className="section-container">
          <div className="mb-12 text-center">
            <span className="badge-brand mb-3 inline-block">What We Offer</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-2 mb-4">
              Built for where you are <span className="gradient-text">right now</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whether you're a first-year student or a final-year aspirant — every program is designed to move you forward.
            </p>
          </div>

          <div className="space-y-5">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          {/* Placement deep-dive */}
          <PlacementHighlight />
        </div>
      </section>

      <CTASection />
    </>
  );
}