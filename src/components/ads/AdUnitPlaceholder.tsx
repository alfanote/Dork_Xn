import React from 'react';

interface AdUnitPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-article';
  className?: string;
}

/**
 * Clean, compliant ad placeholder unit adhering strictly to Google AdSense policies:
 * - Clear labeling ("Advertisement")
 * - Dedicated reserved container dimensions to prevent Cumulative Layout Shift (CLS)
 * - Natural spacing, unobtrusive, content-first presentation
 * - Non-deceptive, no fake download buttons, no deceptive overlays
 */
export const AdUnitPlaceholder: React.FC<AdUnitPlaceholderProps> = ({
  slotId = 'content-unit',
  format = 'horizontal',
  className = '',
}) => {
  const formatStyles = {
    horizontal: 'w-full min-h-[90px] max-w-4xl mx-auto my-6',
    rectangle: 'w-full min-h-[250px] max-w-[336px] mx-auto my-6',
    'in-article': 'w-full min-h-[100px] max-w-3xl mx-auto my-8',
  };

  return (
    <div
      className={`relative rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-3 text-center flex flex-col items-center justify-center transition-colors ${formatStyles[format]} ${className}`}
      aria-label="Advertisement container"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1 select-none">
        Advertisement
      </span>
      <div className="w-full h-full flex flex-col items-center justify-center py-2 text-slate-400 dark:text-slate-600">
        <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/50 flex items-center justify-center text-xs mb-1">
          ad
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          AdSense Responsive Unit · {slotId}
        </span>
      </div>
    </div>
  );
};
