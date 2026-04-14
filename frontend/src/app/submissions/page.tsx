'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import api from '@/lib/axios';
import { FileText, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Submission {
  id: string;
  content: string;
  assignmentId: string;
  createdAt: string;
}

export default function SubmissionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role === 'student') {
        fetchSubmissions();
      } else {
        router.push('/');
      }
    }
  }, [user, loading, router]);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get('/submissions');
      setSubmissions(res.data.data.submissions);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  if (loading || fetching) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'student') return null;

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
        <p className="text-muted-foreground mt-1">
          Review your past assignment submissions.
        </p>
      </div>

      {submissions.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 border-dashed border-2 bg-transparent text-center">
          <FileText className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold">No submissions found</h3>
          <p className="text-muted-foreground text-sm max-w-sm mt-2">
            You haven&apos;t submitted any assignments yet.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {submissions.map((sub) => (
            <Card key={sub.id} className="flex flex-col">
              <CardHeader className="py-4 border-b border-border bg-muted/10">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <Link href={`/assignments/${sub.assignmentId}`} className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                      View Assignment
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 text-sm text-muted-foreground">
                <p className="line-clamp-4">{sub.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
