import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  FolderGit2, 
  Wrench, 
  Sparkles, 
  Mail, 
  ArrowUp
} from 'lucide-react';

interface InteractiveScrollControlsProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const InteractiveScrollControls: React.FC<InteractiveScrollControlsProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      setIsVisible(currentScrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'bio', label: 'Bio & Overview', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'projects', label: 'Enterprise Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Technical Skills', icon: Wrench },
    { id: 'extras', label: 'Interactive Extras', icon: Sparkles },
    { id: 'contact', label: 'Get In Touch', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onSectionChange(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Top Horizontal Glowing Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none no-print">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-md shadow-sky-500/50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating Interactive Section Dock (Desktop & Tablet Right Edge) */}
      <aside 
        aria-label="Section Quick Jump Dock"
        className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 p-2 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-900/10 no-print"
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          const Icon = sec.icon;

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="relative group p-2 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label={`Jump to ${sec.label}`}
            >
              {/* Node Pill / Icon */}
              <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-110' 
                  : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Hover Tooltip Label */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg border border-slate-700">
                {sec.label}
              </div>
            </button>
          );
        })}

        {/* Scroll Progress Metric Badge */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 text-center">
          {Math.round(scrollProgress)}%
        </div>
      </aside>

      {/* 3. Floating Bottom-Right Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all duration-200 animate-fadeIn cursor-pointer no-print"
          title="Scroll Back to Top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
