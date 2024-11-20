"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
            <div className="container flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="text-center lg:text-left space-y-4 max-w-md">
                    <h1 className="text-5xl font-bold text-primary">404</h1>
                    <h2 className="text-2xl md:text-3xl font-light text-foreground">
                        Sorry, we couldn&apos;t find this page.
                    </h2>
                    <p className="text-muted-foreground">
                        But don&apos;t worry, you can find plenty of other things on our homepage.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/users">Back to homepage</Link>
                    </Button>
                </div>
                <div className="w-full max-w-lg">
                    <Image
                        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmk4amxrbm00YWFxeHd3bzI4ZzB1cHQxOHBoYmN6bmE4YW5hMWZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0O9xrBecp7Tfu0eY/giphy.gif?height=400&width=400"
                        width={400}
                        height={400}
                        alt="404 Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    )
}