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

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'teacher';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'teacher';
  subject: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participantId: '2',
    participantName: 'Mme Martin',
    participantRole: 'teacher',
    subject: 'Mathématiques',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
    lastMessage: 'N\'oubliez pas de réviser les dérivées pour le prochain contrôle.',
    lastMessageTime: '2024-12-12T14:30:00',
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participantId: '4',
    participantName: 'Mme Bernard',
    participantRole: 'teacher',
    subject: 'Français',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    lastMessage: 'Votre dissertation est très bien structurée.',
    lastMessageTime: '2024-12-11T09:15:00',
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participantId: '5',
    participantName: 'M. Petit',
    participantRole: 'teacher',
    subject: 'Physique-Chimie',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
    lastMessage: 'Le TP de demain portera sur l\'optique.',
    lastMessageTime: '2024-12-10T16:45:00',
    unreadCount: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    conversationId: 'conv1',
    senderId: '2',
    senderName: 'Mme Martin',
    senderRole: 'teacher',
    content: 'Bonjour Jean, comment avancez-vous sur les exercices de dérivées ?',
    timestamp: '2024-12-12T10:00:00',
    read: true,
  },
  {
    id: 'msg2',
    conversationId: 'conv1',
    senderId: '1',
    senderName: 'Jean Dupont',
    senderRole: 'student',
    content: 'Bonjour Madame, j\'ai quelques difficultés avec les dérivées composées.',
    timestamp: '2024-12-12T10:30:00',
    read: true,
  },
  {
    id: 'msg3',
    conversationId: 'conv1',
    senderId: '2',
    senderName: 'Mme Martin',
    senderRole: 'teacher',
    content: 'Je comprends, c\'est un sujet complexe. Venez me voir à la fin du cours demain.',
    timestamp: '2024-12-12T11:00:00',
    read: true,
  },
  {
    id: 'msg4',
    conversationId: 'conv1',
    senderId: '2',
    senderName: 'Mme Martin',
    senderRole: 'teacher',
    content: 'N\'oubliez pas de réviser les dérivées pour le prochain contrôle.',
    timestamp: '2024-12-12T14:30:00',
    read: false,
  },
  {
    id: 'msg5',
    conversationId: 'conv2',
    senderId: '4',
    senderName: 'Mme Bernard',
    senderRole: 'teacher',
    content: 'Votre dissertation est très bien structurée.',
    timestamp: '2024-12-11T09:15:00',
    read: true,
  },
  {
    id: 'msg6',
    conversationId: 'conv3',
    senderId: '5',
    senderName: 'M. Petit',
    senderRole: 'teacher',
    content: 'Le TP de demain portera sur l\'optique.',
    timestamp: '2024-12-10T16:45:00',
    read: false,
  },
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
  { id: '5', name: 'Camille Petit', class: 'Terminale S', average: 15.0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Camille' },
  { id: '6', name: 'Hugo Martin', class: 'Terminale S', average: 13.2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hugo' },
];

export interface TeacherClass {
  id: string;
  name: string;
  level: string;
  studentCount: number;
}

export const mockTeacherClasses: TeacherClass[] = [
  { id: 'ts', name: 'Terminale S', level: 'Terminale', studentCount: 32 },
  { id: '1es', name: '1ère ES', level: 'Première', studentCount: 28 },
];

export interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  subject: string;
  grade: number;
  maxGrade: number;
  date: string;
  evaluationType: string;
  comment?: string;
}

export const mockStudentGrades: StudentGrade[] = [
  { id: 'g1', studentId: '1', studentName: 'Jean Dupont', classId: 'ts', subject: 'Mathématiques', grade: 14, maxGrade: 20, date: '2024-12-10', evaluationType: 'Contrôle', comment: 'Bon travail' },
  { id: 'g2', studentId: '3', studentName: 'Emma Leroy', classId: 'ts', subject: 'Mathématiques', grade: 17, maxGrade: 20, date: '2024-12-10', evaluationType: 'Contrôle', comment: 'Excellent' },
  { id: 'g3', studentId: '5', studentName: 'Camille Petit', classId: 'ts', subject: 'Mathématiques', grade: 15, maxGrade: 20, date: '2024-12-10', evaluationType: 'Contrôle' },
  { id: 'g4', studentId: '6', studentName: 'Hugo Martin', classId: 'ts', subject: 'Mathématiques', grade: 12, maxGrade: 20, date: '2024-12-10', evaluationType: 'Contrôle', comment: 'Peut mieux faire' },
];

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  lateMinutes?: number;
  comment?: string;
}

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'a1', studentId: '1', studentName: 'Jean Dupont', classId: 'ts', date: '2024-12-12', status: 'present' },
  { id: 'a2', studentId: '3', studentName: 'Emma Leroy', classId: 'ts', date: '2024-12-12', status: 'present' },
  { id: 'a3', studentId: '5', studentName: 'Camille Petit', classId: 'ts', date: '2024-12-12', status: 'late', lateMinutes: 10 },
  { id: 'a4', studentId: '6', studentName: 'Hugo Martin', classId: 'ts', date: '2024-12-12', status: 'absent', comment: 'Non justifié' },
];

export interface TextbookEntry {
  id: string;
  classId: string;
  className: string;
  date: string;
  subject: string;
  title: string;
  content: string;
  homework?: string;
  homeworkDueDate?: string;
}

export const mockTextbookEntries: TextbookEntry[] = [
  {
    id: 't1',
    classId: 'ts',
    className: 'Terminale S',
    date: '2024-12-12',
    subject: 'Mathématiques',
    title: 'Chapitre 5: Les dérivées',
    content: 'Cours sur les dérivées de fonctions composées. Exercices 1 à 5 page 124.',
    homework: 'Exercices 6 à 10 page 125',
    homeworkDueDate: '2024-12-16',
  },
  {
    id: 't2',
    classId: 'ts',
    className: 'Terminale S',
    date: '2024-12-11',
    subject: 'Mathématiques',
    title: 'Chapitre 5: Les dérivées',
    content: 'Introduction aux dérivées. Définition et interprétation graphique.',
  },
  {
    id: 't3',
    classId: '1es',
    className: '1ère ES',
    date: '2024-12-12',
    subject: 'Mathématiques',
    title: 'Chapitre 4: Statistiques',
    content: 'Cours sur la variance et l\'écart-type.',
    homework: 'DM n°5 à rendre',
    homeworkDueDate: '2024-12-18',
  },
];

export interface TeacherConversation {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const mockTeacherConversations: TeacherConversation[] = [
  {
    id: 'tconv1',
    studentId: '1',
    studentName: 'Jean Dupont',
    studentClass: 'Terminale S',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    lastMessage: 'Bonjour Madame, j\'ai quelques difficultés avec les dérivées composées.',
    lastMessageTime: '2024-12-12T10:30:00',
    unreadCount: 1,
  },
  {
    id: 'tconv2',
    studentId: '3',
    studentName: 'Emma Leroy',
    studentClass: 'Terminale S',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    lastMessage: 'Merci pour votre aide !',
    lastMessageTime: '2024-12-11T15:00:00',
    unreadCount: 0,
  },
  {
    id: 'tconv3',
    studentId: '2',
    studentName: 'Pierre Durand',
    studentClass: '1ère ES',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
    lastMessage: 'Je serai absent demain pour un RDV médical.',
    lastMessageTime: '2024-12-10T18:20:00',
    unreadCount: 0,
  },
];

export const mockTeacherMessages: Message[] = [
  {
    id: 'tmsg1',
    conversationId: 'tconv1',
    senderId: '2',
    senderName: 'Mme Martin',
    senderRole: 'teacher',
    content: 'Bonjour Jean, comment avancez-vous sur les exercices de dérivées ?',
    timestamp: '2024-12-12T10:00:00',
    read: true,
  },
  {
    id: 'tmsg2',
    conversationId: 'tconv1',
    senderId: '1',
    senderName: 'Jean Dupont',
    senderRole: 'student',
    content: 'Bonjour Madame, j\'ai quelques difficultés avec les dérivées composées.',
    timestamp: '2024-12-12T10:30:00',
    read: false,
  },
];
