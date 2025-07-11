"use client"

import { useRouter } from "next/navigation"
import { createPost } from "./actions"
import { z } from "zod"
import PostFormComponent, { postFormSchema, } from "@/components/create-post"
import { toast } from "sonner"

export default function NewPostForm() {
    const router = useRouter()
    const handleSubmit = async (data: z.infer<typeof postFormSchema>) => {
        const result = await createPost({
            title: data.title,
            subtitle_pt: data.subtitle_pt,
            subtitle_en: data.subtitle_en,
            description_pt: data.description_pt,
            description_en: data.description_en,
            category: data.category,
            link: data.link,
            img_link: data.img_link ?? '',
        })

        if (result.error) {
            toast.error("Error.", {
                description: result.message,
            })
        } else {
            toast.success("Sucess!", {
                description: "Post created"
            })
        }

        router.push('/posts')

        console.log({result})
        console.log(result)

    }

    return (
        <>
        <PostFormComponent onSubmit={handleSubmit}/>
        </>
    )
}