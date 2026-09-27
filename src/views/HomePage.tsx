import React, { useState, useMemo } from 'react';
import { SearchEngine, DorkItem, RiskLevel } from '../types/dork';
import { CATEGORIES } from '../data/categories';
import { GOOGLE_DORKS } from '../data/google-dorks';
import { YANDEX_DORKS } from '../data/yandex-dorks';
import { normalizeTarget, formatQuery, buildSearchUrl } from '../utils/dorkUtils';
import { InputWatcherMouse, MascotLogoIcon } from '../components/mascots/Mascots';
import { DorkCard } from '../components/dorks/DorkCard';
import { ExportMenu } from '../components/dorks/ExportMenu';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import {
  Search,
  Globe2,
  Copy,
  Check,
  LayoutGrid,
  List,
  Star,
  ArrowUpDown,
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string, params?: { engine?: SearchEngine; domain?: string; category?: string }) => void;
  targetDomain: string;
  setTargetDomain: (domain: string) => void;
  selectedEngine: SearchEngine;
  setSelectedEngine: (engine: SearchEngine) => void;
  favorites: string[];
  onToggleFavorite: (item: DorkItem, formattedQuery: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  targetDomain,
  setTargetDomain,
  selectedEngine,
  setSelectedEngine,
  favorites,
  onToggleFavorite,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHoveringGenerate, setIsHoveringGenerate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const presetDomains = ['example.com', 'tesla.com', 'nasa.gov', 'target.com', 'uber.com'];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors">
      {/* TOP SECTION: DORK SEARCH GENERATOR DIRECTLY AT THE TOP */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 pt-8 pb-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title with Mascot Logo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <MascotLogoIcon className="w-10 h-10 shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Dorksearch &ndash; Google Dork Generator</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    Live
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Dorksearch helps you search smarter and research responsibly with Google &amp; Yandex dorks.
                </p>
              </div>
            </div>

            {/* Quick Engine Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedEngine('google')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedEngine === 'google'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Google Dorks</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEngine('yandex')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedEngine === 'yandex'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Globe2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Yandex Dorks</span>
              </button>
            </div>
          </div>

          {/* Generator Search Box */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>Enter Target Domain</span>
                <span className="text-[11px] font-normal text-slate-400 lowercase">
                  (e.g. example.com, www.example.com, https://...)
                </span>
              </label>

              {/* Pip the mouse watcher */}
              <InputWatcherMouse isFocused={isInputFocused} />
            </div>

            {/* Input with Quick Presets */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="example.com"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="w-full px-4 py-3.5 text-base sm:text-lg font-mono rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs"
                />
                {targetDomain && (
                  <button
                    type="button"
                    onClick={() => setTargetDomain('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Generate button with subtle wiggle */}
              <button
                type="button"
                onMouseEnter={() => setIsHoveringGenerate(true)}
                onMouseLeave={() => setIsHoveringGenerate(false)}
                onClick={() => {
                  const el = document.getElementById('dork-results-view');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-3.5 px-6 text-sm font-bold text-white rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 shrink-0 ${
                  selectedEngine === 'google'
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-blue-500/20'
                    : 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500 shadow-amber-500/20'
                }`}
              >
                <span
                  className={`inline-block transition-transform duration-200 ${
                    isHoveringGenerate ? '-rotate-12 scale-110' : 'rotate-0'
                  }`}
                >
                  🔍
                </span>
                <span>Generate Queries</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isHoveringGenerate ? 'translate-x-1' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Quick Domain Presets & Normalization Details */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Quick Test:</span>
                {presetDomains.map((dom) => (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => setTargetDomain(dom)}
                    className="px-2.5 py-0.5 rounded-lg font-mono text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {dom}
                  </button>
                ))}
              </div>

              <div>
                Normalized: <strong className="font-mono text-blue-600 dark:text-blue-400">{target.domain}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DORK RESULTS & SEARCH WORKSPACE */}
      <section id="dork-results-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Bar (Scrollable Pill Row) */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {rawPool.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = rawPool.filter((d) => d.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className="font-mono text-[10px] text-slate-400">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filters & Actions Control Bar */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Query within dorks */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dorks by keyword (e.g. pdf, config, admin, aws, token)..."
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

            {/* Right Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Starred Filter */}
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  showOnlyFavorites
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 border-amber-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
                title="Filter favorites"
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

              {/* Export Menu */}
              <ExportMenu dorks={preparedDorks} domain={target.domain} engine={selectedEngine} />

              {/* Grid / List View Toggle */}
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

          {/* Secondary Controls: Risk & Sort */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Risk Filter:</span>
              <div className="flex items-center gap-1 flex-wrap">
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

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2 py-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs focus:outline-none"
              >
                <option value="default">Default Order</option>
                <option value="title">Title (A-Z)</option>
                <option value="category">Category</option>
                <option value="risk">Risk Impact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter & Status */}
        <div className="flex items-center justify-between px-1 mb-4 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900 dark:text-white font-mono">{preparedDorks.length}</strong> {selectedEngine} queries for{' '}
            <strong className="font-mono text-blue-600 dark:text-blue-400">{target.domain}</strong>
          </span>
          <span className="hidden sm:inline">Click &quot;Search&quot; to open the search engine directly</span>
        </div>

        {/* Query Cards Grid */}
        {preparedDorks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-3xl mx-auto">
              🐭
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching dorks found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Pip couldn&apos;t find queries matching your current search or risk filter. Try resetting filters.
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
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {preparedDorks.map(({ item, formattedQuery }, i) => (
              <DorkCard
                key={item.id}
                item={item}
                formattedQuery={formattedQuery}
                engine={selectedEngine}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={onToggleFavorite}
                showMascotTouch={i % 6 === 0}
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
                showMascotTouch={i % 6 === 0}
              />
            ))}
          </div>
        )}
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Everything you need to search smarter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Precision query generation for authorized researchers, system administrators, and security auditors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="text-2xl mb-2">🔎</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Smart Search</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Generate structured search queries in seconds with instant domain token substitution.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Organized Dorks</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Browse useful queries across 20+ categories: Files, Configs, Cloud Storage, and APIs.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Save Favorites</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Bookmark key queries in your browser and filter by starred items at any time.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="text-2xl mb-2">📤</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Export Results</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Download customized queries as TXT, CSV spreadsheets, or structured JSON.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Common Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Everything you need to know about search syntax and ethics.
            </p>
          </div>
          <FAQAccordion limit={4} />
          <div className="text-center mt-6">
            <button
              onClick={() => onNavigate('faq')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all frequently asked questions →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
