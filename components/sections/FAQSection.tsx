"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { FAQS } from "@/data/site";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export function FAQSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-py" ref={ref}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <span className="badge-brand mb-3">FAQs</span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mt-3 mb-5 leading-tight">
              Questions we get{" "}
              <span className="gradient-text">all the time</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              If you have a question not covered here, our counsellors are available via phone, WhatsApp, or visit — Monday to Saturday, 9 AM to 6 PM.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-brand text-sm">
                Talk to a Counsellor
              </Link>
              <a
                href="https://wa.me/917838500561"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Right - FAQ accordion */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden bg-background"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                    {open === i ? (
                      <Minus size={13} className="text-brand-600 dark:text-brand-400" />
                    ) : (
                      <Plus size={13} className="text-muted-foreground" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}