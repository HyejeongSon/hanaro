import type { Session } from 'next-auth';

import Link from 'next/link';

type WelcomeSectionProps = {
  session: Session | null;
};

export function WelcomeSection({ session }: WelcomeSectionProps) {
  return (
    <div className='py-5 rounded-lg'>
      <h1 className='text-6xl font-bold text-gray-800 mb-8 drop-shadow-md tracking-tight'>
        Hanaro Tech Blog
      </h1>
      <div className='text-gray-700 text-lg leading-relaxed space-y-2 mb-5'>
        <p>웹 기술과 실무 경험, 그리고 개발 노하우를 담아내는 곳입니다.</p>
        <p>JavaScript, TypeScript, React과 Next.js, AWS를 주제로,</p>
        <p>
          회원 분들의 선호에 맞춰 꾸준히 <strong>경험</strong>과{' '}
          <strong>지식</strong>을 공유하고자 합니다.
        </p>
      </div>
      {session?.user ? (
        <p className='text-lg text-point'>
          안녕하세요, <span className='font-semibold'>{session.user.name}</span>
          님!
        </p>
      ) : (
        <div className='space-x-4'>
          <Link
            href='/categories'
            className='inline-block bg-white border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors'
          >
            블로그 살펴보기 →
          </Link>
          <Link
            href='/login'
            className='inline-block bg-point text-point px-5 py-2.5 rounded-lg hover:bg-point-hover transition-colors'
          >
            지금 시작하기 →
          </Link>
        </div>
      )}
    </div>
  );
}
