import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-8">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">À propos</h3>
            <p className="text-[hsl(var(--primary-foreground))]">
              Votre boutique en ligne de <br />
              confiance pour tous vos besoins.
            </p>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Liens rapides</h3>
            <ul className="text-[hsl(var(--primary-foreground))] space-y-1">
              <li>
                <Link
                  href="/users/products"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-200"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/users/cart"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-200"
                >
                  Panier
                </Link>
              </li>
              {/* <li><Link href="/users/profil">Mon compte</Link></li> */}
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Informations légales</h3>
            <ul className="text-[hsl(var(--primary-foreground))] space-y-1">
              <li>
                <Link
                  href="/users/help/cgu"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-200"
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="/users/help/faq"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/users/help/contact"
                  className="hover:text-[hsl(var(--accent))] transition-colors duration-200"
                >
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-[hsl(var(--primary-foreground))] mb-2">
              Inscrivez-vous pour recevoir nos offres
            </p>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full p-2 border rounded-md text-[hsl(var(--foreground))]"
            />
          </div>
        </div>

        <div className="border-t border-[hsl(var(--border))] mt-8 pt-8 text-center text-[hsl(var(--primary-foreground))]">
          <p>&copy; 2025 MyShopLG. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
