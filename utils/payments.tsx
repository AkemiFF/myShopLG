'use client'
import { } from "next/navigation";
import { API_BASE_URL } from "./api";
import { CreateOrder } from "./order";
import { payCheck } from "./payCheck";
import fetchTaskStatus from "./task";


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

            if (orderData) {
                localStorage.setItem("reference_order", reference);
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
            const payStatus = await payCheck();

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

export const initiateRefPayment = async (ref: string, router: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/async-ref-pay/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ref: ref })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const run = await response.json();

        const result = await fetchTaskStatus(run.task_id)
        // Vérifiez si l'URL est présente dans le résultat
        if (result.result && result.result?.Data?.url) {
            const url = result.result?.Data?.url;
            localStorage.setItem("reference_order", ref)
            localStorage.removeItem("orderData");
            const newWindow = window.open(url, '_blank');

            if (!newWindow) {
                alert('Popup blocked by the browser. Please allow popups for this site.');
                router.push(url)
            }
            const payStatus = await payCheck();

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
export default initiateCartPayment;