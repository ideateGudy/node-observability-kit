import React from "react";

export interface StacklenzzLogoProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export function StacklenzzLogo({ size = 34, className = "", showGlow = true }: StacklenzzLogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: showGlow ? "drop-shadow(0 0 10px rgba(99, 102, 241, 0.45))" : "none",
        }}
      >
        <defs>
          <linearGradient id="slz-base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="slz-lens-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="slz-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
          <radialGradient id="slz-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
          </radialGradient>
        </defs>

        {/* Rounded squircle badge container */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="11"
          fill="#090d16"
          stroke="url(#slz-base-grad)"
          strokeWidth="1.8"
        />

        {/* Background subtle radial glow inside lens */}
        <circle cx="20" cy="20" r="14" fill="url(#slz-center-glow)" />

        {/* Outer Optical Lens Ring (representing the "Lens") */}
        <circle
          cx="20"
          cy="20"
          r="11.5"
          stroke="url(#slz-lens-grad)"
          strokeWidth="1.6"
          strokeDasharray="4 2"
          strokeOpacity="0.85"
        />

        {/* Stack Layers (Horizontal isometric tech layers) */}
        {/* Layer 1 - Bottom Plate */}
        <path
          d="M 12 28 L 20 31.5 L 28 28"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Layer 2 - Middle Plate */}
        <path
          d="M 12 24 L 20 27.5 L 28 24"
          stroke="#64748b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top telemetry pulse spark & crosshair inside lens aperture */}
        {/* Real-time telemetry pulse wave */}
        <path
          d="M 10 20 L 15 20 L 17.5 14 L 21 25 L 23.5 17 L 25.5 20 L 30 20"
          stroke="url(#slz-pulse-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Optical Aperture Focal Point (The glowing Lens Eye) */}
        <circle cx="20" cy="20" r="2" fill="#38bdf8" />
        <circle cx="20" cy="20" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
}
