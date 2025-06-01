'use client';

import {
  signInWithCredentials,
  signInWithGitHub,
  signInWithGoogle,
} from '@/actions/auth';
import { useFormValidate } from '@/hooks/useFormValidate';
import { TLoginFormError } from '@/types/form';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { ChangeEvent, useActionState, useEffect } from 'react';

import { LoginSchema } from '@/lib/schemas/auth';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormCard } from './FormCard';
import { FormMessage } from './FormMessage';
import { Submit } from './Submit';

export function LoginForm() {
  const [result, action] = useActionState(signInWithCredentials, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (result?.errorMessage) {
      toast.error(result.errorMessage);
    }
    if (result?.success) {
      window.location.href = '/';
    }
  }, [result]);

  return (
    <div className='space-y-3'>
      <FormCard
        title='로그인'
        footer={{ label: '아직 계정이 없으신가요?', href: '/signup' }}
      >
        <form action={action} className='space-y-6'>
          {/* 이메일 */}
          <div className='space-y-2'>
            <Label htmlFor='email'>이메일</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='hanaro@email.com'
              onChange={handleChange}
            />
            {errors?.email && <FormMessage message={errors?.email[0]} />}
          </div>

          {/* 비밀번호 */}
          <div className='space-y-2'>
            <Label htmlFor='password'>비밀번호</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              onChange={handleChange}
            />
            {errors?.password && <FormMessage message={errors?.password[0]} />}
          </div>

          <Submit className='w-full'>로그인</Submit>
        </form>
      </FormCard>
      <div className='flex flex-col w-[35rem] items-center justify-center'>
        <div className='w-[90%] px-6 space-y-3'>
          <hr className='mb-5 border-t border-gray-200' />
          <form action={signInWithGitHub}>
            <button
              type='submit'
              className='w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition'
            >
              <FaGithub className='w-5 h-5' />
              Sign in with GitHub
            </button>
          </form>
          <form action={signInWithGoogle}>
            <button
              type='submit'
              className='w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition'
            >
              <FcGoogle className='w-5 h-5' />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
