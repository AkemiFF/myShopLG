"use client"
import ProductCard from "@/components/Card/ProductCard"
import ProductReviews from "@/components/Card/ReviewCard"
import LoginOrGuestDialog from "@/components/LoginOrGuestDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/UserContext"
import { Product } from '@/lib/store'
import { API_BASE_URL } from '@/utils/api'
import { addToCart } from "@/utils/base"
import { Share2, Star } from 'lucide-react'
import { useParams } from "next/navigation"
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [similarProduct, setSimilarProduct] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const currentUrl = window.location.href;
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.info('Lien copié dans le presse-papiers !',
        {
          autoClose: 800,
          theme: "colored",
        }

      );


    } catch (err) {
      console.error('Échec de la copie :', err);
    }
  }

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      setIsOpen(true);
    } else {
      addToCart(productId);
    }
  }
  const fetchProduct = (id: any) => {
    fetch(`${API_BASE_URL}api/product/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data.product);
        setSimilarProduct(data.similar_products);
      });
  }
  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images du produit */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              {product?.images[0] ?
                <img
                  src={`${API_BASE_URL + product.images[0].image}?height=600&width=400`}
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
              <Button className="w-full" onClick={() => { handleAddToCart(product?.id || 0) }}>Ajouter au panier</Button>
              <LoginOrGuestDialog productId={product?.id || 0} quantity={1} isopen={isOpen} />
              <Button variant="secondary" className="w-full">Acheter maintenant</Button>
            </div>
            <div className="flex justify-end text-sm text-gray-500">
              {/* <Button variant="ghost" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Ajouter à la liste d'envies
              </Button> */}
              <Button onClick={handleShare} variant="ghost" size="sm">
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
            <ProductReviews reviews={product?.reviews || []} id={product?.id || 0} />
          </TabsContent>
        </Tabs>

        {/* Produits similaires */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProduct.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </main>


    </div>
  )
}
