import { toast } from "react-toastify";
import { API_BASE_URL } from "./api";

export const payCheck = (): Promise<boolean> => {
    let ref = localStorage.getItem("reference_order");
    return new Promise((resolve) => {
        const checkPaymentStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/payments/check/${ref}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.is_paid) {
                    toast.success('Commande effectuée', {
                        theme: "colored",
                        autoClose: 3000,
                    });
                    // localStorage.removeItem("reference_order");
                    clearInterval(intervalId);
                    resolve(true);
                } else {
                    ref = localStorage.getItem("reference_order");
                    console.log('Payment not confirmed yet, checking again... ref: ',ref);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                resolve(false);
            }
        };

        const intervalId = setInterval(checkPaymentStatus, 10000);

        setTimeout(() => {
            clearInterval(intervalId);
            resolve(false);
        }, 600000);
    });
};