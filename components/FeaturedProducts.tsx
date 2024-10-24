import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const featuredProducts = [
  { id: 1, name: 'Produit 1', price: 19.99, image: '/product1.jpg' },
  { id: 2, name: 'Produit 2', price: 29.99, image: '/product2.jpg' },
  { id: 3, name: 'Produit 3', price: 39.99, image: '/product3.jpg' },
]

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
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
          </CardContent>
          <CardFooter>
            <Button className="w-full">Ajouter au panier</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}