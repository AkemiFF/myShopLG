'use client'
import { } from "next/navigation";
import { API_BASE_URL } from "./api";
import { CreateOrder } from "./order";
import { payCheck } from "./payCheck";
import fetchTaskStatus from "./task";

const initiatePayment = async () => {
    const paymentData = {
        montant: 78.5,
        reference: "ABC-1234",
        panier: "panier123",
        devise: "Euro",
        notif_url: "https://shoplg.online/users/notifications/",
        redirect_url: "https://shoplg.online/users/success/"
    };

    try {
        const response = await fetch(`${API_BASE_URL}/payments/init-payment/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Vérifiez si l'URL est présente dans le résultat
        if (result.Data && result.Data.url) {

            const windowFeatures = "width=600,height=800,scrollbars=yes,resizable=yes";

            // Ouvrir une nouvelle fenêtre avec les options définies
            const newWindow = window.open(result.Data.url, '_blank', windowFeatures);
            // window.open(result.Data.url, '_blank');
            if (!newWindow) {
                alert('Popup blocked by the browser. Please allow popups for this site.');
            }
        } else {
            console.error('URL not found in the response:', result);
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
    }
}

export const initiateCartPayment = async (cartId: number, router: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/async-cart-pay/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: cartId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const run = await response.json();

        const result = await fetchTaskStatus(run.task_id)
        // Vérifiez si l'URL est présente dans le résultat
        if (result.result && result.result?.Data?.url) {
            const url = result.result?.Data?.url;
            const reference = result.result?.reference;
            const orderData = localStorage.getItem("orderData");
            localStorage.setItem("reference_order", reference)
            console.log(orderData);

            if (orderData) {
                localStorage.setItem("cartId", cartId.toString());
                const orderJson = JSON.parse(orderData);
                orderJson.reference = reference;
                CreateOrder(orderJson);
            }

            localStorage.removeItem("orderData");
            const newWindow = window.open(url, '_blank');

            if (!newWindow) {
                alert('Popup blocked by the browser. Please allow popups for this site.');
                router.push(url)
            }
            const payStatus = await payCheck(reference);

            if (payStatus) {
                return true;
            }
        } else {
            console.error('URL not found in the response:', result);
            return false;

        }
    } catch (error) {
        console.error('Error initiating payment:', error); return false;
    }
}
export default initiatePayment;