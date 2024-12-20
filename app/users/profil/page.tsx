"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfileSkeleton } from "@/components/UserProfileSkeleton"
import { useUser } from "@/context/UserContext"
import { API_BASE_URL } from "@/utils/api"
import getAccessToken, { removeTokens } from "@/utils/cookies"
import { ArrowRight, ChevronDown, ChevronUp, Edit2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
const orderStatusSteps = [
  { value: "pending", label: "Encours de préparation", description: "Votre commande a été reçue et est en cours de traitement." },
  { value: "shipped", label: "Remis au service de livraison", description: "Votre commande a été expédiée et est en route." },
  { value: "in_transit", label: "Arrivé au pays de livraison", description: "Votre commande est arrivée dans le pays de livraison et est en cours de distribution locale." },
  { value: "completed", label: "Arrivé chez vous", description: "Votre commande a été livrée avec succès." },
]
interface Item {
  "product": number,
  "quantity": number,
  "price": string
}

interface Country {
  name: string;
  code: string;
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
interface Address {
  id: number,
  name: string,
  address: string,
  city: string,
  postal_code: string,
  country: string,
  phone_number: string
}
const defaultAddress = {
  id: 0,
  name: "",
  address: "",
  city: "",
  postal_code: "",
  country: "",
  phone_number: ""
}

export default function UserProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [address, setAddress] = useState<Address>(defaultAddress);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address>(defaultAddress);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);


  async function changePassword(currentPassword: any, newPassword: any, confirmPassword: any) {
    try {
      const access = await getAccessToken();
      const response = await fetch(`${API_BASE_URL}/api/client/change-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        showAlert(errorData.detail)
        throw new Error(errorData.detail || 'Erreur lors du changement de mot de passe');
      }

      const data = await response.json();
      showInfo(data.detail || 'Mot de passe modifié avec succès!');
      setIsPasswordDialogOpen(false);
    } catch (error) {
      // console.log('Erreur: ' + (error as Error).message);
    }
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      showAlert('Les mots de passe ne correspondent pas')
      return;
    }
    changePassword(currentPassword, newPassword, confirmPassword);
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-blue-500"
      case "shipped": return "bg-yellow-500"
      case "delivered": return "bg-green-500"
      case "completed": return "bg-purple-500"
      default: return "bg-gray-500"
    }
  }

  const handleEditAddress = () => {
    setEditingAddress({ ...address });
    setIsAddressDialogOpen(true);
  }
  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement> | string,
    fieldName?: string
  ) => {
    if (typeof event === 'string' && fieldName) {
      // Si `event` est une chaîne de caractères, on met directement à jour l'état
      setEditingAddress(prev => ({ ...prev, [fieldName]: event }));
    } else if ((event as React.ChangeEvent<HTMLInputElement>).target) {
      // Utilisation d'un cast explicite pour garantir que `event` est un `ChangeEvent`
      const { name, value } = (event as React.ChangeEvent<HTMLInputElement>).target;
      setEditingAddress(prev => ({ ...prev, [name]: value }));
    }
  };
  const detailPush = (id: number) => {
    router.push(`/users/order/${id}`);
  }
  const handleAddressSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const access = await getAccessToken();
      const response = await fetch(`${API_BASE_URL}/api/update-shipping-info/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify(editingAddress)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de la mise à jour de l\'adresse');
      }

      const data = await response.json();
      setAddress(data);
      showInfo('Adresse mise à jour avec succès!');
      setIsAddressDialogOpen(false);
    } catch (error) {
      console.error('Erreur:', (error as Error).message);
      showAlert('Erreur lors de la mise à jour de l\'adresse');
    }
  }
  const fetchShippingAddress = async () => {
    try {
      const access = await getAccessToken();
      const response = await fetch(`${API_BASE_URL}/api/shipping-info/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de la récupération de l\'adresse de livraison');
      }

      const data = await response.json();
      setAddress(data);
      return data;
    } catch (error) {
      console.error('Erreur:', (error as Error).message);
    }
  };




  const showAlert = (message: string) => {
    toast.error(message, {
      theme: "colored",
      autoClose: 800
    });
  }

  const showInfo = (message: string) => {
    toast.info(message, {
      theme: "colored",
      autoClose: 800
    });
  }


  const fetchOrders = async () => {
    const token = await getAccessToken();
    fetch(`${API_BASE_URL}/api/order/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json())
      .then(data => {
        setOrders(data);
      });
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = await getAccessToken();
      console.log(token);

      if (!token) {
        setUser(null);
        router.push("/");
        return;
      }

      try {
        await Promise.all([
          fetchShippingAddress(),
          fetchOrders(),
          fetch('/json/countries.json').then(response => response.json()).then(data => setCountryList(data))
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <UserProfileSkeleton />;
  }
  const handleLogOut = () => {
    setUser(null);
    removeTokens();
    router.push("/users");
  }



  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=100&width=100" alt={user?.username} />
            <AvatarFallback>{user?.username?.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.username.replace(/_/g, ' ')
            }</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="addresses">Adresses</TabsTrigger>

            {/* <TabsTrigger value="preferences">Préférences</TabsTrigger> */}
            <TabsTrigger value="account">Compte</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card className="w-full max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Historique des commandes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {orders.map((order) => (
                  <div key={order.id} className="border-b last:border-b-0">
                    <div
                      className="flex items-center justify-between py-6 cursor-pointer hover:bg-gray-50 px-6 transition-colors duration-200"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div>
                        <p className="font-semibold text-lg">Commande #{order.id}</p>
                        <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right flex items-center">
                        <div className="mr-6">
                          <p className="font-semibold text-lg">
                            {parseFloat(order.total_price).toFixed(2)} €
                          </p>
                          <Badge variant="secondary" className={`${getStatusColor(order.status)} text-white`}>
                            {orderStatusSteps.find(step => step.value === order.status)?.label}
                          </Badge>
                        </div>
                        {expandedOrder === order.id ? <ChevronUp className="h-6 w-6 text-gray-400" /> : <ChevronDown className="h-6 w-6 text-gray-400" />}
                      </div>
                    </div>
                    {expandedOrder === order.id && (
                      <div className="py-8 px-6 bg-gray-50">
                        <div className="flex items-center justify-between mb-8 relative">
                          {orderStatusSteps.map((step, index) => (
                            <div key={step.value} className="flex flex-col items-center z-10 w-1/4">
                              <div
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3
                          ${orderStatusSteps.findIndex(s => s.value === order.status) >= index
                                    ? `${getStatusColor(order.status)} border-transparent text-white`
                                    : "border-gray-300 bg-white text-gray-300"
                                  }`}
                              >
                                {index + 1}
                              </div>
                              <p className="text-sm text-center font-medium">{step.label}</p>
                            </div>
                          ))}
                          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300 -z-10" />
                          {orderStatusSteps.map((step, index) => {
                            if (index < orderStatusSteps.length - 1) {
                              return (
                                <ArrowRight
                                  key={`arrow-${index}`}
                                  className={`absolute top-4 w-6 h-6 -ml-3
                            ${orderStatusSteps.findIndex(s => s.value === order.status) > index
                                      ? `${getStatusColor(order.status)}`
                                      : "text-gray-300"
                                    }`}
                                  style={{ left: `${(index + 1) * 25}%` }}
                                />
                              )
                            }
                            return null;
                          })}
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                          <p className="text-sm font-semibold mb-2">Statut actuel:</p>
                          <p className="text-sm">
                            {orderStatusSteps.find(step => step.value === order.status)?.description}
                          </p>
                        </div>
                        <Button
                          onClick={() => detailPush(order.id)}
                          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                        >
                          Voir les détails
                        </Button>
                      </div>
                    )}
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
                {
                  <div key={address.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.address}</p>
                      <p className="text-sm text-gray-600">{address.city}, {address.postal_code}</p>
                      <p className="text-sm text-gray-600">{address.country}</p>
                      <p className="text-sm text-gray-600">{address.phone_number}</p>
                    </div>
                    <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={handleEditAddress}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Modifier l'adresse</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddressSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Nom</Label>
                            <Input
                              id="name"
                              name="name"
                              value={editingAddress.name}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="address">Adresse</Label>
                            <Input
                              id="address"
                              name="address"
                              value={editingAddress.address}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">Ville</Label>
                            <Input
                              id="city"
                              name="city"
                              value={editingAddress.city}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="postal_code">Code postal</Label>
                            <Input
                              id="postal_code"
                              name="postal_code"
                              value={editingAddress.postal_code}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Pays</Label>
                            <Select
                              value={editingAddress.country}
                              onValueChange={(value) => handleAddressChange(value, 'country')}
                            >
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Sélectionnez un pays" />
                              </SelectTrigger>
                              <SelectContent>
                                {countryList.map(country => (
                                  <SelectItem key={country.code} value={country.code}>
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="phone_number">Numéro de téléphone</Label>
                            <Input
                              id="phone_number"
                              name="phone_number"
                              value={editingAddress.phone_number}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <Button type="submit">Enregistrer les modifications</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                }
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
                    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Modifier</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Changer le mot de passe</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                          <div>
                            <Label htmlFor="current-password">Mot de passe actuel</Label>
                            <Input
                              id="current-password"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="new-password">Nouveau mot de passe</Label>
                            <Input
                              id="new-password"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                          </div>
                          <Button type="submit">Changer le mot de passe</Button>
                        </form>
                      </DialogContent>
                    </Dialog>                  </div>
                  {/* <div className="flex items-center justify-between">
                    <span>Paramètres de sécurité</span>
                    <Button variant="outline" size="sm">Gérer</Button>
                  </div> */}
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