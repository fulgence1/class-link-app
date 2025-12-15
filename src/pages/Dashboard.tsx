import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <AppLayout>
      {user?.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
    </AppLayout>
  );
}
