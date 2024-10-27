import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, Plus, Truck, X } from 'lucide-react'

export default function CartPage() {
  const cartItems = [
    { id: 1, name: "Produit Incroyable 1", price: 29.99, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Produit Fantastique 2", price: 39.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Produit Extraordinaire 3", price: 49.99, quantity: 3, image: "/placeholder.svg?height=100&width=100" },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Votre panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Articles dans votre panier</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="icon">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span>{shipping.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
                <a href="/users/products/checkout">
                  <Button className="w-full mt-4">Procéder au paiement</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Options de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une option de livraison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">
                      <div className="flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        <span>Livraison standard (3-5 jours)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="express">
                      <div className="flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        <span>Livraison express (1-2 jours)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Recommandations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((product) => (
              <Card key={product}>
                <CardContent className="p-4">
                  <img src={`/placeholder.svg?height=150&width=150`} alt={`Produit recommandé ${product}`} className="w-full h-auto mb-2" />
                  <h3 className="font-semibold">Produit Recommandé {product}</h3>
                  <p className="text-gray-600 mb-2">XX,XX €</p>
                  <Button variant="outline" size="sm" className="w-full">Ajouter au panier</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
