import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { UserRole } from "@prisma/client";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.createdAt && session.user) {
        session.user.createdAt = token.createdAt as Date;
      }
      if (token.updatedAt && session.user) {
        session.user.updatedAt = token.updatedAt as Date;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      if (isOnDashboard) {
        if (isLoggedIn && auth.user.role === "ADMIN") return true;
        return false;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
