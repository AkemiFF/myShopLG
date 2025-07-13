"use client"

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useSearch } from '@/context/SearchContext';
import { useUser } from '@/context/UserContext';
import { API_BASE_URL } from '@/utils/api';
import { LogIn, Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useUser();
  const { search, setSearch } = useSearch();
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSearch(searchValue);
    const onSearchUrl = window.location.href.endsWith("/products/search");
    if (!onSearchUrl) {
      router.push("/users/products/search")
    }
  };

  const fetchSearch = (searchValue: string) => {

    fetch(`${API_BASE_URL}/api/product/search/?q=${searchValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((data) => {
        setSearch(data);
      });
  }

  return (
<header className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
  <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
    <div className="flex items-center space-x-4">
      <Link href="/users" className="flex items-center space-x-2">
        <Image src="/png/favicon.png" width={80} height={80} alt="ShopLG" className="w-auto h-12 sm:h-16" />
      </Link>
    </div>

    <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Rechercher des produits"
          className="w-full py-2 pl-4 pr-10 rounded-full text-[hsl(var(--foreground))] bg-white focus:ring-2 focus:ring-[hsl(var(--secondary))]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Rechercher des produits"
        />
        <button
          type="submit"
          className="absolute right-3 top-2.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-200"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>

    <nav className="flex items-center space-x-2 sm:space-x-4">
      <Button
        variant="ghost"
        onClick={() => router.push('/users/products')}
        className="text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)] transition-colors duration-200"
      >
        Products
      </Button>

      <Button
        variant="ghost"
        onClick={() => router.push('/users/cart')}
        className="text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)] transition-colors duration-200"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        <span className="hidden sm:inline">Cart</span>
      </Button>

      {user ? (
        <Button
          onClick={() => router.push('/users/profil')}
          variant="ghost"
          className="text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)] transition-colors duration-200"
        >
          <User className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Account</span>
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push('/users/login')}
            className="text-[hsl(var(--foreground))] border-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)] hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
          >
            <LogIn className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </div>
      )}
    </nav>
  </div>
</header>

  );
}