import { auth } from '@/auth';
import MainLayout from '@/components/layout/MainLayout';

import { redirect } from 'next/navigation';

import type React from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return <MainLayout>{children}</MainLayout>;
}
