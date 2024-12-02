import { toast } from "react-toastify";
import { API_BASE_URL } from "./api";
import { getAdminAccessToken } from "./cookies";

async function deleteProduct(productId: number) {
    try {
        const access = await getAdminAccessToken();


        const response = await fetch(`${API_BASE_URL}/api/product/${productId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Erreur lors de la suppression du produit : ${errorData.message || response.statusText}`
            );
        }

        const data = await response.json();
        console.log(data);

        const message = 'Produit supprimé avec succès'
        toast.success(message, {
            theme: "colored",
            autoClose: 3000,
        })
        return data;
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        throw error;
    }
}
export default deleteProduct;