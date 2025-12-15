import { ReactNode } from 'react';
import { MobileNav } from './MobileNav';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export function AppLayout({ children, title, showHeader = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && <AppHeader title={title} />}
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
