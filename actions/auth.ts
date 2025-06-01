'use server';

import { LoginSchema } from '../lib/schemas/auth';
import { auth, signIn, signOut, update } from '@/auth';

export const signInWithCredentials = async (_: unknown, formData: FormData) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      redirect: false, // 수동 리다이렉트
    });
  } catch (error: unknown) {
    const err = error as { type?: string };

    if (err?.type === "CredentialsSignin") {
      return {
        errorMessage: "이메일 또는 비밀번호가 일치하지 않습니다.",
      };
    }
    
    console.error("error", error);
    return {
      errorMessage: "로그인 처리 중 문제가 발생했습니다.",
    };
  }

  return { success: true };
}

export const signInWithGitHub = async () => {
  await signIn('github', { redirectTo: '/' });
}

export const signInWithGoogle = async () => {
  await signIn('google', { redirectTo: '/' });
}

export const signOutWithForm = async () => {
  await signOut()
}

export {
  auth as getSession, 
  update as updateSession
}