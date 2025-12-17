import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { mockTeacherClasses, mockStudentsForTeacher, mockStudentGrades, StudentGrade } from '@/data/mockData';
import { Plus, FileText, TrendingUp, Save } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

export function TeacherGrades() {
  const [selectedClass, setSelectedClass] = useState<string>('ts');
  const [grades, setGrades] = useState<StudentGrade[]>(mockStudentGrades);
  const [isAddingGrade, setIsAddingGrade] = useState(false);
  const [newGrade, setNewGrade] = useState({
    evaluationType: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [studentGrades, setStudentGrades] = useState<Record<string, { grade: string; comment: string }>>({});

  const classStudents = mockStudentsForTeacher.filter(s => 
    selectedClass === 'ts' ? s.class === 'Terminale S' : s.class === '1ère ES'
  );
  
  const classGrades = grades.filter(g => g.classId === selectedClass);
  const classAverage = classGrades.length > 0 
    ? (classGrades.reduce((acc, g) => acc + g.grade, 0) / classGrades.length).toFixed(1)
    : '-';

  const handleSaveGrades = () => {
    const newGrades: StudentGrade[] = [];
    
    Object.entries(studentGrades).forEach(([studentId, data]) => {
      if (data.grade) {
        const student = classStudents.find(s => s.id === studentId);
        if (student) {
          newGrades.push({
            id: `g${Date.now()}-${studentId}`,
            studentId,
            studentName: student.name,
            classId: selectedClass,
            subject: 'Mathématiques',
            grade: parseFloat(data.grade),
            maxGrade: 20,
            date: newGrade.date,
            evaluationType: newGrade.evaluationType,
            comment: data.comment || undefined,
          });
        }
      }
    });

    if (newGrades.length > 0) {
      setGrades([...grades, ...newGrades]);
      setIsAddingGrade(false);
      setStudentGrades({});
      setNewGrade({ evaluationType: '', date: format(new Date(), 'yyyy-MM-dd') });
      toast.success(`${newGrades.length} note(s) enregistrée(s)`);
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-emerald-600';
    if (grade >= 14) return 'text-blue-600';
    if (grade >= 10) return 'text-orange-600';
    return 'text-destructive';
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{classGrades.length}</div>
            <p className="text-xs text-muted-foreground">Notes</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{classAverage}</div>
            <p className="text-xs text-muted-foreground">Moyenne</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{classStudents.length}</div>
            <p className="text-xs text-muted-foreground">Élèves</p>
          </CardContent>
        </Card>
      </div>

      {/* Class selector */}
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
        
        <Dialog open={isAddingGrade} onOpenChange={setIsAddingGrade}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nouvelle évaluation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Type d'évaluation</Label>
                  <Select value={newGrade.evaluationType} onValueChange={(v) => setNewGrade({...newGrade, evaluationType: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contrôle">Contrôle</SelectItem>
                      <SelectItem value="Devoir">Devoir</SelectItem>
                      <SelectItem value="Interrogation">Interrogation</SelectItem>
                      <SelectItem value="TP">TP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input 
                    type="date" 
                    value={newGrade.date}
                    onChange={(e) => setNewGrade({...newGrade, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Notes des élèves</Label>
                {classStudents.map(student => (
                  <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <span className="flex-1 text-sm font-medium">{student.name}</span>
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      placeholder="/20"
                      className="w-20 text-center"
                      value={studentGrades[student.id]?.grade || ''}
                      onChange={(e) => setStudentGrades({
                        ...studentGrades,
                        [student.id]: { ...studentGrades[student.id], grade: e.target.value }
                      })}
                    />
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleSaveGrades} 
                className="w-full gap-2"
                disabled={!newGrade.evaluationType}
              >
                <Save className="w-4 h-4" />
                Enregistrer les notes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent grades */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Dernières notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {classGrades.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Aucune note enregistrée</p>
          ) : (
            classGrades.map(grade => (
              <div key={grade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{grade.studentName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">{grade.evaluationType}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(grade.date), 'd MMM', { locale: fr })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>
                    {grade.grade}
                  </span>
                  <span className="text-muted-foreground text-sm">/{grade.maxGrade}</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Class averages */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Moyennes par élève
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {classStudents.map(student => {
            const studentGradesList = classGrades.filter(g => g.studentId === student.id);
            const avg = studentGradesList.length > 0
              ? (studentGradesList.reduce((acc, g) => acc + g.grade, 0) / studentGradesList.length).toFixed(1)
              : '-';
            
            return (
              <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-sm">{student.name}</span>
                <span className={`font-semibold ${avg !== '-' ? getGradeColor(parseFloat(avg)) : ''}`}>
                  {avg}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
