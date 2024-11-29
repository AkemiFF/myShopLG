import { API_BASE_URL } from "./api";

export const handlePaymentWebhook = async (reference: string, status: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/webhook/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reference,
                status
            })
        });

        if (!response.ok) {
            throw new Error('Erreur lors du traitement du webhook');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur webhook:', error);
        throw error;
    }
};

