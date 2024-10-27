import React from 'react'
import { Check, Truck, CreditCard, Package, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function OrderConfirmationPage() {
  const orderDetails = {
    orderNumber: "123-4567890-1234567",
    orderDate: "27 octobre 2023",
    totalAmount: 125.97,
    deliveryAddress: "123 Rue Principale, 75000 Paris, France",
    paymentMethod: "Visa se terminant par 1234",
    deliveryMethod: "Livraison standard",
    estimatedDelivery: "30 octobre - 2 novembre 2023"
  }

  const orderedItems = [
    { id: 1, name: "Produit Incroyable 1", price: 29.99, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Produit Fantastique 2", price: 39.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Produit Extraordinaire 3", price: 49.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">


      <main className="container mx-auto py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-600 mb-4">
              <Check className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Commande confirmée</h1>
            </div>
            <p className="text-gray-600">
              Merci pour votre commande, {orderDetails.orderNumber}. Nous vous enverrons une confirmation par e-mail lorsque vos articles seront expédiés.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderedItems.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Quantité: {item.quantity}</p>
                        <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suivi de commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span>Commande passée</span>
                    </div>
                    <span className="text-gray-600">{orderDetails.orderDate}</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Truck className="h-5 w-5" />
                    <span>Livraison estimée: {orderDetails.estimatedDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{orderDetails.totalAmount.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Numéro de commande</span>
                    <span>{orderDetails.orderNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
                <p className="text-gray-600 mt-2">{orderDetails.deliveryMethod}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Méthode de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span>{orderDetails.paymentMethod}</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">Suivre ma commande</Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Vous pourriez aussi aimer</h2>
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
