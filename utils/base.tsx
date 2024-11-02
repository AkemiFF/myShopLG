import { toast } from "react-toastify";
import { API_BASE_URL } from "./api";
import getAccessToken from "./cookies";
// utils/api.js (ou dans un fichier de composant)
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}api/product/categories/`);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

export async function addToCartOffline(productId: any, quantity = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}api/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ product_id: productId, quantity: quantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de l\'ajout au panier');
        }

        const data = await response.json();
        toast.success('Ajout éfféctué !', {
            theme: "colored",
            autoClose: 3000,
        });
        return data;
    } catch (error) {
        console.error('Erreur:', (error as Error).message);
        toast.error('Une érreur s\'est produite !', {
            theme: "colored",
            autoClose: 3000,
        });
    }
}
export async function addToCart(productId: any, quantity = 1) {



    const access = await getAccessToken(); try {
        const response = await fetch(`${API_BASE_URL}api/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
            },
            body: JSON.stringify({ product_id: productId, quantity: quantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de l\'ajout au panier');
        }

        const data = await response.json();
        toast.success('Ajout éfféctué !', {
            theme: "colored",
            autoClose: 3000,
        });
        return data;
    } catch (error) {
        console.error('Erreur:', (error as Error).message);
        toast.error('Une érreur s\'est produite !', {
            theme: "colored",
            autoClose: 3000,
        });


    }
}