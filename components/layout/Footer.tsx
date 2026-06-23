import Link from "next/link";
import {
  GraduationCap, Phone, Mail, MapPin,
  Instagram, Linkedin, Youtube, Twitter, ArrowRight,
} from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, SERVICES } from "@/data/site";
import OMLLogo from "@/components/sections/OMLLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-brand-600 to-violet-600 py-12">
        <div className="section-container text-center">
          <p className="font-display text-white text-2xl md:text-3xl font-bold mb-4">
            Ready to accelerate your career?
          </p>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Book a free 30-minute consultation with a senior career advisor — no obligations, just clarity.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Book Free Consultation <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I'd like to know more about EduNexus programs.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <OMLLogo size={50} />
              <span className="font-display font-black text-lg">
                OpenMind<span className="gradient-text"> Learning</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              India's premier education consultancy helping 12,000+ students shape meaningful careers through expert guidance, world-class training, and placement support.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: SITE_CONFIG.socialLinks.instagram, label: "Instagram" },
                { Icon: Linkedin, href: SITE_CONFIG.socialLinks.linkedin, label: "LinkedIn" },
                { Icon: Youtube, href: SITE_CONFIG.socialLinks.youtube, label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400 text-muted-foreground transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects/project-999"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Project 999
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/it-incubation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  IT Incubation for Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Associates", href: "/associates" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  {SITE_CONFIG.address}
                </span>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                Free Consultation Available
              </p>
              <p className="text-xs text-muted-foreground">
                Mon – Sat, 9 AM – 7 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Empowering futures, one student at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
