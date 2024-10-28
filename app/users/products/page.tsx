"use client"
import Pagination from "@/components/Pagination"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'



export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const productsPerPage = 8
  const totalProducts = 24 // Exemple : 24 produits au total

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Toys', 'Sports']

  // Simuler le filtrage des produits
  const filteredProducts = [...Array(totalProducts)].map((_, i) => i + 1)
    .filter(product => selectedCategory === 'All' || Math.random() > 0.5)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 cursor-pointer" />
            <h1 className="text-2xl font-bold">E-Shop</h1>
          </div>
          <div className="flex-grow mx-4 hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 rounded-md"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ShoppingCart className="h-6 w-6 cursor-pointer" />
            <Button>Sign In</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex-grow md:flex-grow-0"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.toString()} product={product.toString()} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Our Story</a></li>
                <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                <li><a href="#" className="hover:text-gray-300">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
                <li><a href="#" className="hover:text-gray-300">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Policies</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="mb-4">Stay updated on our latest offers and news</p>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}