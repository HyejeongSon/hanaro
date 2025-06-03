import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* 상단 헤더 스타일 동일하게 */}
      <header className='absolute border-b w-full'>
        <div className='container mx-auto px-2 py-5'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-2xl font-bold text-gray-900 hover:text-point transition-colors'
            >
              Hanaro Tech
            </Link>
          </div>
        </div>
      </header>

      {/* 로그인 콘텐츠 영역 */}
      <main className='flex flex-1 items-center justify-center px-4'>
        <div className='w-full max-w-md'>{children}</div>
      </main>
    </div>
  );
}
