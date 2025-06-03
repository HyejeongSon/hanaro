'use server';

import type { ReactionType } from '@/app/generated/prisma';
import { auth } from '@/auth';
import {
  createReaction,
  deleteReaction,
  getReactionByUserAndPost as getReactionByUserAndPostData,
  getReactionCountsByPostId as getReactionCountsByPostIdData,
  updateReaction,
} from '@/data/reaction';

export const getReactionCountsByPostId = async (postId: number) => {
  return await getReactionCountsByPostIdData(postId);
};

export const getReactionByUserAndPost = async (
  userId: string,
  postId: number
) => {
  return await getReactionByUserAndPostData(userId, postId);
};

type Counts = { likes: number; dislikes: number };
type NullableReactionType = ReactionType | null;

interface ReactionResultSuccess {
  success: true;
  counts: Counts;
  userReaction: NullableReactionType;
}

interface ReactionResultFail {
  success: false;
  message: string;
}

type ReactionResult = ReactionResultSuccess | ReactionResultFail;

export const toggleReaction = async (
  postId: number,
  type: ReactionType
): Promise<ReactionResult> => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  const userId = session.user.id;

  try {
    // 기존 반응 확인
    const existingReaction = await getReactionByUserAndPostData(userId, postId);

    if (!existingReaction) {
      // 새 반응 생성
      await createReaction({ userId, boardId: postId, type });
    } else if (existingReaction.type === type) {
      // 같은 반응이면 삭제 (취소)
      await deleteReaction(userId, postId);
    } else {
      // 다른 반응이면 업데이트
      await updateReaction(userId, postId, type);
    }

    // 업데이트된 카운트 가져오기
    const counts = await getReactionCountsByPostIdData(postId);

    // 사용자의 현재 반응 상태 확인
    const updatedReaction = await getReactionByUserAndPostData(userId, postId);

    return {
      success: true,
      counts,
      userReaction: updatedReaction?.type || null,
    };
  } catch (error) {
    console.error('Error toggling reaction:', error);
    return { success: false, message: '반응 처리 중 오류가 발생했습니다.' };
  }
};
