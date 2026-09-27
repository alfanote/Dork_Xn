import React, { useState, useMemo } from 'react';
import { SearchEngine, DorkItem, RiskLevel } from '../types/dork';
import { CATEGORIES } from '../data/categories';
import { GOOGLE_DORKS } from '../data/google-dorks';
import { YANDEX_DORKS } from '../data/yandex-dorks';
import { normalizeTarget, formatQuery, buildSearchUrl } from '../utils/dorkUtils';
import { DorkCard } from '../components/dorks/DorkCard';
import { ExportMenu } from '../components/dorks/ExportMenu';
import {
  Search,
  Globe2,
  Copy,
  Check,
  LayoutGrid,
  List,
  Star,
  ArrowUpDown,
  Filter,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface DorkGeneratorPageProps {
  targetDomain: string;
  setTargetDomain: (domain: string) => void;
  selectedEngine: SearchEngine;
  setSelectedEngine: (engine: SearchEngine) => void;
  initialCategory?: string;
  favorites: string[];
  onToggleFavorite: (item: DorkItem, formattedQuery: string) => void;
}

export const DorkGeneratorPage: React.FC<DorkGeneratorPageProps> = ({
  targetDomain,
  setTargetDomain,
  selectedEngine,
  setSelectedEngine,
  initialCategory,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'category' | 'risk'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const target = normalizeTarget(targetDomain);
  const rawPool = selectedEngine === 'google' ? GOOGLE_DORKS : YANDEX_DORKS;

  // Filter & search
  const filteredDorks = useMemo(() => {
    let result = rawPool;

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Risk
    if (selectedRisk !== 'all') {
      result = result.filter((item) => item.riskLevel.toLowerCase() === selectedRisk.toLowerCase());
    }

    // Filter by text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.queryTemplate.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Favorites
    if (showOnlyFavorites) {
      result = result.filter((item) => favorites.includes(item.id));
    }

    // Sorting
    const sorted = [...result];
    if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'category') {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'risk') {
      const riskOrder: Record<RiskLevel, number> = {
        Sensitive: 5,
        Audit: 4,
        Recon: 3,
        Low: 2,
        Info: 1,
      };
      sorted.sort((a, b) => (riskOrder[b.riskLevel] || 0) - (riskOrder[a.riskLevel] || 0));
    }

    return sorted;
  }, [rawPool, selectedCategory, selectedRisk, searchQuery, showOnlyFavorites, favorites, sortBy]);

  const preparedDorks = useMemo(() => {
    return filteredDorks.map((item) => ({
      item,
      formattedQuery: formatQuery(item.queryTemplate, target),
    }));
  }, [filteredDorks, target]);

  const handleCopyAll = async () => {
    if (preparedDorks.length === 0) return;
    const combined = preparedDorks
      .map(({ item, formattedQuery }) => `# ${item.title}\n${formattedQuery}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(combined);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = combined;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 transition-colors">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Dork Generator</span>
                <span aria-hidden="true">/</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">
                  {selectedEngine} Dorks
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Search Dorks for <span className="text-blue-600 dark:text-blue-400 font-mono">{target.domain}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Generated search queries using {selectedEngine === 'google' ? 'Google Dorks' : 'Yandex Dorks'}.
              </p>
            </div>

            {/* Quick Engine & Target Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Engine Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedEngine('google')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedEngine === 'google'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Google</span>
                </button>
                <button
                  onClick={() => setSelectedEngine('yandex')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedEngine === 'yandex'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Yandex</span>
                </button>
              </div>

              {/* Editable Domain In Header */}
              <div className="flex items-center">
                <input
                  type="text"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="Target domain..."
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-44"
                />
              </div>

              {/* Export Menu */}
              <ExportMenu dorks={preparedDorks} domain={target.domain} engine={selectedEngine} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Categories Navigation */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Categories
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {rawPool.length} Total
                </span>
              </div>

              <div className="space-y-1">
                {/* All Dorks Button */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">All Dorks</span>
                  <span
                    className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                      selectedCategory === 'all'
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {rawPool.length}
                  </span>
                </button>

                {/* Individual Categories */}
                {CATEGORIES.map((cat) => {
                  const count = rawPool.filter((d) => d.category === cat.id).length;
                  const isActive = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-blue-200/60 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200'
                            : 'text-slate-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ethical Scope Box */}
            <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 p-4 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Ethical Boundaries</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800/90 dark:text-amber-300/80">
                Execute searches only against hosts you own or have explicit authorized written permission to test under bug bounty or OSINT terms.
              </p>
            </div>
          </aside>

          {/* Right Workspace: Filters & Dork Cards */}
          <main className="lg:col-span-9 space-y-5">
            {/* Filter & Control Bar */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search in query */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search queries, tags, or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Right controls: Favorites, Copy All, View Toggle */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Favorites Toggle */}
                  <button
                    onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      showOnlyFavorites
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 border-amber-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                    title="Filter only favorited queries"
                  >
                    <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-500' : ''}`} />
                    <span>Starred</span>
                  </button>

                  {/* Copy All Filtered */}
                  <button
                    onClick={handleCopyAll}
                    disabled={preparedDorks.length === 0}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50"
                  >
                    {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedAll ? 'Copied All!' : 'Copy All'}</span>
                  </button>

                  {/* Grid / List toggle */}
                  <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Filters: Risk Classification & Sort */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Risk filter */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Risk / Type:</span>
                  <div className="flex items-center gap-1">
                    {['all', 'info', 'recon', 'audit', 'sensitive'].map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setSelectedRisk(risk)}
                        className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                          selectedRisk === risk
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="category">Category</option>
                    <option value="risk">Risk / Impact</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Counter Bar */}
            <div className="flex items-center justify-between px-1 text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-900 dark:text-white font-mono">{preparedDorks.length}</strong> of{' '}
                <span className="font-mono">{rawPool.length}</span> queries
              </span>
              <span>Click &quot;Search&quot; to open search engine directly</span>
            </div>

            {/* Empty State */}
            {preparedDorks.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-3xl mx-auto">
                  🐱
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No matching dorks found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Barnaby and Pip couldn&apos;t find queries matching your current search or category filter. Try clearing filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedRisk('all');
                    setSearchQuery('');
                    setShowOnlyFavorites(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Cards View: Grid or List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preparedDorks.map(({ item, formattedQuery }, i) => (
                  <DorkCard
                    key={item.id}
                    item={item}
                    formattedQuery={formattedQuery}
                    engine={selectedEngine}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={onToggleFavorite}
                    showMascotTouch={i % 7 === 0}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {preparedDorks.map(({ item, formattedQuery }, i) => (
                  <DorkCard
                    key={item.id}
                    item={item}
                    formattedQuery={formattedQuery}
                    engine={selectedEngine}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={onToggleFavorite}
                    showMascotTouch={i % 7 === 0}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
