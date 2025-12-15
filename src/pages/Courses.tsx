import { Clock, MapPin, User } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCourses } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Courses() {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      warning: 'bg-warning',
      info: 'bg-info',
    };
    return colors[color] || colors.primary;
  };

  return (
    <AppLayout title="Mes cours">
      <div className="px-4 py-4 space-y-4 animate-fade-in">
        <p className="text-sm text-muted-foreground">
          {mockCourses.length} cours cette semaine
        </p>

        <div className="space-y-3">
          {mockCourses.map((course, index) => (
            <Card 
              key={course.id}
              className="shadow-soft overflow-hidden animate-slide-up cursor-pointer hover:shadow-medium transition-shadow"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className={cn("w-2", getColorClass(course.color))} />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Lundi
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{course.teacher}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{course.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{course.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
