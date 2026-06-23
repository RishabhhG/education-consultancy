"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-py" ref={ref}>
      <div className="section-container">
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 p-10 md:p-16 text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Your future starts now
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-5 leading-tight">
              Let's build your career together
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              12,000+ students trusted us with their career. Your free consultation is one click away — no pressure, just honest guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-sm hover:bg-white/90 transition-colors shadow-lg"
              >
                Book Free Consultation <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
