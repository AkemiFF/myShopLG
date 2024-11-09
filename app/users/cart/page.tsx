"use client"
import ProductCard from "@/components/Card/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/context/UserContext"
import { Product } from "@/lib/store"
import { API_BASE_URL } from "@/utils/api"
import { addToCart, addToCartOffline } from "@/utils/base"
import getAccessToken from "@/utils/cookies"
import { Minus, Plus, X } from 'lucide-react'
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
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const subtotal = cartItems.reduce((acc, item) => acc + item.total_price, 0)
  const shipping = 5.99
  const total = subtotal + shipping
  const [noCart, setNoCart] = useState(false);
  const { user } = useUser();

  const fetchCartItems = async () => {

    if (user) {
      const access = await getAccessToken();
      try {
        const response = await fetch(`${API_BASE_URL}api/cart/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
          },
        });

        if (response.status === 404) {
          setCartItems([]);
          setNoCart(true);
        } else if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles du panier");
        } else {
          const data = await response.json();

          setRecommendedProducts(data.recommended_products)
          setCartItems(data.items);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    } else {

      try {
        const response = await fetch(`${API_BASE_URL}api/cart/`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (response.status === 404) {
          setCartItems([]);
          setNoCart(true);
        } else if (!response.ok) {
          // throw new Error("Erreur lors de la récupération des articles du panier");
          return;
        } else {
          const data = await response.json();
          setRecommendedProducts(data.recommended_products)
          setCartItems(data.items);
          if (data.items.length === 0) {
            setNoCart(true);
          }

        }
      } catch (error) {
      }
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
            {noCart ? null : (

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
            )
            }
          </div>

          <div>
            {noCart ? (
              <Card>
                <CardHeader>
                  <CardTitle> Votre panier est vide</CardTitle>
                </CardHeader>
              </Card>
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
            </Card>


            </>
            )}

          </div>
        </div>
        {noCart ? null : (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Recommandations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )
        }
      </main>
    </div>
  )

}