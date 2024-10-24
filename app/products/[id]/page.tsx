'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

// Simulated product data
const product = {
  id: 1,
  name: "T-shirt Premium",
  price: 29.99,
  description: "Un t-shirt confortable et élégant, parfait pour toutes les occasions. Fabriqué à partir de coton 100% biologique.",
  images: [
    "/placeholder.svg?height=400&width=400&text=T-shirt+1",
    "/placeholder.svg?height=400&width=400&text=T-shirt+2",
    "/placeholder.svg?height=400&width=400&text=T-shirt+3",
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: ["Blanc", "Noir", "Bleu"],
  reviews: [
    { id: 1, author: "Jean D.", rating: 5, comment: "Excellent produit, je le recommande vivement !" },
    { id: 2, author: "Marie L.", rating: 4, comment: "Très bon t-shirt, mais un peu grand pour moi." },
    { id: 3, author: "Pierre M.", rating: 5, comment: "Parfait ! La qualité est au rendez-vous." },
  ]
}

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96 mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative h-24 border rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-gray-600">({product.reviews.length} avis)</span>
          </div>
          <p className="text-2xl font-bold mb-4">{product.price.toFixed(2)} €</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <Label htmlFor="size" className="block mb-2">Taille</Label>
            <RadioGroup id="size" value={selectedSize} onValueChange={setSelectedSize} className="flex space-x-2">
              {product.sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`px-3 py-2 border rounded-md cursor-pointer ${
                      selectedSize === size ? 'bg-primary text-primary-foreground' : 'bg-background'
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mb-6">
            <Label htmlFor="color" className="block mb-2">Couleur</Label>
            <RadioGroup id="color" value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-2">
              {product.colors.map((color) => (
                <div key={color}>
                  <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color}`}
                    className={`px-3 py-2 border rounded-md cursor-pointer ${
                      selectedColor === color ? 'bg-primary text-primary-foreground' : 'bg-background'
                    }`}
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Label htmlFor="quantity" className="sr-only">Quantité</Label>
            <Input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter au panier
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Ajouter aux favoris</span>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Avis clients</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardContent className="pt-6">
              <p>{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="mb-4 pb-4 border-b  last:border-b-0">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.author}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}