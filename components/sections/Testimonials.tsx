"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="section-py section-alt" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="badge-brand mb-3">Success Stories</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-3 leading-tight">
            Real students, real{" "}
            <span className="gradient-text">results</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {/* Main testimonial */}
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 md:p-10 rounded-3xl border border-border bg-background shadow-sm overflow-hidden">
              {/* Decorative quote */}
              <Quote
                size={80}
                className="absolute -top-4 -left-4 text-brand-500/5 rotate-180"
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-foreground text-lg md:text-xl leading-relaxed mb-6 font-medium text-pretty">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br",
                          t.gradient
                        )}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                        <p className="text-xs text-muted-foreground">{t.location}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {t.course}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => navigate(-1)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === active
                        ? "w-6 h-2 bg-brand-500"
                        : "w-2 h-2 bg-border hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
