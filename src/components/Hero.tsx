import React, { useState } from 'react';
import { personalBio } from '../data/cvData';
import { 
  Terminal, 
  ArrowRight, 
  Copy, 
  Check, 
  MapPin, 
  Mail, 
  Layers, 
  Zap, 
  Sparkles,
  Download,
  BookOpen
} from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { triggerCelebration } from '../utils/confetti';

interface HeroProps {
  onOpenBio: () => void;
  onOpenTerminal: () => void;
  onPrintResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBio, 
  onOpenTerminal, 
  onPrintResume 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalBio.email);
    setCopiedEmail(true);
    triggerCelebration();
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section 
      id="bio" 
      className="relative min-h-[85vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Status Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass-panel border-slate-200/90 dark:border-slate-800/80 shadow-sm text-slate-800 dark:text-slate-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{personalBio.status}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <MapPin className="w-3 h-3 text-sky-500" />
              {personalBio.location}
            </span>
          </div>
        </div>

        {/* Minimalist Profile Hero Card */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group shadow-2xl"
        >
          {/* Top card glowing border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-indigo-500 opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Avatar & Core Identity */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
              
              {/* Profile Avatar Frame */}
              <div className="relative mb-5 group/avatar">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[3px] shadow-xl shadow-sky-500/25 group-hover/avatar:shadow-sky-500/40 group-hover/avatar:scale-105 transition-all duration-300">
                  <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative">
                    <img 
                      src={personalBio.avatarUrl} 
                      alt={personalBio.name}
                      className="w-full h-full object-cover object-center group-hover/avatar:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Monogram */}
                    <div 
                      style={{ display: 'none' }}
                      className="w-full h-full bg-slate-900 flex-col items-center justify-center p-3"
                    >
                      <span className="font-mono text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 to-indigo-300">
                        SK
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-sky-400 shadow-md">
                  <Zap className="w-4 h-4 text-sky-400" />
                </div>
              </div>

              {/* Title & Headline */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-1">
                {personalBio.name}
              </h1>
              <p className="text-sm font-semibold font-mono text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {personalBio.title}
              </p>

              {/* Quick Contact Links */}
              <div className="w-full flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2 truncate text-slate-900 dark:text-slate-200 font-medium">
                    <Mail className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="truncate">{personalBio.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-sky-600 transition-colors shrink-0 ml-1 cursor-pointer"
                    title={copiedEmail ? 'Copied!' : 'Copy Email'}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={personalBio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-900 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-all group/link font-medium"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-3.5 h-3.5 text-slate-800 dark:text-slate-300 group-hover/link:text-sky-500" />
                    <span className="font-mono">github.com/hansob-yt</span>
                  </div>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform text-slate-500" />
                </a>
              </div>

            </div>

            {/* Right Column: Punchy Tagline, Stats, and Modal Trigger */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              <div>
                {/* Punchy Concise Headline */}
                <p className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-200 leading-relaxed mb-4">
                  {personalBio.shortBio}
                </p>

                {/* Minimalist Key Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {personalBio.stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700/50 hover:border-sky-500/50 transition-all group/stat hover:-translate-y-0.5 shadow-sm"
                    >
                      <div className="text-lg sm:text-xl font-bold font-mono text-slate-950 dark:text-white group-hover/stat:text-sky-600 dark:group-hover/stat:text-sky-400 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row with "Read Full Story" Modal Button */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                
                {/* Read Full Bio Modal CTA */}
                <button
                  onClick={onOpenBio}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full Bio &amp; Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* View Projects Link */}
                <a
                  href="#projects"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/70 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>Explore Projects</span>
                </a>

                {/* FSD Code Explorer */}
                <button
                  onClick={onOpenTerminal}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700/70 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-sky-500" />
                  <span>FSD Explorer</span>
                </button>

                {/* Print Resume */}
                <button
                  onClick={() => {
                    triggerCelebration();
                    onPrintResume();
                  }}
                  className="p-2.5 rounded-xl text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all ml-auto cursor-pointer"
                  title="Download / Print PDF Resume"
                >
                  <Download className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
