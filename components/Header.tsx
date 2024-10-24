import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">Mon E-commerce</Link>
          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-gray-600 hover:text-gray-800">Produits</Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-800">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-800">
              <User className="h-6 w-6" />
            </Link>
            <Button variant="outline">Connexion</Button>
          </div>
        </div>
      </nav>
    </header>
  )
}