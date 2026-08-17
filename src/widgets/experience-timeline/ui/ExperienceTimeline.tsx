import React from 'react';
import { experiences, type ExperienceItem } from '../../../entities/experience';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';

interface ExperienceTimelineProps {
  onOpenExperienceModal: (exp: ExperienceItem) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ 
  onOpenExperienceModal 
}) => {
  return (
    <section id="experience" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREER TRAJECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Work Experience &amp; Traineeship
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            2 Years at Behsam Kavan Afraz (Kavano)
          </p>
        </div>

        {/* Minimalist Timeline Cards */}
        <div className="relative pl-6 sm:pl-10 space-y-6">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-3 sm:left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-slate-300 dark:to-slate-800" />

          {experiences.map((exp) => {
            const isWork = exp.type === 'work';

            return (
              <div 
                key={exp.id} 
                className="relative group transition-all duration-300"
              >
                {/* Node Icon */}
                <div className={`absolute -left-[27px] sm:-left-[35px] top-4 w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-md ${
                  isWork 
                    ? 'bg-gradient-to-tr from-sky-500 to-indigo-600 border-sky-400 text-white shadow-sky-500/30 group-hover:scale-110' 
                    : 'bg-slate-900 border-indigo-500/40 text-indigo-400 shadow-indigo-500/20 group-hover:scale-110'
                }`}>
                  {isWork ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                {/* Minimalist Card */}
                <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800/80 shadow-md">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {exp.role}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        isWork 
                          ? 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20' 
                          : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {exp.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-300 mb-3">
                    <span>{exp.companyFullName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="flex items-center gap-1 font-normal text-slate-600 dark:text-slate-400">
                      <MapPin className="w-3 h-3 text-sky-500" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Punchy 1-line Role Summary */}
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-4 line-clamp-1">
                    {exp.summary}
                  </p>

                  {/* Card Action & Top Stack Pills */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Top 3 Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Read More Modal CTA */}
                    <button
                      onClick={() => onOpenExperienceModal(exp)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 hover:bg-sky-500 hover:text-white border border-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer group/btn"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read More Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
