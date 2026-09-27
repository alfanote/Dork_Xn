import { DorkItem, SearchEngine } from '../types/dork';

export interface NormalizedTarget {
  raw: string;
  domain: string; // e.g. "example.com"
  rootName: string; // e.g. "example"
  tld: string; // e.g. "com"
  rhost: string; // e.g. "com.example"
  isValid: boolean;
  error?: string;
}

/**
 * Normalizes user input into clean domain parts
 */
export function normalizeTarget(input: string): NormalizedTarget {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      raw: '',
      domain: 'example.com',
      rootName: 'example',
      tld: 'com',
      rhost: 'com.example',
      isValid: false,
      error: 'Please enter a target domain (e.g. example.com)',
    };
  }

  try {
    // Strip common protocol and www prefixes if present
    let clean = trimmed;
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      clean = clean.replace(/^https?:\/\//i, '');
    }
    // Remove port and path
    clean = clean.split('/')[0].split('?')[0].split('#')[0].split(':')[0];
    
    // Convert to lowercase
    clean = clean.toLowerCase();

    // Basic domain validation
    const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;
    const isValid = domainRegex.test(clean) && !clean.includes('..');

    const parts = clean.split('.');
    const tld = parts.length > 1 ? parts[parts.length - 1] : 'com';
    const rootName = parts.length > 1 ? parts[parts.length - 2] : parts[0];
    const rhost = [...parts].reverse().join('.');

    return {
      raw: trimmed,
      domain: clean || 'example.com',
      rootName: rootName || 'example',
      tld: tld || 'com',
      rhost: rhost || 'com.example',
      isValid,
      error: isValid ? undefined : 'Enter a valid domain name format (e.g. domain.com or sub.domain.org)',
    };
  } catch {
    return {
      raw: trimmed,
      domain: 'example.com',
      rootName: 'example',
      tld: 'com',
      rhost: 'com.example',
      isValid: false,
      error: 'Invalid domain format',
    };
  }
}

/**
 * Replaces placeholders in query template with normalized target properties
 */
export function formatQuery(template: string, target: NormalizedTarget): string {
  const domain = target.domain || 'example.com';
  const root = target.rootName || 'example';
  const tld = target.tld || 'com';
  const rhost = target.rhost || 'com.example';

  return template
    .replaceAll('{{TARGET}}', domain)
    .replaceAll('{{TARGET_ROOT}}', root)
    .replaceAll('{{TARGET_TLD}}', tld)
    .replaceAll('{{TARGET_RHOST}}', rhost)
    .replaceAll('{{TARGET_SLD}}', root);
}

/**
 * Builds live search engine URL safely
 */
export function buildSearchUrl(query: string, engine: SearchEngine): string {
  const encoded = encodeURIComponent(query);
  if (engine === 'yandex') {
    return `https://yandex.com/search/?text=${encoded}`;
  }
  return `https://www.google.com/search?q=${encoded}`;
}

/**
 * Export dorks list to formatted TXT
 */
export function exportToTxt(dorks: { item: DorkItem; formattedQuery: string }[], domain: string, engine: SearchEngine): void {
  const header = [
    '========================================================================',
    `DORKSEARCH EXPORT: ${domain.toUpperCase()}`,
    `Search Engine: ${engine.toUpperCase()}`,
    `Generated on: ${new Date().toISOString()}`,
    'Notice: For authorized research and OSINT purposes only.',
    '========================================================================\n',
  ].join('\n');

  const content = dorks
    .map(
      ({ item, formattedQuery }, index) =>
        `[${index + 1}] ${item.title} (${item.category} | ${item.riskLevel})\n` +
        `Description: ${item.description}\n` +
        `Query: ${formattedQuery}\n` +
        `Search URL: ${buildSearchUrl(formattedQuery, engine)}\n`
    )
    .join('\n------------------------------------------------------------------------\n\n');

  downloadFile(`dorksearch-${domain}-${engine}.txt`, 'text/plain', header + content);
}

/**
 * Export dorks list to CSV
 */
export function exportToCsv(dorks: { item: DorkItem; formattedQuery: string }[], domain: string, engine: SearchEngine): void {
  const headers = ['Index', 'Title', 'Category', 'Risk_Level', 'Engine', 'Query', 'Search_URL', 'Description'];
  const rows = dorks.map(({ item, formattedQuery }, idx) => {
    return [
      idx + 1,
      escapeCsv(item.title),
      escapeCsv(item.category),
      escapeCsv(item.riskLevel),
      engine,
      escapeCsv(formattedQuery),
      escapeCsv(buildSearchUrl(formattedQuery, engine)),
      escapeCsv(item.description),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  downloadFile(`dorksearch-${domain}-${engine}.csv`, 'text/csv;charset=utf-8;', csvContent);
}

/**
 * Export dorks list to JSON
 */
export function exportToJson(dorks: { item: DorkItem; formattedQuery: string }[], domain: string, engine: SearchEngine): void {
  const data = {
    exportedAt: new Date().toISOString(),
    domain,
    searchEngine: engine,
    totalQueries: dorks.length,
    queries: dorks.map(({ item, formattedQuery }, idx) => ({
      index: idx + 1,
      id: item.id,
      title: item.title,
      category: item.category,
      riskLevel: item.riskLevel,
      query: formattedQuery,
      searchUrl: buildSearchUrl(formattedQuery, engine),
      description: item.description,
      tags: item.tags,
    })),
  };

  downloadFile(`dorksearch-${domain}-${engine}.json`, 'application/json', JSON.stringify(data, null, 2));
}

function escapeCsv(str: string): string {
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replaceAll('"', '""')}"`;
  }
  return str;
}

function downloadFile(filename: string, mimeType: string, content: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
