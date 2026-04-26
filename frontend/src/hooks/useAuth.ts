'use client';

import { useContext } from 'react';
import { AuthContext } from '@/lib/auth-context';
import { AuthContextType } from '@/lib/types';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
