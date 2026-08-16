import { createContext, useContext } from 'react';
import type { ThemeConfig, ThemeMode, AtmosphereTheme } from '../../../../shared/config/themeConfig';

export interface ThemeContextType {
  mode: ThemeMode;
  atmosphere: AtmosphereTheme;
  themeConfig: ThemeConfig;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  cycleAtmosphere: () => void;
  setAtmosphere: (atmosphere: AtmosphereTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
