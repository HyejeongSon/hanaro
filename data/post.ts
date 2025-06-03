import { Prisma } from '@/app/generated/prisma';
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

export const getLatestPostsByCategory = async (
  limit = 3
): Promise<{ [categoryName: string]: Post[] }> => {
  // 모든 카테고리 가져오기
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });

  const result: { [categoryName: string]: Post[] } = {};

  // 각 카테고리별로 최신 게시글 가져오기
  for (const category of categories) {
    const posts = await prisma.board.findMany({
      where: {
        categoryId: category.id,
      },
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

    result[category.name] = posts;
  }

  return result;
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

/*
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
*/

export const searchPostsInCategory = async (
  categoryId: number,
  query: string
): Promise<Post[]> => {
  // FULLTEXT 검색을 위한 raw query 사용
  const rawQuery = Prisma.sql`
    SELECT 
      b.id, b.title, b.content, b.user_id, b.category_id, 
      b.created_at, b.updated_at,
      MATCH(b.title, b.content) AGAINST(${query} IN NATURAL LANGUAGE MODE) as relevance
    FROM Board b
    WHERE b.category_id = ${categoryId}
      AND MATCH(b.title, b.content) AGAINST(${query} IN NATURAL LANGUAGE MODE)
    ORDER BY relevance DESC
  `;

  const searchResults = await prisma.$queryRaw<{ id: number }[]>(rawQuery);

  // 검색 결과가 없으면 빈 배열 반환
  if (!searchResults.length) return [];

  // 검색된 ID로 게시글 정보 가져오기
  const postIds = searchResults.map((result) => result.id);

  const posts = await prisma.board.findMany({
    where: {
      id: { in: postIds },
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

  // 검색 결과 순서대로 정렬 (관련성 순서 유지)
  const orderedPosts = postIds
    .map((id) => posts.find((post) => post.id === id))
    .filter(Boolean) as Post[];

  return orderedPosts;
};

/*
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
*/

export const searchPosts = async (query: string): Promise<Post[]> => {
  // FULLTEXT 검색을 위한 raw query 사용
  const rawQuery = Prisma.sql`
    SELECT 
      b.id, b.title, b.content, b.user_id, b.category_id, 
      b.created_at, b.updated_at,
      MATCH(b.title, b.content) AGAINST(${query} IN NATURAL LANGUAGE MODE) as relevance
    FROM Board b
    WHERE MATCH(b.title, b.content) AGAINST(${query} IN NATURAL LANGUAGE MODE)
    ORDER BY relevance DESC
  `;

  const searchResults = await prisma.$queryRaw<{ id: number }[]>(rawQuery);

  // 검색 결과가 없으면 빈 배열 반환
  if (!searchResults.length) return [];

  // 검색된 ID로 게시글 정보 가져오기
  const postIds = searchResults.map((result) => result.id);

  const posts = await prisma.board.findMany({
    where: {
      id: { in: postIds },
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

  // 검색 결과 순서대로 정렬 (관련성 순서 유지)
  const orderedPosts = postIds
    .map((id) => posts.find((post) => post.id === id))
    .filter(Boolean) as Post[];

  return orderedPosts;
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
