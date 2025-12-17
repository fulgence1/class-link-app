import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentOverview } from './StudentOverview';
import { StudentAbsences } from './StudentAbsences';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Calendar, Clock, CreditCard, MessageSquare, LayoutDashboard } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'schedule', label: 'Emploi du temps', icon: Calendar },
  { id: 'absences', label: 'Absences', icon: Clock },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

function ComingSoon({ title }: { title: string }) {
  return (
    <Card className="shadow-soft">
      <CardContent className="p-8 text-center">
        <p className="text-muted-foreground">La section <strong>{title}</strong> sera bientôt disponible.</p>
      </CardContent>
    </Card>
  );
}

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 p-1 h-auto flex-wrap gap-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-4">
          <TabsContent value="overview" className="m-0">
            <StudentOverview />
          </TabsContent>
          
          <TabsContent value="notes" className="m-0">
            <ComingSoon title="Notes" />
          </TabsContent>
          
          <TabsContent value="schedule" className="m-0">
            <ComingSoon title="Emploi du temps" />
          </TabsContent>
          
          <TabsContent value="absences" className="m-0">
            <StudentAbsences />
          </TabsContent>
          
          <TabsContent value="payments" className="m-0">
            <ComingSoon title="Paiements" />
          </TabsContent>
          
          <TabsContent value="messages" className="m-0">
            <ComingSoon title="Messages" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
