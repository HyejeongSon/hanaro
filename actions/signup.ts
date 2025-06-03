'use server';

import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';

import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { SignUpSchema } from '@/lib/schemas/auth';

export const signUp = async (_: unknown, formData: FormData) => {
  // 1. validate Fields
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    // console.error("회원가입 검증 실패:", validatedFields.error.flatten());
    return {
      errorMessage: '잘못된 입력값이 있습니다.',
    };
  }

  // 2. 필드 분해
  const { email, name, password, phone } = validatedFields.data;

  try {
    // 3. 존재하는 사용자 확인
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errorMessage: '이미 존재하는 사용자입니다.',
      };
    }

    // 4. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. DB 저장
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    return { errorMessage: '회원가입 중 문제가 발생했습니다.' };
  }

  // 6. 성공 시 로그인 페이지로 리디렉션
  redirect('/login');
};
