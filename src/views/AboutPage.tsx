import React from 'react';
import { MascotArtwork, MASCOT_IMAGES, MascotLogoIcon } from '../components/mascots/Mascots';
import {
  ShieldCheck,
  Sparkles,
  BookOpen,
  Compass,
  CheckCircle2,
  Lock,
  Search,
  Database,
  Globe2,
  Code2,
  Users,
} from 'lucide-react';
import { AdUnitPlaceholder } from '../components/ads/AdUnitPlaceholder';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Compass className="w-3.5 h-3.5" />
                <span>About Dorksearch</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Built to make search research simpler.
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Dorksearch pairs the playful slapstick energy of our original cartoon companions—Barnaby the cat and Pip the mouse—with an institutional-grade query synthesis suite for defensive OSINT, academic inquiry, and authorized security audits.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Client-Side Computation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Dual Google & Yandex Index Support</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Zero Data Retention</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <MascotArtwork
                src={MASCOT_IMAGES.aboutTeam}
                alt="Original cartoon cat and mouse sitting beside a modern laptop with a magnifying glass"
                aspectRatioClass="aspect-[4/3]"
                className="shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Mission & AdSense-Friendly Longform Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Ad Unit 1 */}
        <AdUnitPlaceholder slotId="about-top" format="horizontal" />

        {/* What Dorksearch Is */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Platform Purpose
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            What Dorksearch Is & How It Serves Defenders
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Dorksearch is a web-based, educational search query synthesizer and reference repository. In modern cybersecurity, defensive professionals and open-source intelligence (OSINT) researchers frequently need to audit public web indices to uncover forgotten test files, unsecured database dumps, configuration drift, and exposed development portals.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Rather than relying on fragmented cheat sheets or dangerous scripts, Dorksearch standardizes the query creation process into an intuitive graphical interface. By applying systematic Boolean syntax, researchers can immediately visualize what search engine crawlers have already cataloged on the public web.
          </p>
        </div>

        {/* 3 Step Interactive Workflow */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            How The Query Engine Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Domain Normalization</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Raw input strings are sanitized in real time. Protocols (HTTP/HTTPS), subpaths, ports, and query tokens are stripped to derive the clean root hostname, SLD, and reversed-host (rhost) notation.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Template Synthesis</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Over 70 curated dork patterns across 20+ specialized categories dynamically substitute the target tokens into native search engine directives like <code className="font-mono text-blue-600">filetype:</code> or <code className="font-mono text-blue-600">rhost:</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Direct Engine Execution</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When you initiate a search, your browser directly opens the native search engine interface in a fresh tab. Dorksearch transmits zero queries through any intermediate proxy servers.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Unit 2 */}
        <AdUnitPlaceholder slotId="about-middle" format="in-article" />

        {/* Why Dorksearch Exists */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Why We Built Dorksearch
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The cybersecurity world is often crowded with ominous black-and-neon dashboards, matrix rain effects, and hyper-aggressive branding. Yet, the foundational work of security auditing—reading documentation, examining public indices, and understanding system hygiene—is deliberate, disciplined, and educational.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We created Dorksearch to provide a delightful, human-designed tool that makes research accessible to developers, students, journalists, and security researchers alike, backed by our beloved slapstick mascots Barnaby and Pip.
          </p>
        </div>

        {/* Responsible Use & Ethical Integrity */}
        <div className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-slate-900 dark:to-blue-950/40 p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Responsible-Use Philosophy
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Dorksearch is an educational generator. It does not perform automated vulnerability scanning, network probing, penetration attacks, or unauthorized data harvesting.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            We strongly emphasize that users must only query domains, systems, and assets they are explicitly authorized to audit under formal agreements or active bug bounty policies. Discovered disclosures should always be responsibly reported to asset owners according to coordinated vulnerability disclosure best practices.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('disclaimer')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Responsible Use Disclaimer →
            </button>
            <button
              onClick={() => onNavigate('editorial-policy')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Editorial & Integrity Guidelines →
            </button>
          </div>
        </div>

        {/* Quick FAQ / Context */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Quick Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950">
              <strong className="block text-slate-900 dark:text-white mb-1">Is Dorksearch free?</strong>
              Yes, 100% free for educational, professional, and academic research purposes.
            </div>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950">
              <strong className="block text-slate-900 dark:text-white mb-1">Does Dorksearch touch target servers?</strong>
              Never. Search requests run directly between your client browser and Google/Yandex.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
