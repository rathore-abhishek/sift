import { db } from "../db";
import { notebook } from "../db/schema";
import { authMiddleware } from "../middlewares/auth";
import { base } from "@/server/procedures/base";
import z from "zod";

export const createNotebook = base
  .use(authMiddleware)
  .input(
    z.object({
      title: z.string(),
      authorName: z.string(),
      pdfUrl: z.string(),
      coverImageUrl: z.string().optional(),
      assistantVoice: z.string(),
    })
  )
  .handler(
    async ({
      input: { authorName, pdfUrl, title, coverImageUrl, assistantVoice },
      context: { user },
    }) => {
      const [newNotebook] = await db
        .insert(notebook)
        .values({
          authorName,
          title,
          pdfUrl,
          coverImageUrl,
          assistantVoice,
          userId: user.id,
        })
        .returning();

      return newNotebook;
    }
  );
