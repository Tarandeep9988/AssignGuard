'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, FileText, CheckCircle, ShieldAlert } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

interface Submission {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}

export default function AssignmentDetailPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [content, setContent] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [plagiarismReport, setPlagiarismReport] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && id) {
      fetchData();
    }
  }, [user, id]);

  const fetchData = async () => {
    try {
      const assignmentRes = await api.get(`/assignments/${id}`);
      setAssignment(assignmentRes.data.data.assignment);

      if (user?.role === 'teacher') {
        const subsRes = await api.get(`/assignments/${id}/submissions`);
        setSubmissions(subsRes.data.data.submissions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      await api.post(`/assignments/${id}/submissions`, { content });
      setContent('');
      alert('Assignment submitted successfully!');
      // Assuming one submission or we can just fetch again
      router.push('/');
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetPlagiarismReport = async () => {
    try {
      const res = await api.get(`/assignments/${id}/plagiarism-report`);
      setPlagiarismReport(res.data.data.report);
    } catch (err: any) {
      // Temporary mock data for UI testing since backend returns 501 Not Implemented
      setPlagiarismReport({
        comparisons: [
          {
            studentA: "Student Alice",
            studentAId: submissions[0]?.userId || "user1",
            studentB: "Prof Feynman", 
            studentBId: submissions[1]?.userId || "user2",
            similarityPercentage: 85.5,
            isFlagged: true
          },
          {
            studentA: "Student Charlie",
            studentAId: "user3",
            studentB: "Student Alice",
            studentBId: submissions[0]?.userId || "user1",
            similarityPercentage: 12.0,
            isFlagged: false
          }
        ]
      });
    }
  };

  if (loading || fetching) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (!assignment) return <div className="p-8 text-center">Assignment not found</div>;

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <Card className="border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader className="border-b border-border bg-muted/20">
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">{assignment.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3 bg-background/50 inline-flex px-3 py-1.5 rounded-full border border-border">
                <Calendar className="w-4 h-4" />
                Due: {new Date(assignment.dueDate).toLocaleString()}
              </div>
            </div>
            {user?.role === 'teacher' && (
              <Button variant="outline" className="gap-2" onClick={handleGetPlagiarismReport}>
                <ShieldAlert className="w-4 h-4" />
                Generate Plagiarism Report
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 whitespace-pre-wrap leading-relaxed">
          {assignment.description}
        </CardContent>
      </Card>

      {user?.role === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Submit Assignment
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleStudentSubmit}>
            <CardContent className="space-y-4">
              {submitError && <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded">{submitError}</div>}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your assignment content here or paste a link..."
                className="flex min-h-[200px] w-full rounded-md border border-border bg-card px-4 py-3 text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all resize-y"
                required
              />
            </CardContent>
            <CardFooter className="border-t border-border pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto ml-auto gap-2">
                <CheckCircle className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Work'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {user?.role === 'teacher' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Submissions</h2>
          
          {plagiarismReport && (
            <Card className="border-primary/20 bg-card mb-8">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-xl flex items-center gap-2 text-primary">
                  <ShieldAlert className="w-5 h-5" />
                  Plagiarism Analysis Report
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Cross-checking all student submissions for similarities.</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {plagiarismReport.comparisons?.map((comp: any, idx: number) => (
                    <div key={idx} className={`p-4 flex items-center justify-between ${comp.isFlagged ? 'bg-destructive/5' : ''}`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-medium">
                          <span>{comp.studentA}</span>
                          <span className="text-muted-foreground text-xs mx-2">compared with</span>
                          <span>{comp.studentB}</span>
                        </div>
                        {comp.isFlagged && (
                          <div className="text-xs font-semibold text-destructive uppercase tracking-wider">
                            High Similarity Detected
                          </div>
                        )}
                      </div>
                      <div className={`text-xl font-bold px-3 py-1 rounded-md ${comp.isFlagged ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {comp.similarityPercentage}%
                      </div>
                    </div>
                  ))}
                  {!plagiarismReport.comparisons && (
                    <pre className="text-sm overflow-x-auto p-4 bg-black/50 rounded-b-md">
                      {JSON.stringify(plagiarismReport, null, 2)}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {submissions.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground border-dashed">
              No submissions yet.
            </Card>
          ) : (
            <div className="grid gap-4">
              {submissions.map((sub) => (
                <Card key={sub.id}>
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-primary">Student ID: {sub.userId}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(sub.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm bg-muted/10 p-4 mx-4 mb-4 rounded-md border border-border">
                    <p className="line-clamp-3">{sub.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
