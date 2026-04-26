'use client';

import { useAuth } from '@/hooks/useAuth';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === 'teacher') {
    return <TeacherDashboard />;
  }

  return <StudentDashboard />;
}
