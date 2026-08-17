import React, { useState, useEffect } from 'react';
import { personalBio } from '../../../entities/profile';
import { ThemeSwitcher } from '../../../features/theme-switcher';
import { handlePdfResumeExport } from '../../../features/pdf-export';
import { 
  Terminal, 
  FileText, 
  Layers
} from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onPrintResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenTerminal, 
  onPrintResume 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    handlePdfResumeExport(onPrintResume);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print print:hidden ${
      isScrolled 
        ? 'py-2.5 bg-white/85 dark:bg-[#0d1117]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5 dark:shadow-black/20' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo / Monogram */}
        <a 
          href="#bio" 
          onClick={handleLogoClick}
          className="group flex items-center gap-3 cursor-pointer focus:outline-none shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/40 group-hover:scale-105 transition-all duration-300 shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[9px] overflow-hidden flex items-center justify-center relative">
              <img
                src={personalBio.avatarUrl}
                alt={personalBio.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div 
                style={{ display: 'none' }}
                className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm font-mono"
              >
                SK
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-950 dark:text-white tracking-tight group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors whitespace-nowrap">
                Sobhan Khademi
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Available for opportunities" />
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1 whitespace-nowrap">
              <Layers className="w-3 h-3 text-sky-500 shrink-0" />
              Frontend Dev • FSD
            </span>
          </div>
        </a>

        {/* Action Controls (FSD Explorer, PDF Resume, Theme Switcher) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* FSD Code Explorer Button */}
          <button
            onClick={onOpenTerminal}
            className="hidden sm:flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Open FSD Architecture Code Explorer"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="whitespace-nowrap">FSD Explorer</span>
          </button>

          {/* PDF Resume Trigger */}
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Download / Print PDF Resume"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">PDF Resume</span>
          </button>

          {/* Theme Switcher Feature (Day/Night & Palette) */}
          <ThemeSwitcher variant="navbar" />
        </div>

      </div>
    </header>
  );
};
