import React, { useState, useEffect } from 'react';
import { 
  type ThemeMode, 
  type AtmosphereTheme, 
  getThemeConfig, 
  ATMOSPHERE_NAMES 
} from '../../../../shared/config/themeConfig';
import { ThemeContext } from '../model/themeContext';

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

  // 60-120 FPS View Transitions API Integration
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
