"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Clock, Monitor, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { PROGRAMS_FEATURED } from "@/data/site";
import { cn } from "@/lib/utils";

export function FeaturedPrograms() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-py" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <span className="badge-brand mb-3">Featured Programs</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-3 leading-tight">
              Programs built for{" "}
              <span className="gradient-text">outcomes</span>
            </h2>
          </div>
          <Link href="/services" className="btn-ghost text-sm shrink-0">
            View All Programs <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PROGRAMS_FEATURED.map((prog, i) => (
            <motion.div
              key={prog.title}
              className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              {/* Top gradient band */}
              <div className={cn("h-2 bg-gradient-to-r", prog.color)} />

              <div className="p-5 flex flex-col flex-1">
                {/* Badge */}
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  {prog.badge}
                </span>

                <h3 className="font-display font-bold text-base text-foreground leading-snug mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {prog.title}
                </h3>

                {/* Meta */}
                <div className="space-y-2 mb-5">
                  {[
                    { Icon: Clock, text: prog.duration },
                    { Icon: Monitor, text: prog.mode },
                    { Icon: BarChart3, text: prog.level },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon size={13} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Outcomes */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {prog.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div>
                    <p className="font-display font-black text-sm text-foreground">{prog.price}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-colors"
                  >
                    Enquire <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}