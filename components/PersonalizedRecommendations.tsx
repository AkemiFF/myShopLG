import { Button } from '@/components/ui/button'

const recommendedProducts = [
  { id: 1, name: 'Recommandation 1', price: 24.99, image: '/rec1.jpg' },
  { id: 2, name: 'Recommandation 2', price: 34.99, image: '/rec2.jpg' },
  { id: 3, name: 'Recommandation 3', price: 44.99, image: '/rec3.jpg' },
  { id: 4, name: 'Recommandation 4', price: 54.99, image: '/rec4.jpg' },
]

export default function PersonalizedRecommendations() {
  return (
    <main className="container mx-auto py-8">


      {/* Featured Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((product) => (
          <div key={product} className="bg-white p-4 rounded shadow">
            <div className="bg-gray-200 h-48 mb-4 rounded"></div>
            <h3 className="font-semibold mb-2">Product {product}</h3>
            <p className="text-gray-600 mb-2">$XX.XX</p>
            <Button className="w-full">Add to Cart</Button>
          </div>
        ))}
      </div>
    </main>
  )
}