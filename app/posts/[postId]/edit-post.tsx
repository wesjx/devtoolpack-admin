"use client"

import { postSchema } from "@/validation/form-schema"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { updatePost } from "@/app/actions/posts/update-post"
import { toast } from "sonner"
import PostFormComponent from "@/components/create-post"

export function EditPostForm({ post }: {
    post: {
        id: number,
        title: string,
        subtitle_pt: string,
        subtitle_en: string,
        category: 'tips' | 'ui/ux' | 'data_base' | 'ai' | 'tools',
        description_pt: string,
        description_en: string,
        link: string,
        img_link: string,
    }
}) {

    const router = useRouter()

    const handleSubmit = async (data: z.infer<typeof postSchema>) => {
        const result = await updatePost({
            id: post.id,
            title: data.title,
            subtitle_pt: data.subtitle_pt,
            subtitle_en: data.subtitle_en,
            category: data.category,
            description_pt: data.description_pt,
            description_en: data.description_en,
            link: data.link,
            img_link: data.img_link ?? '',
        })
        if (result?.error) {
            toast.error("Error.", {
                description: result.message,
            })
        } else {
            toast.success("Sucess!", {
                description: "Post updated"
            })
        }
        router.push('/posts')
    }

    return (
        <>
            <PostFormComponent defaultValues={
                {
                    title: post.title,
                    subtitle_pt: post.subtitle_pt,
                    subtitle_en: post.subtitle_en,
                    category: post.category,
                    description_pt: post.description_pt,
                    description_en: post.description_en,
                    link: post.link,
                    img_link: post.img_link ?? "",
                }
            }
                onSubmit={(data) => handleSubmit({ ...data, img_link: data.img_link ?? "" })}
            />
        </>
    )
}