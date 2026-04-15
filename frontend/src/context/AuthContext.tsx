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
      // Backend /verify just returns 200 if token is valid. It doesn't return user info.
      // But we can check if it succeeds. We might need user info, wait, does verify return user?
      // Looking at auth.ts, verifyHandler returns { success: true, message: "Authentication successful", data: {} }
      // We will need to store user info in localStorage or rely on another endpoint.
      // For now, let's just do verify. If it works, and we have user in state, great.
      // If we don't have user in state on reload, we might need to fetch profile. Wait, backend doesn't have /me endpoint?
      // Let me assume we persist user in localStorage on login.
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
