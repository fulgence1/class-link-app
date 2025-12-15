import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border safe-area-top">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'student' ? 'Élève' : 'Professeur'}
            </p>
            <h1 className="text-base font-semibold text-foreground">
              {title || `Bonjour, ${user?.name?.split(' ')[0]}`}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
