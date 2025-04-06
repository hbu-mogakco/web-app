'use client';

import { ReactNode } from 'react';
import GNB from '@/features/GNB';
import { cn } from '@/shared/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <main className={cn('flex flex-1 h-[calc(100vh-64px)]', className)}>
        {children}
      </main>
    </div>
  );
}