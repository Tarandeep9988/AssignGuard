'use client';

import { Assignment } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getSubmissionsByStudentId } from '@/lib/mock-data';

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const { user } = useAuth();
  const studentSubmissions = user ? getSubmissionsByStudentId(user.id) : [];
  const studentSubmission = studentSubmissions.find(s => s.assignmentId === assignment.id);
  const isPastDeadline = assignment.deadline < new Date();

  return (
    <Link href={`/dashboard/assignments/${assignment.id}`}>
      <Card className="p-6 border-border hover:shadow-lg transition-all cursor-pointer h-full">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-foreground text-lg line-clamp-2">
                {assignment.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {assignment.description}
            </p>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {user?.role === 'student' && studentSubmission && (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                Submitted
              </Badge>
            )}
            {isPastDeadline && user?.role === 'student' && !studentSubmission && (
              <Badge className="bg-red-100 text-red-800 border-red-300">
                Overdue
              </Badge>
            )}
            {user?.role === 'teacher' && (
              <Badge variant="outline" className="border-primary text-primary">
                {assignment.totalSubmissions || 0} Submissions
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Due: {assignment.deadline.toLocaleDateString()}</span>
            </div>
            {user?.role === 'teacher' && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{assignment.totalSubmissions || 0} submitted</span>
              </div>
            )}
          </div>

          {/* Similarity Score */}
          {user?.role === 'student' && studentSubmission && (
            <div className="p-3 bg-primary/5 rounded border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Your Similarity Score</p>
              <p className="text-2xl font-bold text-primary">{studentSubmission.similarity}%</p>
            </div>
          )}
          {user?.role === 'teacher' && assignment.averageSimilarity !== undefined && (
            <div className="p-3 bg-primary/5 rounded border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Avg. Similarity</p>
              <p className="text-2xl font-bold text-primary">{assignment.averageSimilarity}%</p>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
