'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/lib/theme-context';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values if not within ThemeProvider
    return {
      theme: 'light' as const,
      toggleTheme: () => {},
    };
  }
  return context;
}
