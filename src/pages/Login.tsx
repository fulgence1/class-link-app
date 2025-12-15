import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue sur votre espace scolaire !',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Erreur de connexion',
        description: result.error,
        variant: 'destructive',
      });
    }
    
    setIsSubmitting(false);
  };

  const fillDemoCredentials = (role: 'student' | 'teacher') => {
    if (role === 'student') {
      setEmail('jean.dupont@ecole.fr');
      setPassword('eleve123');
    } else {
      setEmail('marie.martin@ecole.fr');
      setPassword('prof123');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top safe-area-bottom">
      {/* Header with gradient */}
      <div className="gradient-primary pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-foreground/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-primary-foreground/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-primary-foreground/10 rounded-full" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">
            EcoleConnect
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            Votre espace scolaire numérique
          </p>
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 px-4 -mt-12">
        <Card className="shadow-medium animate-slide-up">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous à votre compte
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="student" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" onClick={() => fillDemoCredentials('student')} className="gap-2">
                  <User className="w-4 h-4" />
                  Élève
                </TabsTrigger>
                <TabsTrigger value="teacher" onClick={() => fillDemoCredentials('teacher')} className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Professeur
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="mt-4">
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Démo: jean.dupont@ecole.fr / eleve123
                </p>
              </TabsContent>
              <TabsContent value="teacher" className="mt-4">
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Démo: marie.martin@ecole.fr / prof123
                </p>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@ecole.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary text-primary-foreground font-semibold h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Connexion...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Mot de passe oublié ?{' '}
              <button className="text-primary hover:underline font-medium">
                Réinitialiser
              </button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 EcoleConnect - Tous droits réservés
        </p>
      </div>
    </div>
  );
}
