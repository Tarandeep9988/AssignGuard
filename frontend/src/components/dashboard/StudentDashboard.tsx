'use client';

import { MOCK_ASSIGNMENTS, getSubmissionsByStudentId } from '@/lib/mock-data';
import { Assignment } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export function StudentDashboard() {
  const { user } = useAuth();
  
  const studentSubmissions = user ? getSubmissionsByStudentId(user.id) : [];
  const submittedAssignmentIds = new Set(studentSubmissions.map(s => s.assignmentId));

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Assignments</h1>
        <p className="text-sm md:text-base text-muted-foreground">View available assignments and track your submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Assignments</p>
              <p className="text-3xl font-bold text-foreground">{MOCK_ASSIGNMENTS.length}</p>
            </div>
            <ClipboardList className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Submitted</p>
              <p className="text-3xl font-bold text-foreground">{studentSubmissions.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-foreground">
                {MOCK_ASSIGNMENTS.length - studentSubmissions.length}
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
          {MOCK_ASSIGNMENTS.map((assignment: Assignment) => {
            const isSubmitted = submittedAssignmentIds.has(assignment.id);
            const isPastDeadline = assignment.deadline < new Date();

            return (
              <Link
                key={assignment.id}
                href={`/dashboard/assignments/${assignment.id}`}
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
                          Deadline: {assignment.deadline.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {isSubmitted && (
                      <div className="text-right ml-4">
                        <p className="text-xs text-muted-foreground mb-1">Your Similarity</p>
                        <div className="text-2xl font-bold text-primary">
                          {studentSubmissions.find(s => s.assignmentId === assignment.id)?.similarity || 0}%
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
