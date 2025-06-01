'use client';

import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = session?.user?.role === 'ADMIN';

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <Link href='/' className='text-2xl font-bold'>
              Hanaro Tech
            </Link>

            <nav className='hidden md:flex space-x-4 mt-1'>
              <Link
                href='/categories'
                className={`hover:text-gray-600 ${pathname.startsWith('/categories') ? 'font-semibold' : ''}`}
              >
                카테고리
              </Link>

              {isAdmin && (
                <>
                  <Link
                    href='/admin/post/create'
                    className={`hover:text-gray-600 ${pathname.startsWith('/admin/post/create') ? 'font-semibold' : ''}`}
                  >
                    글쓰기
                  </Link>
                  <Link
                    href='/admin/users'
                    className={`hover:text-gray-600 ${pathname.startsWith('/admin/users') ? 'font-semibold' : ''}`}
                  >
                    회원관리
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className='flex items-center space-x-4 mt-1'>
            {session ? (
              <div className='flex items-center space-x-1'>
                <Link href='/mypage'>
                  <Button variant='ghost'>마이페이지</Button>
                </Link>
                <Button variant='ghost' onClick={handleSignOut}>
                  <LogOut className='h-4 w-4' />
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className='flex items-center space-x-1'>
                <Link href='/signup'>
                  <Button variant='ghost'>회원가입</Button>
                </Link>
                <Link href='/login'>
                  <Button variant='ghost'>
                    <LogIn className='h-4 w-4' />
                    로그인
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
