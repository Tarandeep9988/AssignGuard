'use client';

import { useAuth } from '@/hooks/useAuth';
import { MOCK_SUBMISSIONS, MOCK_ASSIGNMENTS, MOCK_USERS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SubmissionsPage() {
  const { user } = useAuth();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  // Filter submissions based on user role
  let submissions = MOCK_SUBMISSIONS;
  if (user?.role === 'student') {
    submissions = MOCK_SUBMISSIONS.filter(s => s.studentId === user.id);
  }

  // Get risk statistics
  const riskStats = {
    high: submissions.filter(s => s.similarityPercentage >= 50).length,
    medium: submissions.filter(s => s.similarityPercentage >= 30 && s.similarityPercentage < 50).length,
    low: submissions.filter(s => s.similarityPercentage < 30).length,
  };

  const getRiskColor = (percentage: number) => {
    if (percentage >= 50) return 'bg-red-100 text-red-800';
    if (percentage >= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getRiskLabel = (percentage: number) => {
    if (percentage >= 50) return 'High Risk';
    if (percentage >= 30) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Submissions</h1>
        <p className="text-muted-foreground">
          {user?.role === 'teacher' ? 'View all student submissions' : 'Your submissions'}
        </p>
      </div>

      {/* Risk Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{riskStats.high}</div>
              <div className="text-sm text-muted-foreground mt-2">High Risk</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{riskStats.medium}</div>
              <div className="text-sm text-muted-foreground mt-2">Medium Risk</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{riskStats.low}</div>
              <div className="text-sm text-muted-foreground mt-2">Low Risk</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Student</th>
                  <th className="text-left py-3 px-4 font-semibold">Assignment</th>
                  <th className="text-left py-3 px-4 font-semibold">Submitted</th>
                  <th className="text-center py-3 px-4 font-semibold">Similarity</th>
                  <th className="text-center py-3 px-4 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const assignment = MOCK_ASSIGNMENTS.find(a => a.id === submission.assignmentId);
                  const student = MOCK_USERS.find(u => u.id === submission.studentId);

                  return (
                    <tr key={submission.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{student?.name}</td>
                      <td className="py-3 px-4">{assignment?.title}</td>
                      <td className="py-3 px-4">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-semibold">{submission.similarityPercentage}%</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={getRiskColor(submission.similarityPercentage)}>
                          {getRiskLabel(submission.similarityPercentage)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <AlertDialogTitle>Submission Details</AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="space-y-4">
                                <div>
                                  <div className="font-semibold text-foreground">Student:</div>
                                  <div>{student?.name}</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-foreground">Assignment:</div>
                                  <div>{assignment?.title}</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-foreground">Similarity: {submission.similarityPercentage}%</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-foreground mb-2">Submission Content:</div>
                                  <div className="bg-muted p-4 rounded border max-h-96 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                                      {selectedSubmission?.content}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </AlertDialogDescription>
                            <AlertDialogAction>Close</AlertDialogAction>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
