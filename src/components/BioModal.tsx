import React from 'react';
import { personalBio } from '../data/cvData';
import { 
  X, 
  User, 
  Mail, 
  Layers, 
  CheckCircle2, 
  Award,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const BioModal: React.FC<BioModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenTerminal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto project-modal-backdrop animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-sky-500/20 shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] overflow-hidden">
                <img 
                  src={personalBio.avatarUrl} 
                  alt={personalBio.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  About Me &amp; Journey
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {personalBio.status}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {personalBio.name}
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Layers className="w-3.5 h-3.5 text-sky-500" />
                {personalBio.title} • {personalBio.location}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Headline Summary */}
          <div className="p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              "{personalBio.shortBio}"
            </p>
          </div>

          {/* Full Narrative */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-500" />
              Background &amp; Engineering Philosophy
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {personalBio.fullBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Core Values / Strengths Grid */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Core Competencies &amp; Differentiators
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Feature-Sliced Design (FSD)</span>
                  <span className="text-slate-500 dark:text-slate-400">Strict architectural decoupling across 6 scalable domain layers.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Runtime Performance</span>
                  <span className="text-slate-500 dark:text-slate-400">~35% bundle reduction &amp; 60fps data visualizations.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Type-Safe Data Flow</span>
                  <span className="text-slate-500 dark:text-slate-400">100% strict TypeScript typing paired with Zod schema validation.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Server State Mastery</span>
                  <span className="text-slate-500 dark:text-slate-400">TanStack Query caching, optimistic UI, and background sync.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Bar */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a 
                href={`mailto:${personalBio.email}`}
                className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-sky-500"
              >
                <Mail className="w-3.5 h-3.5 text-sky-500" />
                <span>{personalBio.email}</span>
              </a>
              <span className="text-slate-400">•</span>
              <a 
                href={personalBio.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-sky-500"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>github.com/hansob-yt</span>
              </a>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenTerminal();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-sky-500 text-white hover:bg-sky-400 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore FSD Code</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
