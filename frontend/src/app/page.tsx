'use client';

import { useEffect, useState } from 'react';
import LandingPage from "@/components/landing/LandingPage";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <LandingPage />;
  }

  // Show appropriate dashboard based on user role
  if (user.role === 'teacher') {
    return <TeacherDashboard />;
  }
  
  return <StudentDashboard />;
}
