import type { Session } from 'next-auth';

import Link from 'next/link';

type WelcomeSectionProps = {
  session: Session | null;
};

export function WelcomeSection({ session }: WelcomeSectionProps) {
  return (
    <div className='text-center py-12 bg-gradient-to-r from-[#F8FAFC] to-[#b8c4f02d] rounded-lg'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        Hanaro Tech Blog에 오신 것을 환영합니다
      </h1>
      <p className='text-xl text-gray-600 mb-6'>
        최신 기술 트렌드와 개발 인사이트를 함께 나누는 공간이에요 💡
      </p>
      {session?.user ? (
        <p className='text-lg text-point'>
          안녕하세요, <span className='font-semibold'>{session.user.name}</span>
          님!
        </p>
      ) : (
        <div className='space-x-4'>
          <Link
            href='/login'
            className='inline-block bg-[#4438cae7] text-white px-5 py-2.5 rounded-lg hover:bg-[#3730a3] transition-colors'
          >
            로그인하기
          </Link>
          <Link
            href='/signup'
            className='inline-block bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors'
          >
            회원가입하기
          </Link>
        </div>
      )}
    </div>
  );
}
