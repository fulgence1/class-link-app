import { Bell, AlertCircle, Megaphone } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAnnouncements } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Announcements() {
  return (
    <AppLayout title="Annonces">
      <div className="px-4 py-4 space-y-4 animate-fade-in">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Bell className="w-3 h-3" />
            {mockAnnouncements.length} annonces
          </Badge>
          <Badge variant="outline" className="gap-1 text-warning border-warning/50">
            <AlertCircle className="w-3 h-3" />
            {mockAnnouncements.filter(a => a.important).length} important
          </Badge>
        </div>

        <div className="space-y-3">
          {mockAnnouncements.map((announcement, index) => (
            <Card 
              key={announcement.id}
              className={cn(
                "shadow-soft animate-slide-up cursor-pointer hover:shadow-medium transition-shadow",
                announcement.important && "border-warning/50 bg-warning/5"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    announcement.important 
                      ? "bg-warning/20 text-warning" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {announcement.important ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <Megaphone className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">
                        {announcement.title}
                      </h3>
                      {announcement.important && (
                        <Badge className="bg-warning text-warning-foreground text-[10px] px-1.5">
                          Important
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {announcement.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Par {announcement.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
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
