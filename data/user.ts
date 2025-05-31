import { prisma } from "@/lib/prisma";

/** 이메일로 사용자 조회 */
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

/** ID로 사용자 조회 */
// export const getUserById = async (id: string) => {
//   return await prisma.user.findUnique({ where: { id } });
// };