import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  X,
  ShieldCheck,
  Clock,
  User,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Code2,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { MascotArtwork, MASCOT_IMAGES } from '../components/mascots/Mascots';
import { AdUnitPlaceholder } from '../components/ads/AdUnitPlaceholder';

export interface GuideArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  publishDate: string;
  thumbnail: string;
  content: {
    sectionHeading: string;
    paragraphs: string[];
    codeSnippets?: { title: string; code: string; explanation: string }[];
    tips?: string[];
    warnings?: string[];
  }[];
}

const COMPREHENSIVE_GUIDES: GuideArticle[] = [
  {
    id: 'google-dorks-mastery',
    title: 'The Comprehensive Guide to Google Search Operators & Dorking',
    description:
      'Master Google’s indexing engine, Boolean query logic, structural operators, and defensive audit workflows for cybersecurity research.',
    category: 'Google OSINT',
    readTime: '9 min read',
    author: 'Dorksearch Security Research Team',
    publishDate: 'September 2026',
    thumbnail: MASCOT_IMAGES.googleDorks,
    content: [
      {
        sectionHeading: '1. How Search Engine Crawlers Index the Internet',
        paragraphs: [
          'Search engines do not scan the live internet at the moment a query is submitted. Instead, distributed automated bots (such as Googlebot) crawl public web hyperlinks, fetch HTML and documents, tokenize content, and compile an exhaustive inverted index.',
          'When web administrators mistakenly leave directory indexing enabled or fail to configure robots.txt and HTTP access controls, sensitive staging environments, configuration files, and backup databases get permanently mapped into search indexes.',
          'Google Dorking—formally known as advanced Google search query construction—is the practice of querying these pre-indexed tokens using specialized operators to identify assets that are already exposed to the public index.',
        ],
        tips: [
          'Always test queries directly in private browsing or via authorized search APIs to avoid personalized algorithmic bias.',
          'Google enforces strict rate limiting; automated rapid querying will trigger reCAPTCHA verification challenges.',
        ],
      },
      {
        sectionHeading: '2. The Fundamental Structural Operators',
        paragraphs: [
          'Standard search queries scan all available body text. Advanced operators, however, restrict the search horizon to specific structural document properties: location, title, uniform resource locator (URL), or MIME document format.',
        ],
        codeSnippets: [
          {
            title: 'Subdomain Isolation Query',
            code: 'site:example.com -www.example.com',
            explanation:
              'Filters all indexed pages on example.com while excluding the main www hostname to reveal forgotten subdomains like dev., staging., api., or mail.',
          },
          {
            title: 'Exposed Configuration & Environment Files',
            code: 'site:example.com (filetype:env OR filetype:yaml OR filetype:json OR filetype:xml) "password" OR "DB_HOST"',
            explanation:
              'Scans the targeted domain for sensitive structured configuration formats that may have been unintentionally committed to public web roots.',
          },
          {
            title: 'Directory Listing & Web Server Indexation',
            code: 'site:example.com intitle:"Index of /" ("backup" OR "dump" OR "logs")',
            explanation:
              'Identifies unauthenticated Apache, Nginx, or LiteSpeed directory indexes containing database dumps or server activity logs.',
          },
        ],
      },
      {
        sectionHeading: '3. Defensive Remediation: Preventing Search Engine Leakage',
        paragraphs: [
          'Defending your organization against Google dorks requires proactive asset management. Preventing search engines from indexing sensitive records involves three defensive layers:',
          '1. Implement Proper Authentication: Sensitive portals, admin dashboards, and internal documentation must never rely on obscurity. Require HTTP basic auth, OAuth, or SSO before serving any asset.',
          '2. HTTP Response Headers: Add "X-Robots-Tag: noindex, nofollow" to non-public endpoints. This instructs search engines to remove the file from their index even if external links point to it.',
          '3. Google Search Console Removals: If sensitive documents are discovered in the Google index, administrators can submit an expedited URL removal request via Google Search Console to wipe the cache within hours.',
        ],
        warnings: [
          'Crucial Warning: Placing sensitive URLs inside "robots.txt" under a "Disallow:" directive only prevents crawling, NOT indexing. If an external link points to that URL, Google may still index the URL itself. Moreover, attackers frequently inspect robots.txt to discover hidden paths!',
        ],
      },
    ],
  },
  {
    id: 'yandex-search-operators-deep-dive',
    title: 'Mastering Yandex Search Operators: Reverse Host (rhost:) & Wildcards',
    description:
      'Deep dive into Yandex’s unique query architecture, inverted domain enumeration, MIME types, and regional search mechanics.',
    category: 'Yandex OSINT',
    readTime: '8 min read',
    author: 'Dorksearch Technical Operations',
    publishDate: 'September 2026',
    thumbnail: MASCOT_IMAGES.yandexAirplane,
    content: [
      {
        sectionHeading: '1. Why Multi-Engine Reconnaissance Matters',
        paragraphs: [
          'Relying solely on Google creates significant operational blind spots. Search engines maintain different crawling priorities, localized data center caches, and algorithm boundaries. In Eastern Europe, Central Asia, and specific global markets, Yandex crawls pages and subdomains that Googlebot frequently skips.',
          'Yandex provides distinct operators—most notably "rhost:" and wildcard path matching—that are unsupported or deprecated on Google. This makes Yandex indispensable for comprehensive domain reconnaissance.',
        ],
      },
      {
        sectionHeading: '2. The Reversed Hostname (rhost:) Mechanism',
        paragraphs: [
          'In standard DNS architecture, domains are read right-to-left: top-level domain (com), domain name (example), and subdomains (api.dev). Yandex mirrors this structure through the "rhost:" operator.',
          'To query subdomains on example.com, you invert the hostname components into "com.example.*". This allows OSINT researchers to uncover alphabetized subdomains without performing noisy, direct DNS brute-forcing against the target.',
        ],
        codeSnippets: [
          {
            title: 'Subdomain Discovery via rhost Wildcard',
            code: 'rhost:com.example.*',
            explanation:
              'Indexes all discovered hostnames under the example.com umbrella by querying Yandex’s inverted domain database.',
          },
          {
            title: 'Targeting Staging Subdomains on Yandex',
            code: 'rhost:com.example.staging* | rhost:com.example.dev*',
            explanation:
              'Leverages Yandex Boolean OR ("|") to locate pre-production test servers indexed during QA cycles.',
          },
          {
            title: 'MIME Filtering for Financial & Analytical Data',
            code: 'host:example.com mime:pdf (financial | audit | confidential | internal)',
            explanation:
              'Filters indexed PDF documents containing sensitive organizational keywords on the target host.',
          },
        ],
        tips: [
          'Yandex uses single pipes ("|") for Boolean OR operations and uppercase "&&" for strict AND grouping.',
          'You can use the date operator "date:20250101..20260901" on Yandex to isolate freshly indexed documents within a specific temporal window.',
        ],
      },
      {
        sectionHeading: '3. Remediation on Yandex Webmaster',
        paragraphs: [
          'To clean up exposed links on Yandex, register your verified property on Yandex Webmaster Tools and navigate to the "Tools > Delist URL" section. Remove the cached copy to ensure outdated documents do not persist in regional results.',
        ],
      },
    ],
  },
  {
    id: 'passive-osint-lifecycle-and-ethics',
    title: 'The Passive OSINT Methodology: Frameworks, Scopes, and Ethics',
    description:
      'How security auditors and researchers conduct passive intelligence gathering strictly within legal boundaries and authorized scopes.',
    category: 'Methodology',
    readTime: '7 min read',
    author: 'Compliance & Research Standards Committee',
    publishDate: 'September 2026',
    thumbnail: MASCOT_IMAGES.aboutTeam,
    content: [
      {
        sectionHeading: '1. Defining Passive vs. Active Reconnaissance',
        paragraphs: [
          'The defining principle of passive OSINT is zero direct target interaction. When performing passive reconnaissance, researchers only interact with third-party cached indexes (such as Google, Yandex, Archive.org, or public Certificate Transparency logs).',
          'Because no network packets, port sweeps, or HTTP requests are transmitted to the target server, passive reconnaissance produces zero load, leaves no footprint on target intrusion detection systems (IDS), and maintains a safe, observational posture.',
          'Active reconnaissance, by contrast, sends direct probes to the target. Without prior written authorization (such as an explicit penetration testing agreement or bug bounty program scope), active testing can violate the Computer Fraud and Abuse Act (CFAA) or international cybersecurity statutes.',
        ],
      },
      {
        sectionHeading: '2. The Five Phases of the OSINT Cycle',
        paragraphs: [
          'Professional OSINT investigations follow a structured five-step lifecycle:',
          '1. Scope Definition: Establish authorized domain boundaries, rules of engagement, and documented permissions.',
          '2. Query Preparation: Assemble normalized search queries using certified operators tailored to the target structure.',
          '3. Information Gathering: Query public search indexes without automated bot scraping.',
          '4. Verification & Triage: Confirm whether indexed documents pose genuine security exposure or are benign public marketing collateral.',
          '5. Responsible Disclosure: Privately notify the domain owner following standard Coordinated Vulnerability Disclosure (CVD) timelines.',
        ],
        tips: [
          'Always keep detailed audit logs of your research timestamps, query syntax, and search results to verify responsible conduct.',
        ],
      },
    ],
  },
  {
    id: 'securing-cloud-and-doc-leaks',
    title: 'Securing Public Cloud Storage & Document Leaks from Search Engines',
    description:
      'Prevent unintentional leaks across AWS S3 buckets, Google Cloud Storage, GitHub pages, and public document repositories.',
    category: 'Defensive Security',
    readTime: '6 min read',
    author: 'Dorksearch Cloud Security Team',
    publishDate: 'September 2026',
    thumbnail: MASCOT_IMAGES.hero,
    content: [
      {
        sectionHeading: '1. How Cloud Storage Buckets Get Indexed',
        paragraphs: [
          'Object storage services like AWS S3, Google Cloud Storage, and Azure Blob Storage are designed to serve content efficiently. However, misconfigured bucket policies or public "Read" permissions can result in public crawlers indexing confidential backups, spreadsheets, and internal media.',
          'Attackers frequently combine dorks like "site:s3.amazonaws.com [target_brand]" or "site:storage.googleapis.com [target_brand]" to detect unsecured storage buckets containing proprietary corporate information.',
        ],
        codeSnippets: [
          {
            title: 'S3 Bucket Public Index Inspection',
            code: 'site:s3.amazonaws.com "target-company" (filetype:sql OR filetype:csv OR filetype:bak)',
            explanation:
              'Identifies publicly accessible Amazon S3 storage buckets containing database exports or backup archives.',
          },
          {
            title: 'Google Drive Public Sharing Audit',
            code: 'site:drive.google.com/drive/folders "target-company"',
            explanation:
              'Finds public Google Drive folders that may have been unintentionally shared with "Anyone with the link".',
          },
        ],
      },
      {
        sectionHeading: '2. Best Practice Hardening Steps',
        paragraphs: [
          'Enable "Block Public Access" at both the account and bucket level across cloud providers. Implement strict Identity and Access Management (IAM) role-based controls, and regularly run automated Cloud Security Posture Management (CSPM) tools to audit external permissions.',
        ],
      },
    ],
  },
  {
    id: 'boolean-logic-and-operator-syntax',
    title: 'Boolean Search Logic: Constructing High-Precision Recon Queries',
    description:
      'Demystifying parenthetical nesting, strict phrase matching, negative exclusions, and wildcard expansion.',
    category: 'Search Syntax',
    readTime: '5 min read',
    author: 'Syntax Engineering Group',
    publishDate: 'September 2026',
    thumbnail: MASCOT_IMAGES.googleDorks,
    content: [
      {
        sectionHeading: '1. Truth Tables & Query Operators',
        paragraphs: [
          'Search engines parse queries into logical expressions. By default, spaces function as logical AND operators. When querying multi-extension files, proper parenthetical grouping prevents syntax errors.',
          'For example, the query "site:example.com (filetype:pdf OR filetype:xlsx) budget" ensures that the search engine requires either a PDF or Excel document, combined with the keyword budget.',
        ],
      },
      {
        sectionHeading: '2. Negative Filtering (The Hyphen Operator)',
        paragraphs: [
          'Negative filtering removes noise from your query. If you are conducting research on subdomains for "example.com" and keep getting overwhelmed by marketing blog posts, you can negate the entire blog hostname using "-site:blog.example.com".',
        ],
      },
    ],
  },
  {
    id: 'responsible-disclosure-guide',
    title: 'Responsible Disclosure: How to Report Discovered Data Leaks Ethically',
    description:
      'Step-by-step guidance on notifying webmasters, security teams, and vulnerability response programs when public exposures are found.',
    category: 'Methodology',
    readTime: '6 min read',
    author: 'Dorksearch Legal & Ethics Committee',
    publishDate: 'September 2026',
    thumbnail: MASCOT_IMAGES.aboutTeam,
    content: [
      {
        sectionHeading: '1. The Golden Rule of Responsible Disclosure',
        paragraphs: [
          'When an ethical researcher identifies an unintended data exposure via a search engine dork, their objective is to assist the domain owner in remediating the issue before malicious actors can exploit it.',
          'Do NOT download, extract, or hoard large quantities of exposed data. Downloading multiple records to "prove" vulnerability is unnecessary and may constitute unauthorized access under privacy laws like GDPR or HIPAA. A single redacted screenshot or URL verification is sufficient.',
        ],
      },
      {
        sectionHeading: '2. How to Contact the Organization',
        paragraphs: [
          'First, check the domain’s security.txt file (located at /.well-known/security.txt) to find authorized security contact emails. If unavailable, look for a security@ or vulnerability-reporting@ address, or check for an official Bug Bounty program on platforms like HackerOne or Bugcrowd.',
        ],
      },
    ],
  },
];

const CATEGORIES = ['All Guides', 'Google OSINT', 'Yandex OSINT', 'Methodology', 'Defensive Security', 'Search Syntax'];

export const GuidesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);

  const filteredGuides = COMPREHENSIVE_GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === 'All Guides' || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Research Academy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            OSINT & Search Syntax Guides
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            In-depth technical guides, defensive audit frameworks, and authorized reconnaissance methodologies written for security professionals, sysadmins, and academic researchers.
          </p>
        </div>

        {/* AdSense Top Banner */}
        <AdUnitPlaceholder slotId="guides-top-banner" format="horizontal" />

        {/* Filters & Search */}
        <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides & syntax..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setActiveArticle(guide)}
              className="group cursor-pointer rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 border border-slate-100 dark:border-slate-800">
                  <MascotArtwork
                    src={guide.thumbnail}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {guide.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Read Full Guide</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No guides found</h3>
            <p className="text-xs text-slate-500 mt-1">Try refining your search keyword or clearing category filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Guides');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* AdSense In-Feed / Bottom Banner */}
        <AdUnitPlaceholder slotId="guides-bottom-banner" format="horizontal" className="mt-12" />

        {/* E-E-A-T Academic & Editorial Disclaimer */}
        <div className="mt-10 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs text-slate-500 space-y-2">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Academic Integrity & Educational Purpose Notice</span>
          </div>
          <p className="leading-relaxed">
            All tutorials and research methodologies published in Dorksearch Academy are developed for defensive cybersecurity, systems hardening, and authorized audit environments. We strictly adhere to our Editorial Policy and ethical guidelines. Dorksearch neither condones nor facilitates unauthorized penetration testing, scraping, or data breach activities.
          </p>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  <span>•</span>
                  <span>{activeArticle.publishDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>By {activeArticle.author}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Article Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700 dark:text-slate-300">
              {/* Lead Image & Intro */}
              <div className="rounded-2xl overflow-hidden max-h-72 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <MascotArtwork
                  src={activeArticle.thumbnail}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-sm leading-relaxed text-blue-950 dark:text-blue-200">
                <strong>Executive Summary:</strong> {activeArticle.description}
              </div>

              {/* Sections */}
              {activeArticle.content.map((sec, idx) => (
                <section key={idx} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                    {sec.sectionHeading}
                  </h3>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {p}
                    </p>
                  ))}

                  {/* Code Snippets if present */}
                  {sec.codeSnippets && (
                    <div className="space-y-3 pt-2">
                      {sec.codeSnippets.map((cs, cIdx) => (
                        <div
                          key={cIdx}
                          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 space-y-2 font-mono"
                        >
                          <div className="flex items-center justify-between text-xs text-slate-400 font-sans">
                            <span className="font-semibold text-blue-400">{cs.title}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500">Query Syntax</span>
                          </div>
                          <div className="bg-slate-950 p-2.5 rounded-lg text-emerald-400 text-xs break-all select-all">
                            {cs.code}
                          </div>
                          <p className="text-xs text-slate-400 font-sans leading-normal">
                            {cs.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tips */}
                  {sec.tips && (
                    <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5 text-xs text-emerald-900 dark:text-emerald-300">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Best Practice Recommendation</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        {sec.tips.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warnings */}
                  {sec.warnings && (
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-1.5 text-xs text-amber-900 dark:text-amber-300">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Important Consideration</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        {sec.warnings.map((w, wIdx) => (
                          <li key={wIdx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* In-Article Ad Slot after second section */}
                  {idx === 1 && (
                    <AdUnitPlaceholder slotId={`guide-modal-unit-${activeArticle.id}`} format="in-article" />
                  )}
                </section>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between text-xs text-slate-500">
              <span>Peer-reviewed under Dorksearch Editorial Policy</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
