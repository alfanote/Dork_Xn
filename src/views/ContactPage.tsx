import React, { useState } from 'react';
import { MascotArtwork, MASCOT_IMAGES } from '../components/mascots/Mascots';
import {
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Clock,
  MapPin,
  HelpCircle,
  FileQuestion,
  AlertTriangle,
} from 'lucide-react';
import { AdUnitPlaceholder } from '../components/ads/AdUnitPlaceholder';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'general',
    subject: '',
    message: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid and deliverable email address.');
      return;
    }
    if (!formData.consent) {
      setError('Please agree to our privacy terms to submit your message.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Support & Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Dorksearch
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Have questions regarding search operator syntax, educational collaboration, error reports, or ethical guidelines? Reach out directly to our research and editorial team.
          </p>
        </div>

        {/* AdSense Top Banner */}
        <AdUnitPlaceholder slotId="contact-top-banner" format="horizontal" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto mt-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.name}</span>. Your inquiry has been routed to our <span className="font-semibold capitalize">{formData.department}</span> department. Our team will review and reply to <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span> within 24 to 48 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          department: 'general',
                          subject: '',
                          message: '',
                          consent: false,
                        });
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Send Us a Message
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      All communications are handled with strict confidentiality.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Alex Rivera"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Work or Personal Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@research-institution.org"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Inquiry Department <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">General Inquiry & Feedback</option>
                        <option value="editorial">Editorial & Guide Corrections</option>
                        <option value="technical">Operator Syntax Bug / Suggestion</option>
                        <option value="privacy">Privacy & Data Protection Officer</option>
                        <option value="dmca">DMCA & Legal Notices</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Yandex rhost: operator refinement"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include relevant search operators, domain test cases, or academic context..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="consent-check" className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                      I agree that my email and inquiry will be processed in accordance with the Dorksearch Privacy Policy. We do not sell your personal data or transmit marketing solicitations.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Institutional Contact Details & Mascot */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mascot Visual Card */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs text-center space-y-4">
              <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <MascotArtwork
                  src={MASCOT_IMAGES.aboutTeam}
                  alt="Original cartoon cat Barnaby and mouse Pip working together on research"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Friendly Research Companions
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Barnaby and Pip are always on the lookout for better search syntax and clean documentation. Every inquiry helps improve our open catalog.
                </p>
              </div>
            </div>

            {/* Direct Department Channels */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Dedicated Communication Channels
              </h3>

              <div className="space-y-3 text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Editorial & Research</span>
                    <span className="font-mono text-slate-500">editorial@dorksearch.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Privacy & Legal / DMCA</span>
                    <span className="font-mono text-slate-500">privacy@dorksearch.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">Service Level Agreement</span>
                    <span className="text-slate-500">Mon–Fri: 9:00 AM – 6:00 PM UTC (24–48h response)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AdSense Sidebar Unit */}
            <AdUnitPlaceholder slotId="contact-sidebar-unit" format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
};
