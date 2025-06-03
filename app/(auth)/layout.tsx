import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full'>
      <header className='absolute border-b w-full'>
        <div className='container mx-auto px-2 py-5'>
          <Link
            href='/'
            className='text-2xl font-bold text-gray-900 hover:text-point transition-colors'
          >
            Hanaro Tech
          </Link>
        </div>
      </header>
      <div className='flex flex-1 items-center justify-center'>{children}</div>
    </div>
  );
}
