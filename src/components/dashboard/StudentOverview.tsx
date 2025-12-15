import { BookOpen, GraduationCap, FileText, Calendar, CreditCard, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { StudentIdCard } from './StudentIdCard';

const quickAccessItems = [
  { icon: FileText, label: 'Notes', color: 'text-primary' },
  { icon: Calendar, label: 'Emploi du temps', color: 'text-info' },
  { icon: Clock, label: 'Absences', color: 'text-warning' },
  { icon: CreditCard, label: 'Paiements', color: 'text-secondary' },
  { icon: MessageSquare, label: 'Messages', color: 'text-primary' },
  { icon: BookOpen, label: 'Devoirs', color: 'text-info' },
];

export function StudentOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Student ID Card */}
        <StudentIdCard />
        
        {/* Right Column - Stats */}
        <div className="space-y-4">
          {/* Average Grade */}
          <Card className="shadow-soft">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-3">Moyenne Générale</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">--/20</p>
                  <p className="text-xs text-muted-foreground">Aucune note</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Class Info */}
          <Card className="shadow-soft">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-3">Classe</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{user?.class || 'N/A'}</p>
                  <p className="text-xs text-muted-foreground">Année scolaire {user?.schoolYear || '2024-2025'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Quick Access */}
      <Card className="shadow-soft">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Accès Rapide</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {quickAccessItems.map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-xs text-muted-foreground text-center">{item.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
