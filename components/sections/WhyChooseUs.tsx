"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Map, Users, Award, Target, Building2, LifeBuoy
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Map, Users, Award, Target, Building2, LifeBuoy,
};

const HIGHLIGHT_STATS = [
  { value: "5+", label: "Years of Excellence" },
  { value: "35+", label: "Associated Institutions" },
  { value: "4", label: "Cities Across NCR" },
];

export function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-py section-alt" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-brand mb-3">Why Open Mind Learning</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-3 mb-5 leading-tight">
              The difference is in{" "}
              <span className="gradient-text">the details</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Most consultancies tell you what to do. We guide you through every step — from choosing the right college to walking into your first job — and stay with you until you get there.
            </p>

            {/* Highlight stats */}
            <div className="flex gap-6">
              {HIGHLIGHT_STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-black text-3xl gradient-text">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Target;
              return (
                <motion.div
                  key={item.title}
                  className={cn(
                    "p-5 rounded-2xl border border-border bg-background hover:border-brand-500/30 hover:shadow-md transition-all duration-300",
                    i === 0 ? "sm:col-span-2 md:col-span-1" : ""
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center mb-3">
                    <Icon size={17} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}