"use client";

import type { Metadata } from "next";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE_CONFIG } from "@/data/site";
import { HeroVisual } from "@/components/sections/HeroVisual";

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── 3D tilt card ─────────────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  glowColor = "var(--brand-500)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({
  x: clamp(dy * -3, -6, 6),
  y: clamp(dx * 3, -6, 6),
});
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateY(-2px)" : "translateY(0)"}`,
        transition: hovered
          ? "transform 0.1s ease"
          : "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered
          ? `0 8px 32px -4px ${glowColor}33, 0 0 0 1px ${glowColor}44`
          : undefined,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Floating blob background ──────────────────────────────────────────────────
function FloatingBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute rounded-full opacity-[0.07] dark:opacity-[0.06] blur-3xl"
        style={{
          width: 560,
          height: 560,
          background: "radial-gradient(circle, var(--brand-500), transparent 70%)",
          top: "-120px",
          left: "-100px",
          animation: "blobFloat 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.05] dark:opacity-[0.04] blur-3xl"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          top: "60px",
          right: "-80px",
          animation: "blobFloat 18s ease-in-out infinite reverse",
          animationDelay: "-5s",
        }}
      />
    </div>
  );
}

// ─── Animated gradient text ────────────────────────────────────────────────────
function CinematicGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background:
          "linear-gradient(90deg, #22c55e, #06b6d4, #a855f7, #6366f1)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",

        // 🔥 IMPORTANT FIX: fallback visibility
        color: "var(--foreground)",

        // safer than full transparent fill
        WebkitTextFillColor: "transparent",

        display: "inline-block",

        // 🔥 improves readability on all themes
        textShadow: "0 1px 10px rgba(0,0,0,0.15)",

        animation: "gradientShift 6s ease infinite",
      }}
    >
      {children}
    </span>
  );
}

// ─── Ripple button wrapper ─────────────────────────────────────────────────────
function RippleWrapper({
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    props.onClick?.(e);
  };

  return (
    <a {...props} onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {children}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          style={{
            position: "absolute",
            left: rp.x - 20,
            top: rp.y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
            transform: "scale(0)",
            animation: "rippleOut 0.6s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </a>
  );
}

// ─── WhatsApp pulsing CTA ─────────────────────────────────────────────────────
function WhatsAppButton({ href }: { href: string }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <RippleWrapper
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
    >
      <div
        className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors"
        style={{ position: "relative" }}
      >
        {pulse && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              border: "2px solid #10b981",
              animation: "pulseRing 1.2s ease-out forwards",
            }}
          />
        )}
        <MessageCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">WhatsApp</p>
        <p className="text-sm font-semibold text-foreground">Chat instantly</p>
      </div>
    </RippleWrapper>
  );
}

// ─── Phone vibrate icon ───────────────────────────────────────────────────────
function PhoneButton({ href, phone }: { href: string; phone: string }) {
  const [vibrate, setVibrate] = useState(false);
  return (
    <RippleWrapper
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
      onMouseEnter={() => { setVibrate(true); setTimeout(() => setVibrate(false), 600); }}
    >
      <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
        <Phone
          size={16}
          className="text-brand-600 dark:text-brand-400"
          style={vibrate ? { animation: "vibrate 0.4s linear" } : {}}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Call us</p>
        <p className="text-sm font-semibold text-foreground">{phone}</p>
      </div>
    </RippleWrapper>
  );
}

// ─── Email open animation icon ────────────────────────────────────────────────
function EmailButton({ href, email }: { href: string; email: string }) {
  const [open, setOpen] = useState(false);
  return (
    <RippleWrapper
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
        <Mail
          size={16}
          className="text-violet-600 dark:text-violet-400"
          style={{
            transform: open ? "translateY(-2px) scale(1.15)" : "scale(1)",
            transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Email</p>
        <p className="text-sm font-semibold text-foreground">{email}</p>
      </div>
    </RippleWrapper>
  );
}

// ─── Global keyframes (injected once) ─────────────────────────────────────────
function GlobalKeyframes() {
  return (
    <style>{`
      @keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
      @keyframes blobFloat {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(24px, -18px) scale(1.05); }
        66% { transform: translate(-12px, 12px) scale(0.97); }
      }
      @keyframes fadeSlideLeft {
        from { opacity: 0; transform: translateX(-28px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes rippleOut {
        to { transform: scale(6); opacity: 0; }
      }
      @keyframes pulseRing {
        0%   { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2.2); opacity: 0; }
      }
      @keyframes vibrate {
        0%   { transform: rotate(0deg); }
        20%  { transform: rotate(-12deg); }
        40%  { transform: rotate(12deg); }
        60%  { transform: rotate(-8deg); }
        80%  { transform: rotate(8deg); }
        100% { transform: rotate(0deg); }
      }
      @keyframes mapGlow {
        0%, 100% { box-shadow: 0 0 0 0 transparent; }
        50%       { box-shadow: 0 0 0 3px var(--brand-500, #6366f1)44; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  image: `${SITE_CONFIG.url}/og-image.jpg`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  url: SITE_CONFIG.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, Tech Park, Sector 18",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122015",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  priceRange: "₹₹",
};

export default function ContactPage() {
  // Reveal refs
  const headerText = useReveal<HTMLDivElement>();
  const formReveal = useReveal<HTMLDivElement>();
  const card1 = useReveal<HTMLDivElement>();
  const card2 = useReveal<HTMLDivElement>();
  const card3 = useReveal<HTMLDivElement>();
  const mapReveal = useReveal<HTMLDivElement>();

  // Parallax for hero blobs
  const heroRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setParallaxY(rect.top * 0.18);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <GlobalKeyframes />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="pt-28 pb-14 border-b border-border"
        style={{ position: "relative", overflow: "hidden", background: "var(--muted)/0.2" }}
      >
        {/* Blob background with parallax */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transform: `translateY(${parallaxY}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: "radial-gradient(circle, var(--brand-500, #6366f1), transparent 65%)",
              opacity: 0.07,
              filter: "blur(60px)",
              top: "-160px",
              left: "-80px",
              animation: "blobFloat 16s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: "radial-gradient(circle, #a855f7, transparent 65%)",
              opacity: 0.055,
              filter: "blur(50px)",
              bottom: "-60px",
              right: "5%",
              animation: "blobFloat 20s ease-in-out infinite reverse",
              animationDelay: "-8s",
            }}
          />
          {/* Subtle animated grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              opacity: 0.35,
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
        </div>

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT — existing text */}
    <div
      ref={headerText.ref}
      style={
        headerText.visible
          ? { animation: "fadeSlideUp 0.7s cubic-bezier(0.23,1,0.32,1) both" }
          : { opacity: 0 }
      }
    >
      <span className="badge-brand mb-3">Get In Touch</span>
      <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mt-4 mb-5 leading-tight">
        Let's talk about{" "}
        <CinematicGradientText>your future</CinematicGradientText>
      </h1>
      <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
        Whether you have a question, need career advice, or are ready to enroll — we're here
        for every step. Book a free consultation or drop us a message.
      </p>
    </div>

    {/* RIGHT — hero visual (hidden on mobile) */}
    <div className="hidden lg:flex items-center justify-center">
      <HeroVisual />
    </div>

  </div>
</div>
      </section>

      {/* ── Contact Grid ─────────────────────────────────────────────────── */}
      <section className="section-py" style={{ position: "relative" }}>
        {/* Subtle animated background */}
        <FloatingBlobs />

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid lg:grid-cols-5 gap-10">

            {/* ── Form (slide from left) ─────────────────────────────────── */}
            <div
              ref={formReveal.ref}
              className="lg:col-span-3"
              style={
                formReveal.visible
                  ? { animation: "fadeSlideLeft 0.75s cubic-bezier(0.23,1,0.32,1) both" }
                  : { opacity: 0 }
              }
            >
              <TiltCard
                className="p-8 rounded-3xl border border-border bg-background shadow-sm"
                glowColor="var(--brand-500, #6366f1)"
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                  Send us a message
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill in your details and we'll get back to you within 24 hours.
                </p>
                {/* ContactForm should have focus-glow + label-float styles on its inputs */}
                <ContactForm />
              </TiltCard>
            </div>

            {/* ── Info Panel (staggered cards) ───────────────────────────── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Card 1 – Direct contact */}
              <div
                ref={card1.ref}
                style={
                  card1.visible
                    ? { animation: "fadeSlideUp 0.6s 0.05s cubic-bezier(0.23,1,0.32,1) both" }
                    : { opacity: 0 }
                }
              >
                <TiltCard
                  className="p-6 rounded-2xl border border-border bg-background"
                  glowColor="var(--brand-500, #6366f1)"
                >
                  <h3 className="font-semibold text-foreground mb-4">Prefer direct contact?</h3>
                  <div className="space-y-1">
                    <PhoneButton href={`tel:${SITE_CONFIG.phone}`} phone={SITE_CONFIG.phone} />
                    <WhatsAppButton
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I'd like to know more about EduNexus programs.`}
                    />
                    <EmailButton href={`mailto:${SITE_CONFIG.email}`} email={SITE_CONFIG.email} />
                  </div>
                </TiltCard>
              </div>

              {/* Card 2 – Hours */}
              <div
                ref={card2.ref}
                style={
                  card2.visible
                    ? { animation: "fadeSlideUp 0.6s 0.18s cubic-bezier(0.23,1,0.32,1) both" }
                    : { opacity: 0 }
                }
              >
                <TiltCard
                  className="p-6 rounded-2xl border border-border bg-background"
                  glowColor="#a855f7"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-muted-foreground" />
                    <h3 className="font-semibold text-foreground text-sm">Office Hours</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                      { day: "Saturday", time: "10:00 AM – 5:00 PM" },
                      { day: "Sunday", time: "Closed" },
                    ].map(({ day, time }) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{day}</span>
                        <span className="font-medium text-foreground">{time}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </div>

              {/* Card 3 – Address */}
              <div
                ref={card3.ref}
                style={
                  card3.visible
                    ? { animation: "fadeSlideUp 0.6s 0.30s cubic-bezier(0.23,1,0.32,1) both" }
                    : { opacity: 0 }
                }
              >
                <TiltCard
                  className="p-6 rounded-2xl border border-border bg-background"
                  glowColor="#10b981"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-muted-foreground" />
                    <h3 className="font-semibold text-foreground text-sm">Visit Us</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {SITE_CONFIG.address}
                  </p>
                  <a
                    href="https://maps.google.com/?q=237%2C%20First%20Floor%2C%20Gaur%20City%20Centre%2C%20Noida%20Extension%2C%20Gautam%20Budh%20Nagar%2C%20UP%20201301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
                    style={{ transition: "opacity 0.2s" }}
                  >
                    Open in Google Maps →
                  </a>
                </TiltCard>
              </div>

              {/* Map – card reveal + glow hover */}
              <div
                ref={mapReveal.ref}
                style={
                  mapReveal.visible
                    ? { animation: "fadeSlideUp 0.65s 0.42s cubic-bezier(0.23,1,0.32,1) both" }
                    : { opacity: 0 }
                }
              >
                <MapCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Map card with glow hover + zoom ─────────────────────────────────────────
function MapCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid var(--border)",
        height: 192,
        position: "relative",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered
          ? "0 0 0 2px var(--brand-500, #6366f1)55, 0 8px 32px -4px var(--brand-500, #6366f1)22"
          : "none",
        transform: hovered ? "scale(1.012)" : "scale(1)",
      }}
    >
      {/* "Visit us" tooltip on hover */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: `translateX(-50%) translateY(${hovered ? 0 : -8}px)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s, transform 0.25s",
          background: "var(--brand-500, #6366f1)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 10px",
          borderRadius: 999,
          pointerEvents: "none",
          zIndex: 2,
          whiteSpace: "nowrap",
        }}
      >
        📍 Visit us
      </div>

      <iframe
  src="https://maps.google.com/maps?q=237%2C%20First%20Floor%2C%20Gaur%20City%20Centre%2C%20Noida%20Extension%2C%20Gautam%20Budh%20Nagar%2C%20UP%20201301&output=embed"
  width="100%"
  height="100%"
  style={{
    border: 0,
    display: "block",
    transition: "transform 0.4s ease",
    transform: hovered ? "scale(1.04)" : "scale(1)",
  }}
  loading="lazy"
  allowFullScreen
  title="Location Map"
/>
    </div>
  );
}