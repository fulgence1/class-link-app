import { GraduationCap, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export function StudentIdCard() {
  const { user } = useAuth();
  
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="shadow-soft">
      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground">Carte d'Identité Élève</h3>
          <p className="text-xs text-muted-foreground">Votre carte d'identification scolaire</p>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-primary text-sm">SGS - École</span>
            </div>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded font-medium">
              ÉLÈVE
            </span>
          </div>
          
          {/* Student Info */}
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-primary">{getInitials(user.name)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-foreground">{user.name}</h4>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                <GraduationCap className="w-3 h-3" />
                <span className="text-xs">Classe {user.class}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{user.birthDate || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                <Users className="w-3 h-3" />
                <span className="text-xs">Parent: {user.parentName || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/20">
            <span className="text-xs text-muted-foreground">ID: {user.studentId || 'N/A'}</span>
            <span className="text-xs text-muted-foreground">Année {new Date().getFullYear()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
