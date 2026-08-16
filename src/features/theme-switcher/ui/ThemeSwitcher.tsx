import React from 'react';
import { useTheme } from '../../../app/providers/theme-provider';
import { Sun, Moon, Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'navbar' | 'compact' | 'full';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { mode, themeConfig, toggleMode, cycleAtmosphere } = useTheme();

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 shrink-0 ${className}`}>
        <button
          onClick={toggleMode}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer shrink-0"
          aria-label="Toggle day/night mode"
          title={mode === 'dark' ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
        >
          {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
        <button
          onClick={cycleAtmosphere}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer shrink-0"
          aria-label="Cycle atmosphere theme"
          title={`Atmosphere Mood: ${themeConfig.name}`}
        >
          <Palette className="w-4 h-4 text-sky-500" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 shrink-0 ${className}`}>
      {/* Day / Night Switcher */}
      <button
        onClick={toggleMode}
        className="w-9 h-8 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        title={mode === 'dark' ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
        aria-label="Toggle day / night mode"
      >
        {mode === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 shrink-0" />
        )}
      </button>

      {/* Atmosphere Palette Switcher */}
      <button
        onClick={cycleAtmosphere}
        className="w-9 lg:w-[136px] min-w-[36px] lg:min-w-[136px] h-8 flex items-center justify-center gap-1.5 px-2 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer group shrink-0"
        title={`Atmosphere Mood: ${themeConfig.name} (Click to change)`}
      >
        <Palette className="w-3.5 h-3.5 text-sky-500 group-hover:rotate-45 transition-transform shrink-0" />
        <span className="hidden lg:inline text-[11px] truncate font-semibold text-center">{themeConfig.name}</span>
      </button>
    </div>
  );
};
