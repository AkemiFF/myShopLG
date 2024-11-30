import { toast } from "react-toastify";
import { API_BASE_URL } from "./api";

export const payCheck = (ref: string): Promise<boolean> => {
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
                    clearInterval(intervalId);
                    resolve(true); // Resolve the promise with true
                } else {
                    console.log('Payment not confirmed yet, checking again...');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        const intervalId = setInterval(checkPaymentStatus, 5000);

        setTimeout(() => {
            clearInterval(intervalId);
            resolve(false);
        }, 600000);
    });
};