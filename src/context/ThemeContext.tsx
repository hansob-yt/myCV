import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';
export type AtmosphereTheme = 'cyber' | 'nebula' | 'emerald' | 'sunset';

export interface ThemeConfig {
  mode: ThemeMode;
  atmosphere: AtmosphereTheme;
  name: string;
  bgColor: string;
  primaryGlow: string;
  secondaryGlow: string;
  tertiaryGlow: string;
  particleColors: Array<{ color: string; glow: string }>;
  accentColor: string;
}

export const ATMOSPHERE_NAMES: Record<AtmosphereTheme, string> = {
  cyber: 'Cyber Cyan',
  nebula: 'Midnight Nebula',
  emerald: 'Emerald Matrix',
  sunset: 'Cosmic Sunset'
};

const getThemeConfig = (mode: ThemeMode, atmosphere: AtmosphereTheme): ThemeConfig => {
  if (mode === 'light') {
    // Day State (Bright background, high-contrast dark/vibrant particles and text)
    switch (atmosphere) {
      case 'nebula':
        return {
          mode,
          atmosphere,
          name: 'Lavender Mist',
          bgColor: '#faf5ff',
          primaryGlow: 'rgba(168, 85, 247, 0.22)',
          secondaryGlow: 'rgba(236, 72, 153, 0.18)',
          tertiaryGlow: 'rgba(99, 102, 241, 0.15)',
          accentColor: '#7c3aed',
          particleColors: [
            { color: '#6b21a8', glow: 'rgba(107, 33, 168, 0.6)' },
            { color: '#a21caf', glow: 'rgba(162, 28, 175, 0.6)' },
            { color: '#be185d', glow: 'rgba(190, 24, 93, 0.6)' },
            { color: '#4338ca', glow: 'rgba(67, 56, 202, 0.6)' }
          ]
        };
      case 'emerald':
        return {
          mode,
          atmosphere,
          name: 'Mint Pearl',
          bgColor: '#f0fdf4',
          primaryGlow: 'rgba(16, 185, 129, 0.22)',
          secondaryGlow: 'rgba(6, 182, 212, 0.18)',
          tertiaryGlow: 'rgba(132, 204, 22, 0.15)',
          accentColor: '#059669',
          particleColors: [
            { color: '#047857', glow: 'rgba(4, 120, 87, 0.6)' },
            { color: '#0f766e', glow: 'rgba(15, 118, 110, 0.6)' },
            { color: '#15803d', glow: 'rgba(21, 128, 61, 0.6)' },
            { color: '#0369a1', glow: 'rgba(3, 105, 161, 0.6)' }
          ]
        };
      case 'sunset':
        return {
          mode,
          atmosphere,
          name: 'Golden Dawn',
          bgColor: '#fffbeb',
          primaryGlow: 'rgba(245, 158, 11, 0.22)',
          secondaryGlow: 'rgba(244, 63, 94, 0.18)',
          tertiaryGlow: 'rgba(139, 92, 246, 0.15)',
          accentColor: '#d97706',
          particleColors: [
            { color: '#b45309', glow: 'rgba(180, 83, 9, 0.6)' },
            { color: '#c2410c', glow: 'rgba(194, 65, 12, 0.6)' },
            { color: '#be123c', glow: 'rgba(190, 18, 60, 0.6)' },
            { color: '#6d28d9', glow: 'rgba(109, 40, 217, 0.6)' }
          ]
        };
      case 'cyber':
      default:
        return {
          mode,
          atmosphere: 'cyber',
          name: 'Ice Sky',
          bgColor: '#f0f7ff',
          primaryGlow: 'rgba(56, 189, 248, 0.25)',
          secondaryGlow: 'rgba(99, 102, 241, 0.20)',
          tertiaryGlow: 'rgba(16, 185, 129, 0.15)',
          accentColor: '#0284c7',
          particleColors: [
            { color: '#0284c7', glow: 'rgba(2, 132, 199, 0.7)' },
            { color: '#1d4ed8', glow: 'rgba(29, 78, 216, 0.7)' },
            { color: '#0e7490', glow: 'rgba(14, 116, 144, 0.7)' },
            { color: '#4338ca', glow: 'rgba(67, 56, 202, 0.7)' }
          ]
        };
    }
  } else {
    // Night State (Deep obsidian background, neon glowing particles)
    switch (atmosphere) {
      case 'nebula':
        return {
          mode,
          atmosphere,
          name: 'Midnight Nebula',
          bgColor: '#090514',
          primaryGlow: '#a855f7',
          secondaryGlow: '#ec4899',
          tertiaryGlow: '#6366f1',
          accentColor: '#c084fc',
          particleColors: [
            { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.8)' },
            { color: '#e879f9', glow: 'rgba(232, 121, 249, 0.8)' },
            { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.8)' },
            { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.8)' }
          ]
        };
      case 'emerald':
        return {
          mode,
          atmosphere,
          name: 'Emerald Matrix',
          bgColor: '#021310',
          primaryGlow: '#10b981',
          secondaryGlow: '#06b6d4',
          tertiaryGlow: '#84cc16',
          accentColor: '#34d399',
          particleColors: [
            { color: '#34d399', glow: 'rgba(52, 211, 153, 0.8)' },
            { color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.8)' },
            { color: '#a3e635', glow: 'rgba(163, 230, 53, 0.8)' },
            { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.8)' }
          ]
        };
      case 'sunset':
        return {
          mode,
          atmosphere,
          name: 'Cosmic Sunset',
          bgColor: '#0d0a14',
          primaryGlow: '#f59e0b',
          secondaryGlow: '#f43f5e',
          tertiaryGlow: '#8b5cf6',
          accentColor: '#fbbf24',
          particleColors: [
            { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.8)' },
            { color: '#f97316', glow: 'rgba(249, 115, 22, 0.8)' },
            { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.8)' },
            { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' }
          ]
        };
      case 'cyber':
      default:
        return {
          mode,
          atmosphere: 'cyber',
          name: 'Cyber Cyan',
          bgColor: '#030712',
          primaryGlow: '#0ea5e9',
          secondaryGlow: '#6366f1',
          tertiaryGlow: '#10b981',
          accentColor: '#38bdf8',
          particleColors: [
            { color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.8)' },
            { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.8)' },
            { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.8)' },
            { color: '#34d399', glow: 'rgba(52, 211, 153, 0.8)' }
          ]
        };
    }
  }
};

interface ThemeContextType {
  mode: ThemeMode;
  atmosphere: AtmosphereTheme;
  themeConfig: ThemeConfig;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  cycleAtmosphere: () => void;
  setAtmosphere: (atmosphere: AtmosphereTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (savedMode === 'dark' || savedMode === 'light') return savedMode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [atmosphere, setAtmosphereState] = useState<AtmosphereTheme>(() => {
    const savedAtmosphere = localStorage.getItem('theme-atmosphere') as AtmosphereTheme | null;
    if (savedAtmosphere && ATMOSPHERE_NAMES[savedAtmosphere]) return savedAtmosphere;
    return 'cyber';
  });

  const themeConfig = getThemeConfig(mode, atmosphere);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    root.style.backgroundColor = themeConfig.bgColor;
    document.body.style.backgroundColor = themeConfig.bgColor;
    localStorage.setItem('theme-mode', mode);
    localStorage.setItem('theme-atmosphere', atmosphere);
  }, [mode, atmosphere, themeConfig]);

  // 60 FPS View Transitions API Integration
  const toggleMode = () => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
      });
    } else {
      setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const setMode = (newMode: ThemeMode) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        setModeState(newMode);
      });
    } else {
      setModeState(newMode);
    }
  };

  const cycleAtmosphere = () => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        setAtmosphereState((prev) => {
          const order: AtmosphereTheme[] = ['cyber', 'nebula', 'emerald', 'sunset'];
          const nextIndex = (order.indexOf(prev) + 1) % order.length;
          return order[nextIndex];
        });
      });
    } else {
      setAtmosphereState((prev) => {
        const order: AtmosphereTheme[] = ['cyber', 'nebula', 'emerald', 'sunset'];
        const nextIndex = (order.indexOf(prev) + 1) % order.length;
        return order[nextIndex];
      });
    }
  };

  const setAtmosphere = (newAtmosphere: AtmosphereTheme) => {
    if (ATMOSPHERE_NAMES[newAtmosphere]) {
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        document.startViewTransition(() => {
          setAtmosphereState(newAtmosphere);
        });
      } else {
        setAtmosphereState(newAtmosphere);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      atmosphere, 
      themeConfig, 
      toggleMode, 
      setMode, 
      cycleAtmosphere, 
      setAtmosphere 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
