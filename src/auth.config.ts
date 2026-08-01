import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-safe auth configuration (no Prisma / bcrypt imports).
 * Used by middleware and extended by the full config in auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // Route protection
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user as { role?: string } | undefined;
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      if (path.startsWith("/admin")) {
        return isLoggedIn && user?.role === "ADMIN";
      }
      if (path.startsWith("/account")) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "USER";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
