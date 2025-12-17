import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { mockTeacherClasses, mockStudentsForTeacher, AttendanceRecord } from '@/data/mockData';
import { Check, X, Clock, Users, Save, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type AttendanceStatus = 'present' | 'absent' | 'late';

interface TempAttendance {
  status: AttendanceStatus;
  lateMinutes?: number;
}

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState<string>('ts');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [attendance, setAttendance] = useState<Record<string, TempAttendance>>({});
  const [savedRecords, setSavedRecords] = useState<AttendanceRecord[]>([]);

  const classStudents = mockStudentsForTeacher.filter(s => 
    selectedClass === 'ts' ? s.class === 'Terminale S' : s.class === '1ère ES'
  );

  const presentCount = Object.values(attendance).filter(a => a.status === 'present').length;
  const absentCount = Object.values(attendance).filter(a => a.status === 'absent').length;
  const lateCount = Object.values(attendance).filter(a => a.status === 'late').length;

  const setStudentAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const setLateMinutes = (studentId: string, minutes: number) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], lateMinutes: minutes }
    }));
  };

  const handleSaveAttendance = () => {
    const records: AttendanceRecord[] = Object.entries(attendance).map(([studentId, data]) => {
      const student = classStudents.find(s => s.id === studentId);
      return {
        id: `att-${Date.now()}-${studentId}`,
        studentId,
        studentName: student?.name || '',
        classId: selectedClass,
        date: selectedDate,
        status: data.status,
        lateMinutes: data.lateMinutes,
      };
    });

    setSavedRecords(prev => [...prev, ...records]);
    toast.success('Appel enregistré avec succès');
    setAttendance({});
  };

  const markAllPresent = () => {
    const newAttendance: Record<string, TempAttendance> = {};
    classStudents.forEach(s => {
      newAttendance[s.id] = { status: 'present' };
    });
    setAttendance(newAttendance);
  };

  const getStatusIcon = (status?: AttendanceStatus) => {
    switch (status) {
      case 'present': return <Check className="w-4 h-4" />;
      case 'absent': return <X className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status?: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'bg-emerald-500 hover:bg-emerald-600';
      case 'absent': return 'bg-destructive hover:bg-destructive/90';
      case 'late': return 'bg-warning hover:bg-warning/90';
      default: return 'bg-muted hover:bg-muted/80';
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{presentCount}</div>
            <p className="text-xs text-muted-foreground">Présents</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{absentCount}</div>
            <p className="text-xs text-muted-foreground">Absents</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{lateCount}</div>
            <p className="text-xs text-muted-foreground">Retards</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent>
            {mockTeacherClasses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-auto"
        />
      </div>

      {/* Quick actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={markAllPresent} className="flex-1 gap-1">
          <Check className="w-4 h-4" />
          Tous présents
        </Button>
        <Button 
          size="sm" 
          onClick={handleSaveAttendance} 
          className="flex-1 gap-1"
          disabled={Object.keys(attendance).length === 0}
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </Button>
      </div>

      {/* Student list */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Liste des élèves
            <Badge variant="secondary" className="ml-auto">{classStudents.length} élèves</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {classStudents.map(student => {
            const studentAttendance = attendance[student.id];
            
            return (
              <div key={student.id} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 font-medium text-sm">{student.name}</span>
                  <div className="flex gap-1">
                    {(['present', 'late', 'absent'] as AttendanceStatus[]).map(status => (
                      <Button
                        key={status}
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "h-8 w-8 rounded-full transition-all",
                          studentAttendance?.status === status 
                            ? `${getStatusColor(status)} text-white`
                            : "bg-muted/50"
                        )}
                        onClick={() => setStudentAttendance(student.id, status)}
                      >
                        {getStatusIcon(status)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {studentAttendance?.status === 'late' && (
                  <div className="mt-2 flex items-center gap-2 ml-13">
                    <span className="text-xs text-muted-foreground">Retard de</span>
                    <Input
                      type="number"
                      min="1"
                      max="60"
                      placeholder="min"
                      className="w-16 h-7 text-xs"
                      value={studentAttendance.lateMinutes || ''}
                      onChange={(e) => setLateMinutes(student.id, parseInt(e.target.value))}
                    />
                    <span className="text-xs text-muted-foreground">minutes</span>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent records */}
      {savedRecords.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              Appels récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {savedRecords.length} enregistrement(s) effectué(s) aujourd'hui
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
