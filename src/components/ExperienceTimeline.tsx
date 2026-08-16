import React, { useState } from 'react';
import { experiences } from '../data/cvData';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Cpu 
} from 'lucide-react';

interface ExperienceTimelineProps {
  onSelectSkill?: (skill: string) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onSelectSkill }) => {
  const [expandedId, setExpandedId] = useState<string | null>('kavano-dev');
  const [filterType, setFilterType] = useState<'all' | 'work' | 'bootcamp'>('all');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredExperiences = experiences.filter(exp => {
    if (filterType === 'all') return true;
    return exp.type === filterType;
  });

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CAREER TRAJECTORY &amp; GROWTH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Work Experience &amp; Traineeship
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              From an intensive full-time engineering bootcamp to core developer architecting enterprise SSO &amp; telemetry dashboards at Behsam Kavan Afraz.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel self-start md:self-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Stages (2 Yrs)
            </button>
            <button
              onClick={() => setFilterType('work')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterType === 'work'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Core Developer (Yr 2)
            </button>
            <button
              onClick={() => setFilterType('bootcamp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterType === 'bootcamp'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bootcamp / Trainee (Yr 1)
            </button>
          </div>
        </div>

        {/* Vertical Interactive Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-10">
          
          {/* Vertical Connecting Neon Line */}
          <div className="absolute left-3 sm:left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-slate-300 dark:to-slate-800" />

          {filteredExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            const isWork = exp.type === 'work';

            return (
              <div 
                key={exp.id} 
                className="relative group transition-all duration-300"
              >
                {/* Timeline Icon Node */}
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

                {/* Experience Content Card */}
                <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-lg">
                  
                  {/* Card Header & Summary Bar */}
                  <div 
                    onClick={() => toggleExpand(exp.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                          {exp.role}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          isWork 
                            ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20' 
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {exp.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-sky-500" />
                          {exp.period}
                        </span>
                        <button 
                          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
                          aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      <span>{exp.companyFullName}</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="flex items-center gap-1 font-normal text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3 text-sky-500" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Expandable Deep Details */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-5 animate-fadeIn">
                      
                      {/* Key Accomplishments Callout */}
                      <div>
                        <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-sky-600 dark:text-sky-400 mb-2.5 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Key Accomplishments &amp; Impact
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {exp.accomplishments.map((acc, aIdx) => (
                            <div 
                              key={aIdx} 
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{acc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-sky-500" />
                          Core Responsibilities &amp; Engineering Focus
                        </h4>
                        <ul className="space-y-1.5 pl-1">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li 
                              key={rIdx} 
                              className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics Showcase */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1">
                        {exp.metrics.map((metric, mIdx) => (
                          <div 
                            key={mIdx}
                            className="p-2.5 sm:p-3 rounded-xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20 text-center"
                          >
                            <div className="text-base sm:text-lg font-mono font-bold text-sky-600 dark:text-sky-400">
                              {metric.value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div>
                        <h4 className="text-[11px] font-bold uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                          <Cpu className="w-3 h-3 text-sky-500" />
                          Technologies &amp; Tools Used
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSkill) onSelectSkill(tech);
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 transition-all cursor-pointer"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
