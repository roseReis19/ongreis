import prisma from "../../db/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userFound = await await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            company: true,
          },
        });

        if (!userFound) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Invalid credentials");

        console.log("userFound", userFound);

        const response = {
          id: userFound.id,
          name: userFound.name,
          company: userFound.company.name
        };

        return response;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      console.log("session",session)
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
