import React, { useState } from 'react';
import { YANDEX_DORKS } from '../data/yandex-dorks';
import { normalizeTarget, formatQuery, buildSearchUrl } from '../utils/dorkUtils';
import { MascotArtwork, MASCOT_IMAGES } from '../components/mascots/Mascots';
import { DorkCard } from '../components/dorks/DorkCard';
import { DorkItem } from '../types/dork';
import {
  Globe2,
  BookOpen,
  Code,
  ShieldCheck,
  ExternalLink,
  Plane,
  Sparkles,
} from 'lucide-react';

interface YandexDorksPageProps {
  targetDomain: string;
  setTargetDomain: (domain: string) => void;
  favorites: string[];
  onToggleFavorite: (item: DorkItem, formattedQuery: string) => void;
}

export const YandexDorksPage: React.FC<YandexDorksPageProps> = ({
  targetDomain,
  setTargetDomain,
  favorites,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'operators' | 'library'>('operators');
  const target = normalizeTarget(targetDomain);

  const yandexOperators = [
    {
      operator: 'rhost:',
      description: 'Reversed host notation for systematic subdomain enumeration.',
      example: `rhost:${target.rhost}.*`,
      usage: 'Unlike Google -www queries, Yandex rhost: allows querying backwards host trees (e.g. com.example.*) to list indexed subdomains alphabetically from a to z.',
    },
    {
      operator: 'host:',
      description: 'Matches exact hostname or subdomain.',
      example: `host:api.${target.domain}`,
      usage: 'Quickly tests whether specific service hostnames (dev, staging, api, portal) are cataloged.',
    },
    {
      operator: 'mime:',
      description: 'Yandex file format operator (equivalent to filetype: in Google).',
      example: `site:${target.domain} mime:pdf`,
      usage: 'Filters documents by MIME type: mime:pdf, mime:xls, mime:doc, mime:ppt, mime:rtf.',
    },
    {
      operator: 'url:',
      description: 'URL pattern matching with wildcard asterisk support.',
      example: `url:${target.domain}/api/*`,
      usage: 'Matches complete or partial directory paths such as /admin*, /v1/*, and /graphql*.',
    },
    {
      operator: 'date:',
      description: 'Filters indexed documents within precise publication dates.',
      example: `site:${target.domain} date:20250927..20260927`,
      usage: 'Isolates content indexed within the past 12 months for fresh intelligence.',
    },
    {
      operator: 'domain:',
      description: 'Searches across all subdomains and TLD registrations sharing root name.',
      example: `domain:${target.rootName}`,
      usage: 'Identifies related international and regional top-level domains (.ru, .com, .org, .de).',
    },
    {
      operator: 'lang:',
      description: 'Filters documents by detected human language code.',
      example: `site:${target.domain} lang:en`,
      usage: 'Separates localized pages (e.g. lang:ru vs lang:en) on multilingual international web applications.',
    },
    {
      operator: '"Index of /"',
      description: 'Standard open directory search string in Yandex.',
      example: `"Index of /" "Parent Directory" site:${target.domain}`,
      usage: 'Pinpoints web servers exposing file tree listings without default index documents.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50/70 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Yandex Special Syntax Reference</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Explore Yandex Search Operators
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Yandex features distinct, powerful search operators not available in other engines—most notably reversed-host notation (<code className="font-mono text-amber-700 dark:text-amber-400">rhost:</code>) and the <code className="font-mono text-amber-700 dark:text-amber-400">mime:</code> filter.
              </p>

              {/* Target Domain Input */}
              <div className="pt-2 flex items-center gap-2 max-w-md">
                <span className="text-xs font-semibold text-slate-500">Target:</span>
                <input
                  type="text"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="Target domain (example.com)..."
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <MascotArtwork
                src={MASCOT_IMAGES.yandexAirplane}
                alt="Playful cartoon mouse Pip flying an origami paper airplane with a Yandex search query while cat Barnaby looks surprised"
                aspectRatioClass="aspect-[4/3]"
                className="shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('operators')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'operators'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Yandex Operators Explained
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'library'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Curated Yandex Dorks ({YANDEX_DORKS.length})
          </button>
        </div>

        {activeTab === 'operators' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {yandexOperators.map((op) => (
                <div
                  key={op.operator}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900 inline-block mb-2">
                      {op.operator}
                    </span>
                    <p className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      {op.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {op.usage}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <code className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded truncate">
                      {op.example}
                    </code>
                    <a
                      href={buildSearchUrl(op.example, 'yandex')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg flex items-center gap-1 shrink-0"
                    >
                      <span>Test</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Deep dive on RHost notation */}
            <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/30 p-6 mt-8">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>The Magic of Yandex rhost: Notation</span>
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                In Yandex, domains are indexed hierarchically in reverse. For domain <strong>{target.domain}</strong>, the reversed root is <strong>{target.rhost}</strong>. By querying <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-amber-300">{`rhost:${target.rhost}.*`}</code>, Yandex will return all indexed subdomains. You can even isolate hosts starting with specific letters (e.g. <code className="font-mono">{`rhost:${target.rhost}.a*`}</code> for api, admin, auth, app).
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/80 font-mono text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>rhost:{target.rhost}.*</span>
                <a
                  href={buildSearchUrl(`rhost:${target.rhost}.*`, 'yandex')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 font-sans font-semibold text-xs flex items-center gap-1 hover:underline"
                >
                  <span>Launch on Yandex</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {YANDEX_DORKS.map((dork) => (
                <DorkCard
                  key={dork.id}
                  item={dork}
                  formattedQuery={formatQuery(dork.queryTemplate, target)}
                  engine="yandex"
                  isFavorite={favorites.includes(dork.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
