'use client';

import { MOCK_ASSIGNMENTS } from '@/lib/mock-data';
import { Assignment } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export function TeacherDashboard() {
  const teacherAssignments = MOCK_ASSIGNMENTS.slice(0, 5);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Assignments</h1>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Assignment</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">Manage your assignments and review student submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Assignments</p>
              <p className="text-3xl font-bold text-foreground">{teacherAssignments.length}</p>
            </div>
            <FileText className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-foreground">
                {teacherAssignments.reduce((sum, a) => sum + (a.totalSubmissions || 0), 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Similarity</p>
              <p className="text-3xl font-bold text-foreground">
                {Math.round(
                  teacherAssignments.reduce((sum, a) => sum + (a.averageSimilarity || 0), 0) /
                    teacherAssignments.length
                )}%
              </p>
            </div>
            <div className="w-8 h-8 text-primary/50" />
          </div>
        </Card>
      </div>

      {/* Assignments List */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Recent Assignments</h2>
        <div className="space-y-3">
          {teacherAssignments.map((assignment: Assignment) => (
            <Link
              key={assignment.id}
              href={`/dashboard/assignments/${assignment.id}`}
              className="block"
            >
              <Card className="p-4 md:p-6 border-border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">{assignment.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-1">
                      {assignment.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm">
                      <span className="text-muted-foreground">
                        Deadline: {assignment.deadline.toLocaleDateString()}
                      </span>
                      <span className="text-muted-foreground">
                        {assignment.totalSubmissions || 0} submissions
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                      {assignment.averageSimilarity || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Avg. Similarity</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
