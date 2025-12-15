import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCourses } from '@/data/mockData';
import { cn } from '@/lib/utils';

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
const currentDayIndex = new Date().getDay() - 1;

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(currentDayIndex >= 0 && currentDayIndex < 5 ? currentDayIndex : 0);

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'border-l-primary bg-primary/5',
      secondary: 'border-l-secondary bg-secondary/5',
      warning: 'border-l-warning bg-warning/5',
      info: 'border-l-info bg-info/5',
    };
    return colors[color] || colors.primary;
  };

  // Simulate different courses per day
  const getCoursesForDay = (dayIndex: number) => {
    const shuffled = [...mockCourses].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2 + (dayIndex % 3));
  };

  const todaysCourses = getCoursesForDay(selectedDay);

  return (
    <AppLayout title="Emploi du temps">
      <div className="px-4 py-4 space-y-4 animate-fade-in">
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <p className="font-semibold text-foreground">Semaine 50</p>
            <p className="text-xs text-muted-foreground">9 - 13 Décembre 2024</p>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Days Selection */}
        <div className="flex gap-2">
          {days.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={cn(
                "flex-1 py-3 rounded-xl text-center transition-all duration-200",
                selectedDay === index
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <p className="text-xs font-medium">{day}</p>
              <p className="text-lg font-bold mt-1">{9 + index}</p>
            </button>
          ))}
        </div>

        {/* Courses List */}
        <div className="space-y-3">
          {todaysCourses.map((course, index) => (
            <Card 
              key={course.id}
              className={cn(
                "shadow-soft border-l-4 animate-slide-up",
                getColorClass(course.color)
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {course.time}
                    </p>
                    <h3 className="font-semibold text-foreground">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.teacher}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                      {course.room}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {todaysCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun cours ce jour</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
