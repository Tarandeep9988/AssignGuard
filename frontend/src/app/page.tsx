'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import Link from 'next/link';
import { Plus, Calendar, BookOpen } from 'lucide-react';
import LandingPage from '@/components/landing/LandingPage';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  userId: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchAssignments();
    }
  }, [user]);

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/assignments');
      setAssignments(response.data.data.assignments);
    } catch (err) {
      setError('Failed to fetch assignments');
    } finally {
      setFetching(false);
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground mt-1">
            {user.role === 'teacher' ? 'Manage the assignments you have created.' : 'View and submit your assignments.'}
          </p>
        </div>
        {user.role === 'teacher' && (
          <Link href="/assignments/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 cursor-pointer">
              <Plus className="w-4 h-4" />
              Create Assignment
            </Button>
          </Link>
        )}
      </div>

      {error && <div className="text-red-500 bg-red-500/10 p-4 rounded-md border border-red-500/20">{error}</div>}

      {fetching ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted/50 rounded-t-lg" />
              <CardContent className="h-16" />
            </Card>
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 border-dashed border-2 bg-transparent text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold">No assignments found</h3>
          <p className="text-muted-foreground text-sm max-w-sm mt-2">
            {user.role === 'teacher' 
              ? "You haven't created any assignments yet. Click the create button to get started." 
              : "There are currently no assignments available for you."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="flex flex-col hover:border-primary/50 transition-colors group">
              <CardHeader>
                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                  {assignment.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {assignment.description}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border mt-auto">
                <Link href={`/assignments/${assignment.id}`} className="w-full">
                  <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
