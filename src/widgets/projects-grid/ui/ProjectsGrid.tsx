import React, { useState } from 'react';
import { projects, type ProjectItem } from '../../../entities/project';
import { 
  FolderGit2, 
  Lock, 
  ArrowRight, 
  KeyRound, 
  Activity, 
  Terminal,
  BookOpen
} from 'lucide-react';

interface ProjectsGridProps {
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenTerminal: () => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ 
  onOpenProjectModal, 
  onOpenTerminal 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Security & Auth', 'Analytics & Data'];

  const filteredProjects = projects.filter(proj => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>ENTERPRISE PRODUCTION PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Featured Enterprise Projects
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isAuth = project.demoType === 'kilid-auth';

            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg"
              >
                {/* Top Accent Light */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
                  isAuth 
                    ? 'from-sky-400 via-indigo-500 to-purple-500' 
                    : 'from-emerald-400 via-teal-500 to-sky-500'
                }`} />

                <div>
                  {/* Card Meta & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isAuth 
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-500 border border-sky-500/20' 
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {isAuth ? <KeyRound className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {project.subtitle}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Closed Source
                    </span>
                  </div>

                  {/* Concise Tagline */}
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 mb-4 leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {project.metrics.map((m, mIdx) => (
                      <div 
                        key={mIdx} 
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 text-center"
                      >
                        <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">{m.value}</div>
                        <div className="text-[10px] font-medium text-slate-600 dark:text-slate-400 truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 5).map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => onOpenProjectModal(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Details &amp; Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenTerminal}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                    title="Inspect FSD Architecture"
                  >
                    <Terminal className="w-4 h-4 text-sky-500" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
