import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">À propos</h3>
            <p className="text-gray-600">Votre boutique en ligne de <br />confiance pour tous vos besoins.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Liens rapides</h3>
            <ul className="text-gray-600">
              <li><Link href="/users/products">Produits</Link></li>
              <li><Link href="/users/cart">Panier</Link></li>
              <li><Link href="/users/profil">Mon compte</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Informations légales</h3>
            <ul className="text-gray-600">
              <li><Link href="/help/cgu">CGU</Link></li>
              <li><Link href="/help/faq">FAQ</Link></li>
              <li><Link href="/help/contact">Contactez-nous</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-gray-600 mb-2">Inscrivez-vous pour recevoir nos offres</p>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>


        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2025 MyShopLG. All rights reserved.</p>        </div>
      </div>
    </footer>
  )
}
