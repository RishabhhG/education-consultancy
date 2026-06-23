"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, GraduationCap, Code2, Award, Globe, Briefcase } from "lucide-react";
import { SERVICES } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Code2, Award, Globe, Briefcase,
};

export function ServicesOverview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-py" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-brand mb-3">What We Do</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-3 mb-4 leading-tight">
            Every step of your journey,{" "}
            <span className="gradient-text">covered</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From choosing the right college to landing your first job — we support students across every critical milestone with programs designed for real outcomes.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] ?? GraduationCap;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="group block h-full p-6 rounded-2xl border border-border bg-background hover:border-brand-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                        service.color
                      )}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    {service.badge && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/contact`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
                  >
                    Contact Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}

          {/* Wide CTA card */}
          <motion.div
            className="md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-700 flex flex-col justify-between">
              <div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                  Not Sure Where to Start?
                </span>
                <h3 className="font-display font-black text-2xl text-white mt-3 mb-3 leading-tight">
                  Get a personalised career roadmap — free
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our advisors assess your background, goals, and learning style to recommend exactly what will move your career forward.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-white/90 transition-colors self-start"
              >
                Book Now — It's Free <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
