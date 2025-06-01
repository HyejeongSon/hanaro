import type React from 'react';

import { Header } from './Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
      <footer className='bg-gray-100 py-6'>
        <div className='container mx-auto px-4 text-center text-gray-600'>
          <p>
            © {new Date().getFullYear()} Hanaro Tech Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
