const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  content: string;
  deadline: string;
}

export interface UpdateAssignmentRequest {
  title?: string;
  description?: string;
  content?: string;
  deadline?: string;
}

export interface CreateSubmissionRequest {
  content: string;
}

export interface UpdateSubmissionRequest {
  content: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies for JWT authentication
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string, role: string) {
    return this.request<{ user: any }>('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }

  async verify() {
    return this.request<{ user: any }>('/verify', {
      method: 'GET',
    });
  }

  async logout() {
    return this.request<null>('/logout', {
      method: 'POST',
    });
  }

  // Assignment endpoints
  async getAssignments() {
    return this.request<any[]>('/assignments', {
      method: 'GET',
    });
  }

  async getAssignmentById(id: string) {
    return this.request<any>(`/assignments/${id}`, {
      method: 'GET',
    });
  }

  async createAssignment(data: CreateAssignmentRequest) {
    return this.request<any>('/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAssignment(id: string, data: UpdateAssignmentRequest) {
    return this.request<any>(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAssignment(id: string) {
    return this.request<null>(`/assignments/${id}`, {
      method: 'DELETE',
    });
  }

  async getPlagiarismReport(assignmentId: string) {
    return this.request<any>(`/assignments/${assignmentId}/plagiarism-report`, {
      method: 'GET',
    });
  }

  // Submission endpoints
  async getSubmissions() {
    return this.request<any[]>('/submissions', {
      method: 'GET',
    });
  }

  async getSubmissionById(id: string) {
    return this.request<any>(`/submissions/${id}`, {
      method: 'GET',
    });
  }

  async createSubmission(assignmentId: string, data: CreateSubmissionRequest) {
    return this.request<any>(`/assignments/${assignmentId}/submissions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSubmission(id: string, data: UpdateSubmissionRequest) {
    return this.request<any>(`/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSubmission(id: string) {
    return this.request<null>(`/submissions/${id}`, {
      method: 'DELETE',
    });
  }

  async getSubmissionsByAssignment(assignmentId: string) {
    return this.request<any[]>(`/assignments/${assignmentId}/submissions`, {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
