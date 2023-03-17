import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        classValue: z.string(),
        spec: z.string(),
        role: z.string(),
        realm: z.string(),
        userId: z.string(), // Keep this line as it is
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Change this line from .query to .mutation
      const { name, classValue, spec, role, realm, userId } = input;
      const newCharacter = await ctx.prisma.character.create({
        data: {
          name,
          class: classValue,
          spec,
          role,
          realm,
          userId,
        },
      });

      return newCharacter;
    }),
});
