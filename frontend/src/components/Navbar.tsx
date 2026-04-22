'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import { LogOut, BookOpen, Menu, X, FileText, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl shrink-0">
            <BookOpen className="w-6 h-6 animate-pulse" />
            AssignGuard
          </Link>

          {/* Desktop Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Assignments
              </Link>
              {user.role === 'student' && (
                <Link
                  href="/submissions"
                  className={`flex items-center gap-1.5 transition-colors ${
                    isActive('/submissions') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  My Submissions
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Desktop User Info & Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mr-2">
                <span className="font-medium text-foreground">{user.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize border border-primary/20">
                  {user.role}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="gap-2 cursor-pointer">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="cursor-pointer">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="cursor-pointer shadow-lg shadow-primary/15">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize border border-primary/25">
              {user.role}
            </span>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 text-muted-foreground hover:text-foreground focus:outline-none rounded-md hover:bg-card/50 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 py-4 px-4 space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          {user ? (
            <>
              <div className="pb-3 border-b border-border/60">
                <p className="font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{user.role} Account</p>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-card hover:text-foreground'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Assignments Dashboard
                </Link>
                {user.role === 'student' && (
                  <Link
                    href="/submissions"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/submissions') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-card hover:text-foreground'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    My Submissions
                  </Link>
                )}
              </div>

              <div className="pt-3 border-t border-border/60">
                <Button variant="danger" size="sm" onClick={() => { setIsOpen(false); logout(); }} className="w-full gap-2 justify-center">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2.5 pt-2">
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="outline" className="w-full justify-center">Login</Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full justify-center shadow-md shadow-primary/15">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

