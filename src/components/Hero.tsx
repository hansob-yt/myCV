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
  Download
} from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { triggerCelebration } from '../utils/confetti';

interface HeroProps {
  onOpenTerminal: () => void;
  onPrintResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onPrintResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalBio.email);
    setCopiedEmail(true);
    triggerCelebration();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section 
      id="bio" 
      className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/20 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Status Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass-card border-slate-200/80 dark:border-slate-800/80 shadow-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{personalBio.status}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin className="w-3 h-3 text-sky-500" />
              {personalBio.location}
            </span>
          </div>
        </div>

        {/* Main Glassmorphic Bio Showcase Card */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group shadow-2xl shadow-sky-950/10 dark:shadow-black/50"
        >
          {/* Subtle top card gradient border highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-indigo-500 opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Avatar / Monogram & Quick Details */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
              
              {/* Profile Avatar with Glass Glow */}
              <div className="relative mb-5 group/avatar">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[3px] shadow-xl shadow-sky-500/25 group-hover/avatar:shadow-sky-500/40 group-hover/avatar:scale-105 transition-all duration-300">
                  <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative">
                    <img 
                      src={personalBio.avatarUrl} 
                      alt={personalBio.name}
                      className="w-full h-full object-cover object-center group-hover/avatar:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to monogram if image fails
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
                      <span className="text-[10px] uppercase font-mono tracking-widest text-sky-400 font-semibold mt-1">
                        React • FSD
                      </span>
                    </div>
                    {/* Animated shine overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/avatar:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-sky-400 shadow-md">
                  <Zap className="w-4 h-4 text-sky-400" />
                </div>
              </div>

              {/* Title & Badge */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
                {personalBio.name}
              </h1>
              <p className="text-sm font-semibold font-mono text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {personalBio.title}
              </p>

              {/* Quick Contact Badges */}
              <div className="w-full flex flex-col gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                {/* Email with copy button */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 text-xs">
                  <div className="flex items-center gap-2 truncate text-slate-700 dark:text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="truncate">{personalBio.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-sky-500 transition-colors shrink-0 ml-1 cursor-pointer"
                    title={copiedEmail ? 'Copied!' : 'Copy Email'}
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* GitHub link */}
                <a
                  href={personalBio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/40 transition-all group/link"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 group-hover/link:text-sky-500" />
                    <span className="font-mono">github.com/hansob-yt</span>
                  </div>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform text-slate-400" />
                </a>
              </div>

            </div>

            {/* Right Column: Bio Narrative, Key Differentiators & CTAs */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              <div>
                {/* Headline Tagline */}
                <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                  {personalBio.shortBio}
                </p>

                {/* Story / Context Paragraphs */}
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {personalBio.fullBio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Interactive Key Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {personalBio.stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 hover:border-sky-500/40 transition-all group/stat hover:-translate-y-0.5"
                    >
                      <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white group-hover/stat:text-sky-500 dark:group-hover/stat:text-sky-400 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {stat.label}
                      </div>
                      {stat.helper && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {stat.helper}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Call-To-Action Button Row */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                
                {/* View Projects CTA */}
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Enterprise Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* FSD Code Explorer Button */}
                <button
                  onClick={onOpenTerminal}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700/70 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-sky-500" />
                  <span>Launch FSD Code Explorer</span>
                </button>

                {/* PDF Resume CTA */}
                <button
                  onClick={() => {
                    triggerCelebration();
                    onPrintResume();
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 ml-auto cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Print Resume</span>
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
