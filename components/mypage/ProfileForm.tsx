'use client';

import { updateProfile } from '@/actions/profile';
import { User } from '@/app/generated/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useEffect, useState } from 'react';

const ProfileSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^010-\d{4}-\d{4}$/.test(val), {
      message: '전화번호는 010-XXXX-XXXX 형식이어야 합니다.',
    }),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

export function ProfileForm({ user }: { user: User }) {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || '',
      phone: user.phone || '',
    },
  });

  // 세션이 업데이트되면 폼 값도 업데이트
  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '');
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const result = await updateProfile({
        name: data.name,
        phone: data.phone,
      });

      if (result.success) {
        // 클라이언트 세션도 업데이트
        await update({
          user: {
            ...session?.user,
            name: data.name,
          },
        });

        toast.success('프로필이 업데이트되었습니다.');
      } else {
        toast.error(result.message || '프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error('프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* 프로필 이미지 및 이메일 (읽기 전용) */}
      <div className='flex items-center space-x-6 p-4 bg-gray-50 rounded-lg'>
        <div className='relative'>
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt='프로필 이미지'
              className='w-20 h-20 rounded-full object-cover border-2 border-gray-200'
            />
          ) : (
            <div className='w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-200'>
              <UserIcon className='w-8 h-8 text-gray-500' />
            </div>
          )}
        </div>

        <div className='flex-1'>
          <div className='space-y-2'>
            <div>
              <Label className='text-sm font-medium text-gray-700'>
                이메일
              </Label>
              <p className='text-gray-900 font-medium'>{user.email}</p>
            </div>

            <div>
              <Label className='text-sm font-medium text-gray-700'>
                가입 방법
              </Label>
              <p className='text-gray-600 text-sm'>
                {user.password ? '일반 로그인' : '소셜 로그인'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 가능한 필드들 */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>이름</Label>
          <Input id='name' {...register('name')} />
          {errors.name && (
            <p className='text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>전화번호</Label>
          <Input
            id='phone'
            {...register('phone')}
            placeholder='010-XXXX-XXXX'
          />
          {errors.phone && (
            <p className='text-sm text-red-500'>{errors.phone.message}</p>
          )}
        </div>

        <Button type='submit' disabled={isLoading} className='w-full'>
          {isLoading ? '저장 중...' : '프로필 저장'}
        </Button>
      </form>
    </div>
  );
}
