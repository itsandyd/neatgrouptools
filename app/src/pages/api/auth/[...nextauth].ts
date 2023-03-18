// src/pages/api/auth/[...nextauth].js
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, user) {
      // Create a new user in the database when they log in with Discord for the first time
      if (user.provider === "discord" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              // Set any additional fields you want to store for the user
            },
          });
        }
      }

      return session;
    },
  },
});
