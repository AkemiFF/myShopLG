import React from 'react'
import { Star, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images du produit */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <img src="/placeholder.svg?height=400&width=400" alt="Product" className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((img) => (
                <img key={img} src={`/placeholder.svg?height=100&width=100`} alt={`Product view ${img}`} className="w-full h-auto rounded" />
              ))}
            </div>
          </div>

          {/* Informations sur le produit */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Nom du Produit Incroyable</h1>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-blue-600">(2,345 avis)</span>
            </div>
            <div className="text-3xl font-bold">99,99 €</div>
            <p className="text-gray-600">
              Description détaillée du produit. Ce produit incroyable va révolutionner votre vie quotidienne avec ses fonctionnalités innovantes et son design élégant.
            </p>
            <div className="space-y-2">
              <Button className="w-full">Ajouter au panier</Button>
              <Button variant="secondary" className="w-full">Acheter maintenant</Button>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <Button variant="ghost" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Ajouter à la liste d'envies
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </div>

        {/* Détails du produit et avis */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Description détaillée du produit avec toutes ses caractéristiques et avantages.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Spécification 1</li>
                  <li>Spécification 2</li>
                  <li>Spécification 3</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="font-bold">Titre de l'avis</span>
                      </div>
                      <p className="text-sm text-gray-600">Contenu de l'avis du client...</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Produits similaires */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((product) => (
              <Card key={product}>
                <CardContent className="p-4">
                  <img src={`/placeholder.svg?height=200&width=200`} alt={`Similar product ${product}`} className="w-full h-auto mb-2" />
                  <h3 className="font-semibold">Produit Similaire {product}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-bold">XX,XX €</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>


    </div>
  )
}
