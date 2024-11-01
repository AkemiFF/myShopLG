"use client"
import ProductReviews from "@/components/Card/ReviewCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Product } from '@/lib/store'
import { API_BASE_URL } from '@/utils/api'
import { addToCart } from "@/utils/base"
import { Heart, Share2, Star } from 'lucide-react'
import { useParams } from "next/navigation"
import { useEffect, useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const fetchProduct = (id: any) => {
    fetch(`${API_BASE_URL}api/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }
  useEffect(() => {
    fetchProduct(id);
  }, [id]);



  const reviews = [
    {
      id: 1,
      title: "Great product, highly recommend!",
      rating: 5,
      author: "John D.",
      date: "Reviewed in the United States on July 10, 2023",
      content: "This product exceeded my expectations. The quality is outstanding and it arrived earlier than expected. I've been using it for a week now and I'm very satisfied with my purchase.",
      helpful: 42,
    },
    {
      id: 2,
      title: "Good value for money",
      rating: 4,
      author: "Sarah M.",
      date: "Reviewed in the United Kingdom on June 28, 2023",
      content: "Overall, I'm happy with this product. It does what it's supposed to do and the price is reasonable. The only reason I'm not giving it 5 stars is because the instructions could be clearer.",
      helpful: 18,
    },
    {
      id: 3,
      title: "Decent, but room for improvement",
      rating: 3,
      author: "Alex W.",
      date: "Reviewed in Canada on July 5, 2023",
      content: "The product is okay, but I feel like there's room for improvement. It works as advertised, but the build quality could be better. I'm hoping future versions will address these issues.",
      helpful: 7,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images du produit */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              {product?.images[0] ?
                <img
                  src={`${product.images[0].image}?height=600&width=400`}
                  alt={`Product ${product.id}`}
                  className="w-full h-auto" />
                :
                <img src="/placeholder.svg?height=400&width=400" alt={product?.name} className="w-full h-auto" />
              }
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product && product.images.length > 1 ? (
                product.images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={`${img.image}?height=100&width=100`}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                ))
              ) : null}

            </div>
          </div>

          {/* Informations sur le produit */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= (product?.average_rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                />
              ))}

              <span className="text-blue-600">({product?.review_count} avis)</span>
            </div>
            <div className="text-3xl font-bold">${product?.price}</div>
            <p className="text-gray-600">
              {product?.description}
            </p>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => { addToCart(product?.id) }}>Ajouter au panier</Button>
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
                <p>
                  {product?.description}
                </p>
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
            <ProductReviews reviews={product?.reviews || []} />
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
