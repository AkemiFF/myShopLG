import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const recommendedProducts = [
  { id: 1, name: 'Recommandation 1', price: 24.99, image: '/rec1.jpg' },
  { id: 2, name: 'Recommandation 2', price: 34.99, image: '/rec2.jpg' },
  { id: 3, name: 'Recommandation 3', price: 44.99, image: '/rec3.jpg' },
  { id: 4, name: 'Recommandation 4', price: 54.99, image: '/rec4.jpg' },
]

export default function PersonalizedRecommendations() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {recommendedProducts.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <div className="relative h-40 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h3 className="text-md font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price.toFixed(2)} €</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Voir le produit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}