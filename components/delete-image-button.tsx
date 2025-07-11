"use client";

import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { deleteImageFromStorage } from "../app/actions/posts/delete-image";

interface DeleteImageButtonProps {
  currentImageUrl: string;
  onClick?: () => void;
}

export default function DeleteImageButton({
  currentImageUrl,
  onClick,
}: DeleteImageButtonProps) {
  const handleDeleteConfirm = async () => {
    if (!currentImageUrl) {
      toast.info("Attention", {
        description: "No image associated with this post to remove.",
      });
      return;
    }

    const result = await deleteImageFromStorage(currentImageUrl);

    if (result?.error) {
      toast.error("Error removing image", {
        description: result.message,
      });
    } else {
      toast.success("Image Removed", {
        description: result?.message || "The image has been successfully deleted!",
      });
    }

    if (onClick) {
      onClick();
    }
  };

  if (!currentImageUrl) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant="destructive"
          size="icon"
          aria-label="Delete image"
        >
          <MdDeleteForever color="white" size={24} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove this image?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the image associated with this post
            from Google Cloud Storage and remove its link from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="cursor-pointer"
              onClick={handleDeleteConfirm}
              variant="destructive"
              aria-label="Confirm delete image"
            >
              <MdDeleteForever color="white" size={24} />
              Delete Image
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}