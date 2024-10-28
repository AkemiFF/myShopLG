"use client"
import Pagination from "@/components/Pagination"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
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

    </div>
  )
}