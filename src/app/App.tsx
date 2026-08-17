import React from 'react';
import { ThemeProvider } from './providers/theme-provider';
import { AppRouterProvider } from './providers/router-provider';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouterProvider />
    </ThemeProvider>
  );
};
