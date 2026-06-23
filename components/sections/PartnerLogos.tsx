"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PARTNERS } from "@/data/site";

export function PartnerLogos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const doubled = [...PARTNERS, ...PARTNERS]; // duplicate for seamless scroll

  return (
    <section className="py-12 border-y border-border overflow-hidden" ref={ref}>
      <div className="section-container mb-6">
        <motion.p
          className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Trusted by students from programs accredited & partnered with
        </motion.p>
      </div>

      {/* Scrolling logos */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-10 items-center"
          animate={{ x: [0, `-${PARTNERS.length * 160}px`] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: `${doubled.length * 160}px` }}
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 px-6 py-3 rounded-xl border border-border bg-background/50 hover:border-brand-500/30 transition-colors"
            >
              <p className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                {partner.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
