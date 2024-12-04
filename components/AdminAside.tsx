"use client"
import Cookies from 'js-cookie';
import { LayoutDashboard, LogOut, MessageCircle, Package, Percent, Settings, ShoppingCart, Users, X } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface AdminAsideProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminAside({ isOpen, onClose }: AdminAsideProps) {
    const router = useRouter();
    const handleLogOutAdmin = () => {
        Cookies.remove("refresh_token_main");
        Cookies.remove("access_token_main");
        router.push('/users');
    }

    return (
        <aside className={`
            fixed top-0 left-0 z-40 w-64 h-screen transition-transform 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 bg-gray-900 text-white
        `}>
            <div className="flex justify-between items-center p-4 md:hidden">
                <h2 className="text-xl font-bold text-orange-500">Admin</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <div className="p-4">
                <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-orange-500 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <h2 className="text-xl font-bold text-orange-500">Admin</h2>
                </div>
                <nav className="space-y-2">
                    <Link href="/admin" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <LayoutDashboard className="mr-3 h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Package className="mr-3 h-5 w-5" />
                        Products
                    </Link>
                    <Link href="/admin/category" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Percent className="mr-3 h-5 w-5" />
                        Category
                    </Link>
                    <Link href="/admin/orders" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <ShoppingCart className="mr-3 h-5 w-5" />
                        Orders
                    </Link>
                    <Link href="/admin/customers" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Users className="mr-3 h-5 w-5" />
                        Customers
                    </Link>
                    <Link href="/admin/contact" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <MessageCircle className="mr-3 h-5 w-5" />
                        Contact
                    </Link>
                    <Link href="/admin/settings" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
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

