import React, { useEffect } from 'react';
import type { ExperienceItem } from '../../../entities/experience';
import { 
  X, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (experience) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose]);

  if (!experience) return null;

  const isWork = experience.type === 'work';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl border ${
              isWork 
                ? 'bg-sky-500/10 border-sky-500/20 text-sky-500' 
                : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500'
            }`}>
              {isWork ? <Briefcase className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isWork 
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20' 
                    : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                }`}>
                  {experience.duration} • {isWork ? 'Production Role' : 'Intensive Bootcamp'}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {experience.role}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                <span>{experience.companyFullName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  {experience.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-500" />
                  {experience.period}
                </span>
              </div>
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
          
          {/* Executive Summary */}
          <div className="p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              {experience.summary}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Impact Metrics &amp; Scope
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {experience.metrics.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-center"
                >
                  <div className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mb-0.5">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Accomplishments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Core Accomplishments &amp; Responsibilities
            </h4>
            <div className="space-y-2.5">
              {experience.accomplishments.map((acc, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {acc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Focus Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-500" />
              Architectural Focus &amp; Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {experience.architectureHighlights.map((arch, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Tech Stack */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Technologies &amp; Libraries Leveraged
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {experience.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {experience.companyFullName} • Role Details
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
