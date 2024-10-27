import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FeaturedProducts from '@/components/FeaturedProducts'
import SpecialOffers from '@/components/SpecialOffers'
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations'

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
          <h1 className="text-4xl font-bold mb-4">Découvrez nos nouveautés</h1>
          <div className="space-x-4">
            <Button variant="default">Achetez maintenant</Button>
            <Button variant="outline">En savoir plus</Button>
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