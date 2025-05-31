'use server';

import { signIn } from '@/auth';

export async function signInWithCredentials(formData: FormData) {
  await signIn('credentials', formData);
}

export async function signInWithGitHub() {
  await signIn('github');
}

export async function signInWithGoogle() {
  await signIn('google');
}
