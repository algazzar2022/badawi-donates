import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      isSuper?: boolean;
    } & DefaultSession["user"]
  }
  interface User {
    isSuper?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isMatch) return null;

        return { id: user.id, email: user.email, isSuper: user.isSuper };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.isSuper = user.isSuper;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.isSuper = token.isSuper as boolean;
        session.user.id = token.sub as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
