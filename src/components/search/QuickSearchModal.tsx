import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Copy, ExternalLink, ArrowRight } from 'lucide-react';
import { GOOGLE_DORKS } from '../../data/google-dorks';
import { YANDEX_DORKS } from '../../data/yandex-dorks';
import { DorkItem, SearchEngine } from '../../types/dork';
import { normalizeTarget, formatQuery, buildSearchUrl } from '../../utils/dorkUtils';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetDomain: string;
  onSelectDork?: (dork: DorkItem, engine: SearchEngine) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  targetDomain,
  onSelectDork,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>('google');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const target = normalizeTarget(targetDomain);
  const pool = selectedEngine === 'google' ? GOOGLE_DORKS : YANDEX_DORKS;
  const filtered = pool.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all dorks (e.g. pdf, admin, aws, logs)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Engine tabs inside quick search */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setSelectedEngine('google')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedEngine === 'google'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Google
            </button>
            <button
              onClick={() => setSelectedEngine('yandex')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedEngine === 'yandex'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Yandex
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target indicator banner */}
        <div className="px-4 py-2 bg-blue-50/60 dark:bg-blue-950/30 text-xs text-slate-600 dark:text-slate-300 border-b border-blue-100/80 dark:border-blue-900/40 flex items-center justify-between">
          <span>
            Active target: <strong className="font-mono text-blue-700 dark:text-blue-300">{target.domain}</strong>
          </span>
          <span className="text-slate-400">{filtered.length} queries matched</span>
        </div>

        {/* Results scroll list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching queries found. Try searching for &quot;credentials&quot;, &quot;config&quot;, or &quot;pdf&quot;.
            </div>
          ) : (
            filtered.map((item) => {
              const formatted = formatQuery(item.queryTemplate, target);
              return (
                <div
                  key={item.id}
                  className="group p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-blue-600 dark:text-blue-400 capitalize text-[11px]">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300 mt-1 truncate bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-800">
                      {formatted}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(formatted);
                      }}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Copy query"
                    >
                      Copy
                    </button>
                    <a
                      href={buildSearchUrl(formatted, selectedEngine)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <span>Search</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Press ESC to close</span>
          <span className="font-mono">Dorksearch Quick Engine</span>
        </div>
      </div>
    </div>
  );
};
