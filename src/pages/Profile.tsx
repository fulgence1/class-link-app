import { LogOut, ChevronRight, User, Bell, Moon, HelpCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Déconnexion',
      description: 'À bientôt !',
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const menuItems = [
    { icon: User, label: 'Informations personnelles', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Sécurité', action: () => {} },
    { icon: HelpCircle, label: 'Aide et support', action: () => {} },
  ];

  return (
    <AppLayout title="Profil">
      <div className="px-4 py-4 space-y-6 animate-fade-in">
        {/* Profile Header */}
        <Card className="shadow-soft overflow-hidden">
          <div className="gradient-primary h-20" />
          <CardContent className="relative pt-0 pb-6 px-4">
            <div className="flex flex-col items-center -mt-10">
              <Avatar className="w-20 h-20 ring-4 ring-card shadow-medium">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-lg font-bold text-foreground mt-3">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {user?.role === 'student' ? 'Élève' : 'Professeur'}
                </span>
                {user?.role === 'student' && user?.class && (
                  <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                    {user.class}
                  </span>
                )}
                {user?.role === 'teacher' && user?.subject && (
                  <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                    {user.subject}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card className="shadow-soft">
          <CardContent className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground text-sm">
                  {item.label}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Theme Toggle */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground text-sm">Mode sombre</span>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Version 1.0.0 • EcoleConnect
        </p>
      </div>
    </AppLayout>
  );
}
