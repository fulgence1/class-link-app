import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockTeacherClasses, mockTextbookEntries, TextbookEntry } from '@/data/mockData';
import { BookOpen, Plus, Calendar, FileText, Save } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

export function TeacherTextbook() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [entries, setEntries] = useState<TextbookEntry[]>(mockTextbookEntries);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    classId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    title: '',
    content: '',
    homework: '',
    homeworkDueDate: '',
  });

  const filteredEntries = selectedClass === 'all' 
    ? entries 
    : entries.filter(e => e.classId === selectedClass);

  const handleSaveEntry = () => {
    if (!newEntry.classId || !newEntry.title || !newEntry.content) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const classInfo = mockTeacherClasses.find(c => c.id === newEntry.classId);
    
    const entry: TextbookEntry = {
      id: `t${Date.now()}`,
      classId: newEntry.classId,
      className: classInfo?.name || '',
      date: newEntry.date,
      subject: 'Mathématiques',
      title: newEntry.title,
      content: newEntry.content,
      homework: newEntry.homework || undefined,
      homeworkDueDate: newEntry.homeworkDueDate || undefined,
    };

    setEntries([entry, ...entries]);
    setIsAddingEntry(false);
    setNewEntry({
      classId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      title: '',
      content: '',
      homework: '',
      homeworkDueDate: '',
    });
    toast.success('Entrée ajoutée au cahier de texte');
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{entries.length}</div>
            <p className="text-xs text-muted-foreground">Entrées</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {entries.filter(e => e.homework).length}
            </div>
            <p className="text-xs text-muted-foreground">Devoirs</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Toutes les classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les classes</SelectItem>
            {mockTeacherClasses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nouvelle entrée</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Classe *</Label>
                  <Select value={newEntry.classId} onValueChange={(v) => setNewEntry({...newEntry, classId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeacherClasses.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date *</Label>
                  <Input 
                    type="date" 
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label>Titre du cours *</Label>
                <Input 
                  placeholder="Ex: Chapitre 5 - Les dérivées"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                />
              </div>

              <div>
                <Label>Contenu du cours *</Label>
                <Textarea 
                  placeholder="Décrivez le contenu du cours..."
                  rows={4}
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                />
              </div>

              <div className="border-t pt-4">
                <Label className="text-muted-foreground">Devoirs (optionnel)</Label>
                <Textarea 
                  placeholder="Travail à faire pour le prochain cours..."
                  rows={2}
                  className="mt-2"
                  value={newEntry.homework}
                  onChange={(e) => setNewEntry({...newEntry, homework: e.target.value})}
                />
                {newEntry.homework && (
                  <div className="mt-2">
                    <Label>À rendre pour le</Label>
                    <Input 
                      type="date" 
                      value={newEntry.homeworkDueDate}
                      onChange={(e) => setNewEntry({...newEntry, homeworkDueDate: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleSaveEntry} className="w-full gap-2">
                <Save className="w-4 h-4" />
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Entries list */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Cahier de texte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Aucune entrée</p>
          ) : (
            filteredEntries.map(entry => (
              <div key={entry.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{entry.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{entry.className}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(parseISO(entry.date), 'd MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{entry.content}</p>
                
                {entry.homework && (
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-warning" />
                      <span className="text-xs font-medium text-warning">Devoirs</span>
                      {entry.homeworkDueDate && (
                        <Badge variant="outline" className="text-[10px] ml-auto border-warning/30 text-warning">
                          Pour le {format(parseISO(entry.homeworkDueDate), 'd MMM', { locale: fr })}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{entry.homework}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
