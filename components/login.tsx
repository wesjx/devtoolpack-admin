import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaToolbox } from "react-icons/fa";

export default function LoginComponent() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="font-mono text-5xl font-bold flex gap-2 items-center justify-center">
                <FaToolbox size={60} /> DevToolPack
            </h1>
            <p className=" font-roboto text-2xl pb-2.5">
                Admin page
            </p>

            <SignedIn>
                <div className="flex flex-row gap-2.5">
                    <Button asChild className="font-sans">
                        <Link href="/posts/new-post">
                            New post
                        </Link>
                    </Button>
                    <Button asChild className="font-sans">
                        <Link href="/posts">
                            Edit posts
                        </Link>
                    </Button>
                </div>

            </SignedIn>
            <SignedOut>
                <div className="flex gap-2 items-center justify-center">
                    <Button asChild size="lg" className=" font-sans cursor-pointer">
                        <SignInButton />
                    </Button>
                </div>
            </SignedOut>
        </div>

    )
}