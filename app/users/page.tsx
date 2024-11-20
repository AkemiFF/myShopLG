"use client"
import ProductCard from '@/components/Card/ProductCard'
import { Category, Product } from '@/lib/store'
import { API_BASE_URL } from '@/utils/api'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const categories = [
  "Électronique",
  "Maison et Jardin"

]
export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}api/product/top-selling/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits les plus vendus');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}api/product/recommended/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits les plus vendus');
        }

        const data = await response.json();
        setRecommendedProducts(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}api/product/categories/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
    fetchCategories();
    fetchRecommendedProducts();
    fetchTopSellingProducts();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">



      {/* Hero Section */}
      <section className="relative h-96">
        <img
          src="/banner.jpg?height=800&width=1200"
          alt="Promotions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Bienvenue dans MyShopLG</h1>
            <p className="text-xl mb-8">Des saveurs locales, un monde à portée de main.</p>
            <Link href="/users/products">
              <button className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-300">
                Voir les produits
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Meilleures ventes</h2>
          <div key="Listproducts" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Explorez nos catégories</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category, index) => (
                <div key={index} className="space-y-2">
                  <Link href="#" className="text-blue-600 hover:underline">
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="inline-flex items-center mt-6 text-orange-500 hover:underline"
            >
              Voir plus de catégories
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Mieux Notée</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}