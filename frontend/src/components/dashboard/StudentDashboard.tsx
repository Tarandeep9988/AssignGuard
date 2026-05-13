'use client';

import { useState, useEffect } from 'react';
import { Assignment } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';

interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  submittedAt: string;
  similarity: number;
  status: 'submitted' | 'graded' | 'plagiarized';
}

export function StudentDashboard() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch assignments
        const assignmentsRes = await apiClient.getAssignments();
        if (assignmentsRes.success) {
          setAssignments(assignmentsRes.data);
        }

        // Fetch user submissions
        const submissionsRes = await apiClient.getSubmissions();
        if (submissionsRes.success) {
          setSubmissions(submissionsRes.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const submittedAssignmentIds = new Set(submissions.map(s => s.assignmentId));

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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Assignments</h1>
        <p className="text-sm md:text-base text-muted-foreground">View available assignments and track your submissions</p>
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
            <ClipboardList className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Submitted</p>
              <p className="text-3xl font-bold text-foreground">{submissions.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-foreground">
                {assignments.length - submissions.length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-primary/50" />
          </div>
        </Card>
      </div>

      {/* Assignments List */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Available Assignments</h2>
        <div className="space-y-3">
          {assignments.length === 0 ? (
            <p className="text-muted-foreground">No assignments available.</p>
          ) : (
            assignments.map((assignment: Assignment) => {
              const isSubmitted = submittedAssignmentIds.has(assignment.id);
              const deadline = new Date(assignment.deadline);
              const isPastDeadline = deadline < new Date();
              const submission = submissions.find(s => s.assignmentId === assignment.id);

              return (
                <Link
                  key={assignment.id}
                  href={`/assignments/${assignment.id}`}
                  className="block"
                >
                  <Card className="p-6 border-border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                          {isSubmitted && (
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              Submitted
                            </Badge>
                          )}
                          {isPastDeadline && !isSubmitted && (
                            <Badge className="bg-red-100 text-red-800 border-red-300">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                          {assignment.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Deadline: {deadline.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {isSubmitted && submission && (
                        <div className="text-right ml-4">
                          <p className="text-xs text-muted-foreground mb-1">Your Similarity</p>
                          <div className="text-2xl font-bold text-primary">
                            {submission.similarity || 0}%
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
