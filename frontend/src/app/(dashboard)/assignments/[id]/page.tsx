'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getAssignmentById, getSubmissionsByAssignmentId } from '@/lib/mock-data';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SubmissionTable } from '@/components/submissions/SubmissionTable';
import { Submission } from '@/lib/types';
import { Calendar, FileText, AlertCircle } from 'lucide-react';

export default function AssignmentDetailsPage() {
  const params = useParams();
  const assignmentId = params.id as string;
  const { user } = useAuth();

  const assignment = getAssignmentById(assignmentId);
  const submissions = getSubmissionsByAssignmentId(assignmentId);
  const studentSubmission = submissions.find(s => s.studentId === user?.id);

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmissionText('');
    setShowSubmissionForm(false);
    alert('Submission successful! Your work has been submitted.');
  };

  if (!assignment) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Assignment not found</p>
      </div>
    );
  }

  const isPastDeadline = assignment.deadline < new Date();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{assignment.title}</h1>
            <p className="text-muted-foreground max-w-2xl">{assignment.description}</p>
          </div>
          {user?.role === 'teacher' && (
            <Badge variant="outline" className="border-primary text-primary">
              {submissions.length} submissions
            </Badge>
          )}
        </div>

        {/* Assignment Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-border">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary/50 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                <p className="font-semibold text-foreground">
                  {assignment.deadline.toLocaleDateString()}
                </p>
                {isPastDeadline && (
                  <p className="text-xs text-red-600 mt-1">Past deadline</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary/50 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Submissions</p>
                <p className="font-semibold text-foreground">{submissions.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary/50 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg. Similarity</p>
                <p className="font-semibold text-foreground">
                  {assignment.averageSimilarity || 0}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Assignment Content */}
      <Card className="p-8 border-border mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Assignment Details</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground whitespace-pre-wrap">{assignment.content}</p>
        </div>
      </Card>

      {/* Student Submission Form */}
      {user?.role === 'student' && (
        <div className="mb-8">
          {studentSubmission ? (
            <Card className="p-8 border-border bg-green-50/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Submission Received</h3>
                  <p className="text-muted-foreground mb-3">
                    Your submission was received on {studentSubmission.submittedAt.toLocaleDateString()}
                  </p>
                  <div className="p-3 bg-white rounded border border-green-200 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Similarity Score</p>
                    <p className="text-2xl font-bold text-green-600">{studentSubmission.similarity}%</p>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-border">
              {showSubmissionForm ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Submit Your Work</h2>
                  <div className="space-y-2">
                    <Label htmlFor="submission">Your Submission</Label>
                    <textarea
                      id="submission"
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder="Paste or type your submission here..."
                      className="w-full h-64 p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowSubmissionForm(false)}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {isPastDeadline
                      ? 'The deadline for this assignment has passed'
                      : 'Submit your work before the deadline'}
                  </p>
                  <Button
                    onClick={() => setShowSubmissionForm(true)}
                    disabled={isPastDeadline}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Start Submission
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Submissions Table (Teacher Only) */}
      {user?.role === 'teacher' && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Student Submissions</h2>
          <SubmissionTable
            submissions={submissions}
            onViewSubmission={(submission) => setSelectedSubmission(submission)}
          />
        </div>
      )}

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="border-border max-w-2xl max-h-[80vh] overflow-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedSubmission.studentName}&apos;s Submission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {selectedSubmission.submittedAt.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedSubmission(null)}
                  className="text-muted-foreground"
                >
                  ✕
                </Button>
              </div>

              <div className="mb-6 p-4 bg-primary/5 rounded border border-primary/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Similarity Score</p>
                    <p className="text-3xl font-bold text-primary">
                      {selectedSubmission.similarity}%
                    </p>
                  </div>
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

              <div className="space-y-2">
                <Label className="text-foreground font-semibold">Content</Label>
                <div className="p-4 bg-muted/30 rounded border border-border max-h-96 overflow-auto">
                  <p className="text-foreground whitespace-pre-wrap text-sm">
                    {selectedSubmission.content}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setSelectedSubmission(null)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
