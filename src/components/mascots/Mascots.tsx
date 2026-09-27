import React from 'react';

// Verified generated artwork assets
export const MASCOT_IMAGES = {
  hero: '/src/assets/images/hero_cat_mouse_osint_1790502154129.jpg',
  googleDorks: '/src/assets/images/google_dorks_mascot_1790502171913.jpg',
  yandexAirplane: '/src/assets/images/yandex_mascot_airplane_1790502186951.jpg',
  aboutTeam: '/src/assets/images/about_cat_mouse_team_1790502203623.jpg',
};

/**
 * Brand Logo Icon: Magnifying glass with original cute cat & mouse silhouette
 */
export const MascotLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Magnifying Glass Outer Rim */}
      <circle cx="18" cy="18" r="14" fill="#EFF6FF" stroke="#2563EB" strokeWidth="3" />
      
      {/* Cat (Slate Blue) Inside Lens */}
      <path
        d="M11 25C11 20 13 16 18 16C23 16 25 20 25 25Z"
        fill="#64748B"
      />
      {/* Cat Ears */}
      <polygon points="12,18 10,12 15,16" fill="#475569" />
      <polygon points="21,16 26,12 24,18" fill="#475569" />
      {/* Cat Eyes */}
      <circle cx="15" cy="20" r="1.5" fill="#FEF08A" />
      <circle cx="21" cy="20" r="1.5" fill="#FEF08A" />
      <circle cx="15.4" cy="20" r="0.8" fill="#0F172A" />
      <circle cx="21.4" cy="20" r="0.8" fill="#0F172A" />
      <ellipse cx="18" cy="22.5" rx="1" ry="0.6" fill="#F43F5E" />

      {/* Mouse (Warm Orange/Brown) Peeking on the rim */}
      <ellipse cx="28" cy="13" rx="5" ry="4" fill="#F97316" />
      {/* Mouse Ears */}
      <circle cx="26" cy="8" r="2.8" fill="#FB923C" stroke="#EA580C" strokeWidth="0.8" />
      <circle cx="31" cy="9" r="2.8" fill="#FB923C" stroke="#EA580C" strokeWidth="0.8" />
      <circle cx="26" cy="8" r="1.4" fill="#FECDD3" />
      <circle cx="31" cy="9" r="1.4" fill="#FECDD3" />
      {/* Mouse Eye */}
      <circle cx="27" cy="12" r="1" fill="#0F172A" />
      <ellipse cx="29.5" cy="14" rx="0.8" ry="0.6" fill="#E11D48" />

      {/* Magnifying Glass Handle */}
      <path
        d="M28.5 28.5L38.5 38.5"
        stroke="#1E40AF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Glass glint sparkle */}
      <path
        d="M10 13C12 10 15 8 19 8"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Interactive Input Mascot: Mouse watching domain input
 */
export const InputWatcherMouse: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  return (
    <div
      className={`transition-all duration-300 transform pointer-events-none flex items-center gap-1.5 ${
        isFocused ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-1 opacity-70 scale-95'
      }`}
    >
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Mouse body */}
        <ellipse cx="17" cy="18" rx="10" ry="8" fill="#F97316" />
        {/* Ears */}
        <circle cx="11" cy="10" r="4.5" fill="#FB923C" stroke="#EA580C" strokeWidth="1" />
        <circle cx="11" cy="10" r="2.5" fill="#FDA4AF" />
        <circle cx="23" cy="10" r="4.5" fill="#FB923C" stroke="#EA580C" strokeWidth="1" />
        <circle cx="23" cy="10" r="2.5" fill="#FDA4AF" />
        {/* Eyes animated looking down when focused */}
        <ellipse cx="14" cy="17" rx="2" ry="2.2" fill="#FFFFFF" />
        <ellipse cx="20" cy="17" rx="2" ry="2.2" fill="#FFFFFF" />
        <circle
          cx={isFocused ? '14' : '15'}
          cy={isFocused ? '18' : '17'}
          r="1.2"
          fill="#0F172A"
          className="transition-all duration-200"
        />
        <circle
          cx={isFocused ? '20' : '21'}
          cy={isFocused ? '18' : '17'}
          r="1.2"
          fill="#0F172A"
          className="transition-all duration-200"
        />
        {/* Cute nose */}
        <polygon points="16,20 18,20 17,21.5" fill="#BE123C" />
        {/* Whiskers */}
        <line x1="8" y1="19" x2="13" y2="20" stroke="#78350F" strokeWidth="0.8" />
        <line x1="8" y1="21" x2="13" y2="21" stroke="#78350F" strokeWidth="0.8" />
        <line x1="21" y1="20" x2="26" y2="19" stroke="#78350F" strokeWidth="0.8" />
        <line x1="21" y1="21" x2="26" y2="21" stroke="#78350F" strokeWidth="0.8" />
      </svg>
      <span className="text-xs font-semibold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300 shadow-sm hidden sm:inline-block">
        {isFocused ? 'Ready to search!' : 'Type domain'}
      </span>
    </div>
  );
};

/**
 * Responsive Mascot Image with fallback container
 */
export const MascotArtwork: React.FC<{
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
}> = ({ src, alt, className = '', aspectRatioClass = 'aspect-[16/9]' }) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-blue-50/60 to-slate-50 shadow-sm ${aspectRatioClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-blue-50/40">
          <MascotLogoIcon className="w-16 h-16 mb-3 text-blue-600 animate-pulse" />
          <h4 className="text-sm font-semibold text-slate-800">{alt}</h4>
          <p className="text-xs text-slate-500 mt-1">Dorksearch Research Companion</p>
        </div>
      )}
    </div>
  );
};
