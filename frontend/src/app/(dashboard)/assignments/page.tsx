'use client';

import { useState, useEffect } from 'react';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import { Assignment } from '@/lib/types';

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

export default function AssignmentsPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const assignmentsRes = await apiClient.getAssignments();
        if (assignmentsRes.success) {
          setAssignments(assignmentsRes.data);
        }

        // Fetch submissions if student
        if (user?.role === 'student') {
          const submissionsRes = await apiClient.getSubmissions();
          if (submissionsRes.success) {
            setSubmissions(submissionsRes.data);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assignments');
        console.error('Error fetching assignments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {user?.role === 'teacher' ? 'Manage Assignments' : 'Available Assignments'}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === 'teacher'
            ? 'View and manage your created assignments'
            : 'View assignments and submit your work'}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm p-4 rounded mb-6">
          {error}
        </div>
      )}

      {assignments.length === 0 ? (
        <p className="text-muted-foreground">No assignments available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <AssignmentCard 
              key={assignment.id} 
              assignment={assignment}
              studentSubmission={submissions.find(s => s.assignmentId === assignment.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
