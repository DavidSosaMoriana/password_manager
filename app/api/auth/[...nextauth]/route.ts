import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "@/lib/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Error con las credenciales");
        }
        
        try {
          const user = await db?.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          
          if (!user || !user?.hashedPassword) {
            throw new Error("Credenciales invalidas");
          }

          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword
          );
          
          if (!isCorrectPassword) {
            throw new Error("Contraseña incorrecta");
          }
          
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(`Authentication failed: ${error.message}`);
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
