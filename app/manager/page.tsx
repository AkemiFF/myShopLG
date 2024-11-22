'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { API_BASE_URL } from '@/utils/api'
import { getManagerAccessToken } from '@/utils/cookies'
import { format } from 'date-fns'
import { Badge, Eye, PrinterIcon, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Product {
  "id": number,
  "name": string,
  "description": string,
  "stock": number,
  "sku": string,
  "first_image": {
    "image": string,
    "alt_text": null,
    "is_primary": boolean
  }
}

interface Item {
  "product": Product,
  "quantity": number,
}

interface User {
  "username": string,
  "email": string,
  "shipping_addresses": [
    {
      "address": string,
      "city": string,
      "postal_code": string,
      "country": string,
      "phone_number": string
    }
  ]
}

interface Order {
  "id": number,
  "user": User,
  "created_at": string,
  "updated_at": string,
  "status": string,
  "items": Item[]
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order>()
  const [dateFilter, setDateFilter] = useState('')

  const filteredOrders = orders.filter(order =>
    (order.id.toString().includes(searchTerm) ||
      order.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter) &&
    (dateFilter === '' || isWithinDateRange(order.created_at, dateFilter))
  )

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const accessToken = await getManagerAccessToken();
    try {
      const response = await fetch(`${API_BASE_URL}/api/order/${orderId}/status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = await getManagerAccessToken();

      return fetch(`${API_BASE_URL}/api/order/all/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits');
          }
          return response.json();
        })
        .then(data => {
          setOrders(data);
        })
        .catch((error: any) => {
          console.error('Erreur:', error);
        });
    };

    fetchOrders()
  }, []);

  const isWithinDateRange = (date: string, range: string) => {
    const orderDate = new Date(date);
    const today = new Date();
    switch (range) {
      case 'today':
        return orderDate.toDateString() === today.toDateString();
      case 'thisWeek':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      case 'thisMonth':
        return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  };

  const printOrderInfo = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Commande #${order.id}</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Commande #${order.id}</h1>
            <p><strong>Date:</strong> ${format(new Date(order.created_at), 'dd/MM/yyyy')}</p>
            <p><strong>Client:</strong> ${order.user.username}</p>
            <p><strong>Email:</strong> ${order.user.email}</p>
            <p><strong>Statut:</strong> ${order.status}</p>
            <h2>Produits commandés</h2>
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.product.name}</td>
                    <td>${item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Gestion des Commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En préparation</SelectItem>
                <SelectItem value="completed">Livré</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user.username}</TableCell>
                  <TableCell>{format(new Date(order.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Commande #{order.id}</DialogTitle>
                          <DialogDescription>
                            Détails complets de la commande du {format(new Date(order.created_at), 'dd/MM/yyyy')}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6 py-4">
                          {/* Informations Client */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Informations Client</h3>
                            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                              <div>
                                <Label>Nom</Label>
                                <div className="font-medium">{order.user.username}</div>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <div className="font-medium">{order.user.email}</div>
                              </div>
                            </div>
                          </div>

                          {/* Informations Livraison */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Adresse de Livraison</h3>
                            <div className="grid gap-2 p-4 border rounded-lg bg-muted/50">
                              <div className="font-medium">
                                {order.user.shipping_addresses[0]?.address}
                                <br />
                                {order.user.shipping_addresses[0]?.postal_code} {order.user.shipping_addresses[0]?.city}
                                <br />
                                {order.user.shipping_addresses[0]?.country}
                              </div>
                            </div>
                          </div>

                          {/* Produits Commandés */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Produits Commandés</h3>
                            <div className="border rounded-lg overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Produit</TableHead>
                                    <TableHead className="w-24 text-right">Quantité</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.items?.map((item) => (
                                    <TableRow key={item.product.id}>
                                      <TableCell>
                                        <div className="flex items-center gap-3">
                                          {item.product.first_image.image && (
                                            <img
                                              src={API_BASE_URL + item.product.first_image.image}
                                              alt={item.product.name}
                                              className="h-10 w-10 rounded object-cover"
                                            />
                                          )}
                                          <div className="flex flex-col">
                                            <span className="font-medium">{item.product.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                              Réf: {item.product.sku}
                                            </span>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">{item.quantity}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>

                          {/* Statut de la commande */}
                          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                            <div className="space-y-1">
                              <Label>Statut de la commande</Label>
                              <div className="font-medium">{order.status}</div>
                            </div>
                            <Badge>{order.status}</Badge>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="space-y-1">
                            <Label>Changer le statut</Label>
                            <Select
                              value={selectedOrder?.status}
                              onValueChange={(newStatus: string) => {
                                if (selectedOrder) {
                                  updateOrderStatus(selectedOrder.id, newStatus);
                                  setSelectedOrder({ ...selectedOrder, status: newStatus });
                                }
                              }}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">En préparation</SelectItem>
                                <SelectItem value="shipped">Remis au service de livraison</SelectItem>
                                <SelectItem value="in_transit">Arrivé au pays de livraison</SelectItem>
                                <SelectItem value="completed">Livré</SelectItem>
                                <SelectItem value="cancelled">Annulé</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={() => printOrderInfo(order)}>
                            <PrinterIcon className="mr-2 h-4 w-4" />
                            Imprimer
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}