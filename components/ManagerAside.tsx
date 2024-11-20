"use client"
import Cookies from 'js-cookie';
import {
    LogOut,
    Package,
    Percent,
    ShoppingCart
} from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
export default function ManagerAside() {
    const router = useRouter();
    const handleLogOutAdmin = () => {
        Cookies.remove("refresh_token_manager");
        Cookies.remove("access_token_manager");
        router.push('/users');
    }
    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
            <div className="p-4">
                <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-orange-500 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <h2 className="text-xl font-bold text-orange-500">Manager</h2>
                </div>
                <nav className="space-y-2">
                    <Link href="/manager" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <ShoppingCart className="mr-3 h-5 w-5" />
                        Orders
                    </Link>
                    <Link href="/manager/products" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Package className="mr-3 h-5 w-5" />
                        Products
                    </Link>
                    <Link href="/manager/category" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Percent className="mr-3 h-5 w-5" />
                        Category
                    </Link>
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Button onClick={handleLogOutAdmin} className="w-full flex items-center justify-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </aside>
    )
}