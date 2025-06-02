import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** 이메일로 사용자 조회 */
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

/** ID로 사용자 조회 */
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } })
}

/** 모든 사용자 조회 (관리자용) */
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          boards: true,
          boardReaction: true,
        },
      },
    },
  })
}

/** 사용자 검색 (관리자용) */
export const searchUsers = async (query: string) => {
  return await prisma.user.findMany({
    where: {
      OR: [{ name: { contains: query } }, { email: { contains: query } }],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          boards: true,
          boardReaction: true,
        },
      },
    },
  })
}

/** 로그인한 사용자를 제외한 전체 사용자 조회 */
export const getAllUsersWithoutSelf = async () => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  return await prisma.user.findMany({
    where: currentUserId ? { id: { not: currentUserId } } : {},
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          boards: true,
          boardReaction: true,
        },
      },
    },
  });
};

/** 로그인한 사용자를 제외한 사용자 검색 */
export const searchUsersWithoutSelf = async (query: string) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  return await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query } },
            { email: { contains: query } },
          ],
        },
        currentUserId ? { id: { not: currentUserId } } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          boards: true,
          boardReaction: true,
        },
      },
    },
  });
};

/** 사용자 정보 업데이트 */
export const updateUser = async (
  id: string,
  data: {
    name?: string
    phone?: string | null;
    image?: string
  },
) => {
  return await prisma.user.update({
    where: { id },
    data,
  })
}

/** 사용자 삭제 */
export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  })
}