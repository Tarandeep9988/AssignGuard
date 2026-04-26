export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  content: string;
  deadline: Date;
  creatorId: string;
  createdAt: Date;
  totalSubmissions?: number;
  averageSimilarity?: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  submittedAt: Date;
  similarity: number;
  status: 'submitted' | 'graded' | 'plagiarized';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}
