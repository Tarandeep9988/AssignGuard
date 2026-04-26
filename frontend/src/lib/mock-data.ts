import { User, Assignment, Submission } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'teacher',
    avatar: 'SJ',
  },
  {
    id: 'user-2',
    name: 'Alex Chen',
    email: 'alex@example.com',
    role: 'student',
    avatar: 'AC',
  },
  {
    id: 'user-3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'student',
    avatar: 'ED',
  },
  {
    id: 'user-4',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'student',
    avatar: 'MB',
  },
  {
    id: 'user-5',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'teacher',
    avatar: 'JW',
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1',
    title: 'Introduction to Machine Learning',
    description: 'Write a comprehensive essay on machine learning fundamentals, covering supervised and unsupervised learning paradigms.',
    content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    creatorId: 'user-1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    totalSubmissions: 3,
    averageSimilarity: 12,
  },
  {
    id: 'assign-2',
    title: 'Climate Change Impact Analysis',
    description: 'Analyze the impact of climate change on global ecosystems and propose sustainable solutions.',
    content: 'Climate change is altering weather patterns, affecting biodiversity and threatening human societies worldwide.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    creatorId: 'user-1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    totalSubmissions: 2,
    averageSimilarity: 8,
  },
  {
    id: 'assign-3',
    title: 'Data Structures Assignment',
    description: 'Implement common data structures including linked lists, stacks, queues, and binary search trees.',
    content: 'Data structures are critical components of computer science that organize and manage data efficiently.',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    creatorId: 'user-5',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    totalSubmissions: 4,
    averageSimilarity: 18,
  },
  {
    id: 'assign-4',
    title: 'Renaissance Art History Essay',
    description: 'Discuss the major characteristics of Renaissance art and its influence on modern artistic movements.',
    content: 'The Renaissance was a period of cultural rebirth that marked the transition from medieval to modern times.',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    creatorId: 'user-1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    totalSubmissions: 1,
    averageSimilarity: 5,
  },
  {
    id: 'assign-5',
    title: 'Organic Chemistry Problem Set',
    description: 'Solve comprehensive problems covering reaction mechanisms, synthesis, and spectroscopy.',
    content: 'Organic chemistry is the branch of chemistry that studies carbon-containing compounds and their reactions.',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    creatorId: 'user-5',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    totalSubmissions: 2,
    averageSimilarity: 15,
  },
  {
    id: 'assign-6',
    title: 'World History: Cold War Analysis',
    description: 'Analyze the geopolitical tensions, proxy wars, and ideological conflicts of the Cold War era.',
    content: 'The Cold War was a prolonged conflict between the Soviet Union and United States that shaped the modern world.',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    creatorId: 'user-1',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    totalSubmissions: 3,
    averageSimilarity: 11,
  },
  {
    id: 'assign-7',
    title: 'Modern Literature Analysis',
    description: 'Read and analyze three contemporary novels, focusing on narrative techniques and thematic elements.',
    content: 'Modern literature reflects the complexities of contemporary society through diverse voices and innovative storytelling.',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    creatorId: 'user-5',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    totalSubmissions: 0,
    averageSimilarity: 0,
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    assignmentId: 'assign-1',
    studentId: 'user-2',
    studentName: 'Alex Chen',
    content: 'Machine learning is a rapidly evolving field that has revolutionized how we process data and make predictions. Supervised learning, where models are trained on labeled data, forms the foundation of many practical applications...',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    similarity: 8,
    status: 'graded',
  },
  {
    id: 'sub-2',
    assignmentId: 'assign-1',
    studentId: 'user-3',
    studentName: 'Emma Davis',
    content: 'In the realm of artificial intelligence, machine learning stands as a transformative technology enabling systems to learn from data. Both supervised and unsupervised learning approaches offer distinct advantages...',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    similarity: 15,
    status: 'graded',
  },
  {
    id: 'sub-3',
    assignmentId: 'assign-1',
    studentId: 'user-4',
    studentName: 'Michael Brown',
    content: 'Machine learning is the field of study that gives computers the ability to learn without being explicitly programmed. This includes supervised learning where training data is labeled...',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    similarity: 13,
    status: 'submitted',
  },
  {
    id: 'sub-4',
    assignmentId: 'assign-2',
    studentId: 'user-2',
    studentName: 'Alex Chen',
    content: 'Climate change represents one of the greatest challenges facing humanity. Rising global temperatures are causing unprecedented impacts on ecosystems worldwide...',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    similarity: 6,
    status: 'submitted',
  },
  {
    id: 'sub-5',
    assignmentId: 'assign-2',
    studentId: 'user-3',
    studentName: 'Emma Davis',
    content: 'The effects of climate change are becoming increasingly visible across the globe, from rising sea levels to extreme weather patterns. Governments and organizations must work together to mitigate these impacts...',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    similarity: 10,
    status: 'submitted',
  },
  {
    id: 'sub-6',
    assignmentId: 'assign-3',
    studentId: 'user-2',
    studentName: 'Alex Chen',
    content: 'Implementation of a linked list: class Node { constructor(data) { this.data = data; this.next = null; } } class LinkedList { constructor() { this.head = null; } }',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    similarity: 22,
    status: 'graded',
  },
  {
    id: 'sub-7',
    assignmentId: 'assign-3',
    studentId: 'user-3',
    studentName: 'Emma Davis',
    content: 'Stack implementation using an array: class Stack { constructor() { this.items = []; } push(element) { this.items.push(element); } pop() { return this.items.pop(); } }',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    similarity: 18,
    status: 'submitted',
  },
  {
    id: 'sub-8',
    assignmentId: 'assign-3',
    studentId: 'user-4',
    studentName: 'Michael Brown',
    content: 'Queue implementation: class Queue { constructor() { this.items = []; } enqueue(element) { this.items.push(element); } dequeue() { return this.items.shift(); } }',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    similarity: 14,
    status: 'submitted',
  },
  {
    id: 'sub-9',
    assignmentId: 'assign-4',
    studentId: 'user-2',
    studentName: 'Alex Chen',
    content: 'The Renaissance marked a significant shift in European culture, bringing renewed interest in classical literature and art. Artists like Michelangelo and Leonardo da Vinci embodied the spirit of the era...',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    similarity: 4,
    status: 'submitted',
  },
];

export function getAssignmentById(id: string): Assignment | undefined {
  return MOCK_ASSIGNMENTS.find(a => a.id === id);
}

export function getSubmissionsByAssignmentId(assignmentId: string): Submission[] {
  return MOCK_SUBMISSIONS.filter(s => s.assignmentId === assignmentId);
}

export function getSubmissionsByStudentId(studentId: string): Submission[] {
  return MOCK_SUBMISSIONS.filter(s => s.studentId === studentId);
}

export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find(u => u.id === id);
}
