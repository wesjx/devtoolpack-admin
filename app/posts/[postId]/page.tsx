import { Button } from "@/components/ui/button"
import { getPost } from "@/data/getPost"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"
import { EditPostForm } from "./edit-post"
import DeletePostButton from "./delete-post"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
export const dynamic = 'force-dynamic';

export default async function EditPost({
    params
}: {
    params: Promise<{ postId: string }>
}) {
    const paramsValue = await params
    const postId = Number(paramsValue.postId)

    if (isNaN(postId)) {
        notFound()
    }

    const post = await getPost(postId)

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-3xl mx-auto py-10">
            <Card className="p-4">
                <CardHeader>
                    <CardTitle className="flex gap-2.5 align-bottom p-4">
                        <Button asChild>
                            <Link href='/posts'>
                                <FaArrowLeft />
                            </Link>
                        </Button>
                        <h2 className="font-mono text-2xl font-bold text-gray-800 text-center mb-2">Add a Dev Tool</h2>
                    </CardTitle>
                </CardHeader>
                <DeletePostButton
                    postId={postId}
                    img_url={post.img_link ?? ''}
                >
                </DeletePostButton>

                <EditPostForm post={{
                    ...post,
                    category: post.category as "tips" | "ui/ux" | "data_base" | "ai" | "tools",
                    img_link: post.img_link ?? ""
                }} />
            </Card>
        </div>
    )
}