'use client';

import { useAuth } from '@/hooks/useAuth';
import { MOCK_ASSIGNMENTS } from '@/lib/mock-data';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';

export default function AssignmentsPage() {
  const { user } = useAuth();

  // Filter assignments based on user role
  const assignments = user?.role === 'teacher'
    ? MOCK_ASSIGNMENTS.filter(a => a.createdBy === user.id)
    : MOCK_ASSIGNMENTS;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Assignments</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {user?.role === 'teacher' ? 'Manage your assignments' : 'View available assignments'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}
