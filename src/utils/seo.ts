/**
 * SEO & Structured Data (JSON-LD) Utility for Dorksearch
 *
 * Dynamically synchronizes document title, meta descriptions, canonical URLs,
 * OpenGraph/Twitter social cards, and Schema.org rich snippets for every route.
 * Follows Google AdSense publisher requirements and SEO best practices.
 */

export interface RouteSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType: 'website' | 'article';
  breadcrumbs: { name: string; path: string }[];
  getStructuredData: (origin: string) => Record<string, any>;
}

export const SEO_CONFIGS: Record<string, RouteSEOConfig> = {
  home: {
    title: 'Dorksearch - Search Smarter. Research Responsibly.',
    description:
      'Interactive Google and Yandex search-query and dork builder for authorized OSINT, cybersecurity reconnaissance, and educational syntax auditing.',
    keywords:
      'dorksearch, google dorks, yandex dorks, osint tools, search operators, cybersecurity, passive reconnaissance, penetration testing',
    canonicalPath: '/',
    ogType: 'website',
    breadcrumbs: [{ name: 'Home', path: '/' }],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: 'Dorksearch',
          description:
            'Interactive Google and Yandex search-query and dork builder for authorized OSINT and cybersecurity reconnaissance.',
          publisher: {
            '@id': `${origin}/#organization`,
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${origin}/dork-generator?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'Organization',
          '@id': `${origin}/#organization`,
          name: 'Dorksearch Security Research',
          url: origin,
          logo: `${origin}/favicon.ico`,
          sameAs: ['https://github.com'],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@dorksearch.example',
          },
        },
        {
          '@type': 'WebApplication',
          '@id': `${origin}/#webapplication`,
          name: 'Dorksearch Query Generator',
          url: origin,
          applicationCategory: 'SecurityApplication',
          operatingSystem: 'All',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          description:
            'Free client-side Google and Yandex dork query generator for authorized OSINT and defensive security auditing.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      ],
    }),
  },

  generator: {
    title: 'Search Dork Generator - Google & Yandex Query Builder | Dorksearch',
    description:
      'Build advanced Google & Yandex search queries with custom filters, filetypes, site parameters, and real-time syntax generation.',
    keywords:
      'dork generator, google dork generator, yandex query builder, site operator, filetype dork, inurl operator, osint query generator',
    canonicalPath: '/dork-generator',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Dork Generator', path: '/dork-generator' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Dorksearch Search Query Generator',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'All',
          url: `${origin}/dork-generator`,
          description:
            'Interactive builder for Google and Yandex search operators with instant query syntax validation.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Dork Generator',
              item: `${origin}/dork-generator`,
            },
          ],
        },
      ],
    }),
  },

  'google-dorks': {
    title: 'Google Dorks & Search Operators Directory | Dorksearch',
    description:
      'Curated catalog of Google search operators, filetype queries, directory listings, and vulnerability reconnaissance patterns.',
    keywords:
      'google dorks list, google search operators, google osint, filetype pdf xlsx, intitle index of, inurl admin, defensive recon',
    canonicalPath: '/google-dorks',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Google Dorks', path: '/google-dorks' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Google Dorks & Search Operators Directory',
          url: `${origin}/google-dorks`,
          description:
            'Comprehensive directory of Google search operators and authorized OSINT discovery patterns.',
          about: {
            '@type': 'Thing',
            name: 'Google Search Operators and Cybersecurity Auditing',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Google Dorks',
              item: `${origin}/google-dorks`,
            },
          ],
        },
      ],
    }),
  },

  'yandex-dorks': {
    title: 'Yandex Dorks & Reverse Host Operators | Dorksearch',
    description:
      'Master Yandex search operators, rhost: reverse host mapping, date intervals, and specialized Russian search syntax for OSINT.',
    keywords:
      'yandex dorks, yandex rhost operator, reverse host search, yandex osint syntax, date interval operator, public index recon',
    canonicalPath: '/yandex-dorks',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Yandex Dorks', path: '/yandex-dorks' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Yandex Dorks & Reverse Host Directory',
          url: `${origin}/yandex-dorks`,
          description:
            'Catalog of Yandex search operators with specialized reverse host (rhost:) discovery and date interval filters.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Yandex Dorks',
              item: `${origin}/yandex-dorks`,
            },
          ],
        },
      ],
    }),
  },

  guides: {
    title: 'OSINT & Search Syntax Guides | Dorksearch Academy',
    description:
      'In-depth, peer-reviewed educational tutorials on Google search operators, Yandex reverse host reconnaissance, and responsible disclosure.',
    keywords:
      'osint guides, google dorking tutorial, yandex rhost guide, passive recon workflow, s3 bucket security, responsible disclosure guide',
    canonicalPath: '/guides',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Academy Guides', path: '/guides' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'OSINT & Search Syntax Educational Guides',
          url: `${origin}/guides`,
          description:
            'Step-by-step guides explaining search engine indexing, boolean algebra queries, and ethical vulnerability remediation.',
          hasPart: [
            {
              '@type': 'Article',
              headline: 'The Comprehensive Guide to Google Search Operators & Dorking',
              description:
                'Master Google indexing engine, Boolean query logic, structural operators, and defensive audit workflows.',
              author: {
                '@type': 'Organization',
                name: 'Dorksearch Security Research Team',
              },
            },
            {
              '@type': 'Article',
              headline: 'Unlocking Yandex Search Operators: Reverse Host (rhost:) Reconnaissance',
              description:
                'Explore Yandex unique rhost syntax, reverse domain indexing, and geographic OSINT strategies.',
              author: {
                '@type': 'Organization',
                name: 'Dorksearch Security Research Team',
              },
            },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Guides',
              item: `${origin}/guides`,
            },
          ],
        },
      ],
    }),
  },

  tools: {
    title: 'Free OSINT & Security Research Tools Directory | Dorksearch',
    description:
      'Curated directory of hand-tested open-source intelligence tools for DNS enumeration, Wayback archives, and certificate logs.',
    keywords:
      'free osint tools, security research tools, certificate transparency, wayback machine search, dns recon tools, shodan alternatives',
    canonicalPath: '/tools',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Tools Directory', path: '/tools' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'OSINT & Security Research Tools Directory',
          url: `${origin}/tools`,
          description:
            'A curated reference list of free, lawful, and authoritative security research utilities.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Tools',
              item: `${origin}/tools`,
            },
          ],
        },
      ],
    }),
  },

  faq: {
    title: 'Frequently Asked Questions | Dorksearch OSINT & Search',
    description:
      'Verified answers concerning search operator mechanics, domain variable interpolation, passive auditing boundaries, and privacy safeguards.',
    keywords:
      'dorksearch faq, is google dorking legal, what is a search dork, ethical hacking faq, osint questions, bug bounty dorking legal',
    canonicalPath: '/faq',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          name: 'Dorksearch Frequently Asked Questions',
          url: `${origin}/faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is a search dork (advanced search operator query)?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A search dork is an advanced query string that combines targeted keywords with native search engine indexing operators such as site:, filetype:, intitle:, inurl:, or rhost:. Rather than performing a generic keyword search, search dorks instruct search engine crawlers to isolate precise structural records, MIME types, or specific domain subtrees.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is Dorksearch and how does it assist researchers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Dorksearch is a clean, structured query synthesis engine and reference catalog. By inputting an authorized domain, Dorksearch dynamically normalizes the target domain and generates tested Google and Yandex search operator queries for reconnaissance, asset inventorying, and defensive auditing.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does Dorksearch perform active port scans or exploit web servers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Dorksearch performs zero active scanning, network probing, port knocking, or server exploitation. The entire application runs client-side in your web browser. No HTTP packets or TCP handshakes are ever transmitted from Dorksearch infrastructure to your entered domain.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is using Dorksearch legal for penetration testing and bug bounties?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, provided you are researching domains within your authorized scope of engagement or analyzing publicly accessible search engine indexes under defensive guidelines. Querying a public search engine is lawful, as search engines only display content that domain owners have permitted crawlers to catalog. However, attempting to exploit vulnerabilities or downloading unauthorized private data discovered in search indexes is strictly prohibited by law.',
              },
            },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'FAQ',
              item: `${origin}/faq`,
            },
          ],
        },
      ],
    }),
  },

  about: {
    title: 'About Dorksearch - Our Research Mission & Ethics | Dorksearch',
    description:
      'Learn about Dorksearch’s mission to make public search engine indexing transparent, ethical, and accessible for cybersecurity professionals.',
    keywords:
      'about dorksearch, osint research mission, ethical cybersecurity research, passive reconnaissance standards',
    canonicalPath: '/about',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          name: 'About Dorksearch',
          url: `${origin}/about`,
          description:
            'Dorksearch provides educational reference materials and procedural query builders designed to illuminate public search indexing patterns.',
          mainEntity: {
            '@type': 'Organization',
            name: 'Dorksearch',
            url: origin,
            description:
              'Dedicated to democratizing OSINT search syntax for defensive auditors and cybersecurity students.',
            knowsAbout: [
              'Cybersecurity',
              'OSINT',
              'Google Search Operators',
              'Yandex Search Syntax',
              'Vulnerability Remediation',
            ],
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'About',
              item: `${origin}/about`,
            },
          ],
        },
      ],
    }),
  },

  contact: {
    title: 'Contact Dorksearch - Inquiries, DMCA & Support',
    description:
      'Get in touch with the Dorksearch research team for support inquiries, DMCA notices, feedback, and responsible disclosure coordination.',
    keywords:
      'contact dorksearch, osint support, dmca takedown, security vulnerability report, feedback',
    canonicalPath: '/contact',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact & Support', path: '/contact' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          name: 'Contact Dorksearch',
          url: `${origin}/contact`,
          description:
            'Official contact channels for general inquiries, technical support, and DMCA notifications.',
          mainEntity: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@dorksearch.example',
            availableLanguage: ['English'],
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Contact',
              item: `${origin}/contact`,
            },
          ],
        },
      ],
    }),
  },

  'privacy-policy': {
    title: 'Privacy Policy | Dorksearch',
    description:
      'Comprehensive privacy policy covering client-side data handling, localStorage usage, Google Analytics 4, and third-party advertising cookies.',
    keywords: 'privacy policy, dorksearch privacy, gdpr compliance, ccpa, advertising cookies, local storage',
    canonicalPath: '/privacy-policy',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dorksearch Privacy Policy',
      url: `${origin}/privacy-policy`,
      description: 'Privacy standards, web storage policies, and advertising disclosures.',
      publisher: { '@type': 'Organization', name: 'Dorksearch' },
    }),
  },

  terms: {
    title: 'Terms of Service | Dorksearch',
    description:
      'Terms of service detailing authorized usage, intellectual property, disclaimers, and user obligations when using query synthesis tools.',
    keywords: 'terms of service, legal terms, acceptable use, dorksearch terms',
    canonicalPath: '/terms',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dorksearch Terms of Service',
      url: `${origin}/terms`,
      description: 'Terms and conditions governing the use of Dorksearch resources.',
      publisher: { '@type': 'Organization', name: 'Dorksearch' },
    }),
  },

  disclaimer: {
    title: 'Responsible Use Disclaimer | Dorksearch',
    description:
      'Responsible use disclaimer establishing ethical research expectations, CFAA boundaries, and defensive reconnaissance guidelines.',
    keywords: 'responsible use disclaimer, ethical hacking boundaries, defensive reconnaissance, cfaa compliance',
    canonicalPath: '/disclaimer',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Responsible Use Disclaimer', path: '/disclaimer' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dorksearch Responsible Use Disclaimer',
      url: `${origin}/disclaimer`,
      description: 'Ethical reconnaissance guidelines and legal disclaimers.',
      publisher: { '@type': 'Organization', name: 'Dorksearch' },
    }),
  },

  'cookie-policy': {
    title: 'Cookie & Web Storage Policy | Dorksearch',
    description:
      'Detailed overview of functional client storage, Google Analytics tracking, and third-party Google AdSense advertising cookie controls.',
    keywords: 'cookie policy, web storage, adsense cookies, cookie opt-out, tracking disclosure',
    canonicalPath: '/cookie-policy',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Cookie Policy', path: '/cookie-policy' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dorksearch Cookie & Web Storage Policy',
      url: `${origin}/cookie-policy`,
      description: 'Disclosures regarding browser cookies, local storage, and third-party advertising partners.',
      publisher: { '@type': 'Organization', name: 'Dorksearch' },
    }),
  },

  'editorial-policy': {
    title: 'Editorial & Integrity Guidelines | Dorksearch',
    description:
      'Editorial guidelines defining our peer-review protocol, error correction procedures, and ethical disclosure standards.',
    keywords: 'editorial guidelines, content standards, peer review, error correction, responsible disclosure',
    canonicalPath: '/editorial-policy',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Editorial Guidelines', path: '/editorial-policy' },
    ],
    getStructuredData: (origin: string) => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Dorksearch Editorial & Integrity Guidelines',
      url: `${origin}/editorial-policy`,
      description: 'Our journalistic, technical accuracy, and zero-day protection publishing standards.',
      publisher: { '@type': 'Organization', name: 'Dorksearch' },
    }),
  },
};

/**
 * Utility helper to set or update a <meta> element in document.head
 */
function setMetaTag(name: string, content: string, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attribute = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Utility helper to set or update canonical link tag
 */
function setCanonical(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Utility helper to set or update JSON-LD structured data script
 */
function setStructuredDataScript(data: Record<string, any>) {
  if (typeof document === 'undefined') return;
  let script = document.getElementById('dorksearch-json-ld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'dorksearch-json-ld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

/**
 * Dynamically updates document title, canonical link, meta tags, and structured data
 * for the requested route.
 */
export function updateDocumentSEO(routeKey: string): RouteSEOConfig {
  const config = SEO_CONFIGS[routeKey] || SEO_CONFIGS.home;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return config;
  }

  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const basePath = segments.length > 0 && segments[0] === 'Dork_Xn' ? '/Dork_Xn' : '';
  const canonicalUrl = `${origin}${basePath}${config.canonicalPath}`;

  // 1. Title tag
  document.title = config.title;

  // 2. Primary Meta Tags
  setMetaTag('description', config.description);
  setMetaTag('keywords', config.keywords);
  setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMetaTag('application-name', 'Dorksearch');
  setMetaTag('author', 'Dorksearch Security Research Team');

  // 3. Canonical Tag
  setCanonical(canonicalUrl);

  // 4. OpenGraph Social Cards
  setMetaTag('og:title', config.title, true);
  setMetaTag('og:description', config.description, true);
  setMetaTag('og:url', canonicalUrl, true);
  setMetaTag('og:type', config.ogType, true);
  setMetaTag('og:site_name', 'Dorksearch', true);
  setMetaTag('og:locale', 'en_US', true);

  // 5. Twitter / X Cards
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', config.title);
  setMetaTag('twitter:description', config.description);
  setMetaTag('twitter:url', canonicalUrl);

  // 6. Schema.org JSON-LD Structured Data
  try {
    const structuredData = config.getStructuredData(origin);
    setStructuredDataScript(structuredData);
  } catch (err) {
    console.error('Failed to generate structured data for SEO:', err);
  }

  return config;
}
