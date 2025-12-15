import { Clock, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCourses, mockAssignments, mockAnnouncements } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function StudentDashboard() {
  const todaysCourses = mockCourses.slice(0, 3);
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const recentAnnouncement = mockAnnouncements[0];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      warning: 'bg-warning text-warning-foreground',
      info: 'bg-info text-info-foreground',
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="px-4 py-4 space-y-6 animate-fade-in">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Cours aujourd'hui</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Devoirs en cours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Announcement */}
      {recentAnnouncement?.important && (
        <Card className="border-warning/50 bg-warning/5 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{recentAnnouncement.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {recentAnnouncement.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Schedule */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Emploi du temps</h2>
          <span className="text-xs text-muted-foreground">Aujourd'hui</span>
        </div>
        
        <div className="space-y-3">
          {todaysCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="shadow-soft overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={cn("w-1 h-14 rounded-full", getColorClass(course.color))} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{course.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.teacher}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{course.time}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{course.room}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    En cours
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pending Assignments */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Devoirs à rendre</h2>
          <button className="text-xs text-primary font-medium">Voir tout</button>
        </div>
        
        <div className="space-y-3">
          {pendingAssignments.slice(0, 2).map((assignment, index) => (
            <Card 
              key={assignment.id} 
              className="shadow-soft animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground text-sm">{assignment.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {assignment.course}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    À rendre le {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                  </span>
                  <Progress value={30} className="w-20 h-1.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Average Card */}
      <Card className="shadow-soft gradient-primary text-primary-foreground">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Moyenne générale</p>
              <p className="text-3xl font-bold mt-1">14.5</p>
              <p className="text-xs opacity-70 mt-1">Trimestre 1</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center">
              <span className="text-lg font-bold">+0.8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
