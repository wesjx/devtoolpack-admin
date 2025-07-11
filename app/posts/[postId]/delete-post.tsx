"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { deleteImageFromStorage } from "@/app/actions/posts/delete-image";
import { deletePost } from "@/app/actions/posts/delete-post";
import { toast } from "sonner";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function DeletePostButton({ postId, img_url }: { postId: number, img_url: string }) {

    const router = useRouter()

    const handleDeleteConfirm = async () => {
        if (img_url) {
            const imageResult = await deleteImageFromStorage(img_url);
            if (imageResult?.error) {
                toast.error("Error deleting image", {
                    description: imageResult.message,
                });
            } else {
                toast.success("Image deleted", {
                    description: imageResult.message,
                });
            }
        } else {
            toast.info("No image found", {
                description: "This post does not have an image to remove.",
            });
        }

        const postResult = await deletePost(postId);

        if (postResult?.error) {
            toast.error("Error", { description: postResult.message })
            return
        } else {
            toast.success("Post Deleted", { description: "The post has been successfully deleted!" })
        }

        router.push('/posts')
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    asChild
                    className="cursor-pointer"
                    variant="destructive"
                    size="icon"
                    aria-label="Delete post"
                >
                    <MdDeleteForever color="white" size={20} />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post
                        and remove its associated data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        className="cursor-pointer"
                        onClick={handleDeleteConfirm}
                        variant="destructive"
                        aria-label="Confirm delete post"
                    >
                        <MdDeleteForever color="white" size={20} />
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}