import type { Post } from '@/types/post';

import { prisma } from '@/lib/prisma';

export const getLatestPosts = async (limit = 10): Promise<Post[]> => {
  return await prisma.board.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      reactions: {
        select: {
          type: true,
        },
      },
    },
  });
};

export const getPostsByCategory = async (
  categoryId: number
): Promise<Post[]> => {
  return await prisma.board.findMany({
    where: {
      categoryId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      reactions: {
        select: {
          type: true,
        },
      },
    },
  });
};

export const searchPostsInCategory = async (
  categoryId: number,
  query: string
): Promise<Post[]> => {
  return await prisma.board.findMany({
    where: {
      categoryId,
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      reactions: {
        select: {
          type: true,
        },
      },
    },
  });
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  return await prisma.board.findMany({
    where: {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      reactions: {
        select: {
          type: true,
        },
      },
    },
  });
};

export const getPostById = async (id: number) => {
  return await prisma.board.findUnique({
    where: { id },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      reactions: true,
      Image: true,
    },
  });
};

export const createPost = async (data: {
  title: string;
  content: string;
  userId: string;
  categoryId: number;
}) => {
  return await prisma.board.create({
    data,
  });
};

export const updatePost = async (
  id: number,
  data: {
    title?: string;
    content?: string;
    categoryId?: number;
  }
) => {
  return await prisma.board.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: number) => {
  return await prisma.board.delete({
    where: { id },
  });
};
