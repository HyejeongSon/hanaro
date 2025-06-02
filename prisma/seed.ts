import { PrismaClient, Role } from "@/app/generated/prisma";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 카테고리 생성
  const categories = [
    "JavaScript",
    "TypeScript",
    "React",
    "etc",
  ]

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    })
  }

  // 관리자 계정 생성
  const hashedPassword = await bcrypt.hash("admin123!", 10)

  await prisma.user.upsert({
    where: { email: "admin@hanaro.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@hanaro.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
