'use client';

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
    <header className='border-b bg-white'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <Link
              href='/'
              className='text-2xl font-bold text-gray-900 hover:text-point transition-colors'
            >
              Hanaro Tech
            </Link>

            <nav className='hidden md:flex items-center space-x-1'>
              <Link
                href='/categories'
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/categories')
                    ? 'text-point font-medium'
                    : 'text-gray-700 hover:text-point'
                }`}
              >
                카테고리
              </Link>

              {isAdmin && (
                <>
                  <Link
                    href='/admin/post/create'
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname.startsWith('/admin/post/create')
                        ? 'text-point font-medium'
                        : 'text-gray-700 hover:text-point'
                    }`}
                  >
                    글쓰기
                  </Link>
                  <Link
                    href='/admin/users'
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname.startsWith('/admin/users')
                        ? 'text-point font-medium'
                        : 'text-gray-700 hover:text-point'
                    }`}
                  >
                    회원관리
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className='flex items-center space-x-1'>
            {session ? (
              <>
                <Link
                  href='/mypage'
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname === '/mypage'
                      ? 'text-point font-medium'
                      : 'text-gray-700 hover:text-point'
                  }`}
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleSignOut}
                  className='flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:text-point transition-colors cursor-pointer'
                >
                  <LogOut className='h-4 w-4' />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href='/signup'
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname === '/signup'
                      ? 'text-point font-medium'
                      : 'text-gray-700 hover:text-point'
                  }`}
                >
                  회원가입
                </Link>
                <Link
                  href='/login'
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    pathname === '/login'
                      ? 'text-point font-medium'
                      : 'text-gray-700 hover:text-point'
                  }`}
                >
                  <LogIn className='h-4 w-4' />
                  <span>로그인</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
