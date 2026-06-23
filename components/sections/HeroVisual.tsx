"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrbitNode {
  emoji: string;
  label: string;
  radius: number;
  angle: number;
  speed: number; // degrees per second
  colorClass: string;
}

interface StatCard {
  icon: string;
  label: string;
  target: number;
  suffix: string;
  bg: string;
  delay: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const ORBIT_NODES: OrbitNode[] = [
  { emoji: "📞", label: "Call",      radius: 90,  angle: 0,   speed: 18, colorClass: "bg-brand-500/10"   },
  { emoji: "💬", label: "WhatsApp", radius: 90,  angle: 120, speed: 18, colorClass: "bg-emerald-500/10" },
  { emoji: "✉️", label: "Email",    radius: 90,  angle: 240, speed: 18, colorClass: "bg-violet-500/10"  },
  { emoji: "📍", label: "Visit",    radius: 135, angle: 60,  speed: 11, colorClass: "bg-red-500/10"     },
  { emoji: "⏰", label: "Hours",    radius: 135, angle: 200, speed: 11, colorClass: "bg-amber-500/10"   },
];


// ─── useCounter ───────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      started.current = true;
      let startTime: number | null = null;

      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return value;
}

// ─── OrbitCanvas ──────────────────────────────────────────────────────────────
function OrbitCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<{ angle: number }[]>(
    ORBIT_NODES.map((n) => ({ angle: n.angle }))
  );
  const nodeEls = useRef<(HTMLDivElement | null)[]>([]);
  const innerEls = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      ORBIT_NODES.forEach((node, i) => {
        nodesRef.current[i].angle += node.speed * dt;
        const rad = (nodesRef.current[i].angle * Math.PI) / 180;
        const x = Math.cos(rad) * node.radius;
        const y = Math.sin(rad) * node.radius;
        const el = nodeEls.current[i];
        const inner = innerEls.current[i];
        if (el) el.style.transform = `translate(${x}px, ${y}px)`;
        if (inner) inner.style.transform = `rotate(${-nodesRef.current[i].angle}deg)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={canvasRef} className="relative w-[300px] h-[300px]">
      {/* Orbit rings */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-brand-500/20"
        style={{ width: 180, height: 180, transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-violet-500/15"
        style={{ width: 270, height: 270, transform: "translate(-50%, -50%)" }}
      />

      {/* Center button */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full
          bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center z-10"
        style={{ animation: "centerPulse 3s ease-in-out infinite" }}
      >
        <MessageCircle size={28} className="text-white" />
      </div>

      {/* Orbiting nodes */}
      {ORBIT_NODES.map((node, i) => (
        <div
          key={node.label}
          ref={(el) => { nodeEls.current[i] = el; }}
          className="absolute top-1/2 left-1/2"
          style={{ marginLeft: -22, marginTop: -22, willChange: "transform" }}
        >
          <div
            ref={(el) => { innerEls.current[i] = el; }}
            className={`w-11 h-11 rounded-full ${node.colorClass} border border-white/10
              flex items-center justify-center text-lg backdrop-blur-sm`}
            style={{ willChange: "transform" }}
            title={node.label}
          >
            {node.emoji}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── HeroVisual (main export) ─────────────────────────────────────────────────
export function HeroVisual() {
  return (
    <>
      {/* Keyframes — injected once */}
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes centerPulse {
          0%, 100% { box-shadow: 0 0 0 10px rgba(99,102,241,0.08), 0 0 0 22px rgba(99,102,241,0.04); }
          50%       { box-shadow: 0 0 0 18px rgba(99,102,241,0.12), 0 0 0 36px rgba(99,102,241,0.06); }
        }
        @keyframes blinkDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-6 select-none">
        {/* Orbit scene */}
        <div className="relative">
          <OrbitCanvas />
        </div>

      </div>
    </>
  );
}