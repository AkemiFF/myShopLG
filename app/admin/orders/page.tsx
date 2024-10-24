'use client'

import { useState } from 'react'
import { Search, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'

// Simulated order data
const initialOrders = [
  { id: '1234', customer: 'Jean Dupont', date: '2023-06-15', total: 129.99, status: 'Livré' },
  { id: '1235', customer: 'Marie Martin', date: '2023-06-16', total: 79.99, status: 'En cours de livraison' },
  { id: '1236', customer: 'Pierre Durand', date: '2023-06-17', total: 199.99, status: 'En préparation' },
  { id: '1237', customer: 'Sophie Lefebvre', date: '2023-06-18', total: 149.99, status: 'En attente de paiement' },
  { id: '1238', customer: 'Luc Girard', date: '2023-06-19', total: 89.99, status: 'Annulé' },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = orders.filter(order => 
    (order.id.includes(searchTerm) || order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || order.status === statusFilter)
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Commandes</h1>

      <div className="flex space-x-4">
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
            <SelectItem value="">Tous les statuts</SelectItem>
            <SelectItem value="En préparation">En préparation</SelectItem>
            <SelectItem value="En cours de livraison">En cours de livraison</SelectItem>
            <SelectItem value="Livré">Livré</SelectItem>
            <SelectItem value="Annulé">Annulé</SelectItem>
            <SelectItem value="En attente de paiement">En attente de paiement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro de commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{format(new Date(order.date), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{order.total.toFixed(2)} €</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Détails de la commande {order.id}</DialogTitle>
                      <DialogDescription>
                        Voici les détails complets de la commande.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Client</Label>
                        <div className="col-span-3">{order.customer}</div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Date</Label>
                        <div className="col-span-3">{format(new Date(order.date), 'dd/MM/yyyy')}</div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Total</Label>
                        <div className="col-span-3">{order.total.toFixed(2)} €</div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Statut</Label>
                        <div className="col-span-3">{order.status}</div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}