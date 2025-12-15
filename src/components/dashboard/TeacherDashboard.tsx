import { Users, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockStudentsForTeacher, mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export function TeacherDashboard() {
  const { user } = useAuth();
  const todaysCourses = mockCourses.slice(0, 2);

  const stats = [
    { icon: Users, label: 'Élèves', value: '48', color: 'primary' },
    { icon: FileText, label: 'Devoirs', value: '12', color: 'secondary' },
    { icon: Calendar, label: 'Cours/sem', value: '18', color: 'warning' },
    { icon: TrendingUp, label: 'Moy. classe', value: '13.8', color: 'info' },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'gradient-primary',
      secondary: 'gradient-accent',
      warning: 'gradient-warm',
      info: 'bg-info',
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="px-4 py-4 space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label} 
            className="shadow-soft animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${getColorClass(stat.color)} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Classes */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Cours du jour</h2>
          <span className="text-xs text-muted-foreground">
            {user?.subject}
          </span>
        </div>

        <div className="space-y-3">
          {todaysCourses.map((course, index) => (
            <Card 
              key={course.id}
              className="shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Terminale S</h3>
                    <p className="text-sm text-muted-foreground">{course.time}</p>
                    <p className="text-xs text-muted-foreground mt-1">{course.room}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-primary/10 text-primary border-0">32 élèves</Badge>
                    <p className="text-xs text-muted-foreground mt-2">Chapitre 5: Dérivées</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Students */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Élèves récents</h2>
          <button className="text-xs text-primary font-medium">Voir tout</button>
        </div>

        <Card className="shadow-soft">
          <CardContent className="p-2">
            {mockStudentsForTeacher.slice(0, 4).map((student, index) => (
              <div 
                key={student.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.class}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{student.average}</p>
                  <p className="text-xs text-muted-foreground">moyenne</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <Card className="shadow-soft gradient-primary">
        <CardContent className="p-5">
          <h3 className="font-semibold text-primary-foreground mb-3">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 bg-primary-foreground/20 rounded-xl p-3 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/30 transition-colors">
              <FileText className="w-4 h-4" />
              Nouveau devoir
            </button>
            <button className="flex items-center gap-2 bg-primary-foreground/20 rounded-xl p-3 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/30 transition-colors">
              <Users className="w-4 h-4" />
              Faire l'appel
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
