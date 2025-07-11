import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPosts } from "@/data/getPosts"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BsPencilSquare  } from "react-icons/bs";

export const dynamic = 'force-dynamic';
export default async function PostsList() {
    const posts = await getPosts()
    console.log(posts)

    function formatCategory(category: string) {
        switch (category) {
            case 'tips':
                return { label: 'Tips', color: 'bg-green-100 text-green-800' };
            case 'ui/ux':
                return { label: 'UI / UX', color: 'bg-pink-100 text-pink-800' };
            case 'data_base':
                return { label: 'Data Base', color: 'bg-yellow-100 text-yellow-800' };
            case 'ai':
                return { label: 'AI', color: 'bg-purple-100 text-purple-800' };
            case 'tools':
                return { label: 'Tools', color: 'bg-blue-100 text-blue-800' };
            default:
                return { label: category, color: 'bg-gray-100 text-gray-800' };
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <Card className="mt-4">
                <CardHeader className="flex justify-between p-4">
                    <CardTitle className="font-mono text-xl font-bold flex justify-between">
                        <span> Posts</span>
                    </CardTitle>
                    <Button asChild className="cursor-pointer">
                        <Link href='/posts/new-post'>
                            Create a new post
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption className="font-mono ">Posts</TableCaption>
                        <TableHeader>
                            <TableRow className="font-mono font-bold">
                                <TableHead>Title</TableHead>
                                <TableHead>Subtitle EN</TableHead>
                                <TableHead>Subtitle PT</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead>Image link</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts!.map((post) =>
                                <TableRow key={post.id}>
                                    <TableCell className="max-w-[200px] truncate">{post.title}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{post.subtitle_en}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{post.subtitle_pt}</TableCell>
                                    <TableCell className="font-mono">
                                        <Badge className={formatCategory(post.category).color}>
                                            {formatCategory(post.category).label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">{post.link}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{post.img_link}</TableCell>
                                    <TableCell>
                                        <Button asChild variant="outline" size="icon" aria-label="Edit post">
                                            <Link href={`/posts/${post.id}`}>
                                                <BsPencilSquare/>
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}