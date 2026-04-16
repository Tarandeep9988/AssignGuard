'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useRouter, usePathname } from 'next/navigation';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        await api.get('/verify'); // verify token is still valid
        setUser(JSON.parse(storedUser));
      } else {
        throw new Error("No user data");
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      // Redirect to login if on protected route
      if (pathname !== '/login' && pathname !== '/register' && pathname !== '/') {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/');
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
      localStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
