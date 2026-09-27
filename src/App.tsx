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

  // Routing State
  const getInitialRoute = (): string => {
    const path = window.location.pathname.replace(/^\//, '');
    if (!path || path === '') return 'home';
    if (path === 'dork-generator') return 'generator';
    return path;
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      setCurrentRoute(path === '' || path === '/' ? 'home' : path === 'dork-generator' ? 'generator' : path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track page views and dynamically synchronize document SEO meta tags, canonical URL & JSON-LD
  useEffect(() => {
    const urlPath = currentRoute === 'home' ? '/' : currentRoute === 'generator' ? '/dork-generator' : `/${currentRoute}`;
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
    const urlPath = route === 'home' ? '/' : route === 'generator' ? '/dork-generator' : `/${route}`;
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
