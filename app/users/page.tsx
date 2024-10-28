"use client"
import { ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function Homepage() {


  return (
    <div className="min-h-screen bg-gray-100">

      {/* 
      <nav className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center overflow-x-auto">
          <a href="#" className="whitespace-nowrap px-3 py-1 hover:bg-gray-700 rounded">Électronique</a>
          <a href="#" className="whitespace-nowrap px-3 py-1 hover:bg-gray-700 rounded">Vêtements</a>
          <a href="#" className="whitespace-nowrap px-3 py-1 hover:bg-gray-700 rounded">Maison</a>
          <a href="#" className="whitespace-nowrap px-3 py-1 hover:bg-gray-700 rounded">Livres</a>
          <a href="#" className="whitespace-nowrap px-3 py-1 hover:bg-gray-700 rounded">Sports</a>
          <a href="#" className="whitespace-nowrap px-3 py-1 hover:bg-gray-700 rounded">Beauté</a>
        </div>
      </nav> 
      */}

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-lg transition duration-300">
                <img src={`/placeholder.svg?height=200&width=200&text=Produit ${item}`} alt={`Produit ${item}`} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="font-semibold mb-2">Produit populaire {item}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                  <span className="text-sm ml-1">(123)</span>
                </div>
                <p className="text-red-600 font-bold">19,99 €</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Explorez nos catégories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Électronique</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Smartphones</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Ordinateurs portables</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Accessoires</a></li>
              </ul>
              <a href="#" className="inline-flex items-center mt-4 text-orange-500 hover:underline">
                Voir plus <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mode</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Vêtements homme</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Vêtements femme</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Chaussures</a></li>
              </ul>
              <a href="#" className="inline-flex items-center mt-4 text-orange-500 hover:underline">
                Voir plus <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Maison et Jardin</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Meubles</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Décoration</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Jardinage</a></li>
              </ul>
              <a href="#" className="inline-flex items-center mt-4 text-orange-500 hover:underline">
                Voir plus <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Recommandé pour vous</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-lg transition duration-300">
                <img src={`/placeholder.svg?height=200&width=200&text=Recommandation ${item}`} alt={`Recommandation ${item}`} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="font-semibold mb-2">Produit recommandé {item}</h3>
                <p className="text-sm text-gray-600 mb-2">Description courte du produit...</p>
                <p className="text-red-600 font-bold">29,99 €</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}