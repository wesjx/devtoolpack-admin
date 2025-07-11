import { z } from "zod"

export const postSchema = z.object({
    title: z.coerce.string().min(2, {
        message: "Title must be at least 2 caracters."
    }),
    subtitle_pt: z.coerce.string().min(2, {
        message: "Subtitle must be at least 2 caracters."
    }),
    subtitle_en: z.coerce.string().min(2, {
        message: "Subtitle must be at least 2 caracters."
    }),
    category: z.enum(['tips', 'ui/ux', 'data_base', 'ai', 'tools']),
    description_pt: z.coerce.string().min(2, {
        message: "Description must be at least 2 caracters."
    }),
    description_en: z.coerce.string().min(2, {
        message: "Description must be at least 2 caracters."
    }),
    link: z.coerce.string().min(2, {
        message: "Link must be at least 2 caracters."
    }),
    img_link: z.coerce.string().min(2, {
        message: "Image link must be at least 2 caracters."
    }).optional(),
})