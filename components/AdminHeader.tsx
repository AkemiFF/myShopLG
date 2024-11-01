"use client"
import { ChevronLeft, HelpCircle, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AdminHeader(props: any) {
    return (
        <header className="bg-[#FAFAFA] p-4 flex justify-between items-center border-b shadow-sm">
            {
                (props.add_url) ?
                    (<Link href={props.add_url}>
                        <Button variant="default" size="icon" className="bg-[#FF9900] hover:bg-[#E88B00] text-white">
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </Link>) : null
            }
            {
                (props.url) ?
                    (<div className="flex items-center">
                        <Link href={props.url}>
                            <Button variant="ghost" size="sm" className="text-[#232F3E] hover:bg-[#EAEDED]">
                                <ChevronLeft className="h-4 w-4 mr-2" />{props.urlName}
                            </Button>
                        </Link>
                    </div>)
                    :
                    <div className="flex items-center">
                    </div>
            }
            {
                (props.title) ?
                    (<div className="flex items-center">
                        <h1 className="text-2xl font-bold text-[#232F3E]">{props.title}</h1>
                    </div>)
                    :
                    <div className="flex items-center">
                    </div>
            }
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-[#232F3E] hover:bg-[#EAEDED]">
                    <HelpCircle className="h-4 w-4 mr-2" />
                </Button>
                <Link href={"/users"}>
                    <Button variant="outline" size="sm" className="border-[#FF9900] text-[#232F3E] hover:bg-[#EAEDED]">View Shop</Button>
                </Link>
            </div>
        </header>
    )
}