'use client';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, User, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { MobileSidebar } from './MobileSidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          <span className="font-bold text-foreground text-sm md:text-base">AssignGuard</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:block text-xs md:text-sm text-muted-foreground" suppressHydrationWarning>
          <span className="font-medium text-foreground">{user?.name}</span>
          {' · '}
          <span className="capitalize">{user?.role}</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-10 h-10"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {user?.avatar || user?.name?.charAt(0).toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem disabled>
              <User className="w-4 h-4 mr-2" />
              <span>
                {user?.name}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
