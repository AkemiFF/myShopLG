import { AdminLayoutProvider } from '@/context/AdminLayoutContext';
import { StoreSettingsProvider } from '@/context/StoreSettingsContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous d'importer les styles
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopLG',
  description: 'Des saveurs locales, un monde à portée de main.',
  icons: "/png/favicon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreSettingsProvider>
      <AdminLayoutProvider>
        <html lang="fr">
          <body className={inter.className}>
            <main className="min-h-screen">
              {children}
            </main>
            <ToastContainer />
          </body>
        </html>
      </AdminLayoutProvider>
    </StoreSettingsProvider>
  );
}
