'use client';

import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from '@/lib/auth-context';
import { ThemeContext, Theme } from '@/lib/theme-context';
import { User, UserRole, AuthContextType } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mock-data';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Set default user to first teacher for demo purposes
  const [user, setUserState] = useState<User | null>(MOCK_USERS[1]); // Sarah (teacher)
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(false);

  // Load user and theme from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('assignguard-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('assignguard-user');
      }
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
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Find user by email and role from mock data
    const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
    
    if (!foundUser) {
      throw new Error('Invalid email or role');
    }

    setUserState(foundUser);
    localStorage.setItem('assignguard-user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem('assignguard-user');
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
