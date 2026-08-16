import React from 'react';
import { ThemeProvider } from './providers/theme-provider';
import { CvPage } from '../pages/cv-page';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CvPage />
    </ThemeProvider>
  );
};
