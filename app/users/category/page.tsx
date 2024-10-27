import React from 'react'
import { Star, ChevronDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function CategoryPage() {
  const products = [
    { id: 1, name: "Produit Incroyable 1", price: 29.99, rating: 4.5, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Produit Fantastique 2", price: 39.99, rating: 4.2, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Produit Extraordinaire 3", price: 49.99, rating: 4.8, image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Produit Incroyable 4", price: 19.99, rating: 3.9, image: "/placeholder.svg?height=200&width=200" },
    { id: 5, name: "Produit Fantastique 5", price: 59.99, rating: 4.6, image: "/placeholder.svg?height=200&width=200" },
    { id: 6, name: "Produit Extraordinaire 6", price: 69.99, rating: 4.3, image: "/placeholder.svg?height=200&width=200" },
    { id: 7, name: "Produit Incroyable 7", price: 79.99, rating: 4.7, image: "/placeholder.svg?height=200&width=200" },
    { id: 8, name: "Produit Fantastique 8", price: 89.99, rating: 4.1, image: "/placeholder.svg?height=200&width=200" },
    { id: 9, name: "Produit Extraordinaire 9", price: 99.99, rating: 4.9, image: "/placeholder.svg?height=200&width=200" },
  ]

  const brands = ["Marque A", "Marque B", "Marque C", "Marque D"]

  return (
    <div className="min-h-screen bg-gray-100">
 

      <main className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Électronique</h1>
          <div className="flex space-x-2">
            <Button variant="outline">Ordinateurs</Button>
            <Button variant="outline">Smartphones</Button>
            <Button variant="outline">Accessoires</Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Filtres</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Prix</h3>
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder="Min" className="w-20" />
                      <span>-</span>
                      <Input type="number" placeholder="Max" className="w-20" />
                      <Button size="sm">Go</Button>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      className="mt-4"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Marque</h3>
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Note client</h3>
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                          {Array(rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {Array(5 - rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                          <span className="ml-1">et plus</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">1-9 sur 100 résultats</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Trier par:</span>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pertinence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Pertinence</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Note client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <p className="font-bold">{product.price.toFixed(2)} €</p>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button key={page} variant={page === 1 ? "default" : "outline"} size="icon">
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
