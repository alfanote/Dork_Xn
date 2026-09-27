import React, { useState, useEffect } from 'react';
import { SearchEngine, DorkItem } from './types/dork';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickSearchModal } from './components/search/QuickSearchModal';

// Views
import { HomePage } from './views/HomePage';
import { DorkGeneratorPage } from './views/DorkGeneratorPage';
import { GoogleDorksPage } from './views/GoogleDorksPage';
import { YandexDorksPage } from './views/YandexDorksPage';
import { GuidesPage } from './views/GuidesPage';
import { ToolsPage } from './views/ToolsPage';
import { FAQPage } from './views/FAQPage';
import { AboutPage } from './views/AboutPage';
import { ContactPage } from './views/ContactPage';
import { LegalPages } from './views/LegalPages';
import { trackPageView } from './utils/analytics';
import { updateDocumentSEO } from './utils/seo';

const ROUTE_ALIASES: Record<string, string> = {
  '': 'home',
  '/': 'home',
  home: 'home',
  'dork-generator': 'generator',
  generator: 'generator',
  'google-dorks': 'google-dorks',
  google: 'google-dorks',
  'yandex-dorks': 'yandex-dorks',
  yandex: 'yandex-dorks',
  guides: 'guides',
  tools: 'tools',
  faq: 'faq',
  about: 'about',
  contact: 'contact',
  'privacy-policy': 'privacy-policy',
  terms: 'terms',
  disclaimer: 'disclaimer',
  'cookie-policy': 'cookie-policy',
  'editorial-policy': 'editorial-policy',
};

const getRepoBasePath = (): string => {
  if (typeof window === 'undefined') return '';
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  // If first segment is NOT a known route, it's a GitHub Pages subfolder (e.g. 'Dork_Xn')
  if (segments.length > 0 && !ROUTE_ALIASES[segments[0]]) {
    return `/${segments[0]}`;
  }
  return '';
};

const parseRouteFromLocation = (): string => {
  if (typeof window === 'undefined') return 'home';

  // 1. Check GitHub Pages 404 SPA redirect: ?/path or ?p=/path
  const search = window.location.search;
  if (search) {
    if (search.startsWith('?/')) {
      const redirectedPath = search.slice(2).split('&')[0].replace(/^\//, '').replace(/\/$/, '');
      if (redirectedPath && ROUTE_ALIASES[redirectedPath]) {
        const basePath = getRepoBasePath();
        const cleanUrl = basePath ? `${basePath}/${redirectedPath}` : `/${redirectedPath}`;
        window.history.replaceState(null, '', cleanUrl);
        return ROUTE_ALIASES[redirectedPath];
      }
    }
    const params = new URLSearchParams(search);
    const p = params.get('p');
    if (p) {
      const cleanP = p.replace(/^\//, '').replace(/\/$/, '');
      if (ROUTE_ALIASES[cleanP]) {
        return ROUTE_ALIASES[cleanP];
      }
    }
  }

  // 2. Check hash (e.g. #/guides, #guides)
  if (window.location.hash) {
    const cleanHash = window.location.hash.replace(/^#\/?/, '').split('?')[0].replace(/\/$/, '');
    if (cleanHash && ROUTE_ALIASES[cleanHash]) {
      return ROUTE_ALIASES[cleanHash];
    }
  }

  // 3. Check pathname
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return 'home';

  // Check last segment first (e.g. /Dork_Xn/guides -> 'guides')
  const lastSegment = segments[segments.length - 1];
  if (ROUTE_ALIASES[lastSegment]) {
    return ROUTE_ALIASES[lastSegment];
  }

  // If only 1 segment and it's the repo name (e.g. 'Dork_Xn'), fallback to home
  if (segments.length === 1 && !ROUTE_ALIASES[segments[0]]) {
    return 'home';
  }

  for (let i = segments.length - 1; i >= 0; i--) {
    if (ROUTE_ALIASES[segments[i]]) {
      return ROUTE_ALIASES[segments[i]];
    }
  }

  return 'home';
};

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('dorksearch_theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('dorksearch_theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Target Domain State
  const [targetDomain, setTargetDomain] = useState<string>(() => {
    try {
      return localStorage.getItem('dorksearch_target') || 'example.com';
    } catch {
      return 'example.com';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dorksearch_target', targetDomain);
    } catch {}
  }, [targetDomain]);

  // Selected Engine State
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(() => {
    try {
      const stored = localStorage.getItem('dorksearch_engine');
      return stored === 'yandex' ? 'yandex' : 'google';
    } catch {
      return 'google';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dorksearch_engine', selectedEngine);
    } catch {}
  }, [selectedEngine]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dorksearch_favorites');
      return stored ? JSON.parse(stored) : ['g-doc-pdf', 'g-bb-admin-login', 'y-rhost-wildcard'];
    } catch {
      return ['g-doc-pdf', 'g-bb-admin-login', 'y-rhost-wildcard'];
    }
  });

  const handleToggleFavorite = (item: DorkItem) => {
    setFavorites((prev) => {
      const next = prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id];
      try {
        localStorage.setItem('dorksearch_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Routing State using robust path and hash parsing
  const [currentRoute, setCurrentRoute] = useState<string>(parseRouteFromLocation);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  // Handle browser back/forward buttons and hash navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Track page views and dynamically synchronize document SEO meta tags, canonical URL & JSON-LD
  useEffect(() => {
    const basePath = getRepoBasePath();
    const routeSlug = currentRoute === 'home' ? '' : currentRoute === 'generator' ? 'dork-generator' : currentRoute;
    const urlPath = routeSlug ? `${basePath}/${routeSlug}` : `${basePath}/` || '/';
    const seoConfig = updateDocumentSEO(currentRoute);
    trackPageView(urlPath, seoConfig.title);
  }, [currentRoute]);

  const navigateTo = (
    route: string,
    params?: { engine?: SearchEngine; domain?: string; category?: string }
  ) => {
    if (params?.engine) setSelectedEngine(params.engine);
    if (params?.domain) setTargetDomain(params.domain);
    if (params?.category) setSelectedCategory(params.category);

    setCurrentRoute(route);
    const basePath = getRepoBasePath();
    const routeSlug = route === 'home' ? '' : route === 'generator' ? 'dork-generator' : route;
    const urlPath = routeSlug ? `${basePath}/${routeSlug}` : `${basePath}/` || '/';
    window.history.pushState(null, '', urlPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenQuickSearch={() => setQuickSearchOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            targetDomain={targetDomain}
            setTargetDomain={setTargetDomain}
            selectedEngine={selectedEngine}
            setSelectedEngine={setSelectedEngine}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'generator' && (
          <DorkGeneratorPage
            targetDomain={targetDomain}
            setTargetDomain={setTargetDomain}
            selectedEngine={selectedEngine}
            setSelectedEngine={setSelectedEngine}
            initialCategory={selectedCategory}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'google-dorks' && (
          <GoogleDorksPage
            targetDomain={targetDomain}
            setTargetDomain={setTargetDomain}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'yandex-dorks' && (
          <YandexDorksPage
            targetDomain={targetDomain}
            setTargetDomain={setTargetDomain}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'guides' && <GuidesPage />}

        {currentRoute === 'tools' && <ToolsPage />}

        {currentRoute === 'faq' && <FAQPage onNavigate={navigateTo} />}

        {currentRoute === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentRoute === 'contact' && <ContactPage />}

        {(currentRoute === 'privacy-policy' ||
          currentRoute === 'terms' ||
          currentRoute === 'disclaimer' ||
          currentRoute === 'cookie-policy' ||
          currentRoute === 'editorial-policy') && (
          <LegalPages pageType={currentRoute as any} onNavigate={navigateTo} />
        )}
      </main>

      {/* Global Quick Search Modal (Cmd+K) */}
      <QuickSearchModal
        isOpen={quickSearchOpen}
        onClose={() => setQuickSearchOpen(false)}
        targetDomain={targetDomain}
      />

      {/* Clean Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
