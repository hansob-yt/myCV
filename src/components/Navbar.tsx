import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { personalBio } from '../data/cvData';
import { 
  Sun, 
  Moon, 
  Terminal, 
  FileText, 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  Briefcase, 
  FolderGit2, 
  Wrench, 
  Mail, 
  User 
} from 'lucide-react';
import { triggerCelebration } from '../utils/confetti';

interface NavbarProps {
  onOpenTerminal: () => void;
  onPrintResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenTerminal, 
  onPrintResume,
  activeSection 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bio', href: '#bio', icon: User, id: 'bio' },
    { name: 'Experience', href: '#experience', icon: Briefcase, id: 'experience' },
    { name: 'Projects', href: '#projects', icon: FolderGit2, id: 'projects' },
    { name: 'Skills', href: '#skills', icon: Wrench, id: 'skills' },
    { name: 'Extras', href: '#extras', icon: Sparkles, id: 'extras' },
    { name: 'Contact', href: '#contact', icon: Mail, id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrintClick = () => {
    triggerCelebration();
    onPrintResume();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-2.5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo / Monogram */}
        <a 
          href="#bio" 
          onClick={(e) => handleNavClick(e, '#bio')}
          className="group flex items-center gap-3 cursor-pointer focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/40 group-hover:scale-105 transition-all duration-300">
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
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                Sobhan Khademi
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for opportunities" />
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
              <Layers className="w-3 h-3 text-sky-500" />
              Frontend Dev • FSD
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm shadow-slate-900/10 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <link.icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-500' : 'text-slate-400'}`} />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions (Code Explorer, PDF Resume, Theme Toggle) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Terminal / Code Explorer Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700/60 transition-all hover:scale-105 active:scale-95"
            title="Open FSD Architecture Code Explorer"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-500" />
            <span>FSD Explorer</span>
          </button>

          {/* PDF Resume Trigger */}
          <button
            onClick={handlePrintClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-105 active:scale-95"
            title="Download / Print PDF Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Resume</span>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-sky-400 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-all hover:scale-105 active:scale-95"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 animate-fadeIn">
          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
                  activeSection === link.id
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <link.icon className="w-4 h-4 text-sky-500" />
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <Terminal className="w-4 h-4 text-sky-500" />
              Launch FSD Code Explorer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handlePrintClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md shadow-sky-500/20"
            >
              <FileText className="w-4 h-4" />
              Download / Print PDF Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
