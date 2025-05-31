import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
// import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [ 
    Google,
    GitHub,
    ],
    // pages: {

    // }
    secret: process.env.AUTH_SECRET as string, // jwt 생성시 쓰는 암호
})