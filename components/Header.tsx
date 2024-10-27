"use client"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [searctValue, setSearctValue] = useState("");
  return (
    <header className="bg-gray-900 text-white p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/users">
            <h1 className="text-2xl font-bold">ShopLG</h1></Link>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products"
              className="w-full py-2 pl-4 pr-10 rounded text-gray-600"
              value={searctValue}
              onChange={(e) => setSearctValue(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-4">

          <Link href="/users/products">
            <Button variant="ghost" className="text-white">Products</Button>
          </Link>
          <Link href="/users/cart">
            <Button variant="ghost" className="text-white">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Cart
            </Button>
          </Link>
          <Link href="/users/profil">
            <Button variant="ghost" className="text-white">
              <Menu className="mr-2 h-5 w-5" />
              Account
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
