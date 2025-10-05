import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { CredentialsSignin } from "next-auth";
//import prisma from "./app/api/db";
import checkPass from "./app/lib/bcompare";
import { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { getUserByEmail } from "./app/DAL/repository/user-repository";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string; // Add your custom field
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Add your custom field
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 4 },
  jwt: {
    maxAge: 60 * 60 * 4,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        if (!credentials?.email || !credentials?.password) {
          throw new CredentialsSignin("email and password are required");
        }

        // Ensure `credentials.email` and `credentials.password` are strings
        const email = credentials.email as string;
        const password = credentials.password as string;

        const response = await getUserByEmail(email);
        if (response.status !== 200) {
          throw new CredentialsSignin("Invalid email or password.");
        }
        const dbuser = await response.json();

        const pwMatch = checkPass(password, dbuser.password);

        if (!pwMatch) {
          throw new CredentialsSignin("Invalid email or password.");
        }

        user = { id: dbuser.database_userId, email, name: dbuser.name };
        return user;
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | { id: string } }) {
      // If user exists (e.g., after login), add the `id` to the token
      if (user && typeof user.id === "string") {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Explicitly assign `id` if it exists and is a string
      session.user.id = typeof token.id === "string" ? token.id : "";

      return session;
    },
  },
});