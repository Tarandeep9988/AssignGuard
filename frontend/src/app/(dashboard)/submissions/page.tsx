'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getSubmissionsByStudentId, MOCK_SUBMISSIONS, getAssignmentById } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/lib/types';
import { SubmissionTable } from '@/components/submissions/SubmissionTable';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SubmissionsPage() {
  const { user } = useAuth();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const submissions =
    user?.role === 'student'
      ? getSubmissionsByStudentId(user.id)
      : MOCK_SUBMISSIONS;

  const highRiskCount = submissions.filter(s => s.similarity >= 50).length;
  const mediumRiskCount = submissions.filter(s => s.similarity >= 25 && s.similarity < 50).length;
  const lowRiskCount = submissions.filter(s => s.similarity < 25).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {user?.role === 'teacher' ? 'All Submissions' : 'My Submissions'}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === 'teacher'
            ? 'Review all student submissions and their plagiarism reports'
            : 'View your submitted work and similarity reports'}
        </p>
      </div>

      {/* Risk Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">High Risk</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
            <Badge className="bg-red-100 text-red-800 border-red-300">50%+</Badge>
          </div>
        </Card>

        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">Medium Risk</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-orange-600">{mediumRiskCount}</p>
            <Badge className="bg-orange-100 text-orange-800 border-orange-300">25-50%</Badge>
          </div>
        </Card>

        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">Low Risk</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-green-600">{lowRiskCount}</p>
            <Badge className="bg-green-100 text-green-800 border-green-300">{`<`}25%</Badge>
          </div>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card className="border-border overflow-hidden">
        <SubmissionTable
          submissions={submissions}
          onViewSubmission={(submission) => setSelectedSubmission(submission)}
        />
      </Card>

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="border-border max-w-2xl max-h-[80vh] overflow-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedSubmission.studentName}&apos;s Submission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getAssignmentById(selectedSubmission.assignmentId)?.title}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6 p-4 bg-primary/5 rounded border border-primary/20">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Similarity Score</p>
                    <p className="text-3xl font-bold text-primary">
                      {selectedSubmission.similarity}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge
                      className={
                        selectedSubmission.similarity >= 50
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : selectedSubmission.similarity >= 25
                          ? 'bg-orange-100 text-orange-800 border-orange-300'
                          : 'bg-green-100 text-green-800 border-green-300'
                      }
                    >
                      {selectedSubmission.similarity >= 50
                        ? 'High Risk'
                        : selectedSubmission.similarity >= 25
                        ? 'Medium Risk'
                        : 'Low Risk'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                  <p className="font-medium text-foreground">
                    {selectedSubmission.submittedAt.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="font-medium text-foreground capitalize">
                    {selectedSubmission.status === 'plagiarized'
                      ? 'Flagged'
                      : selectedSubmission.status}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-foreground font-semibold text-sm">Content</label>
                <div className="p-4 bg-muted/30 rounded border border-border max-h-64 overflow-auto">
                  <p className="text-foreground whitespace-pre-wrap text-sm">
                    {selectedSubmission.content}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/dashboard/assignments/${selectedSubmission.assignmentId}`}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  View Assignment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 border border-border text-foreground rounded hover:bg-muted transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {submissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No submissions yet</p>
          <Link
            href="/dashboard/assignments"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            View Assignments
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
