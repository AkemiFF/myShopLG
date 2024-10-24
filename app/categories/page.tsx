import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const categories = [
  { name: "Montres", image: "/placeholder.svg?height=300&width=300" },
  { name: "Drones", image: "/placeholder.svg?height=300&width=300" },
  { name: "VR", image: "/placeholder.svg?height=300&width=300" },
  { name: "Robots", image: "/placeholder.svg?height=300&width=300" },
  { name: "Audio", image: "/placeholder.svg?height=300&width=300" },
  { name: "Gadgets", image: "/placeholder.svg?height=300&width=300" },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#22005d] text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-['Orbitron'] mb-8 text-center font-normal">Catégories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={`/products?category=${category.name}`}>
            <Card className="bg-[#2a0070] border-[#4a00b4] hover:bg-[#3b009e] transition-colors">
              <CardHeader>
                <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle className="font-['Exo_2'] text-center text-xl font-normal">{category.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}