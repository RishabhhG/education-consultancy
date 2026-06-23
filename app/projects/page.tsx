"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Rocket, School, Users, ArrowRight, CheckCircle2,
  ChevronDown, Sparkles, Monitor, Globe, Code2,
  Brain, TrendingUp,
  Award,
} from "lucide-react";

import { PROJECTS } from "@/data/site";


// ─── Sub-components ──────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  isActive,
  onClick,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const { Icon, color } = project;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onClick={onClick}
        className={`
          relative rounded-3xl border bg-card cursor-pointer overflow-hidden
          transition-all duration-500 select-none
          ${isActive
            ? "border-transparent shadow-2xl scale-[1.01]"
            : "border-border hover:border-border/80 hover:shadow-lg hover:-translate-y-0.5"
          }
        `}
        style={
          isActive
            ? {
                boxShadow: `0 0 0 1.5px ${color.from}40, 0 24px 60px ${color.glow}`,
              }
            : {}
        }
      >
        {/* Gradient top bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${color.bar}`} />

        {/* Animated glow bg when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: `radial-gradient(ellipse at top left, ${color.glow} 0%, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Header row */}
        <div className="relative p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                className={`w-12 h-12 rounded-2xl ${color.icon} flex items-center justify-center shadow-lg shrink-0`}
                animate={isActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Icon size={22} className="text-white" />
              </motion.div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-black tracking-widest ${color.accent}`}>
                    {project.number}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${color.badge}`}>
                    {project.tag}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-foreground leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            <motion.div
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 mt-1"
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={15} className="text-muted-foreground" />
            </motion.div>
          </div>

          <p className="text-sm text-muted-foreground mt-3 mb-5 leading-relaxed max-w-xl">
            {project.subtitle}
          </p>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {project.stats.map(({ value, label }) => (
              <div
                key={label}
                className="text-center p-2.5 rounded-xl bg-muted/50 dark:bg-white/3 border border-border/50"
              >
                <p className={`font-display font-black text-base ${color.accent}`}>{value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Key Highlights
                    </p>
                    <ul className="space-y-2">
                      {project.highlights.map((h) => (
                        <motion.li
                          key={h}
                          className="flex items-start gap-2.5"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground leading-snug">{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Programs Covered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.programs.map(({ Icon: PIcon, label }, i) => (
                        <motion.span
                          key={label}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/60 dark:bg-white/5 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03, duration: 0.25 }}
                        >
                          <PIcon size={11} />
                          {label}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-border/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-xs text-muted-foreground max-w-xs">{project.note}</p>
                  <Link
                    href="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-brand text-sm shrink-0 whitespace-nowrap"
                  >
                    {project.cta} <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Floating orb decoration ──────────────────────────────────────────────────

function FloatingOrb({
  color,
  className,
  delay = 0,
}: {
  color: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: color }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Hero right-side visual ───────────────────────────────────────────────────

const ORBIT_ICONS = [
  { Icon: Code2,      angle: 0,   color: "text-blue-400" },
  { Icon: Globe,      angle: 72,  color: "text-emerald-400" },
  { Icon: Brain,      angle: 144, color: "text-violet-400" },
  { Icon: Monitor,    angle: 216, color: "text-amber-400" },
  { Icon: TrendingUp, angle: 288, color: "text-rose-400" },
];

function HeroVisual({ inView }: { inView: boolean }) {
  return (
    <div className="relative hidden lg:flex items-center justify-center w-full h-full">

      {/* Rotating orbit ring */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-border/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {ORBIT_ICONS.map(({ Icon, angle, color }, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 48 * Math.cos(rad);
          const y = 50 + 48 * Math.sin(rad);
          return (
            <motion.div
              key={i}
              className={`absolute w-9 h-9 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center ${color}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Icon size={16} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center badge */}
      <motion.div
        className="relative z-10 w-[110px] h-[110px] rounded-3xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-500/20 flex flex-col items-center justify-center gap-1 shadow-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={24} className="text-blue-500" />
        <p className="font-display font-black text-lg text-foreground">OML</p>
        <p className="text-[9px] text-muted-foreground font-semibold tracking-wide text-center leading-tight px-2">
          Open Mind<br />Learning
        </p>
      </motion.div>

      {/* Stat card — top right */}
      <motion.div
        className="absolute top-2 right-0 w-44 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/20 to-amber-500/5 bg-card/80 backdrop-blur-sm p-3.5 shadow-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Rocket size={13} className="text-amber-500" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Beneficiaries
          </span>
        </div>
        <p className="font-display font-black text-2xl text-amber-500">3,200+</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Project 999</p>
      </motion.div>

      {/* Stat card — bottom right */}
      <motion.div
        className="absolute bottom-2 right-0 w-40 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/20 to-blue-500/5 bg-card/80 backdrop-blur-sm p-3.5 shadow-lg"
        initial={{ opacity: 0, y: -16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Award size={13} className="text-blue-500" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Programs
          </span>
        </div>
        <p className="font-display font-black text-2xl text-blue-500">35+</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Certified courses</p>
      </motion.div>

      {/* Stat card — left */}
      <motion.div
        className="absolute left-0 top-1/3 w-40 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 bg-card/80 backdrop-blur-sm p-3.5 shadow-lg"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Users size={13} className="text-emerald-500" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Students
          </span>
        </div>
        <p className="font-display font-black text-2xl text-emerald-500">15,000+</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Workshop reach</p>
      </motion.div>

      {/* Stat card — bottom left */}
      <motion.div
        className="absolute bottom-2 left-0 w-40 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-violet-500/5 bg-card/80 backdrop-blur-sm p-3.5 shadow-lg"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <School size={13} className="text-violet-500" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            IT Labs
          </span>
        </div>
        <p className="font-display font-black text-2xl text-violet-500">40+</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Schools equipped</p>
      </motion.div>

      {/* Soft glow behind center */}
      <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none z-0" />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeId, setActiveId] = useState<string | null>("project-999");

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-section" />
        <div className="absolute inset-0 grid-bg opacity-60" />

        <FloatingOrb color="rgba(245,158,11,0.12)" className="w-72 h-72 top-10 left-10" delay={0} />
        <FloatingOrb color="rgba(109,40,217,0.1)"  className="w-96 h-96 top-0 right-20"  delay={2} />
        <FloatingOrb color="rgba(5,150,105,0.09)"  className="w-64 h-64 bottom-10 left-1/3" delay={4} />

        <div className="section-container relative z-10" ref={headerRef}>
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20 bg-blue-500/8 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 mb-5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 }}
              >
                <Sparkles size={11} className="animate-pulse" />
                Projects & Initiatives
              </motion.span>

              <motion.h1
                className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                Beyond{" "}
                <span className="gradient-text">classrooms</span>
                <br />
                into{" "}
                <span className="gradient-text">careers</span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 15 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 }}
              >
                Three initiatives that extend our impact far beyond our campus —
                into schools, underserved communities, and the next generation of
                technology talent.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2 mt-7"
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35 }}
              >
                {PROJECTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveId(p.id);
                      document
                        .getElementById(p.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      activeId === p.id
                        ? `${p.color.badge} scale-105`
                        : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-border/80"
                    }`}
                  >
                    <p.Icon size={12} />
                    {p.title}
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: animated visual */}
            <div className="relative h-[380px]">
              <HeroVisual inView={headerInView} />
            </div>

          </div>
        </div>
      </section>

      {/* ── Project Cards ────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="section-container">
          <div className="space-y-5 max-w-4xl mx-auto">
            {PROJECTS.map((project, i) => (
              <div key={project.id} id={project.id}>
                <ProjectCard
                  project={project}
                  index={i}
                  isActive={activeId === project.id}
                  onClick={() => toggle(project.id)}
                />
              </div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Interested in any of these programs?
            </p>
            <Link href="/contact" className="btn-brand">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Impact strip ─────────────────────────────────────────────────── */}
      <section className="py-12 section-alt border-y border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { Icon: Rocket, value: "3,200+", label: "Project 999 Beneficiaries", color: "text-amber-500" },
              { Icon: School, value: "40+",    label: "Schools with IT Labs",       color: "text-violet-500" },
              { Icon: Users,  value: "15,000+", label: "Workshop Students",         color: "text-emerald-500" },
              { Icon: Award,  value: "35+",    label: "Programs Offered",           color: "text-blue-500" },
            ].map(({ Icon: IIcon, value, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <IIcon size={22} className={`${color} mx-auto mb-2`} />
                <p className={`font-display font-black text-3xl ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}