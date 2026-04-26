'use client';

import { MOCK_ASSIGNMENTS } from '@/lib/mock-data';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';
import { useAuth } from '@/hooks/useAuth';

export default function AssignmentsPage() {
  const { user } = useAuth();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ASSIGNMENTS.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}
