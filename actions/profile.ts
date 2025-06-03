'use server';

import { auth, update as updateSession } from '@/auth';
import { deleteUser, getUserById, updateUser } from '@/data/user';

import { revalidatePath } from 'next/cache';

export const updateProfile = async (data: { name: string; phone?: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  try {
    const user = await getUserById(session.user.id);

    if (!user) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    // 데이터베이스 업데이트 (이메일 제외)
    const updatedUser = await updateUser(session.user.id, {
      name: data.name,
      phone: !data.phone ? null : data.phone,
    });

    // 세션 업데이트 (이름만)
    await updateSession({
      user: {
        ...session.user,
        name: updatedUser.name,
      },
    });

    revalidatePath('/mypage');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      message: '프로필 업데이트 중 오류가 발생했습니다.',
    };
  }
};

export const deleteAccount = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  try {
    await deleteUser(session.user.id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, message: '계정 삭제 중 오류가 발생했습니다.' };
  }
};
