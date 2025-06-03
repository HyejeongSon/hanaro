import type { ReactionType } from '@/app/generated/prisma';

import { prisma } from '@/lib/prisma';

export const getReactionByUserAndPost = async (
  userId: string,
  boardId: number
) => {
  return await prisma.boardReaction.findUnique({
    where: {
      userId_boardId: {
        userId,
        boardId,
      },
    },
  });
};

export const createReaction = async (data: {
  userId: string;
  boardId: number;
  type: ReactionType;
}) => {
  return await prisma.boardReaction.create({
    data,
  });
};

export const updateReaction = async (
  userId: string,
  boardId: number,
  type: ReactionType
) => {
  return await prisma.boardReaction.update({
    where: {
      userId_boardId: {
        userId,
        boardId,
      },
    },
    data: { type },
  });
};

export const deleteReaction = async (userId: string, boardId: number) => {
  return await prisma.boardReaction.delete({
    where: {
      userId_boardId: {
        userId,
        boardId,
      },
    },
  });
};

export const getReactionCountsByPostId = async (boardId: number) => {
  const likes = await prisma.boardReaction.count({
    where: {
      boardId,
      type: 'LIKE',
    },
  });

  const dislikes = await prisma.boardReaction.count({
    where: {
      boardId,
      type: 'DISLIKE',
    },
  });

  return { likes, dislikes };
};
