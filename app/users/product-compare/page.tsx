import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, ShoppingCart, Star, X } from 'lucide-react'
type ProductSpecs = {
  Écran: string;
  Processeur: string;
  RAM: string;
  Stockage: string;
  "Appareil photo": string;
  Batterie: string;
};

export default function ProductComparisonPage() {
  const products: { id: number; name: string; image: string; price: number; rating: number; specs: ProductSpecs }[] = [
    {
      id: 1,
      name: "Smartphone A",
      image: "/placeholder.svg?height=200&width=200",
      price: 599.99,
      rating: 4.5,
      specs: {
        "Écran": "6.5 pouces OLED",
        "Processeur": "Octa-core 2.8 GHz",
        "RAM": "8 GB",
        "Stockage": "128 GB",
        "Appareil photo": "Triple 48MP + 12MP + 8MP",
        "Batterie": "4500 mAh"
      }
    },
    {
      id: 2,
      name: "Smartphone B",
      image: "/placeholder.svg?height=200&width=200",
      price: 699.99,
      rating: 4.7,
      specs: {
        "Écran": "6.7 pouces AMOLED",
        "Processeur": "Octa-core 3.0 GHz",
        "RAM": "12 GB",
        "Stockage": "256 GB",
        "Appareil photo": "Quad 64MP + 12MP + 8MP + 5MP",
        "Batterie": "5000 mAh"
      }
    },
    {
      id: 3,
      name: "Smartphone C",
      image: "/placeholder.svg?height=200&width=200",
      price: 499.99,
      rating: 4.2,
      specs: {
        "Écran": "6.4 pouces LCD",
        "Processeur": "Octa-core 2.4 GHz",
        "RAM": "6 GB",
        "Stockage": "64 GB",
        "Appareil photo": "Double 32MP + 8MP",
        "Batterie": "4000 mAh"
      }
    }
  ]

  const allSpecs = Array.from(new Set(products.flatMap(p => Object.keys(p.specs))))

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Comparaison de produits</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="relative">
                  <Button variant="outline" size="icon" className="absolute top-0 right-0">
                    <X className="h-4 w-4" />
                  </Button>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
                <p className="font-bold mb-4">{product.price.toFixed(2)} €</p>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <Button variant="outline" className="w-full h-full flex flex-col items-center justify-center">
                <Plus className="h-8 w-8 mb-2" />
                Ajouter un produit
              </Button>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Caractéristiques</TableHead>
              {products.map((product) => (
                <TableHead key={product.id}>{product.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allSpecs.map((spec) => (
              <TableRow key={spec}>
                <TableCell className="font-medium">{spec}</TableCell>
                {products.map((product) => (
                  <TableCell key={product.id}>
                    {product.specs[spec as keyof ProductSpecs] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

        </Table>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Ajouter un produit à comparer</h2>
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Choisir un produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-d">Smartphone D</SelectItem>
                <SelectItem value="product-e">Smartphone E</SelectItem>
                <SelectItem value="product-f">Smartphone F</SelectItem>
              </SelectContent>
            </Select>
            <Button>Ajouter à la comparaison</Button>
          </div>
        </div>
      </main>

    </div>
  )
}
