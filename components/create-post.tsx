"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import DropzoneComponent from "./dropzone"
import DeleteImageButton from "@/components/delete-image-button"
import { MdOutlineGTranslate } from "react-icons/md"
import { useState } from "react"
import { BsStars } from "react-icons/bs"
import { Loader2 } from "lucide-react"
import { handleTranslate } from "@/lib/ai-translate-handler"
import { handleGenerateDescription } from "@/lib/ai-generate-handler"

export const postFormSchema = z.object({
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
    }).max(4000, { message: 'Description must be less than 4000 caracters' }),
    description_en: z.coerce.string().min(2, {
        message: "Description must be at least 2 caracters."
    }).max(4000, { message: 'Description must be less than 4000 caracters' }),
    link: z.coerce.string().min(2, {
        message: "Link must be at least 2 caracters."
    }),
    img_link: z.coerce.string().optional(),
})

export type FormFields = z.infer<typeof postFormSchema>

export type Props = {
    onSubmit: (data: z.infer<typeof postFormSchema>) => Promise<void>
    defaultValues?: {
        title: string,
        subtitle_pt: string,
        subtitle_en: string,
        category: 'tips' | 'ui/ux' | 'data_base' | 'ai' | 'tools',
        description_pt: string,
        description_en: string,
        link: string,
        img_link?: string,
    }
}

export default function PostFormComponent({ onSubmit, defaultValues }: Props) {
    const form = useForm<z.infer<typeof postFormSchema>>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: '',
            subtitle_pt: '',
            subtitle_en: '',
            category: 'tips',
            description_pt: '',
            description_en: '',
            link: '',
            img_link: '',
            ...defaultValues
        }
    })

    const [isTranslateLoading, setIsTranslateLoading] = useState(false)
    const [isDescriptionGenerateLoading, setisDescriptionGenerateLoading] = useState(false)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Tool title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Tool title"
                                    {...field}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Subtitle PT */}
                <FormField
                    control={form.control}
                    name="subtitle_pt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Tool subtitle in Portuguese</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Legenda da ferramenta em português"
                                    {...field}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Subtitle EN */}
                <FormField
                    control={form.control}
                    name="subtitle_en"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Tool subtitle in English</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Tool subtitle in english"
                                    {...field}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Category */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tips">Tips</SelectItem>
                                        <SelectItem value="ui/ux">UI/UX</SelectItem>
                                        <SelectItem value="data_base">Database</SelectItem>
                                        <SelectItem value="ai">AI</SelectItem>
                                        <SelectItem value="tools">Tools</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Description PT (textarea) */}
                <FormField
                    control={form.control}
                    name="description_pt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Description in Portuguese</FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    placeholder="Descrição em português"
                                    rows={4}
                                    onInput={(e) => {
                                        e.currentTarget.style.height = 'auto'
                                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[100px]"
                                />
                            </FormControl>
                            <div className="flex gap-2">
                                <Button
                                    className="cursor-pointer"
                                    asChild variant={"outline"}
                                    onClick={() => handleTranslate(form, setIsTranslateLoading)}
                                    disabled={isTranslateLoading}
                                >
                                    <span>
                                        Translate
                                        <MdOutlineGTranslate />
                                        {isTranslateLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                                    </span>
                                </Button>
                                <Button
                                    className="cursor-pointer"
                                    asChild variant={"outline"}
                                    onClick={() => handleGenerateDescription(form, setisDescriptionGenerateLoading)}
                                    disabled={isDescriptionGenerateLoading}
                                >
                                    <span>
                                        Generate by AI
                                        <BsStars />
                                        {isDescriptionGenerateLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                                    </span>
                                </Button>

                            </div>

                        </FormItem>
                    )}
                />

                {/* Description EN (textarea) */}
                <FormField
                    control={form.control}
                    name="description_en"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Description in English</FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    placeholder="Description in English"
                                    rows={4}
                                    onInput={(e) => {
                                        e.currentTarget.style.height = 'auto'
                                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[100px]"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Tool Link */}
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Tool Link</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://tool.dev"
                                    {...field}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="img_link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Image URL" />
                            </FormControl>
                            <DeleteImageButton
                                onClick={() => form.setValue('img_link', '')}
                                currentImageUrl={field.value ?? ""}
                            >
                            </DeleteImageButton>
                            <DropzoneComponent setValue={form.setValue} />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="cursor-pointer w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}