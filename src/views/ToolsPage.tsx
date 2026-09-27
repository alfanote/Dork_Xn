import React, { useState } from 'react';
import { normalizeTarget, buildSearchUrl } from '../utils/dorkUtils';
import { MascotArtwork, MASCOT_IMAGES } from '../components/mascots/Mascots';
import {
  Wrench,
  Link,
  Code2,
  Search,
  Copy,
  Check,
  ExternalLink,
  Globe2,
  RefreshCw,
  Sliders,
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'normalizer' | 'encoder' | 'builder'>('normalizer');

  // Tool 1: Domain Normalizer State
  const [normInput, setNormInput] = useState('https://sub.corp.example.com:8443/auth/login?redirect=true');
  const normalized = normalizeTarget(normInput);

  // Tool 2: Query Encoder / Decoder State
  const [encoderInput, setEncoderInput] = useState('site:example.com "confidential document" filetype:pdf');
  const [encoderMode, setEncoderMode] = useState<'url' | 'double_url' | 'base64' | 'unicode'>('url');

  const getEncodedOutput = () => {
    try {
      if (encoderMode === 'url') return encodeURIComponent(encoderInput);
      if (encoderMode === 'double_url') return encodeURIComponent(encodeURIComponent(encoderInput));
      if (encoderMode === 'base64') return btoa(unescape(encodeURIComponent(encoderInput)));
      if (encoderMode === 'unicode') {
        return encoderInput
          .split('')
          .map((c) => '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4))
          .join('');
      }
      return encoderInput;
    } catch {
      return 'Encoding error - check input syntax';
    }
  };

  // Tool 3: Search URL Builder State
  const [builderTarget, setBuilderTarget] = useState('example.com');
  const [builderFiletype, setBuilderFiletype] = useState('pdf');
  const [builderIntitle, setBuilderIntitle] = useState('index of');
  const [builderInurl, setBuilderInurl] = useState('admin');
  const [builderIntext, setBuilderIntext] = useState('password');
  const [builderNegative, setBuilderNegative] = useState('www');
  const [builderEngine, setBuilderEngine] = useState<'google' | 'yandex'>('google');

  const buildCustomQuery = () => {
    const parts: string[] = [];
    if (builderTarget.trim()) parts.push(`site:${builderTarget.trim()}`);
    if (builderFiletype.trim()) parts.push(`filetype:${builderFiletype.trim()}`);
    if (builderIntitle.trim()) parts.push(`intitle:"${builderIntitle.trim()}"`);
    if (builderInurl.trim()) parts.push(`inurl:${builderInurl.trim()}`);
    if (builderIntext.trim()) parts.push(`intext:"${builderIntext.trim()}"`);
    if (builderNegative.trim()) parts.push(`-${builderNegative.trim()}`);
    return parts.join(' ');
  };

  const customQuery = buildCustomQuery();
  const customSearchUrl = buildSearchUrl(customQuery, builderEngine);

  // Copy feedback
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>OSINT Utility Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Research & Operator Tools
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Essential utilities to normalize hostnames, encode URL query strings, and construct custom multi-operator payloads.
          </p>
        </div>

        {/* Tool Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveTool('normalizer')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'normalizer'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Domain Normalizer
            </button>
            <button
              onClick={() => setActiveTool('encoder')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'encoder'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Query Encoder
            </button>
            <button
              onClick={() => setActiveTool('builder')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'builder'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Search URL Builder
            </button>
          </div>
        </div>

        {/* TOOL 1: DOMAIN NORMALIZER */}
        {activeTool === 'normalizer' && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Link className="w-5 h-5 text-blue-600" />
                <span>Domain Normalizer & Token Extractor</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Paste any complex URL, subdomain, or port. We strip headers and resolve clean hostname, root SLD, and reversed rhost notation.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Input Raw Target / URL
                </label>
                <input
                  type="text"
                  value={normInput}
                  onChange={(e) => setNormInput(e.target.value)}
                  placeholder="https://example.com/..."
                  className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Parsed Output Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <div className="text-[11px] font-semibold text-slate-500">Normalized Domain (TARGET)</div>
                  <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 flex items-center justify-between">
                    <span>{normalized.domain}</span>
                    <button
                      onClick={() => handleCopy(normalized.domain, 'domain')}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      {copiedState === 'domain' ? 'Copied' : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <div className="text-[11px] font-semibold text-slate-500">Reversed Host (rhost: for Yandex)</div>
                  <div className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400 mt-1 flex items-center justify-between">
                    <span>{normalized.rhost}</span>
                    <button
                      onClick={() => handleCopy(normalized.rhost, 'rhost')}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      {copiedState === 'rhost' ? 'Copied' : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <div className="text-[11px] font-semibold text-slate-500">Root SLD (domain: operator)</div>
                  <div className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {normalized.rootName}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <div className="text-[11px] font-semibold text-slate-500">Top-Level Domain (TLD)</div>
                  <div className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400 mt-1">
                    .{normalized.tld}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: QUERY ENCODER */}
        {activeTool === 'encoder' && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                <span>Query Encoder & URL Sanitizer</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Safely format special search symbols (&, +, quotes, spaces) for browser addresses and automated script payloads.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Plain Search Query
                </label>
                <textarea
                  rows={3}
                  value={encoderInput}
                  onChange={(e) => setEncoderInput(e.target.value)}
                  className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mode Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Encoding:</span>
                {(['url', 'double_url', 'base64', 'unicode'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setEncoderMode(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                      encoderMode === m
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {m.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Output */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Encoded Output</span>
                  <button
                    onClick={() => handleCopy(getEncodedOutput(), 'encoded')}
                    className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1"
                  >
                    {copiedState === 'encoded' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedState === 'encoded' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
                  {getEncodedOutput()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: SEARCH URL BUILDER */}
        {activeTool === 'builder' && (
          <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-600" />
                  <span>Interactive Search URL Builder</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Compose custom multi-operator queries visually with instantaneous browser test execution.
                </p>
              </div>

              {/* Engine Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  onClick={() => setBuilderEngine('google')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    builderEngine === 'google'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Google
                </button>
                <button
                  onClick={() => setBuilderEngine('yandex')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    builderEngine === 'yandex'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Yandex
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Domain (site:)
                </label>
                <input
                  type="text"
                  value={builderTarget}
                  onChange={(e) => setBuilderTarget(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Filetype (filetype:)
                </label>
                <input
                  type="text"
                  value={builderFiletype}
                  onChange={(e) => setBuilderFiletype(e.target.value)}
                  placeholder="pdf, xlsx, doc..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Title Match (intitle:)
                </label>
                <input
                  type="text"
                  value={builderIntitle}
                  onChange={(e) => setBuilderIntitle(e.target.value)}
                  placeholder="index of, login, report..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  URL Segment (inurl:)
                </label>
                <input
                  type="text"
                  value={builderInurl}
                  onChange={(e) => setBuilderInurl(e.target.value)}
                  placeholder="admin, api, upload..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Body Text (intext:)
                </label>
                <input
                  type="text"
                  value={builderIntext}
                  onChange={(e) => setBuilderIntext(e.target.value)}
                  placeholder="confidential, password..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Exclude Subdomain (-term)
                </label>
                <input
                  type="text"
                  value={builderNegative}
                  onChange={(e) => setBuilderNegative(e.target.value)}
                  placeholder="www, static, cdn..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Assembled Query Preview */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-500">Assembled Search Query</div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-900 dark:text-white break-all">
                {customQuery || 'Please enter query parameters above'}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => handleCopy(customQuery, 'customQuery')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  {copiedState === 'customQuery' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedState === 'customQuery' ? 'Copied' : 'Copy Query'}</span>
                </button>

                <a
                  href={customSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <span>Launch on {builderEngine === 'google' ? 'Google' : 'Yandex'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
