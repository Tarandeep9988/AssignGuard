'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, FileText, User, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const links = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      href: '/dashboard/assignments',
      label: 'Assignments',
      icon: ClipboardList,
    },
    {
      href: '/dashboard/submissions',
      label: 'Submissions',
      icon: FileText,
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar">
      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {user?.role === 'teacher' && (
        <div className="mt-8 mx-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-2">Teacher Mode</p>
          <p className="text-xs text-muted-foreground">
            You can view all submissions and plagiarism reports for your assignments.
          </p>
        </div>
      )}
    </aside>
  );
}
