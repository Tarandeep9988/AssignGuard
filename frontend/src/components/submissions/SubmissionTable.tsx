'use client';

import { Submission } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface SubmissionTableProps {
  submissions: Submission[];
  onViewSubmission?: (submission: Submission) => void;
}

export function SubmissionTable({
  submissions,
  onViewSubmission,
}: SubmissionTableProps) {
  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 50) return 'bg-red-100 text-red-800 border-red-300';
    if (similarity >= 25) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const getSimilarityLabel = (similarity: number) => {
    if (similarity >= 50) return 'High Risk';
    if (similarity >= 25) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border bg-muted/50">
            <TableHead className="text-foreground font-semibold">Student</TableHead>
            <TableHead className="text-foreground font-semibold">Submitted</TableHead>
            <TableHead className="text-foreground font-semibold text-right">Similarity</TableHead>
            <TableHead className="text-foreground font-semibold">Status</TableHead>
            <TableHead className="text-foreground font-semibold w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id} className="border-b border-border hover:bg-muted/30">
              <TableCell className="font-medium text-foreground">
                {submission.studentName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {submission.submittedAt.toLocaleDateString()}{' '}
                {submission.submittedAt.toLocaleTimeString()}
              </TableCell>
              <TableCell className="text-right">
                <Badge className={getSimilarityColor(submission.similarity)}>
                  {submission.similarity}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${
                    submission.status === 'plagiarized'
                      ? 'border-red-300 text-red-700'
                      : submission.status === 'graded'
                      ? 'border-green-300 text-green-700'
                      : 'border-blue-300 text-blue-700'
                  }`}
                >
                  {submission.status === 'plagiarized'
                    ? 'Flagged'
                    : submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onViewSubmission?.(submission)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {submissions.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No submissions yet
        </div>
      )}
    </div>
  );
}
