'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { SubmissionTable } from '@/components/submissions/SubmissionTable';
import { Textarea } from '@/components/ui/textarea';

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignmentId = params.id as string;
  const assignment = MOCK_ASSIGNMENTS.find(a => a.id === assignmentId);

  if (!assignment) {
    return (
      <div className="p-4 md:p-8">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center py-12">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Assignment not found</h1>
        </div>
      </div>
    );
  }

  const submissions = MOCK_SUBMISSIONS.filter(s => s.assignmentId === assignmentId);
  const userSubmission = submissions.find(s => s.studentId === user?.id);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissionText('');
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-4 md:mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">{assignment.title}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{assignment.description}</p>
          </div>
          <Badge
            className={
              new Date(assignment.dueDate) > new Date()
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }
          >
            {new Date(assignment.dueDate) > new Date() ? 'Active' : 'Overdue'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Due Date</div>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">{new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Submissions</div>
              <div className="flex items-center gap-2 mt-2">
                <Users className="w-4 h-4" />
                <span className="font-semibold">{submissions.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Max Score</div>
              <div className="font-semibold mt-2">{assignment.maxScore} pts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-semibold mt-2">{userSubmission ? 'Submitted' : 'Not Submitted'}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {user?.role === 'student' && !userSubmission && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit Your Work</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your work or write your submission here..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              className="mb-4"
              rows={10}
            />
            <Button
              onClick={handleSubmit}
              disabled={!submissionText.trim() || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
            </Button>
          </CardContent>
        </Card>
      )}

      {user?.role === 'teacher' && (
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <SubmissionTable submissions={submissions} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
