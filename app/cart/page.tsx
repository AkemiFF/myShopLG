'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Simulated cart data
const initialCart = [
  { id: 1, name: "T-shirt Premium", price: 29.99, quantity: 2, image: "/placeholder.svg?height=80&width=80&text=T-shirt" },
  { id: 2, name: "Jean Slim", price: 59.99, quantity: 1, image: "/placeholder.svg?height=80&width=80&text=Jean" },
  { id: 3, name: "Chaussures de sport", price: 89.99, quantity: 1, image: "/placeholder.svg?height=80&width=80&text=Chaussures" },
]

export default function CartPage() {
  const [cart, setCart] = useState(initialCart)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Produit</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price.toFixed(2)} €</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>{(item.price * item.quantity).toFixed(2)} €</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Passer à la caisse</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}