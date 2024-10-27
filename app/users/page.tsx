import FeaturedProducts from '@/components/FeaturedProducts'
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations'
import SpecialOffers from '@/components/SpecialOffers'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Bannière engageante */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src="/banner.jpg"
          alt="Bannière promotionnelle"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">Des saveurs locales, un monde à portée de main.</h1>
          <div className="space-x-4">
            <a href="/users/products">
              <Button variant="default">Achetez maintenant</Button>
            </a>
            <a href="/users/products">
              <Button variant="ghost">En savoir plus</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Carrousel d'offres spéciales */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Offres spéciales</h2>
        <SpecialOffers />
      </section>

      {/* Produits en vedette */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Produits en vedette</h2>
        <FeaturedProducts />
      </section>

      {/* Recommandations personnalisées */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recommandé pour vous</h2>
        <PersonalizedRecommendations />
      </section>
    </div>
  )
}