'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Eye, Search } from 'lucide-react'
import { useState } from 'react'
interface Customer {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  orderCount: number;
}
const initialCustomers = [
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', registrationDate: '2023-01-15', orderCount: 5 },
  { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com', registrationDate: '2023-02-20', orderCount: 3 },
  { id: 3, name: 'Pierre Durand', email: 'pierre.durand@example.com', registrationDate: '2023-03-10', orderCount: 7 },
  { id: 4, name: 'Sophie Lefebvre', email: 'sophie.lefebvre@example.com', registrationDate: '2023-04-05', orderCount: 2 },
  { id: 5, name: 'Luc Girard', email: 'luc.girard@example.com', registrationDate: '2023-05-12', orderCount: 4 },
]

// Simulated order history
const orderHistory = [
  { id: '1234', date: '2023-06-15', total: 129.99, status: 'Livré' },
  { id: '1235', date: '2023-06-16', total: 79.99, status: 'En cours de livraison' },
  { id: '1236', date: '2023-06-17', total: 199.99, status: 'En préparation' },
]

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Gestion des Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Nombre de commandes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{format(new Date(customer.registrationDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{customer.orderCount}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(customer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Détails du client</DialogTitle>
                        <DialogDescription>
                          Informations détaillées et historique des commandes du client.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Nom</Label>
                          <div className="col-span-3">{customer.name}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Email</Label>
                          <div className="col-span-3">{customer.email}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Date d'inscription</Label>
                          <div className="col-span-3">{format(new Date(customer.registrationDate), 'dd/MM/yyyy')}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Nombre de commandes</Label>
                          <div className="col-span-3">{customer.orderCount}</div>
                        </div>
                      </div>
                      <DialogTitle className="mt-6">Historique des commandes</DialogTitle>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Numéro de commande</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderHistory.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.id}</TableCell>
                              <TableCell>{format(new Date(order.date), 'dd/MM/yyyy')}</TableCell>
                              <TableCell>{order.total.toFixed(2)} €</TableCell>
                              <TableCell>{order.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}