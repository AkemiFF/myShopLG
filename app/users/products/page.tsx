"use client"
import ProductCard from "@/components/Card/ProductCard"
import Pagination from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { Category, Product } from "@/lib/store"
import { API_BASE_URL } from "@/utils/api"
import { fetchCategories } from "@/utils/base"
import { useEffect, useState } from 'react'



export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/product/`)
      const data = await response.json()

      setProducts(data)
      setTotalProducts(data.length);


    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error)
    }
  }
  const productsPerPage = 8;

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    }
    fetchProducts();
    fetchData();
  }, [currentPage, selectedCategory])


  const filteredProducts = products.filter((product) =>
    selectedCategory === 'All' || product.category.name === selectedCategory
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            key="1"
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
            className="flex-grow md:flex-grow-0"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="flex-grow md:flex-grow-0"
            >
              {category.name}
            </Button>
          ))}
        </div>


        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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