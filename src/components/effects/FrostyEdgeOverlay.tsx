import React from 'react';

interface FrostyEdgeOverlayProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'deep';
}

/**
 * FrostyEdgeOverlay component:
 * Adds a high-fidelity CSS-based frozen vignette and crystalline frost patterns
 * to the four corners and borders of the viewport.
 * 
 * Fully non-intrusive:
 * - Uses `pointer-events-none` so zero clicks, inputs, or user interactions are blocked.
 * - Hardware accelerated CSS gradients, backdrops, and SVG ice crystal fractals.
 * - Perfectly responsive across mobile and desktop.
 */
export const FrostyEdgeOverlay: React.FC<FrostyEdgeOverlayProps> = ({
  className = '',
  intensity = 'medium',
}) => {
  const opacityMap = {
    subtle: 'opacity-60',
    medium: 'opacity-85',
    deep: 'opacity-100',
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-20 overflow-hidden select-none ${opacityMap[intensity]} ${className}`}
      aria-hidden="true"
    >
      {/* 1. Global Viewport Frost Vignette (Soft icy border around the entire window) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(186,230,253,0.35)] dark:shadow-[inset_0_0_90px_rgba(56,189,248,0.18)]" />

      {/* 2. Top-Left Corner Frost & Ice Crystals */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 pointer-events-none">
        {/* Soft radial icy glow */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(186,230,253,0.5)_0%,rgba(224,242,254,0.25)_35%,rgba(240,249,255,0.08)_60%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.28)_0%,rgba(14,165,233,0.14)_35%,rgba(2,132,199,0.05)_60%,transparent_75%)]" />
        {/* Crystalline frost crystal patterns */}
        <svg
          className="absolute top-0 left-0 w-44 sm:w-60 h-44 sm:h-60 text-sky-200/50 dark:text-cyan-300/20"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Main ice dendritic branches spreading from corner */}
          <path d="M0,0 L65,65 M65,65 L80,50 M65,65 L50,80 M65,65 L105,105 M105,105 L125,85 M105,105 L85,125 M105,105 L150,150" opacity="0.8" />
          <path d="M0,25 L45,55 M45,55 L75,70 M75,70 L110,85 M75,70 L90,50" opacity="0.6" />
          <path d="M25,0 L55,45 M55,45 L70,75 M70,75 L85,110 M70,75 L50,90" opacity="0.6" />
          <path d="M0,60 L30,75 M30,75 L55,105 M30,75 L15,100" opacity="0.5" />
          <path d="M60,0 L75,30 M75,30 L105,55 M75,30 L100,15" opacity="0.5" />
          {/* Frost fern fronds */}
          <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="45" cy="35" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="35" cy="45" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="65" cy="65" r="2" fill="currentColor" opacity="0.8" />
          <circle cx="90" cy="50" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* 3. Top-Right Corner Frost & Ice Crystals */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(186,230,253,0.5)_0%,rgba(224,242,254,0.25)_35%,rgba(240,249,255,0.08)_60%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.28)_0%,rgba(14,165,233,0.14)_35%,rgba(2,132,199,0.05)_60%,transparent_75%)]" />
        <svg
          className="absolute top-0 right-0 w-44 sm:w-60 h-44 sm:h-60 text-sky-200/50 dark:text-cyan-300/20 transform scale-x-[-1]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M0,0 L65,65 M65,65 L80,50 M65,65 L50,80 M65,65 L105,105 M105,105 L125,85 M105,105 L85,125 M105,105 L150,150" opacity="0.8" />
          <path d="M0,25 L45,55 M45,55 L75,70 M75,70 L110,85 M75,70 L90,50" opacity="0.6" />
          <path d="M25,0 L55,45 M55,45 L70,75 M70,75 L85,110 M70,75 L50,90" opacity="0.6" />
          <path d="M0,60 L30,75 M30,75 L55,105 M30,75 L15,100" opacity="0.5" />
          <path d="M60,0 L75,30 M75,30 L105,55 M75,30 L100,15" opacity="0.5" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="65" cy="65" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {/* 4. Bottom-Left Corner Frost & Ice Crystals */}
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(186,230,253,0.5)_0%,rgba(224,242,254,0.25)_35%,rgba(240,249,255,0.08)_60%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.26)_0%,rgba(14,165,233,0.12)_35%,rgba(2,132,199,0.05)_60%,transparent_75%)]" />
        <svg
          className="absolute bottom-0 left-0 w-44 sm:w-60 h-44 sm:h-60 text-sky-200/50 dark:text-cyan-300/20 transform scale-y-[-1]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M0,0 L65,65 M65,65 L80,50 M65,65 L50,80 M65,65 L105,105 M105,105 L125,85 M105,105 L85,125 M105,105 L150,150" opacity="0.8" />
          <path d="M0,25 L45,55 M45,55 L75,70 M75,70 L110,85 M75,70 L90,50" opacity="0.6" />
          <path d="M25,0 L55,45 M55,45 L70,75 M70,75 L85,110 M70,75 L50,90" opacity="0.6" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="65" cy="65" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {/* 5. Bottom-Right Corner Frost & Ice Crystals */}
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(186,230,253,0.5)_0%,rgba(224,242,254,0.25)_35%,rgba(240,249,255,0.08)_60%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.26)_0%,rgba(14,165,233,0.12)_35%,rgba(2,132,199,0.05)_60%,transparent_75%)]" />
        <svg
          className="absolute bottom-0 right-0 w-44 sm:w-60 h-44 sm:h-60 text-sky-200/50 dark:text-cyan-300/20 transform scale-[-1]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M0,0 L65,65 M65,65 L80,50 M65,65 L50,80 M65,65 L105,105 M105,105 L125,85 M105,105 L85,125 M105,105 L150,150" opacity="0.8" />
          <path d="M0,25 L45,55 M45,55 L75,70 M75,70 L110,85 M75,70 L90,50" opacity="0.6" />
          <path d="M25,0 L55,45 M55,45 L70,75 M70,75 L85,110 M70,75 L50,90" opacity="0.6" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="65" cy="65" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {/* 6. Subtle Ice Rim Borders (Top & Bottom Frost Lines) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300/60 dark:via-cyan-400/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300/60 dark:via-cyan-400/40 to-transparent pointer-events-none" />
    </div>
  );
};
