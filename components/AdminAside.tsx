import {
    LayoutDashboard,
    LogOut,
    Package,
    Percent,
    Settings,
    ShoppingCart,
    Users
} from 'lucide-react';
import Link from "next/link";

export default function AdminAside() {
    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
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
                    {/* <Link href="#" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Percent className="mr-3 h-5 w-5" />
                        Promotions
                    </Link> */}
                    <Link href="/admin/settings" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                    </Link>
                </nav>
            </div>
            <div className="mt-auto p-4">
                <button className="w-full flex items-center justify-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}