"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { SITE_CONFIG } from "@/data/site";

const HeroGlobe = dynamic(
  () => import("./HeroGlobe").then((m) => m.HeroGlobe),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const words = ["Career", "Future", "Skills", "Potential", "Success"];

function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="gradient-text inline-block transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {words[index]}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Glow orbs — lighter in light mode */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-blue-500/10 dark:bg-blue-600/20" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-violet-500/8 dark:bg-violet-600/15" />

      {/* 3D Globe */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none opacity-60 dark:opacity-100">
        <Suspense fallback={null}>
          <HeroGlobe />
        </Suspense>
      </div>

      {/* Content */}
      <div className="section-container relative z-10 pt-24 pb-20 lg:pt-32 lg:pb-32">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20 bg-blue-500/8 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">
              <Sparkles size={12} className="animate-pulse" />
              Empowering Students Across NCR Since 2019
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="hero-heading font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance mb-6"
          >
            Shape Your{" "}
            <AnimatedWord />
            <br />
            <span className="opacity-70">With Expert</span>
            <br />
            Guidance
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="hero-subtext text-lg md:text-xl leading-relaxed mb-8 max-w-xl text-pretty"
          >
            From admission counselling to high-end technical training, international
            certifications, and guaranteed job placement — Open Mind Learning is
            the one partner you need for a career that actually goes somewhere.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-brand px-7 py-3.5 text-base">
              Book Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="hero-ghost-btn">
              <Play
                size={16}
                fill="currentColor"
                className="text-blue-600 dark:text-blue-400"
              />
              Explore Programs
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            {[
              "35+ Associated Institutions",
              "Branches in Delhi, Noida & Meerut",
              "Guaranteed Placement Programs",
            ].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <div className="hero-trust-dot" />
                <span className="hero-trust-text">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="scroll-indicator-text">Scroll</span>
        <div className="scroll-indicator-line" />
      </motion.div>
    </section>
  );
}