import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { mockAbsences, Absence } from '@/data/mockData';
import { format, parseISO, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, FileText, AlertCircle, CheckCircle2, Upload, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StudentAbsences() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const totalAbsences = mockAbsences.filter(a => a.type === 'absence').length;
  const totalRetards = mockAbsences.filter(a => a.type === 'retard').length;
  const unjustified = mockAbsences.filter(a => !a.justified).length;
  
  const absenceDates = mockAbsences.filter(a => a.type === 'absence').map(a => parseISO(a.date));
  const retardDates = mockAbsences.filter(a => a.type === 'retard').map(a => parseISO(a.date));
  
  const selectedAbsences = selectedDate 
    ? mockAbsences.filter(a => isSameDay(parseISO(a.date), selectedDate))
    : [];

  return (
    <div className="space-y-4">
      {/* Stats résumé */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{totalAbsences}</div>
            <p className="text-xs text-muted-foreground">Absences</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{totalRetards}</div>
            <p className="text-xs text-muted-foreground">Retards</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{unjustified}</div>
            <p className="text-xs text-muted-foreground">Non justifiés</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendrier */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            Calendrier de présence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={fr}
            className="w-full pointer-events-auto"
            modifiers={{
              absence: absenceDates,
              retard: retardDates,
            }}
            modifiersClassNames={{
              absence: 'bg-destructive/20 text-destructive font-bold',
              retard: 'bg-warning/20 text-warning font-bold',
            }}
          />
          <div className="flex justify-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-destructive/20 border border-destructive"></span>
              <span className="text-muted-foreground">Absence</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-warning/20 border border-warning"></span>
              <span className="text-muted-foreground">Retard</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Détail du jour sélectionné */}
      {selectedAbsences.length > 0 && (
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {selectedDate && format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedAbsences.map((absence) => (
              <AbsenceItem key={absence.id} absence={absence} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Liste complète des absences/retards */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Historique
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAbsences.map((absence) => (
            <AbsenceItem key={absence.id} absence={absence} showDate />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function AbsenceItem({ absence, showDate = false }: { absence: Absence; showDate?: boolean }) {
  return (
    <div className={cn(
      "p-3 rounded-lg border",
      absence.justified ? "bg-muted/30" : "bg-destructive/5 border-destructive/20"
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant={absence.type === 'absence' ? 'destructive' : 'secondary'}
              className={cn(
                "text-xs",
                absence.type === 'retard' && "bg-warning/20 text-warning hover:bg-warning/30"
              )}
            >
              {absence.type === 'absence' ? 'Absence' : 'Retard'}
            </Badge>
            <span className="text-xs text-muted-foreground">{absence.duration}</span>
            {showDate && (
              <span className="text-xs text-muted-foreground">
                • {format(parseISO(absence.date), 'd MMM yyyy', { locale: fr })}
              </span>
            )}
          </div>
          {absence.course && (
            <p className="text-sm mt-1">{absence.course}</p>
          )}
          {absence.reason && (
            <p className="text-xs text-muted-foreground mt-1">Motif: {absence.reason}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          {absence.justified ? (
            <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Justifié
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/20">
              <AlertCircle className="w-3 h-3 mr-1" />
              Non justifié
            </Badge>
          )}
          {absence.justificationFile && (
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
              <FileText className="w-3 h-3 mr-1" />
              Voir
            </Button>
          )}
        </div>
      </div>
      {!absence.justified && (
        <Button variant="outline" size="sm" className="mt-2 w-full text-xs h-8">
          <Upload className="w-3 h-3 mr-1" />
          Ajouter un justificatif
        </Button>
      )}
    </div>
  );
}
