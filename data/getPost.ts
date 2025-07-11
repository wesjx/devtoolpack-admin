import "server-only"
import { db } from "@/db/indext"
import { postsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"

export async function getPost(postId: number) {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const [post] = await db.select().from(postsTable).where(and(
        eq(postsTable.id, postId),
        eq(postsTable.userId, userId)
    ));
    
    return post
}