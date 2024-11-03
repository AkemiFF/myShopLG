"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/context/UserContext"
import { API_BASE_URL } from '@/utils/api'
import { fetchClientInfo } from "@/utils/base"
import getAccessToken from '@/utils/cookies'
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
interface CartItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  description: string;
  total_price: number;
  image_url: string | null;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 5.99
  const [number, setNumber] = useState<string>();
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');


  const [userShippingInfo, setShippingUserInfo] = useState<any>(null);
  const total = subtotal + shipping
  const { user } = useUser();
  const router = useRouter();


  const checkForm = () => {
    // Vérifie si des champs sont vides
    if (!email) {
      showAlert("Veuillez entrer votre adresse email.");
      return false;
    }
    if (!lastName) {
      showAlert("Veuillez entrer votre nom.");
      return false;
    }
    if (!number) {
      showAlert("Veuillez entrer votre numéro de téléphone.");
      return false;
    }
    if (!address) {
      showAlert("Veuillez entrer votre adresse.");
      return false;
    }
    if (!city) {
      showAlert("Veuillez entrer votre ville.");
      return false;
    }
    if (!postalCode) {
      showAlert("Veuillez entrer votre code postal.");
      return false;
    }
    if (!country) {
      showAlert("Veuillez sélectionner votre pays.");
      return false;
    }

    return true; // Tous les champs sont valides
  };

  const showAlert = (message: string) => {
    toast.error(message, {
      theme: "colored",
      autoClose: 3000,
    })
  }
  const fetchCartItems = async () => {
    const access = await getAccessToken();
    try {
      const response = await fetch(`${API_BASE_URL}api/cart/`, {
        headers: {
          "Content-Type": "application/json",
          ...(access ? { "Authorization": `Bearer ${access}` } : {}),
        },
        credentials: !access ? 'include' : undefined,
      });

      if (response.status === 404) {
        setCartItems([]);
        console.log("Votre panier est vide");
      } else if (!response.ok) {
        throw new Error("Erreur lors de la récupération des articles du panier");
      } else {
        const data = await response.json();
        setCartItems(data.items);
      }
    } catch (error) {
      // console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    const getClientInfo = async () => {
      const info = await fetchClientInfo();
      if (info) {
        setShippingUserInfo(info.shipping_addresses);
      }
    };

    getClientInfo()
  }, []);
  const handlePayement = async () => {
    return true
  }

  const handleSubmit = async (e: any) => {
    // const check = checkForm();
    // if (!check) {
    //   return;
    // }
    const approuvedPayment = await handlePayement();

    if (approuvedPayment) {
      CreateOrder();
    }
  }

  const CreateOrder = async () => {
    const access = await getAccessToken();
    try {

      const response = await fetch(`${API_BASE_URL}api/order/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(access ? { 'Authorization': `Bearer ${access}` } : {}),
        },
        credentials: !access ? 'include' : undefined,
        body: JSON.stringify({
          user: user?.id,
          total_price: total,
          shipping_address: {
            phone_number: number,
            address: address,
            city: city,
            postal_code: postalCode,
            country: country,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la commande');
      }

      const data = await response.json();
      toast.success('Commande éffectué', {
        theme: "colored",
        autoClose: 3000,
      })
      setTimeout(() => {
        router.push('/users/profil');
      }, 1000);
    }
    catch (error) {
      console.error("Erreur:", error);
    }
  }
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setLastName(user.username);
    }

    if (userShippingInfo && userShippingInfo.length !== 0) {
      setEmail(userShippingInfo.email || '');
      setNumber(userShippingInfo.phone_number || '');
      setAddress(userShippingInfo.address || '');
      setCity(userShippingInfo.city || '');
      setPostalCode(userShippingInfo.postal_code || '');
      setCountry(userShippingInfo.country || '');
    }
  }, [user, userShippingInfo]);

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adresse de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lastName">Nom Complet</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} // Mettre à jour l'état
                      />
                    </div>
                    <div>
                      <Label htmlFor="firstName">Contact</Label>
                      <Input
                        id="contact"
                        placeholder="+01 00 000 000"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} // Mettre à jour l'état
                      />
                    </div>
                    <div>
                      <Label htmlFor="firstName">Email</Label>
                      <Input
                        id="email"
                        placeholder="trucdechose@truc.truc"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état
                      />
                    </div>

                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      placeholder="123 Rue Principale"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)} // Mettre à jour l'état
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        placeholder="Paris"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} // Mettre à jour l'état
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        placeholder="75000"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)} // Mettre à jour l'état
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Pays</Label>
                    <Select value={country} onValueChange={setCountry}> {/* Mettre à jour l'état */}
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="be">Belgique</SelectItem>
                        <SelectItem value="ch">Suisse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Méthode de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Carte de crédit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>

                <form className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Date d'expiration</Label>
                      <Input id="expiryDate" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Méthode de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard (3-5 jours ouvrés)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express (1-2 jours ouvrés)</Label>
                  </div>
                </RadioGroup>
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
                  {cartItems.map((item) => (
                    <div key={item.product_id} className="flex justify-between">
                      <span>{item.product_name} (x{item.quantity})</span>
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      <span>{shipping.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full mt-4">Confirmer la commande</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>


    </div>
  )
}
