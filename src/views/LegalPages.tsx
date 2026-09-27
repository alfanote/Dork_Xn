import React from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Cookie,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Lock,
  Globe2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { AdUnitPlaceholder } from '../components/ads/AdUnitPlaceholder';

interface LegalPagesProps {
  pageType: 'privacy-policy' | 'terms' | 'disclaimer' | 'cookie-policy' | 'editorial-policy';
  onNavigate?: (route: string) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType, onNavigate }) => {
  const titles: Record<string, { title: string; subtitle: string; icon: any; lastUpdated: string }> = {
    'privacy-policy': {
      title: 'Privacy Policy',
      subtitle:
        'Transparent disclosures on user privacy, client-side zero-logging architecture, and third-party advertising cookie standards.',
      icon: ShieldCheck,
      lastUpdated: 'September 27, 2026',
    },
    terms: {
      title: 'Terms of Service',
      subtitle:
        'Legal terms, permissible use criteria, and binding user agreements for the Dorksearch research catalog.',
      icon: FileText,
      lastUpdated: 'September 27, 2026',
    },
    disclaimer: {
      title: 'Responsible Use Disclaimer',
      subtitle:
        'Mandatory ethical research guidelines, non-interference standards, and authorized audit boundaries.',
      icon: AlertTriangle,
      lastUpdated: 'September 27, 2026',
    },
    'cookie-policy': {
      title: 'Cookie & Browser Storage Policy',
      subtitle:
        'Comprehensive overview of client-side localStorage, third-party advertising cookies, and browser controls.',
      icon: Cookie,
      lastUpdated: 'September 27, 2026',
    },
    'editorial-policy': {
      title: 'Editorial & Academic Integrity Policy',
      subtitle:
        'Standards governing our search syntax documentation, factual verification, and responsible disclosure ethics.',
      icon: BookOpen,
      lastUpdated: 'September 27, 2026',
    },
  };

  const navTabs = [
    { id: 'privacy-policy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'disclaimer', label: 'Responsible Use', icon: AlertTriangle },
    { id: 'cookie-policy', label: 'Cookie Policy', icon: Cookie },
    { id: 'editorial-policy', label: 'Editorial Guidelines', icon: BookOpen },
  ];

  const current = titles[pageType] || titles['disclaimer'];
  const Icon = current.icon;

  const handleTabClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {navTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = pageType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Header with High-Authority Trust Badges */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-4">
            <Icon className="w-3.5 h-3.5" />
            <span>Official Policy Documentation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {current.title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            {current.subtitle}
          </p>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Version: 2.5.0 (Active & Certified)</span>
            </div>
            <div>Last Updated: {current.lastUpdated}</div>
          </div>
        </div>

        {/* Top AdSense Banner Unit */}
        <AdUnitPlaceholder slotId={`legal-${pageType}-top`} format="horizontal" />

        {/* Content Container */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-xs space-y-8 mt-6">
          {pageType === 'privacy-policy' && (
            <>
              {/* Executive Summary */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Privacy First Principle (Client-Side Guarantee)</span>
                </div>
                <p>
                  Dorksearch is committed to complete data minimization. Target domains entered into our search generator are parsed in real time entirely within your browser&apos;s memory via client-side JavaScript. We do not maintain server-side logs, query databases, or user dossiers.
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  1. Information We Do Not Collect
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Unlike traditional cloud analysis tools, Dorksearch operates with zero backend capture of your research queries:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                  <li><strong>Target Search Domains:</strong> We never log, record, or transmit the domain names (e.g., example.com) or IP addresses you enter into the input fields.</li>
                  <li><strong>Custom Query Payloads:</strong> Search queries generated or customized remain strictly inside your browser environment.</li>
                  <li><strong>Browsing Histories:</strong> We do not construct user search dossiers or cross-domain behavioral profiles.</li>
                  <li><strong>Credentials:</strong> Dorksearch never asks for account credentials, API keys, or target server passwords.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  2. LocalStorage & Client Storage Mechanisms
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  To provide a seamless user experience, Dorksearch utilizes browser <code className="font-mono text-blue-600 dark:text-blue-400">localStorage</code>. This data never leaves your computer:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                  <li><strong className="font-mono">dorksearch_theme:</strong> Stores your visual preference (light or dark mode).</li>
                  <li><strong className="font-mono">dorksearch_target:</strong> Caches your last entered research domain so you don&apos;t have to retype it upon page refresh.</li>
                  <li><strong className="font-mono">dorksearch_engine:</strong> Remembers your preferred search engine toggle (Google or Yandex).</li>
                  <li><strong className="font-mono">dorksearch_favorites:</strong> Retains your bookmarked query IDs.</li>
                </ul>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  You may erase all stored client data at any time by clearing your browser cache or site storage.
                </p>
              </section>

              {/* In-Article AdSense Banner */}
              <AdUnitPlaceholder slotId="privacy-mid-banner" format="in-article" />

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  3. Advertising Partners & Google AdSense Policies
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  To sustain free access to educational OSINT documentation and query generation tools, Dorksearch displays advertisements served by Google AdSense and authorized third-party advertising networks.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white">Google AdSense Disclosures:</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Third party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
                    <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
                    <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Ads Settings</a>. Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">www.aboutads.info</a>.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  4. GDPR Compliance (Articles 15–22)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  For users residing in the European Economic Area (EEA) and the United Kingdom, we adhere strictly to the General Data Protection Regulation (GDPR). Because Dorksearch does not store personally identifiable data, IP addresses, or research targets on our servers, there are no profiles or user databases maintained. For any inquiries regarding consent or cookie management, contact our Data Protection Officer at privacy@dorksearch.org.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  5. California Consumer Privacy Act (CCPA / CPRA)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Under the California Consumer Privacy Act as amended by the CPRA:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                  <li><strong>We Do Not Sell Personal Information:</strong> Dorksearch has never sold, leased, or monetized personal consumer information.</li>
                  <li><strong>Right to Know & Delete:</strong> Since all operational search states are kept in your browser&apos;s client-side memory, you maintain 100% sovereign control over deletion.</li>
                </ul>
              </section>
            </>
          )}

          {pageType === 'terms' && (
            <>
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                <strong>Important Legal Notice:</strong> By accessing or using Dorksearch, you agree to be bound by these Terms of Service. If you do not accept these terms, you are prohibited from utilizing the query generator and reference resources.
              </div>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  1. Nature of the Service
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dorksearch is an open educational index, query formulation tool, and documentation repository. The software generates standardized Google and Yandex search engine syntax. Dorksearch does not execute automated vulnerability scanning, exploit delivery, denial-of-service packets, or credential brute-forcing against any network host.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  2. User Representations and Authorized Use Covenant
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  As an express condition of using Dorksearch, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                  <li>You possess verified ownership, explicit written penetration testing scope, or formal authorization to conduct reconnaissance on the target domain.</li>
                  <li>You will not use generated search queries to harvest private personal data (PII), medical records (PHI), credit cards, or confidential trade secrets.</li>
                  <li>You will comply with all regional computer crime statutes, including the United States Computer Fraud and Abuse Act (18 U.S.C. § 1030) and the UK Computer Misuse Act 1990.</li>
                  <li>You will observe the terms of service of third-party search engines (Google LLC and Yandex LLC) and will not deploy automated query bots against their endpoints without official API licensing.</li>
                </ul>
              </section>

              <AdUnitPlaceholder slotId="terms-mid-banner" format="in-article" />

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  3. Intellectual Property Rights & Mascots
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  All branding, custom illustrations, original mascot character designs (Barnaby the investigative cat and Pip the mouse), documentation guides, and website architecture are the proprietary intellectual property of Dorksearch. You may freely use, copy, and distribute generated search operator strings for your internal security audits, but you may not scrape or duplicate our original cartoon assets or brand marks for commercial exploitation.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  4. Disclaimer of Warranties & Limitation of Liability
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. DORKSEARCH DISCLAIMS ALL LIABILITY FOR ACTIONS TAKEN BY THIRD PARTIES, SEARCH ENGINE DELISTINGS, OR MISUSE OF GENERATED QUERIES. IN NO EVENT SHALL DORKSEARCH OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.
                </p>
              </section>
            </>
          )}

          {pageType === 'disclaimer' && (
            <>
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Strict Authorized & Educational Use Mandate</span>
                </div>
                <p>
                  Dorksearch is created exclusively for authorized OSINT practitioners, verified bug bounty hunters, cybersecurity educators, and systems administrators defending their own internet-facing infrastructure.
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  1. Non-Scanning & Passive Reconnaissance Clarification
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dorksearch does NOT execute penetration tests, vulnerability scans, port knocking, or exploit delivery. It is a client-side syntax generator. When you click a search link, your browser opens Google or Yandex. The target server receives no packets, logs, or signals from Dorksearch. All queried information is data that public search engines have already indexed through standard web crawling.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  2. User Responsibility & Compliance with Cyber Laws
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  The user assumes 100% legal responsibility for executing any query. Users must strictly ensure:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                  <li>Explicit authorization exists before conducting reconnaissance against external entities.</li>
                  <li>No attempts are made to exploit administrative login pages, open directories, or configuration backups identified via search queries.</li>
                  <li>Any discovered data exposures are handled through Coordinated Vulnerability Disclosure (CVD) in accordance with RFC 9116 (security.txt).</li>
                </ul>
              </section>

              <AdUnitPlaceholder slotId="disclaimer-mid-banner" format="in-article" />

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  3. Defensive Asset Auditing Use Cases
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  We encourage organizations and webmasters to run Dorksearch against their own domains periodically to identify accidental search engine indexing before malicious actors do. Review our OSINT Guides for detailed instructions on configuring <code className="font-mono">X-Robots-Tag: noindex</code> headers and requesting emergency cache expungement from Google Search Console.
                </p>
              </section>
            </>
          )}

          {pageType === 'cookie-policy' && (
            <>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  1. How Dorksearch Handles Cookies & Web Storage
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dorksearch maintains a clean, transparent storage posture. The core application runs client-side and does not use backend session cookies to identify users.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  2. Categories of Storage Employed
                </h2>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                      A. Strictly Necessary Functional Storage (Client localStorage)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Stores user interface states such as active theme, selected search engine, last normalized domain, and saved query bookmarks. This data remains on your local machine and is never transmitted to our servers.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                      B. Third-Party Advertising Cookies (Google AdSense)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Google and its advertising partners use cookies (such as the DoubleClick DART cookie) to serve relevant advertisements to visitors based on browsing history across participating sites. You can opt out at any time via your browser settings or aboutads.info.
                    </p>
                  </div>
                </div>
              </section>

              <AdUnitPlaceholder slotId="cookie-mid-banner" format="in-article" />

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  3. How to Manage and Disable Cookies in Your Browser
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  You can configure or block cookies at any time via your browser settings:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                  <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data.</li>
                  <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Enhanced Tracking Protection.</li>
                  <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies.</li>
                  <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions.</li>
                </ul>
              </section>
            </>
          )}

          {pageType === 'editorial-policy' && (
            <>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  1. Mission, Accuracy & Objectivity
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dorksearch Academy is dedicated to publishing rigorous, technically accurate documentation on search engine indexing, Boolean query logic, and defensive reconnaissance methodologies. All articles and templates are reviewed by security researchers to ensure they meet academic and professional standards.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  2. Ethical Boundaries & Safe Demonstration Standards
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dorksearch will never publish zero-day exploit payloads, malicious scripts, private victim records, or destructive instructions. When demonstrating operator syntax, all examples utilize reserved test domains (such as <code className="font-mono">example.com</code> under RFC 2606) rather than live third-party commercial organizations.
                </p>
              </section>

              <AdUnitPlaceholder slotId="editorial-mid-banner" format="in-article" />

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  3. Peer Review, Errata & Fact-Checking Workflow
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Search engine operators undergo continuous evolution as Google and Yandex update their search algorithms. Our research team audits queries quarterly. When syntax changes occur or an operator is deprecated, our repository is updated with clear change notes.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  If you spot an error, please reach out to our editorial desk at <strong className="text-blue-600 dark:text-blue-400">editorial@dorksearch.org</strong>. Verified corrections are processed within 48 hours.
                </p>
              </section>
            </>
          )}

          {/* Institutional Trust Footer Box */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Published by Dorksearch Research Initiative · Open Educational Catalog</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Peer-Audited Policy</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom AdSense Banner Unit */}
        <AdUnitPlaceholder slotId={`legal-${pageType}-bottom`} format="horizontal" />

        {/* Bottom Context Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
          <button onClick={() => handleTabClick('privacy-policy')} className="hover:text-blue-600">Privacy Policy</button>
          <span>·</span>
          <button onClick={() => handleTabClick('terms')} className="hover:text-blue-600">Terms of Service</button>
          <span>·</span>
          <button onClick={() => handleTabClick('disclaimer')} className="hover:text-blue-600">Responsible Use</button>
          <span>·</span>
          <button onClick={() => handleTabClick('cookie-policy')} className="hover:text-blue-600">Cookie Policy</button>
          <span>·</span>
          <button onClick={() => handleTabClick('editorial-policy')} className="hover:text-blue-600">Editorial Guidelines</button>
        </div>
      </div>
    </div>
  );
};
