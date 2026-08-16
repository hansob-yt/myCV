import React, { useState } from 'react';
import { skills, skillCategories } from '../data/cvData';
import type { SkillCategory } from '../types/cv';
import { 
  Wrench, 
  Search, 
  Check, 
  PackageCheck, 
  Star 
} from 'lucide-react';

interface SkillsSectionProps {
  selectedSkillTag?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory['id']>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const favoritePackages = [
    'lucide-react',
    'react-easy-crop',
    'react-toastify',
    'clsx',
    'recharts',
    'zod',
    'zustand',
    'tanstack-query'
  ];

  const handleCopySkill = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedSkill(name);
    setTimeout(() => setCopiedSkill(null), 1800);
  };

  const filteredSkills = skills.filter((skill) => {
    // Category filter
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;

    // Search query filter
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>TECHNICAL COMPETENCY INVENTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Skills &amp; Architecture Toolkit
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Specialized in modern React 19 ecosystem, strict TypeScript type safety, TanStack state management, and Feature-Sliced Design.
            </p>
          </div>

          {/* Interactive Live Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. FSD, Vite, Zod)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-sky-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 scale-[1.02]'
                    : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {cat.id === 'all' ? skills.length : skills.filter(s => s.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredSkills.map((skill, sIdx) => {
            const isCopied = copiedSkill === skill.name;

            return (
              <div
                key={sIdx}
                onClick={() => handleCopySkill(skill.name)}
                className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                title="Click to copy skill name"
              >
                {skill.highlight && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Star className="w-3 h-3 fill-amber-400" />
                    Core Focus
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {skill.experience}
                    </span>
                  </div>

                  {/* Visual Proficiency Meter */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Sub-tags */}
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Copied Indicator Feedback */}
                {isCopied && (
                  <div className="absolute inset-0 bg-sky-500/90 text-white flex items-center justify-center gap-2 text-xs font-semibold backdrop-blur-sm animate-fadeIn">
                    <Check className="w-4 h-4" />
                    Copied "{skill.name}" to clipboard!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Favorite NPM Packages Bar */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-sky-500" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Favorite NPM Packages &amp; Tooling Modules
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standard libraries integrated across real-world enterprise applications
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {favoritePackages.map((pkg, pIdx) => (
                <span
                  key={pIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-medium"
                >
                  npm: {pkg}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
