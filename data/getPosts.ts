import { db } from "@/db/indext"
import { postsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"

export async function getPosts() {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const posts = await db.select({
        id: postsTable.id,
        title: postsTable.title,
        subtitle_pt: postsTable.subtitle_pt,
        subtitle_en: postsTable.subtitle_en,
        description_pt: postsTable.description_pt,
        description_en: postsTable.description_en,
        category: postsTable.category,
        link: postsTable.link,
        img_link: postsTable.img_link,

    }).from(postsTable).where(and(
        eq(postsTable.userId, userId)
    ))

    return posts
}