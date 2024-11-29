import { toast } from "react-toastify";
import { API_BASE_URL } from "./api";
import getAccessToken from "./cookies";
interface Order {
    user: number,
    total_price: number,
    shipping_address: {
        phone_number: number,
        address: string,
        city: string,
        postal_code: number,
        country: string,
    },
}
export const CreateOrder = async (orderData: Order) => {
    const access = await getAccessToken();
    try {

        const response = await fetch(`${API_BASE_URL}/api/order/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(access ? { 'Authorization': `Bearer ${access}` } : {}),
            },
            credentials: !access ? 'include' : undefined,
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création de la commande');
        }

        const data = await response.json();
        toast.success('Commande éffectué', {
            theme: "colored",
            autoClose: 3000,
        })

    }
    catch (error) {
        console.error("Erreur:", error);
    }
}