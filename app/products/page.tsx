'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// Simulated product data
const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Produit ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 10,
  category: ['Électronique', 'Vêtements', 'Maison', 'Loisirs'][Math.floor(Math.random() * 4)],
  image: `/placeholder.svg?height=200&width=200&text=Produit+${i + 1}`,
}))

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  const productsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const applyFilters = () => {
    let filtered = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (selectedCategory === '' || product.category === selectedCategory)
    )

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      // For 'popularity', we'll keep the original order as a proxy for popularity
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-1 space-y-6">
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vcx">Toutes les catégories</SelectItem>
                <SelectItem value="Électronique">Électronique</SelectItem>
                <SelectItem value="Vêtements">Vêtements</SelectItem>
                <SelectItem value="Maison">Maison</SelectItem>
                <SelectItem value="Loisirs">Loisirs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Prix</Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
          </div>

          <div>
            <Label htmlFor="sort">Trier par</Label>
            <Select onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={applyFilters} className="w-full">Appliquer les filtres</Button>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="relative h-48 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price.toFixed(2)} €</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Ajouter au panier</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}