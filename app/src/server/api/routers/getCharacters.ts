import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const getcharacterRouter = createTRPCRouter({
  getCharacters: publicProcedure.query(async () => {
    try {
      const characters = await prisma.character.findMany();
      return characters;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw new Error("Failed to fetch characters");
    }
  }),
});
