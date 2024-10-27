import React from 'react'
import { Star, Trash2, Share2, ShoppingCart, Plus, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WishlistPage() {
  const wishlists = [
    { id: 1, name: "Ma liste principale" },
    { id: 2, name: "Idées cadeaux" },
    { id: 3, name: "Pour la maison" },
  ]

  const wishlistItems = [
    { id: 1, name: "Smartphone A", price: 599.99, rating: 4.5, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Livre Best-seller", price: 19.99, rating: 4.2, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Casque audio sans fil", price: 149.99, rating: 4.7, image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Robot aspirateur", price: 299.99, rating: 4.3, image: "/placeholder.svg?height=200&width=200" },
  ]

  const suggestedProducts = [
    { id: 5, name: "Enceinte Bluetooth", price: 79.99, rating: 4.1, image: "/placeholder.svg?height=150&width=150" },
    { id: 6, name: "Tablette 10 pouces", price: 199.99, rating: 4.4, image: "/placeholder.svg?height=150&width=150" },
    { id: 7, name: "Montre connectée", price: 129.99, rating: 4.6, image: "/placeholder.svg?height=150&width=150" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mes listes de souhaits</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Créer une nouvelle liste
          </Button>
        </div>

        <Tabs defaultValue="list-1">
          <TabsList>
            {wishlists.map((list) => (
              <TabsTrigger key={list.id} value={`list-${list.id}`}>{list.name}</TabsTrigger>
            ))}
          </TabsList>
          {wishlists.map((list) => (
            <TabsContent key={list.id} value={`list-${list.id}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{list.name}</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Plus d'actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rename">Renommer</SelectItem>
                      <SelectItem value="delete">Supprimer</SelectItem>
                      <SelectItem value="duplicate">Dupliquer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {wishlistItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <div className="flex items-center mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                      </div>
                      <p className="font-bold mb-4">{item.price.toFixed(2)} €</p>
                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Ajouter au panier
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Produits suggérés basés sur cette liste</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {suggestedProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" />
                      <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                      <div className="flex items-center mb-1">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                      </div>
                      <p className="font-bold text-sm mb-2">{product.price.toFixed(2)} €</p>
                      <Button size="sm" className="w-full">Ajouter à la liste</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

    </div>
  )
}
