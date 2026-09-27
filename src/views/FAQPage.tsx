import React from 'react';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { HelpCircle, MessageSquare, BookOpen, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { AdUnitPlaceholder } from '../components/ads/AdUnitPlaceholder';

interface FAQPageProps {
  onNavigate: (route: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Detailed, verified answers concerning search operator mechanics, domain variable interpolation, client-side privacy safeguards, and authorized OSINT audit parameters.
          </p>
        </div>

        {/* Top Ad Unit */}
        <AdUnitPlaceholder slotId="faq-top-banner" format="horizontal" />

        {/* Full FAQ Accordion with Categories & Search */}
        <div className="my-8">
          <FAQAccordion showHeading={false} />
        </div>

        {/* Bottom Ad Unit */}
        <AdUnitPlaceholder slotId="faq-bottom-banner" format="horizontal" />

        {/* Quick Resource & Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Explore OSINT & Syntax Guides
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dive deep into real-world operational guides covering Google dorking, Yandex rhost: operators, and defensive data leak remediation.
              </p>
            </div>
            <button
              onClick={() => onNavigate('guides')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <span>Browse Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Contact Our Editorial Team
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Have a syntax suggestion, partnership inquiry, or need clarification regarding ethical boundaries? We respond within 24–48 hours.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
