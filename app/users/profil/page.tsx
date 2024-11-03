"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/UserContext"
import { API_BASE_URL } from "@/utils/api"
import getAccessToken, { removeTokens } from "@/utils/cookies"
import { Edit2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


interface Item {
  "product": number,
  "quantity": number,
  "price": string
}
interface Order {
  "id": number
  "items": Item[],
  "created_at": string,
  "updated_at": string,
  "total_price": string,
  "status": string,
  "user": number
}

export default function UserProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = await getAccessToken();
      fetch(`${API_BASE_URL}api/order/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json())
        .then(data => {
          setOrders(data);
        });
    }
    fetchOrders();
  }, []);

  const handleLogOut = () => {
    setUser(null);
    removeTokens();
    setTimeout(() => {
      router.push("/users");
    }, 2000);
  }


  const addresses = [
    { id: 1, name: "Domicile", address: "123 Rue Principale, 75000 Paris, France" },
    { id: 2, name: "Bureau", address: "456 Avenue du Travail, 69000 Lyon, France" },
  ]

  const paymentMethods = [
    { id: 1, type: "Visa", last4: "1234", expiry: "12/25" },
    { id: 2, type: "Mastercard", last4: "5678", expiry: "06/24" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=100&width=100" alt={user?.username} />
            <AvatarFallback>{user?.username?.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.username}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="addresses">Adresses</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="preferences">Préférences</TabsTrigger>
            <TabsTrigger value="account">Compte</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold">Commande #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.created_at}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total_price} €</p>
                      <p className="text-sm text-gray-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Adresses enregistrées</CardTitle>
              </CardHeader>
              <CardContent>
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.address}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                ))}
                <Button className="mt-4 w-full">Ajouter une nouvelle adresse</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Méthodes de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold">{method.type} se terminant par {method.last4}</p>
                      <p className="text-sm text-gray-600">Expire le {method.expiry}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                ))}
                <Button className="mt-4 w-full">Ajouter une nouvelle méthode de paiement</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Recevoir des notifications par email</span>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Langue préférée</span>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Devise préférée</span>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Changer le mot de passe</span>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Paramètres de sécurité</span>
                    <Button variant="outline" size="sm">Gérer</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Se deconncter du compte</span>
                    <Button variant="default" onClick={handleLogOut} size="sm">Déconnexion</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Supprimer le compte</span>
                    <Button variant="destructive" size="sm">Supprimer</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

    </div>
  )
}