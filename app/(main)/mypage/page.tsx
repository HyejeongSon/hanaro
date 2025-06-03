import { auth } from '@/auth';
import { DeleteAccountButton } from '@/components/mypage/DeleteAccountButton';
import { ProfileForm } from '@/components/mypage/ProfileForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserById } from '@/data/user';

import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>MyPage</h1>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user} />
        </CardContent>
      </Card>

      {/* 계정 정보 */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>계정 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='font-medium text-gray-700'>
                가입일: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>권한: </span>
              <span
                className={`text-gray-600 px-2 py-1 rounded-full text-xs ${
                  user.role === 'ADMIN'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 위험 구역 */}
      <Card className='border-red-200 bg-[#fef2f221] gap-4'>
        <CardHeader>
          <CardTitle className='text-red-600'>위험 구역</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4 text-gray-700'>
            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수
            없습니다.
          </p>
          <DeleteAccountButton />
        </CardContent>
      </Card>
    </div>
  );
}
