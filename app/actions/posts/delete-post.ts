"use server";
import { db } from "@/db/indext";
import { postsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function deletePost(postId: number) {
  const { userId } = await auth();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  await db.delete(postsTable).where(
    and(
      eq(postsTable.id, postId),
      eq(postsTable.userId, userId)
    )
  );

  return { success: true, message: "Post deletado com sucesso!" };
}