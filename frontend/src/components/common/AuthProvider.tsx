'use client';

import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from '@/lib/auth-context';
import { ThemeContext, Theme } from '@/lib/theme-context';
import { User, UserRole, AuthContextType } from '@/lib/types';
import { apiClient } from '@/lib/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load user and theme from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to verify if user is already logged in
        const response = await apiClient.verify();
        if (response.success && response.data.user) {
          setUserState(response.data.user);
          localStorage.setItem('assignguard-user', JSON.stringify(response.data.user));
        }
      } catch (error) {
        // User is not authenticated
        localStorage.removeItem('assignguard-user');
      }

      // Load theme from localStorage
      const storedTheme = localStorage.getItem('assignguard-theme') as Theme | null;
      if (storedTheme) {
        setThemeState(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
      } else {
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setThemeState('dark');
          document.documentElement.classList.add('dark');
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const response = await apiClient.login(email, password);
      if (response.success && response.data.user) {
        const user = response.data.user;
        // Add role if not in response
        const userWithRole = { ...user, role };
        setUserState(userWithRole);
        localStorage.setItem('assignguard-user', JSON.stringify(userWithRole));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUserState(null);
      localStorage.removeItem('assignguard-user');
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('assignguard-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('assignguard-user');
    }
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    localStorage.setItem('assignguard-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const authValue: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    setUser,
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authValue}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
