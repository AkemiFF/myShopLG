"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/context/UserContext"
import { API_BASE_URL } from "@/utils/api"
import { addToCart, addToCartOffline } from "@/utils/base"
import getAccessToken from "@/utils/cookies"
import { Minus, Plus, Truck, X } from 'lucide-react'
import { useEffect, useState } from "react"

interface CartItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  description: string;
  total_price: number;
  image_url: string | null;
}


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const subtotal = cartItems.reduce((acc, item) => acc + item.total_price, 0)
  const shipping = 5.99
  const total = subtotal + shipping
  const [noCart, setNoCart] = useState(false);
  const { user } = useUser();

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
        setNoCart(true);
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


  const handleRemoveItem = async (productId: number) => {
    try {
      if (user) {
        // Pour les utilisateurs connectés
        const access = await getAccessToken();
        const response = await fetch(`${API_BASE_URL}api/cart/remove/item/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur API :", errorData.error || "Une erreur est survenue.");
        } else {
          const data = await response.json();
          if (data.error) {
            console.error(data.error);
          } else {
            fetchCartItems();  // Actualiser les articles du panier
          }
        }
      } else {
        // Pour les utilisateurs non connectés
        const response = await fetch(`${API_BASE_URL}api/cart/remove/item/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ product_id: productId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur API :", errorData.error || "Une erreur est survenue.");
        } else {
          const data = await response.json();
          if (data.error) {
            console.error(data.error);
          } else {
            fetchCartItems();  // Actualiser les articles du panier
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la réduction de l'article du panier:", error);
    }
  }
  const decreaseCartItem = async (productId: number) => {
    try {
      if (user) {
        // Pour les utilisateurs connectés
        const access = await getAccessToken();
        const response = await fetch(`${API_BASE_URL}api/cart/decrease/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur API :", errorData.error || "Une erreur est survenue.");
        } else {
          const data = await response.json();
          if (data.error) {
            console.error(data.error);
          } else {
            fetchCartItems();  // Actualiser les articles du panier
          }
        }
      } else {
        // Pour les utilisateurs non connectés
        const response = await fetch(`${API_BASE_URL}api/cart/decrease/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ product_id: productId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur API :", errorData.error || "Une erreur est survenue.");
        } else {
          const data = await response.json();
          if (data.error) {
            console.error(data.error);
          } else {
            fetchCartItems();  // Actualiser les articles du panier
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la réduction de l'article du panier:", error);
    }
  };

  const handleMoreProduct = async (productId: number) => {
    if (user) {
      await addToCart(productId, 1);
    } else {
      await addToCartOffline(productId, 1);
    }
    fetchCartItems();
  }

  const handleLessProduct = async (productId: number) => {
    await decreaseCartItem(productId);
    fetchCartItems();
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Votre panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Articles dans votre panier</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                    <img src={item.image_url ? API_BASE_URL + item.image_url : "/placeholder.svg"} alt={item.product_name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button onClick={() => handleLessProduct(item.product_id)} variant="outline" size="icon">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>

                        <Button onClick={() => handleMoreProduct(item.product_id)} variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button onClick={() => handleRemoveItem(item.product_id)} variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            {noCart ? (
              <>
                Votre panier est vide
              </>
            ) : (<><Card>
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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
                <a href="/users/cart/checkout">
                  <Button className="w-full mt-4">Procéder au paiement</Button>
                </a>
              </CardContent>
            </Card><Card className="mt-4">
                <CardHeader>
                  <CardTitle>Options de livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une option de livraison" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        <div className="flex items-center">
                          <Truck className="mr-2 h-4 w-4" />
                          <span>Livraison standard (3-5 jours)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="express">
                        <div className="flex items-center">
                          <Truck className="mr-2 h-4 w-4" />
                          <span>Livraison express (1-2 jours)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </>
            )}

          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Recommandations</h2>
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