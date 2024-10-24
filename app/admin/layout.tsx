import { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <ShoppingBag className="inline-block w-5 h-5 mr-2" />
            Produits
          </Link>
          <Link href="/admin/orders" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <ShoppingBag className="inline-block w-5 h-5 mr-2" />
            Commandes
          </Link>
          <Link href="/admin/customers" className="block px-4 py-2 text-gray-600 hover:bg-gray-100  hover:text-gray-800">
            <Users className="inline-block w-5 h-5 mr-2" />
            Clients
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <Settings className="inline-block w-5 h-5 mr-2" />
            Paramètres
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Link href="/logout" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <LogOut className="inline-block w-5 h-5 mr-2" />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}