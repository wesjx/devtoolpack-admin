"use server"

import {postSchema}  from "@/validation/form-schema"
import { db } from "@/db/indext";
import { postsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server"

export const createPost = async (data: {
    title: string,
    subtitle_pt: string,
    subtitle_en: string,
    description_pt: string,
    description_en: string,
    category: 'tips' | 'ui/ux' | 'data_base' | 'ai' | 'tools',
    link: string,
    img_link: string
}) => {
    const { userId } = await auth();

    if (!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = postSchema.safeParse(data);

    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }

    const [ post ] = await db.insert(postsTable).values({
        userId,
        title: data.title,
        subtitle_pt: data.subtitle_pt,
        subtitle_en: data.subtitle_en,
        description_pt: data.description_pt,
        description_en: data.description_en,
        category: data.category,
        link: data.link,
        img_link: data.img_link,
    }).returning()

    return{
        id: post.id
    }
}