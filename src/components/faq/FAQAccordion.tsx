import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Search, Filter } from 'lucide-react';
import { AdUnitPlaceholder } from '../ads/AdUnitPlaceholder';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Fundamentals' | 'Search Engines' | 'Security & Ethics' | 'Technical' | 'Privacy & Storage';
  detailedPoints?: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'what-is-a-dork',
    question: 'What is a search dork (advanced search operator query)?',
    answer:
      'A search dork is an advanced query string that combines targeted keywords with native search engine indexing operators such as site:, filetype:, intitle:, inurl:, or rhost:. Rather than performing a generic keyword search across billions of unrelated web pages, search dorks instruct search engine crawlers to isolate precise structural records, MIME types, or specific domain subtrees.',
    category: 'Fundamentals',
    detailedPoints: [
      'Search engines build vast inverted indexes of words, meta tags, and headers found across the public internet.',
      'Operators act as strict database filters directly on these inverted indexes.',
      'Dorking does not send requests to the target web server; it reads the third-party cache maintained by Google or Yandex.',
    ],
  },
  {
    id: 'what-does-dorksearch-do',
    question: 'What is Dorksearch and how does it assist researchers?',
    answer:
      'Dorksearch is a clean, structured query synthesis engine and reference catalog. By inputting an authorized domain (e.g. target.com), Dorksearch dynamically normalizes the target domain and generates tested Google and Yandex search operator queries for reconnaissance, asset inventorying, defensive auditing, and academic research.',
    category: 'Fundamentals',
    detailedPoints: [
      'Eliminates syntax errors and escaping issues common in complex Boolean queries.',
      'Provides simultaneous dual-index coverage for Google operators and Yandex reverse-host syntax.',
      'Allows instantaneous single-click copying and bulk exports into TXT, CSV, or structured JSON formats.',
    ],
  },
  {
    id: 'does-dorksearch-scan-websites',
    question: 'Does Dorksearch perform active port scans or exploit web servers?',
    answer:
      'No. Dorksearch performs zero active scanning, network probing, port knocking, or server exploitation. The entire application runs client-side in your web browser. No HTTP packets or TCP handshakes are ever transmitted from Dorksearch infrastructure to your entered domain.',
    category: 'Security & Ethics',
    detailedPoints: [
      'Search operations happen strictly on external search engine portals (google.com or yandex.com).',
      'The target server receives zero direct traffic from our domain or your query formulation.',
      'Dorksearch acts solely as an educational and procedural query formatter.',
    ],
  },
  {
    id: 'can-i-use-for-authorized-research',
    question: 'Is using Dorksearch legal for penetration testing and bug bounties?',
    answer:
      'Yes, provided you are researching domains within your authorized scope of engagement or analyzing publicly accessible search engine indexes under defensive guidelines. Querying a public search engine is entirely lawful, as search engines only display content that domain owners have permitted crawlers to catalog. However, attempting to exploit vulnerabilities or downloading unauthorized private data discovered in search indexes is strictly prohibited by law.',
    category: 'Security & Ethics',
    detailedPoints: [
      'Always verify program scope on platforms like HackerOne, Bugcrowd, or Intigriti before initiating audits.',
      'Adhere to the Computer Fraud and Abuse Act (CFAA), UK Computer Misuse Act, and relevant regional statutes.',
      'Follow responsible disclosure practices (such as RFC 9116 security.txt protocols) if accidental exposures are identified.',
    ],
  },
  {
    id: 'difference-google-yandex-syntax',
    question: 'What are the primary differences between Google and Yandex dorks?',
    answer:
      'While Google and Yandex share common operators like site: and filetype:, their underlying query parsers differ significantly in Boolean handling, wildcard support, and domain hierarchy.',
    category: 'Search Engines',
    detailedPoints: [
      'Google uses standard spaces for AND and capital OR for alternations. Yandex supports pipe symbols (|) for OR and double ampersands (&&) for strict sentence-level conjunctions.',
      'Yandex supports the unique rhost: operator (reversed hostname notation) which allows discovery of all alphabetized subdomains without DNS brute-forcing.',
      'Yandex allows wildcard URL matching (e.g. url:example.com/admin*), whereas Google has largely phased out wildcard path patterns in standard web search.',
      'Google natively supports filetype: for extensive extensions; Yandex prioritizes mime: for MIME-type filtering alongside standard extensions.',
    ],
  },
  {
    id: 'how-does-domain-replacement-work',
    question: 'How does domain parsing and variable interpolation function?',
    answer:
      'When you enter a domain, our client-side parser strips protocols (http://, https://), port numbers (:8080), URL path segments, query strings, and standard leading www prefixes. It extracts the clean base domain, the root name, top-level domain (TLD), and generates reversed-host notation (com.example) for Yandex rhost: templates.',
    category: 'Technical',
    detailedPoints: [
      'Templates with {{TARGET}} are populated with the normalized hostname (e.g. example.com).',
      'Templates with {{TARGET_RHOST}} are automatically transformed into reversed dot notation (e.g. com.example).',
      'Ensures that copy-pasted or clicked search links are properly URL-encoded to avoid browser malformation.',
    ],
  },
  {
    id: 'can-i-export-results',
    question: 'Can I export generated dork queries for offline documentation?',
    answer:
      'Yes. Dorksearch provides three export pipelines accessible directly from the generator header: Plain Text (.txt), Comma-Separated Values (.csv), and Structured JSON (.json).',
    category: 'Technical',
    detailedPoints: [
      'Plain Text (.txt): Clean human-readable list ideal for documentation notes or bash script inputs.',
      'CSV (.csv): Structured tabular format with Title, Category, Risk Level, and Formatted Query for Excel or Google Sheets.',
      'JSON (.json): Complete programmatic schema ready for integration into custom security tooling or SIEM pipelines.',
    ],
  },
  {
    id: 'does-dorksearch-store-searches',
    question: 'Does Dorksearch log, track, or share my target search domains?',
    answer:
      'No. Dorksearch maintains a strict zero-knowledge, zero-logging data privacy model. Target domains entered into the generator are processed purely in client-side JavaScript memory (DOM runtime). We do not operate backend servers that store, log, or transmit your research queries.',
    category: 'Privacy & Storage',
    detailedPoints: [
      'Recent domains and saved query favorites are stored solely inside your browser\'s private localStorage.',
      'No tracking telemetry or analytical third-party session recordings are attached to user inputs.',
      'You can clear your local storage history at any time using browser controls or the clear history button.',
    ],
  },
  {
    id: 'how-to-remove-from-google-cache',
    question: 'How do I remove an unintentionally exposed file or URL from Google search?',
    answer:
      'If you discover that Google has indexed a sensitive file or internal staging subdomain belonging to your organization, take the following three steps immediately:',
    category: 'Search Engines',
    detailedPoints: [
      '1. Delete or restrict the file: Remove the document from public web server paths or require HTTP authentication.',
      '2. Add Noindex header: Configure your web server to return "X-Robots-Tag: noindex, nofollow" on the endpoint.',
      '3. Submit Google Search Console Removal: Open Google Search Console, navigate to "Removals", and request an urgent temporary URL cache wipe. Google typically clears the index within a few hours.',
    ],
  },
  {
    id: 'why-google-shows-recaptcha',
    question: 'Why does Google occasionally display a reCAPTCHA when executing dorks?',
    answer:
      'Search engines employ automated anomaly detection systems to protect their infrastructure against aggressive query bots and scrapers. When a user runs multiple complex operator-heavy queries (e.g. multiple site: and inurl: combinations) in rapid succession, Google flags the activity as abnormal and prompts for a human verification challenge.',
    category: 'Technical',
    detailedPoints: [
      'Space out your manual searches by 15–30 seconds to maintain normal user query thresholds.',
      'Avoid running rapid automated browser extensions that execute batches of search links concurrently.',
      'Using a dedicated Google account or authorized Google Custom Search JSON API prevents automated rate limits.',
    ],
  },
];

const CATEGORIES = [
  'All Questions',
  'Fundamentals',
  'Search Engines',
  'Security & Ethics',
  'Technical',
  'Privacy & Storage',
] as const;

export const FAQAccordion: React.FC<{ limit?: number; showHeading?: boolean }> = ({
  limit,
  showHeading = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([
    'what-is-a-dork',
    'does-dorksearch-scan-websites',
    'can-i-use-for-authorized-research',
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Questions');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All Questions' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="w-full">
      {showHeading && (
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Knowledge Center</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Clear, transparent answers about query formulation, privacy architecture, search syntax, and legal compliance.
          </p>
        </div>
      )}

      {/* Filter and Search Bar */}
      {!limit && (
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across questions, operators, and guidelines..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-3.5">
        {displayed.map((item, idx) => {
          const isOpen = openIds.includes(item.id);
          return (
            <React.Fragment key={item.id}>
              <div
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 dark:border-blue-900 bg-white dark:bg-slate-900 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed space-y-3">
                    <p>{item.answer}</p>
                    {item.detailedPoints && (
                      <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400">
                        {item.detailedPoints.map((point, pIdx) => (
                          <li key={pIdx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Natural Ad Placement inside FAQ after 4th item if not limited */}
              {!limit && idx === 3 && (
                <AdUnitPlaceholder slotId="faq-mid-unit" format="in-article" className="my-6" />
              )}
            </React.Fragment>
          );
        })}

        {displayed.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No matching questions found for &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Questions');
              }}
              className="mt-3 px-3 py-1.5 text-xs text-blue-600 font-semibold hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
