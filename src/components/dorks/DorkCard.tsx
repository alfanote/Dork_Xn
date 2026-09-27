import React, { useState } from 'react';
import { DorkItem, SearchEngine, RiskLevel } from '../../types/dork';
import { buildSearchUrl } from '../../utils/dorkUtils';
import { Copy, Check, ExternalLink, Star } from 'lucide-react';

interface DorkCardProps {
  item: DorkItem;
  formattedQuery: string;
  engine: SearchEngine;
  isFavorite: boolean;
  onToggleFavorite: (item: DorkItem, formattedQuery: string) => void;
  showMascotTouch?: boolean;
}

const RISK_BADGES: Record<RiskLevel, { bg: string; label: string }> = {
  Info: { bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800', label: 'Info' },
  Recon: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800', label: 'Recon' },
  Low: { bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700', label: 'Low Impact' },
  Audit: { bg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800', label: 'Audit Check' },
  Sensitive: { bg: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800', label: 'Sensitive' },
};

export const DorkCard: React.FC<DorkCardProps> = ({
  item,
  formattedQuery,
  engine,
  isFavorite,
  onToggleFavorite,
  showMascotTouch = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(formattedQuery);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = formattedQuery;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildSearchUrl(formattedQuery, engine);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const risk = RISK_BADGES[item.riskLevel] || RISK_BADGES.Info;

  return (
    <div className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Header: Unboxed metadata + category & risk */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-blue-600 dark:text-blue-400 capitalize">
              {item.category.replace('-', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${risk.bg}`}>
              {risk.label}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item, formattedQuery);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            aria-label={isFavorite ? 'Remove favorite' : 'Save favorite'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title & Description */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          {showMascotTouch && (
            <span
              className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 px-1.5 py-0.5 rounded font-mono shrink-0 select-none"
              title="Mascot favorite query"
            >
              🐾 Pip's Pick
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Query Monospace Preview Box */}
        <div className="mt-3.5 relative rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 p-3">
          <p className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all leading-relaxed">
            {formattedQuery}
          </p>
        </div>
      </div>

      {/* Action Buttons: Copy & Search */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            copied
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Copied! ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm hover:shadow transition-all active:scale-95 whitespace-nowrap"
        >
          <span>Search {engine === 'yandex' ? 'Yandex' : 'Google'}</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </button>
      </div>
    </div>
  );
};
