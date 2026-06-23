"use client";

import { useEffect, useRef } from "react";

interface OMLLogoProps {
  size?: number;
  className?: string;
}

export default function OMLLogo({ size = 120, className = "" }: OMLLogoProps) {
  const outerRef = useRef<SVGGElement>(null);
  const innerRef = useRef<SVGGElement>(null);
  const midRef   = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let outer = 0;
    let inner = 0;
    let mid   = 0;

    let raf: number;
    let last = performance.now();

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;

      outer += dt * (360 / 8);
      inner -= dt * (360 / 5);
      mid   += dt * (360 / 12);

      if (outerRef.current) outerRef.current.style.transform = `rotate(${outer}deg)`;
      if (innerRef.current) innerRef.current.style.transform = `rotate(${inner}deg)`;
      if (midRef.current)   midRef.current.style.transform   = `rotate(${mid}deg)`;

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Open Mind Learning logo"
      role="img"
    >
      {/* Outer ring + large dot */}
      <g
        ref={outerRef}
        style={{ transformOrigin: "100px 100px", willChange: "transform" }}
      >
        <circle
          cx="100" cy="100" r="75"
          fill="none"
          stroke="#1a6fa8"
          strokeWidth="5"
          strokeDasharray="220 60"
          strokeLinecap="round"
        />
        {/* Large top dot */}
        <circle cx="100" cy="25" r="12" fill="#2196c4" />
        {/* Small right dot */}
        <circle cx="175" cy="100" r="5" fill="#1a6fa8" />
      </g>

      {/* Mid ring */}
      <g
        ref={midRef}
        style={{ transformOrigin: "100px 100px", willChange: "transform" }}
      >
        <circle
          cx="100" cy="100" r="52"
          fill="none"
          stroke="#1a6fa8"
          strokeWidth="4"
          strokeDasharray="140 50"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="100" cy="48"  r="5" fill="#2196c4" opacity="0.85" />
        <circle cx="100" cy="152" r="6" fill="#1a6fa8" opacity="0.85" />
      </g>

      {/* Inner ring + left dot */}
      <g
        ref={innerRef}
        style={{ transformOrigin: "100px 100px", willChange: "transform" }}
      >
        <circle
          cx="100" cy="100" r="30"
          fill="none"
          stroke="#1a6fa8"
          strokeWidth="3.5"
          strokeDasharray="80 25"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="100" cy="70" r="4"  fill="#2196c4" />
        {/* Large left dot */}
        <circle cx="25"  cy="100" r="10" fill="#1d5d8c" />
      </g>

      {/* OML text — static */}
      <text
        x="108" y="112"
        fontFamily="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif"
        fontSize="40"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="1"
      >
        OML
      </text>
    </svg>
  );
}