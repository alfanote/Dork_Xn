import React, { useState } from 'react';
import { GOOGLE_DORKS } from '../data/google-dorks';
import { normalizeTarget, formatQuery, buildSearchUrl } from '../utils/dorkUtils';
import { MascotArtwork, MASCOT_IMAGES } from '../components/mascots/Mascots';
import { DorkCard } from '../components/dorks/DorkCard';
import { DorkItem } from '../types/dork';
import {
  Search,
  BookOpen,
  Code,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface GoogleDorksPageProps {
  targetDomain: string;
  setTargetDomain: (domain: string) => void;
  favorites: string[];
  onToggleFavorite: (item: DorkItem, formattedQuery: string) => void;
}

export const GoogleDorksPage: React.FC<GoogleDorksPageProps> = ({
  targetDomain,
  setTargetDomain,
  favorites,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'operators' | 'library'>('operators');
  const [operatorSearch, setOperatorSearch] = useState('');
  const target = normalizeTarget(targetDomain);

  const operators = [
    {
      operator: 'site:',
      description: 'Restricts query results to a specific domain or host.',
      example: `site:${target.domain}`,
      usage: 'Limits your investigation specifically to indexed pages on this domain or subdomains.',
    },
    {
      operator: 'filetype: (or ext:)',
      description: 'Searches for documents matching exact file extensions.',
      example: `site:${target.domain} filetype:pdf`,
      usage: 'Quickly locates documents, spreadsheets, slides, logs, and configuration exports.',
    },
    {
      operator: 'intitle: / allintitle:',
      description: 'Finds keywords inside the HTML <title> tag of pages.',
      example: `site:${target.domain} intitle:"index of"`,
      usage: 'Discovers directory indices, login screens, or dashboard landing titles.',
    },
    {
      operator: 'inurl: / allinurl:',
      description: 'Matches strings anywhere within the URL path or query string.',
      example: `site:${target.domain} inurl:admin`,
      usage: 'Identifies admin consoles, API endpoints, upload handlers, and parameter names.',
    },
    {
      operator: 'intext: / allintext:',
      description: 'Locates exact phrases in the visible body copy of the document.',
      example: `site:${target.domain} intext:"confidential"`,
      usage: 'Surfaces internal disclosures, policy drafts, or forgotten documentation notes.',
    },
    {
      operator: 'cache:',
      description: 'Retrieves Google’s most recent cached snapshot of a URL.',
      example: `cache:${target.domain}`,
      usage: 'Examines previous page states even if the site is temporarily offline.',
    },
    {
      operator: 'related:',
      description: 'Finds domains considered semantically or contextually related.',
      example: `related:${target.domain}`,
      usage: 'Discovers competitor infrastructure, sister organizations, and affiliated services.',
    },
    {
      operator: '- (negative operator)',
      description: 'Excludes words, phrases, or domains from results.',
      example: `site:${target.domain} -www`,
      usage: 'Removes the primary www host to reveal auxiliary and staging subdomains.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/70 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Search className="w-3.5 h-3.5" />
                <span>Google Operators Reference</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Google Dorks Made Simple
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Google dorking—also known as Google hacking or advanced search query construction—is the practice of utilizing native Google search operators to locate exposed data, documents, and subdomains that search crawlers have cataloged.
              </p>

              {/* Target domain quick input */}
              <div className="pt-2 flex items-center gap-2 max-w-md">
                <span className="text-xs font-semibold text-slate-500">Target:</span>
                <input
                  type="text"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="Target domain (example.com)..."
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <MascotArtwork
                src={MASCOT_IMAGES.googleDorks}
                alt="Playful cartoon cat and mouse investigating documents with magnifying glasses"
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
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Core Operators Explained
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'library'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Curated Dorks Library ({GOOGLE_DORKS.length})
          </button>
        </div>

        {activeTab === 'operators' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {operators.map((op) => (
                <div
                  key={op.operator}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-900">
                        {op.operator}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-900 dark:text-white mt-2">
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
                      href={buildSearchUrl(op.example, 'google')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1 shrink-0"
                    >
                      <span>Test</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Synthesis Example */}
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30 p-6 mt-8">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>How to combine operators like a pro</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Google operators can be chained using Boolean logic. For instance, combining domain scoping (<code className="font-mono text-blue-700">site:</code>), file type (<code className="font-mono text-blue-700">filetype:</code>), and keyword filters (<code className="font-mono text-blue-700">intitle:</code>) narrows millions of results down to high-precision intelligence.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200/80 dark:border-blue-900/60 font-mono text-xs text-slate-800 dark:text-slate-200">
                site:{target.domain} (filetype:xls OR filetype:xlsx) intext:&quot;budget&quot;
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GOOGLE_DORKS.map((dork) => (
                <DorkCard
                  key={dork.id}
                  item={dork}
                  formattedQuery={formatQuery(dork.queryTemplate, target)}
                  engine="google"
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
