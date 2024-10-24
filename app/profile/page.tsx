'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Simulated user data
const userData = {
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  address: '123 Rue de la Paix, 75001 Paris, France',
  phone: '+33 1 23 45 67 89'
}

// Simulated order history
const orderHistory = [
  { id: '1234', date: '2023-05-15', total: 129.99, status: 'Livré' },
  { id: '1235', date: '2023-06-02', total: 79.99, status: 'En cours de livraison' },
  { id: '1236', date: '2023-06-20', total: 199.99, status: 'En préparation' },
]

export default function ProfilePage() {
  const [user, setUser] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profil Utilisateur</h1>

      <Tabs defaultValue="personal-info">
        <TabsList className="mb-4">
          <TabsTrigger value="personal-info">Informations Personnelles</TabsTrigger>
          <TabsTrigger value="order-history">Historique des Commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
              <CardDescription>Gérez vos informations personnelles et vos préférences.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
              <CardFooter>
                {isEditing ? (
                  <>
                    <Button type="submit">Enregistrer</Button>
                    <Button type="button" variant="outline" className="ml-2" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>Modifier</Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="order-history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Commandes</CardTitle>
              <CardDescription>Consultez vos commandes passées et leur statut.</CardDescription>
            </CardHeader>
            <CardContent>
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
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total.toFixed(2)} €</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}