'use client';

import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/data/category';
import { Category } from '@/types/category';
import { LogIn, LogOut, Search } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const isAdmin = session?.user?.role === 'ADMIN';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <Link href='/' className='text-2xl font-bold'>
              Hanaro Tech
            </Link>

            <nav className='hidden md:flex space-x-4'>
              <div
                className='relative'
                onMouseEnter={() => setShowCategoryDropdown(true)}
                onMouseLeave={() => setShowCategoryDropdown(false)}
              >
                <button className='flex items-center space-x-1 hover:text-gray-600'>
                  <span>카테고리</span>
                  <ChevronDown className='h-4 w-4' />
                </button>

                {showCategoryDropdown && (
                  <div className='absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50'>
                    <Link
                      href='/categories'
                      className='block px-4 py-2 text-sm hover:bg-gray-100'
                    >
                      전체 글 보기
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className='block px-4 py-2 text-sm hover:bg-gray-100'
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {isAdmin && (
                <>
                  <Link
                    href='/admin/posts/create'
                    className={`hover:text-gray-600 ${pathname.startsWith('/admin/post/create') ? 'font-medium' : ''}`}
                  >
                    글쓰기
                  </Link>
                  <Link
                    href='/admin/users'
                    className={`hover:text-gray-600 ${pathname.startsWith('/admin/users') ? 'font-medium' : ''}`}
                  >
                    회원관리
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className='flex items-center space-x-4'>
            <form onSubmit={handleSearch} className='relative hidden md:block'>
              <input
                type='text'
                placeholder='검색어를 입력하세요'
                className='pl-3 pr-10 py-1 border rounded-md w-64'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type='submit'
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
              >
                <Search className='h-4 w-4 text-gray-500' />
              </button>
            </form>

            {session ? (
              <div className='flex items-center space-x-1'>
                <Link href='/mypage'>
                  <Button variant='ghost' className='hover:bg-gray-100'>
                    마이페이지
                  </Button>
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
                  <Button variant='ghost' className='hover:bg-gray-100'>
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
