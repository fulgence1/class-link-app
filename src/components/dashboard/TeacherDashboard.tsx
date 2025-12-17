import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherOverview } from './TeacherOverview';
import { TeacherGrades } from './TeacherGrades';
import { TeacherAttendance } from './TeacherAttendance';
import { TeacherTextbook } from './TeacherTextbook';
import { TeacherMessages } from './TeacherMessages';
import { LayoutDashboard, FileText, Users, BookOpen, MessageSquare } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Accueil', icon: LayoutDashboard },
  { id: 'grades', label: 'Notes', icon: FileText },
  { id: 'attendance', label: 'Présence', icon: Users },
  { id: 'textbook', label: 'Cahier', icon: BookOpen },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

export function TeacherDashboard() {
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
            <TeacherOverview />
          </TabsContent>
          
          <TabsContent value="grades" className="m-0">
            <TeacherGrades />
          </TabsContent>
          
          <TabsContent value="attendance" className="m-0">
            <TeacherAttendance />
          </TabsContent>
          
          <TabsContent value="textbook" className="m-0">
            <TeacherTextbook />
          </TabsContent>
          
          <TabsContent value="messages" className="m-0">
            <TeacherMessages />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
