import React from 'react';
import type { ExperienceItem } from '../types/cv';
import { 
  X, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Cpu 
} from 'lucide-react';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ 
  experience, 
  onClose 
}) => {
  if (!experience) return null;

  const isWork = experience.type === 'work';

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
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md ${
              isWork 
                ? 'bg-gradient-to-tr from-sky-500 to-indigo-600 border-sky-400 text-white' 
                : 'bg-slate-900 border-indigo-500/40 text-indigo-400'
            }`}>
              {isWork ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${
                  isWork 
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20' 
                    : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                }`}>
                  {experience.duration}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" />
                  {experience.period}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {experience.role}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mt-0.5">
                <span>{experience.companyFullName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-normal text-xs">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  {experience.location}
                </span>
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
          
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {experience.summary}
            </p>
          </div>

          {/* Key Accomplishments & Impact */}
          <div>
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Key Accomplishments &amp; Engineering Impact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {experience.accomplishments.map((acc, aIdx) => (
                <div 
                  key={aIdx} 
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{acc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Responsibilities */}
          <div>
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              Detailed Responsibilities
            </h4>
            <ul className="space-y-2 pl-1">
              {experience.responsibilities.map((resp, rIdx) => (
                <li 
                  key={rIdx} 
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {experience.metrics.map((metric, mIdx) => (
              <div 
                key={mIdx}
                className="p-3 rounded-xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20 text-center"
              >
                <div className="text-base sm:text-lg font-mono font-bold text-sky-600 dark:text-sky-400">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Full Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-500" />
              Technologies &amp; Libraries Applied
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {experience.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
