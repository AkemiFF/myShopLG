"use client"

import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API_BASE_URL } from "@/utils/api"
import getAccessToken from "@/utils/cookies"
import { initiateCartPayment } from "@/utils/payments"
import { AlertTriangle, Check } from 'lucide-react'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from 'react'

// Placeholder for interfaces and helper functions.  Replace with actual implementations.
interface OrderDetails {
  orderNumber: string;
  totalAmount: number;
}

interface Order {
  id: number;
  status: string;
  is_paid: boolean;
}

interface OrderedItems {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

const baseDetails: OrderDetails = {
  orderNumber: 'ORD-12345',
  totalAmount: 100,
};

const baseItems: OrderedItems[] = [
  { id: 1, name: 'Product 1', image: '/images/product1.jpg', quantity: 2, price: 25 },
  { id: 2, name: 'Product 2', image: '/images/product2.jpg', quantity: 1, price: 50 }
];

const orderStatusSteps = [
  { value: 'pending', label: 'En attente', description: 'Votre commande est en cours de traitement.' },
  { value: 'processing', label: 'En cours de traitement', description: 'Votre commande est en cours de préparation.' },
  { value: 'shipped', label: 'Expédiée', description: 'Votre commande a été expédiée.' },
  { value: 'delivered', label: 'Livrée', description: 'Votre commande a été livrée.' },
];


const fetchOrderDetails = async (orderId: number): Promise<{ orderDetails: OrderDetails, orderedItems: OrderedItems[], order: Order } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
};


export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(baseDetails);
  const [order, setOrder] = useState<Order>();
  const [orderedItems, setOrderedItems] = useState<OrderedItems[]>(baseItems);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchOrderData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const data = await fetchOrderDetails(parseInt(id, 10));
          if (data) {
            setOrderDetails(data.orderDetails);
            setOrder(data.order);
            setOrderedItems(data.orderedItems);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données de la commande :", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrderData();
  }, [id]);

  const handlePayNow = async () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      await initiateCartPayment(parseInt(cartId), router)
    }

    console.log("Paiement en cours...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">



        <Card className="mb-8">
          <CardContent className="pt-6">
            {order?.is_paid ? (
              <>
                <div className="flex items-center space-x-2 text-green-600 mb-4">
                  <Check className="h-6 w-6" />
                  <h1 className="text-2xl font-bold">Commande confirmée</h1>
                </div>
                <p className="text-gray-600">
                  Merci pour votre commande, {orderDetails.orderNumber}. Nous vous enverrons une confirmation par e-mail lorsque vos articles seront expédiés.
                </p>
              </>
            ) : (
              <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-2 text-yellow-600 mb-4">
                  <AlertTriangle className="h-6 w-6" />
                  <h1 className="text-2xl font-bold">Paiement en attente</h1>
                </div>
                <p className="text-gray-600 mb-6">
                  Votre commande {orderDetails.orderNumber} a été reçue, mais le paiement n'a pas encore été effectué. Veuillez procéder au paiement pour confirmer votre commande.
                </p>
                <Button
                  variant="default"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={handlePayNow}
                >
                  Payer maintenant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderedItems.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <img src={API_BASE_URL + item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Quantité: {item.quantity}</p>
                        <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Statut de la commande</h3>
                <div className="relative">

                  <div className="flex justify-between mt-4">
                    {orderStatusSteps.map((step, index) => (
                      <div key={step.value} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2
                            ${orderStatusSteps.findIndex(s => s.value === order?.status) >= index
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 bg-white text-gray-300"
                            }`}
                        >
                          {index + 1}
                        </div>
                        <p className="text-xs text-center font-medium max-w-[80px]">{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-6">
                  {orderStatusSteps.find(step => step.value === order?.status)?.description}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{orderDetails.totalAmount.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Numéro de commande</span>
                    <span>{orderDetails.orderNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </main>
    </div>
  )
}

