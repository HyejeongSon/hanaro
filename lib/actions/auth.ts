'use server';

import { LoginSchema } from '../schemas/auth';
import { signIn } from '@/auth';
import { redirect } from "next/navigation";

export const signInWithCredentials = async (_: unknown, formData: FormData) => {
  // 1. validate Fields
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
      redirect: false,
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

  redirect("/");
}

export async function signInWithGitHub() {
  await signIn('github', { redirectTo: '/' });
}

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}
