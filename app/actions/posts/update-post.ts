"use server";
import { db } from "@/db/indext";
import { postsTable } from "@/db/schema";
import { postSchema } from "@/validation/form-schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const updatePostSchema = postSchema.and(z.object({
  id: z.number()
}));

export async function updatePost(data: {
  id: number,
  title: string,
  subtitle_pt: string,
  subtitle_en: string,
  category: 'tips' | 'ui/ux' | 'data_base' | 'ai' | 'tools',
  description_pt: string,
  description_en: string,
  link: string,
  img_link: string,
}) {
  const { userId } = await auth();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const validation = updatePostSchema.safeParse(data);
  if (!validation.success) {
    return { error: true, message: validation.error.issues[0].message };
  }

  await db.update(postsTable).set({
    title: data.title,
    subtitle_pt: data.subtitle_pt,
    subtitle_en: data.subtitle_en,
    category: data.category,
    description_en: data.description_en,
    description_pt: data.description_pt,
    link: data.link,
    img_link: data.img_link
  }).where(
    and(
      eq(postsTable.id, data.id),
      eq(postsTable.userId, userId)
    )
  );

  return { success: true, message: "Post atualizado com sucesso!" };
}