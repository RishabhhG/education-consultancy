"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Briefcase, Building2, Star } from "lucide-react";
import { STATS } from "@/data/site";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Briefcase, Building2, Star,
};

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function TrustSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-py section-alt border-y border-border" ref={ref}>
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2">
            By the Numbers
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-foreground">
            Results that speak for themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? Star;
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:border-brand-500/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/10 to-violet-500/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-brand-600 dark:text-brand-400" />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}