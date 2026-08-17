import React, { useState } from 'react';
import { skills, skillCategories, favoritePackages, type SkillCategory } from '../../../entities/skill';
import { 
  Wrench, 
  Search, 
  Star,
  Layers,
  ChevronDown
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory['id']>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const currentActiveSkillObj = skills.find(s => s.name === selectedSkill);

  return (
    <section id="skills" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>TECHNICAL COMPETENCY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Skills &amp; Architecture Toolkit
            </h2>
          </div>

          {/* Minimalist Live Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-sky-500 text-slate-950 dark:text-white placeholder-slate-400 transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm scale-[1.02]'
                    : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {cat.id === 'all' ? skills.length : skills.filter(s => s.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimalist Skills Pill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
          {filteredSkills.map((skill, sIdx) => {
            const isSelected = selectedSkill === skill.name;

            return (
              <div
                key={sIdx}
                onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                className={`glass-card rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all hover:border-sky-500/60 hover:-translate-y-0.5 relative group shadow-sm border ${
                  isSelected 
                    ? 'border-sky-500 bg-sky-500/5 dark:bg-sky-950/20' 
                    : 'border-slate-200/90 dark:border-slate-800/80'
                }`}
                title="Click to toggle specializations"
              >
                <div className="flex items-center gap-2 truncate">
                  {skill.highlight && (
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  )}
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {skill.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                    {skill.experience}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSelected ? 'rotate-180 text-sky-500' : 'group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Skill Details Drawer (Revealed on click) */}
        {currentActiveSkillObj && (
          <div className="mb-6 p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20 animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  {currentActiveSkillObj.name} ({currentActiveSkillObj.experience})
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Specializations:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentActiveSkillObj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white self-start sm:self-center cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Favorite NPM Packages Row */}
        <div className="glass-card rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            Favorite Packages
          </div>
          <div className="flex flex-wrap gap-1.5">
            {favoritePackages.map((pkg, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium"
              >
                {pkg}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
