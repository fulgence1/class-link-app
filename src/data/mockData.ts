import { User } from '@/types/auth';

export const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'jean.dupont@ecole.fr',
    password: 'eleve123',
    name: 'Jean Dupont',
    role: 'student',
    class: 'Terminale S',
    birthDate: '15/03/2006',
    parentName: 'Michel Dupont',
    studentId: 'JDU15032006T',
    schoolYear: '2024-2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
  },
  {
    id: '2',
    email: 'marie.martin@ecole.fr',
    password: 'prof123',
    name: 'Marie Martin',
    role: 'teacher',
    subject: 'Mathématiques',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
  },
  {
    id: '3',
    email: 'pierre.durand@ecole.fr',
    password: 'eleve123',
    name: 'Pierre Durand',
    role: 'student',
    class: '1ère ES',
    birthDate: '22/08/2007',
    parentName: 'Anne Durand',
    studentId: 'PDU22082007E',
    schoolYear: '2024-2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
  },
  {
    id: '4',
    email: 'sophie.bernard@ecole.fr',
    password: 'prof123',
    name: 'Sophie Bernard',
    role: 'teacher',
    subject: 'Français',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
  },
];

export interface Course {
  id: string;
  name: string;
  teacher: string;
  room: string;
  time: string;
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  important: boolean;
}

export const mockCourses: Course[] = [
  { id: '1', name: 'Mathématiques', teacher: 'Mme Martin', room: 'Salle 201', time: '08:00 - 10:00', color: 'primary' },
  { id: '2', name: 'Français', teacher: 'Mme Bernard', room: 'Salle 105', time: '10:15 - 12:15', color: 'secondary' },
  { id: '3', name: 'Physique-Chimie', teacher: 'M. Petit', room: 'Labo 3', time: '14:00 - 16:00', color: 'warning' },
  { id: '4', name: 'Histoire-Géo', teacher: 'M. Lefebvre', room: 'Salle 302', time: '16:15 - 18:15', color: 'info' },
];

export const mockAssignments: Assignment[] = [
  { id: '1', title: 'Exercices de dérivées', course: 'Mathématiques', dueDate: '2024-12-18', status: 'pending' },
  { id: '2', title: 'Dissertation sur Baudelaire', course: 'Français', dueDate: '2024-12-20', status: 'pending' },
  { id: '3', title: 'TP Optique', course: 'Physique-Chimie', dueDate: '2024-12-15', status: 'submitted' },
  { id: '4', title: 'Exposé Révolution', course: 'Histoire-Géo', dueDate: '2024-12-10', status: 'graded', grade: 16 },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Conseil de classe',
    content: 'Le conseil de classe du 1er trimestre aura lieu le 20 décembre à 17h.',
    date: '2024-12-12',
    author: 'Direction',
    important: true,
  },
  {
    id: '2',
    title: 'Vacances de Noël',
    content: 'Les vacances de Noël débuteront le 21 décembre. Bonnes fêtes à tous !',
    date: '2024-12-10',
    author: 'Direction',
    important: false,
  },
  {
    id: '3',
    title: 'Nouveau devoir de maths',
    content: 'Un nouveau devoir sur les fonctions exponentielles est disponible.',
    date: '2024-12-11',
    author: 'Mme Martin',
    important: false,
  },
];

export interface Absence {
  id: string;
  date: string;
  type: 'absence' | 'retard';
  duration: string;
  reason?: string;
  justified: boolean;
  justificationFile?: string;
  course?: string;
}

export const mockAbsences: Absence[] = [
  { id: '1', date: '2024-12-02', type: 'absence', duration: 'Journée complète', reason: 'Maladie', justified: true, justificationFile: 'certificat_medical.pdf' },
  { id: '2', date: '2024-12-05', type: 'retard', duration: '15 min', reason: 'Transport', justified: true, course: 'Mathématiques' },
  { id: '3', date: '2024-12-09', type: 'absence', duration: '2 heures', justified: false, course: 'Français' },
  { id: '4', date: '2024-12-11', type: 'retard', duration: '10 min', justified: false, course: 'Physique-Chimie' },
  { id: '5', date: '2024-11-15', type: 'absence', duration: 'Journée complète', reason: 'RDV médical', justified: true, justificationFile: 'justificatif_rdv.pdf' },
  { id: '6', date: '2024-11-20', type: 'absence', duration: '4 heures', reason: 'Problème familial', justified: true },
];

export interface StudentForTeacher {
  id: string;
  name: string;
  class: string;
  average: number;
  avatar: string;
}

export const mockStudentsForTeacher: StudentForTeacher[] = [
  { id: '1', name: 'Jean Dupont', class: 'Terminale S', average: 14.5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean' },
  { id: '2', name: 'Pierre Durand', class: '1ère ES', average: 12.8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre' },
  { id: '3', name: 'Emma Leroy', class: 'Terminale S', average: 16.2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { id: '4', name: 'Lucas Moreau', class: '1ère ES', average: 11.5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas' },
];
