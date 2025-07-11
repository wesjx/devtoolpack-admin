
import { Button } from "@/components/ui/button";
import NewPostForm from "./new-post";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostForm() {
    return (
        <div className="max-w-3xl mx-auto py-10">
            <Card className="p-4">
                <CardHeader>
                    <CardTitle  className="flex gap-2.5 align-bottom p-4">
                        <Button asChild>
                            <Link href='/posts'>
                                <FaArrowLeft />
                            </Link>
                        </Button>
                        <h2 className="font-mono text-2xl font-bold text-gray-800 text-center mb-2">Add a Dev Tool</h2>
                    </CardTitle>
                </CardHeader>
                <NewPostForm />
            </Card>
        </div >
    )
}