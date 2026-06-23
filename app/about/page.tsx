"use client";

import type { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Rocket } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Hero Visual ──────────────────────────────────────────────────────────────

const ORBIT_R = 130; // px — must match SVG circle r

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-h-[400px] flex items-center justify-center select-none"
      aria-hidden
    >
      {/* Static decorative rings */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-brand-500/10" />
      <div className="absolute w-[200px] h-[200px] rounded-full border border-brand-500/15 bg-brand-500/3" />

      {/* SVG: dashed orbit + arc */}
      <svg
        className="absolute"
        width="300"
        height="300"
        viewBox="-150 -150 300 300"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="arcGrad2" x1="-1" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Dashed orbit ring */}
        <circle
          cx="0" cy="0" r={ORBIT_R}
          fill="none"
          stroke="rgba(99,102,241,0.2)"
          strokeWidth="1"
          strokeDasharray="5 9"
        />
        {/* Growth arc */}
        <path
          d="M -90 80 Q 0 -60 90 -20"
          fill="none"
          stroke="url(#arcGrad2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>



      {/* Central node */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-20 h-20 rounded-full bg-background border-2 border-brand-500/50 shadow-xl flex flex-col items-center justify-center gap-0.5"
      >
        <span className="text-2xl leading-none">🎯</span>
        <span className="text-[9px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Career</span>
      </motion.div>

      {/* Stat pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.4 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
        className="absolute bottom-6 left-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border shadow-md text-xs font-medium z-20"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span className="text-foreground">5,000+ students guided</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.4 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        className="absolute top-6 right-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border shadow-md text-xs font-medium z-20"
      >
        <span className="text-amber-500">★</span>
        <span className="text-foreground">Industry-ready training programs</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isDecimal = value.includes(".");
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const postfix = value.match(/[^0-9.]+$/)?.[0] ?? "";

    if (isNaN(numericPart)) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericPart;
      const formatted = isDecimal ? current.toFixed(1) : Math.round(current).toString();
      setDisplay(`${prefix}${formatted}${postfix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

// ─── Tilt Card ─────────────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section wrapper with scroll reveal ───────────────────────────────────────

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────


const VALUES = [{ Icon: Heart, title: "Student-Centric Approach", description: "Every student has a unique journey. We provide personalised counselling, training, and placement support designed around individual goals, strengths, and career aspirations.", }, { Icon: Target, title: "Career-Focused Learning", description: "Our programs are designed to bridge the gap between academic education and industry requirements through practical, job-oriented training and certifications.", }, { Icon: Users, title: "Access & Opportunity", description: "We believe quality education and career guidance should be accessible to everyone, regardless of financial background or location.", }, { Icon: Award, title: "Industry-Relevant Skills", description: "From AI and Data Science to Cyber Security and SAP, our curriculum evolves continuously to match current industry demands and hiring trends.", }, { Icon: Eye, title: "Transparency & Trust", description: "We guide students honestly and ethically, helping them choose the right path instead of pushing unnecessary programs or certifications.", }, { Icon: Rocket, title: "Continuous Innovation", description: "Technology changes rapidly, and so do we. Our training ecosystem continuously adapts to emerging technologies and future career opportunities.", },];

const STATS = [{ value: "2019", label: "Year Founded", color: "from-blue-500 to-cyan-500", }, { value: "5k+", label: "Students Guided", color: "from-violet-500 to-purple-600", }, { value: "100+", label: "Industry Trainings", color: "from-emerald-500 to-teal-500", }, { value: "4", label: "NCR Locations", color: "from-amber-500 to-orange-500", },];

const STORY_PARAGRAPHS = [{ text: "Open Mind Learning started in ", highlight: "2019", end: " with a mission to help students make smarter academic and career decisions in an increasingly competitive world.", }, { text: "What began as a counselling and admission guidance initiative has now evolved into a comprehensive ecosystem for ", highlight: "career development, technical training, certifications, and placements", end: ".", }, { text: "Today, Open Mind Learning works with schools, colleges, universities, and aspiring professionals across the NCR region, delivering future-ready programs in ", highlight: "AI, Cyber Security, Data Science, Blockchain, SAP, IoT, AR/VR, and many more domains", end: ".", }, { text: "With offices in ", highlight: "Greater Noida, Delhi, Noida, and Meerut", end: ", we continue to empower students with practical skills, global certifications, and meaningful placement opportunities.", },];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-muted/20 border-b border-border overflow-hidden">
        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/6 blur-[120px] pointer-events-none"
        />

        <motion.div style={{ y: heroParallax }} className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div className="max-w-xl">
              <motion.span
                variants={fadeIn}
                custom={0}
                initial="hidden"
                animate="visible"
                className="badge-brand mb-4 inline-block"
              >
                About Open Mind Learning
              </motion.span>

              {/* Line-by-line headline reveal */}
              <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mt-4 mb-6 leading-tight">
                {["Empowering students", "with skills,"].map((line, i) => (
                  <motion.span
                    key={i}
                    variants={fadeUp}
                    custom={0.1 + i * 0.12}
                    initial="hidden"
                    animate="visible"
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
                <motion.span
                  variants={fadeUp}
                  custom={0.35}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                    className="gradient-text"
                  >
                    guidance & career opportunities
                  </motion.span>
                </motion.span>
              </h1>

              <motion.p
                variants={fadeUp}
                custom={0.5}
                initial="hidden"
                animate="visible"
                className="text-muted-foreground text-lg leading-relaxed"
              >
                Open Mind Learning is a modern education and career consultancy helping students build successful futures through admission counselling, industry-focused training, international certifications, and placement support.
              </motion.p>
            </div>

            {/* Right: animated visual */}
            <div className="hidden lg:flex items-center justify-center">
              <HeroVisual />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div>
              <RevealSection delay={0}>
                <span className="badge-brand mb-3 inline-block">Our Story</span>
              </RevealSection>
              <RevealSection delay={0.08}>
                <h2 className="font-display font-black text-4xl text-foreground mt-3 mb-5 leading-tight">
                  A single room, one counsellor, one conviction
                </h2>
              </RevealSection>

              <div className="space-y-4">
                {STORY_PARAGRAPHS.map((para, i) => {
                  const ref = useRef(null);
                  const inView = useInView(ref, { once: true, margin: "-40px" });
                  return (
                    <motion.p
                      key={i}
                      ref={ref}
                      variants={fadeUp}
                      custom={i * 0.12}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {para.text}
                      <motion.span
                        initial={{ backgroundSize: "0% 100%" }}
                        animate={inView ? { backgroundSize: "100% 100%" } : {}}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="text-foreground font-medium rounded-sm px-0.5"
                        style={{
                          backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--brand-500, #6366f1) 20%, transparent), color-mix(in srgb, var(--brand-500, #6366f1) 10%, transparent))",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "left center",
                        }}
                      >
                        {para.highlight}
                      </motion.span>
                      {para.end}
                    </motion.p>
                  );
                })}
              </div>
            </div>

            {/* Stats side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map(({ value, label, color }) => (
                <motion.div key={label} variants={cardVariant}>
                  <TiltCard className="p-6 rounded-2xl border border-border bg-background text-center cursor-default h-full">
                    <p className={`font-display font-black text-3xl bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
                      <AnimatedCounter value={value} />
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────────────── */}
      <section className="section-py bg-muted/20">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              { Icon: Target, title: "Our Mission", body: "To empower students and aspiring professionals with industry-relevant skills, career guidance, and global opportunities that help them succeed academically and professionally in a rapidly evolving world.", borderColor: "border-brand-500/20", iconBg: "bg-brand-500/10", iconColor: "text-brand-600 dark:text-brand-400", }, { Icon: Eye, title: "Our Vision", body: "To become one of India's most trusted career development and training organizations by creating accessible, future-ready learning ecosystems that bridge the gap between education and employment.", borderColor: "border-violet-500/20", iconBg: "bg-violet-500/10", iconColor: "text-violet-600 dark:text-violet-400", }
            ].map(({ Icon, title, body, borderColor, iconBg, iconColor }) => (
              <motion.div
                key={title}
                variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-8 rounded-3xl border ${borderColor} bg-background`}
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5`}
                >
                  <Icon size={22} className={iconColor} />
                </motion.div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-3">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="section-container">
          <RevealSection className="text-center max-w-xl mx-auto mb-14">
            <span className="badge-brand mb-3 inline-block">Core Values</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-3 leading-tight">
              What we stand for
            </h2>
          </RevealSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {VALUES.map(({ Icon, title, description }) => (
              <motion.div
                key={title}
                variants={cardVariant}
                whileHover={{
                  y: -6,
                  boxShadow: "0 12px 40px -12px rgba(var(--brand-500-rgb, 99,102,241),0.18)",
                  borderColor: "rgba(var(--brand-500-rgb, 99,102,241),0.3)",
                  transition: { duration: 0.22 },
                }}
                className="p-6 rounded-2xl border border-border bg-background transition-colors duration-300 group"
              >
                <motion.div
                  whileHover={{ y: -3, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4"
                >
                  <Icon size={18} className="text-brand-600 dark:text-brand-400" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}