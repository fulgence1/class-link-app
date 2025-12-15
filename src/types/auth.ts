export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  class?: string;
  subject?: string;
  birthDate?: string;
  parentName?: string;
  studentId?: string;
  schoolYear?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
