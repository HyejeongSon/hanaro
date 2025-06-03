'use server';

import { prisma } from '@/lib/prisma';

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });
};

export const getCategoriesWithPostCount = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          boards: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
};

export const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};
