import React, { useState } from 'react';
import { personalBio } from '../../../entities/profile';
import { GithubIcon } from '../../../shared/ui';
import { triggerFireworks, triggerCelebration } from '../../../shared/lib';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  ArrowUp, 
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalBio.email);
    setCopiedEmail(true);
    triggerCelebration();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email address';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerFireworks();
      setToastMessage(`Thank you, ${formData.name}! Your message has been prepared.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setToastMessage(null), 5000);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="pt-20 pb-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT &amp; COLLABORATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 mt-2">
            Interested in discussing an engineering opportunity, frontend architecture, or collaborating on a project? Feel free to reach out!
          </p>
        </div>

        {/* Main Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Email Card with 1-click copy */}
            <div className="glass-card rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Direct Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`mailto:${personalBio.email}`}
                className="text-sm sm:text-base font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline break-all"
              >
                {personalBio.email}
              </a>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Fastest response for networking and opportunities
              </p>
            </div>

            {/* GitHub Card */}
            <a
              href={personalBio.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-md block group/gh"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  GitHub Profile
                </span>
                <GithubIcon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover/gh:text-sky-500 transition-colors" />
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-950 dark:text-white group-hover/gh:text-sky-600 dark:group-hover/gh:text-sky-400 transition-colors">
                github.com/hansob-yt
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Explore open repositories and code experiments
              </p>
            </a>

            {/* Location & Status Card */}
            <div className="glass-card rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-950 dark:text-white">
                    {personalBio.location}
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    Available for Remote &amp; Onsite Opportunities
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800/80 shadow-xl relative overflow-hidden">
              
              {/* Toast Notification Alert */}
              {toastMessage && (
                <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900/80 border ${
                        errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                      } text-slate-950 dark:text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all font-medium`}
                    />
                    {errors.name && <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900/80 border ${
                        errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                      } text-slate-950 dark:text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all font-medium`}
                    />
                    {errors.email && <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opportunity Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all font-medium"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900/80 border ${
                      errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    } text-slate-950 dark:text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all resize-none font-medium`}
                  />
                  {errors.message && <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Preparing Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 font-medium">
            <span>© 2026 {personalBio.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 font-medium">
            <span className="font-mono text-[11px]">Built with React 19 • TypeScript • Tailwind</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
