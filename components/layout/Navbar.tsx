"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu, X, Sun, Moon, Monitor, Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/data/site";
import OMLLogo from "@/components/sections/OMLLogo";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-theme-toggle]")) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!mounted) return <div className="w-9 h-9" />;

  const themes = [
    { value: "light", Icon: Sun },
    { value: "dark", Icon: Moon },
    { value: "system", Icon: Monitor },
  ];

  const current = themes.find((t) => t.value === theme) ?? themes[2];
  const CurrentIcon = current.Icon;

  return (
    <div className="relative" data-theme-toggle>
      <button
        aria-label="Toggle theme"
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <CurrentIcon size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-2 p-1 rounded-xl bg-popover border border-border shadow-lg z-50"
          >
            {themes.map(({ value, Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition-colors",
                  theme === value
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={14} />
                <span className="capitalize">{value}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
  ? "navbar-scrolled"
  : "bg-transparent"
        )}
      >
        <nav className="section-container flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="EduNexus Home">
            {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform duration-200">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tight">
              Edu<span className="gradient-text">Nexus</span>
            </span> */}
            <OMLLogo size={70} />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-brand-600 dark:text-brand-400 bg-brand-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={14} />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <Link href="/contact" className="btn-brand text-sm px-4 py-2">
              Free Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-background border-l border-border shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display font-black text-lg">
                  Edu<span className="gradient-text">Nexus</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "text-brand-600 bg-brand-500/10"
                          : "text-foreground hover:bg-accent"
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <Phone size={14} />
                  {SITE_CONFIG.phone}
                </a>
                <Link href="/contact" className="btn-brand w-full justify-center">
                  Book Free Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}