import '@/app/globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'ShopLG',
  description: 'Des saveurs locales, un monde à portée de main.',
}

export default function UsersLayout({

  children,
}: {
  children: React.ReactNode
}) {

  return (

    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>

  )
}