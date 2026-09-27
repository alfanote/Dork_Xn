import React from 'react';
import { MascotLogoIcon } from '../mascots/Mascots';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <MascotLogoIcon className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dorksearch
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              “Search smarter. Research responsibly.”
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Dorksearch generates structured search engine queries for authorized OSINT, academic research, and defensive domain reconnaissance.
            </p>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/50 text-xs text-blue-800 dark:text-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Query builder only. No automated scanning, crawling, or exploitation.</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Dork Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('google-dorks')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Google Dorks Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('yandex-dorks')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Yandex Operators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Research Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  OSINT Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  About Dorksearch
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Responsible Use Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookie-policy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editorial-policy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Editorial Guidelines
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Dorksearch. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span>Crafted for responsible open-source intelligence</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
