import React from 'react'
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {['Electronics', 'Clothing', 'Books', 'Home', 'Toys', 'Sports'].map((category) => (
            <Button key={category} variant="outline" className="w-full">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
            <div key={product} className="bg-white p-4 rounded shadow">
              <div className="bg-gray-200 h-48 mb-4 rounded"></div>
              <h3 className="font-semibold mb-2">Product {product}</h3>
              <p className="text-gray-600 mb-2">$XX.XX</p>
              <Button className="w-full">Add to Cart</Button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}

    </div>
  )
}
