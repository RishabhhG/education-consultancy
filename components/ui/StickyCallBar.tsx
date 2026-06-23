"use client";

import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

export function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden">
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-brand-600 to-violet-600 text-white font-semibold text-sm shadow-lg"
        aria-label="Call EduNexus"
      >
        <Phone size={16} className="animate-bounce-slow" />
        Call Now — Free Consultation
      </a>
    </div>
  );
}
