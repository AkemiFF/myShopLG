'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { useState } from 'react'

// Simulated order data
const orderData = {
  id: '1234',
  customer: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  date: '2023-06-15',
  total: 129.99,
  status: 'En cours de livraison',
  address: '123 Rue de la Paix, 75001 Paris, France',
  items: [
    { id: 1, name: 'T-shirt Premium', price: 29.99, quantity: 2 },
    { id: 2, name: 'Jean Slim', price: 59.99, quantity: 1 },
    { id: 3, name: 'Chaussettes', price: 9.99, quantity: 1 },
  ],
}

export default function AdminOrderDetailPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(orderData)

  const handleStatusChange = (newStatus: any) => {
    setOrder({ ...order, status: newStatus })
    // Here you would typically update the status in your backend
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Détails de la commande #{id}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Nom :</strong> {order.customer}</p>
              <p><strong>Email :</strong> {order.email}</p>
              <p><strong>Adresse de livraison :</strong> {order.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails de la commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Date :</strong> {format(new Date(order.date), 'dd/MM/yyyy')}</p>
              <p><strong>Total :</strong> {order.total.toFixed(2)} €</p>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status">Statut :</Label>
                <Select value={order.status} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="En préparation">En préparation</SelectItem>
                    <SelectItem value="En cours de livraison">En cours de livraison</SelectItem>
                    <SelectItem value="Livré">Livré</SelectItem>
                    <SelectItem value="Annulé">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles commandés</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Prix unitaire</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price.toFixed(2)} €</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{(item.price * item.quantity).toFixed(2)} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription>Total de la commande</CardDescription>
          <CardTitle>{order.total.toFixed(2)} €</CardTitle>
        </CardFooter>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Imprimer la facture</Button>
        <Button variant="outline">Envoyer un e-mail au client</Button>
      </div>
    </div>
  )
}