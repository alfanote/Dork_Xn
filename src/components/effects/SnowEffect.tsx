import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number; // percentage (0 - 100%)
  size: number; // size in px
  opacity: number;
  duration: number; // fall duration in seconds
  delay: number; // negative delay so screen starts with snow everywhere
  swayDuration: number;
  swayDistance: number;
  blur: number;
  character?: string;
  isForeground?: boolean;
}

interface SnowEffectProps {
  flakeCount?: number;
  className?: string;
}

export const SnowEffect: React.FC<SnowEffectProps> = ({
  flakeCount = 85,
  className = '',
}) => {
  // Generate multi-depth falling flakes (fine powder, crystals, large soft flakes)
  const snowflakes = useMemo<Snowflake[]>(() => {
    const flakes: Snowflake[] = [];
    const characters = ['❄', '❅', '✻', '•', '·', '❅', '❆', '•'];

    for (let i = 0; i < flakeCount; i++) {
      const type = i % 5;
      const isCrystal = type === 0 || type === 2;
      const isLarge = type === 4;

      let size = 3 + Math.random() * 5;
      if (isCrystal) size = 9 + Math.random() * 10;
      if (isLarge) size = 7 + Math.random() * 7;

      flakes.push({
        id: i,
        left: Math.random() * 100,
        size,
        opacity: isCrystal ? 0.4 + Math.random() * 0.55 : 0.25 + Math.random() * 0.5,
        duration: isLarge ? 6 + Math.random() * 6 : 9 + Math.random() * 12,
        delay: -(Math.random() * 20),
        swayDuration: 2.5 + Math.random() * 4,
        swayDistance: 15 + Math.random() * 35,
        blur: isLarge ? 0.8 + Math.random() * 1.2 : Math.random() > 0.7 ? 0.6 : 0,
        character: isCrystal ? characters[i % characters.length] : undefined,
        isForeground: isLarge,
      });
    }
    return flakes;
  }, [flakeCount]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-30 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. TOP FROST & HANGING ICICLES (Subtle realistic frozen ice ceiling) */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-b from-sky-200/40 via-cyan-100/20 to-transparent dark:from-cyan-900/40 dark:via-sky-950/20 dark:to-transparent pointer-events-none z-20">
        <svg
          className="w-full h-8 sm:h-12 text-sky-100/70 dark:text-cyan-200/25 drop-shadow-[0_2px_4px_rgba(56,189,248,0.3)]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 40"
          fill="currentColor"
        >
          {/* Detailed icicle drips hanging across the header */}
          <path d="M0,0 L1200,0 L1200,8 Q1185,28 1175,10 Q1160,35 1150,12 Q1130,22 1120,6 Q1100,32 1090,14 Q1075,20 1065,8 Q1045,36 1035,10 Q1015,25 1005,6 Q985,34 975,12 Q955,22 945,8 Q925,38 915,14 Q895,24 885,8 Q865,32 855,10 Q835,26 825,8 Q805,34 795,12 Q775,22 765,6 Q745,38 735,14 Q715,24 705,8 Q685,30 675,10 Q655,25 645,8 Q625,36 615,12 Q595,22 585,6 Q565,34 555,10 Q535,26 525,8 Q505,38 495,14 Q475,22 465,6 Q445,32 435,10 Q415,24 405,8 Q385,35 375,12 Q355,22 345,6 Q325,32 315,10 Q295,25 285,8 Q265,38 255,14 Q235,22 225,6 Q205,34 195,10 Q175,24 165,8 Q145,32 135,12 Q115,22 105,6 Q85,36 75,14 Q55,24 45,8 Q25,32 15,10 Q5,20 0,8 Z" />
        </svg>
      </div>

      {/* 2. FROZEN VIGNETTE CORNERS (Frost spreading inwards on glass viewport) */}
      {/* Top Left Frost Corner */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-[radial-gradient(ellipse_at_top_left,rgba(186,230,253,0.35)_0%,rgba(224,242,254,0.15)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.22)_0%,rgba(14,165,233,0.08)_45%,transparent_75%)] pointer-events-none" />

      {/* Top Right Frost Corner */}
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[radial-gradient(ellipse_at_top_right,rgba(186,230,253,0.35)_0%,rgba(224,242,254,0.15)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.22)_0%,rgba(14,165,233,0.08)_45%,transparent_75%)] pointer-events-none" />

      {/* Bottom Left Frost Accumulation */}
      <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(186,230,253,0.35)_0%,rgba(224,242,254,0.15)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.20)_0%,rgba(14,165,233,0.08)_45%,transparent_75%)] pointer-events-none" />

      {/* Bottom Right Frost Accumulation */}
      <div className="absolute bottom-0 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-[radial-gradient(ellipse_at_bottom_right,rgba(186,230,253,0.35)_0%,rgba(224,242,254,0.15)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.20)_0%,rgba(14,165,233,0.08)_45%,transparent_75%)] pointer-events-none" />

      {/* 3. FROZEN SNOW DRIFT AT BOTTOM OF VIEWPORT */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-t from-sky-100/50 via-cyan-50/25 to-transparent dark:from-cyan-950/60 dark:via-sky-950/25 dark:to-transparent pointer-events-none z-20">
        <svg
          className="w-full h-6 sm:h-10 text-sky-200/60 dark:text-cyan-300/15"
          preserveAspectRatio="none"
          viewBox="0 0 1200 30"
          fill="currentColor"
        >
          {/* Subtle accumulated snow mounds */}
          <path d="M0,30 L1200,30 L1200,12 Q1100,5 1000,14 Q900,20 800,10 Q700,4 600,15 Q500,22 400,11 Q300,5 200,16 Q100,20 0,10 Z" />
        </svg>
      </div>

      {/* 4. SUBTLE ICE GLISTEN PARTICLES ON FROST EDGES */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* 5. GENTLE FALLING SNOW PARTICLES & CRYSTALS */}
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className={`absolute block pointer-events-none will-change-transform ${
            flake.isForeground
              ? 'text-cyan-200/90 dark:text-white/80'
              : 'text-sky-300/80 dark:text-sky-100/70'
          }`}
          style={{
            left: `${flake.left}%`,
            top: '-25px',
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            filter: flake.blur ? `blur(${flake.blur}px)` : undefined,
            animationName: 'snowFall',
            animationDuration: `${flake.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${flake.delay}s`,
          }}
        >
          {flake.character ? (
            <span
              className="inline-block drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]"
              style={{
                animationName: 'snowSway',
                animationDuration: `${flake.swayDuration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDirection: 'alternate',
              }}
            >
              {flake.character}
            </span>
          ) : (
            <span
              className="inline-block rounded-full bg-cyan-200 dark:bg-white shadow-[0_0_6px_rgba(186,230,253,0.9)]"
              style={{
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animationName: 'snowSway',
                animationDuration: `${flake.swayDuration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDirection: 'alternate',
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};
