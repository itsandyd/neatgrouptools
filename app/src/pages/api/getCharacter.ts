import { createTRPCRouter } from "@trpc/server";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  getCharacters: t.query(() => {
    // Add your logic for getting characters here
    // For example, fetch the characters from a database

    return [
      {
        id: 1,
        name: "Character 1",
      },
      {
        id: 2,
        name: "Character 2",
      },
    ];
  }),
});

export default appRouter;
