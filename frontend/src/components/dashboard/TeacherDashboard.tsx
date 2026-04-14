'use client';

import { useState, useEffect } from 'react';
import { Assignment } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Users } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';

export function TeacherDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await apiClient.getAssignments();
        if (response.success) {
          setAssignments(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assignments');
        console.error('Error fetching assignments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const totalSubmissions = assignments.reduce((sum, a) => sum + (a.totalSubmissions || 0), 0);
  const avgSimilarity = assignments.length > 0
    ? Math.round(
        assignments.reduce((sum, a) => sum + (a.averageSimilarity || 0), 0) / assignments.length
      )
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Assignments</h1>
          <Link href="/assignments/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Assignment</span>
              <span className="sm:hidden">Create</span>
            </Button>
          </Link>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">Manage your assignments and review student submissions</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Assignments</p>
              <p className="text-3xl font-bold text-foreground">{assignments.length}</p>
            </div>
            <FileText className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-foreground">
                {totalSubmissions}
              </p>
            </div>
            <Users className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Similarity</p>
              <p className="text-3xl font-bold text-foreground">
                {avgSimilarity}%
              </p>
            </div>
            <div className="w-8 h-8 text-primary/50" />
          </div>
        </Card>
      </div>

      {/* Assignments List */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Recent Assignments</h2>
        <div className="space-y-3">
          {assignments.length === 0 ? (
            <p className="text-muted-foreground">No assignments yet. Create one to get started!</p>
          ) : (
            assignments.map((assignment: Assignment) => (
              <Link
                key={assignment.id}
                href={`/assignments/${assignment.id}`}
                className="block"
              >
                <Card className="p-4 md:p-6 border-border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">{assignment.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-1">
                        {assignment.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm">
                        <span className="text-muted-foreground">
                          Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                        </span>
                        <span className="text-muted-foreground">
                          {assignment.totalSubmissions || 0} submissions
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                        {assignment.averageSimilarity || 0}%
                      </div>
                      <p className="text-xs text-muted-foreground">Avg. Similarity</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
