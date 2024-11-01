import { API_BASE_URL } from "./api";

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
