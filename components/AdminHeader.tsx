"use client"

import { ChevronLeft, HelpCircle, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface AdminHeaderProps {
    addUrl?: string
    url?: string
    urlName?: string
    title?: string
}

export default function AdminHeader({ addUrl, url, urlName, title }: AdminHeaderProps) {
    return (
        <header className="bg-background p-4 flex flex-wrap justify-between items-center border-b shadow-sm">
            <div className="flex items-center space-x-4">
                {url && (
                    <Link href={url} passHref>
                        <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted">
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">{urlName}</span>
                        </Button>
                    </Link>
                )}
                {title && (
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
                )}
            </div>

            <div className="flex items-center space-x-4">
                {addUrl && (
                    <Link href={addUrl} passHref>
                        <Button variant="default" size="icon" className="bg-primary hover:bg-primary/90">
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Add new item</span>
                        </Button>
                    </Link>
                )}
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted" aria-label="Help">
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <Link href="/users" passHref>
                    <Button variant="outline" size="sm" className="border-primary text-foreground hover:bg-muted">
                        View Shop
                    </Button>
                </Link>
            </div>
        </header>
    )
}