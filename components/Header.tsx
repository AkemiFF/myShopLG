"use client"

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useSearch } from '@/context/SearchContext';
import { useUser } from '@/context/UserContext';
import { API_BASE_URL } from '@/utils/api';
import { Home, LogIn, Search, ShoppingCart, User } from 'lucide-react';
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

    fetch(`${API_BASE_URL}api/product/search/?q=${searchValue}`, {
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
    <header className="bg-gray-900 text-white py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/users" className="flex items-center space-x-2">
            {/* <Image src="/png/logo1.png" priority width={80} height={80} alt="ShopLG" className="w-auto h-12 sm:h-16" /> */}
            {/* <Image src="/png/logo1.png" width={80} height={80} alt="ShopLG" className="w-auto h-12 sm:h-16" /> */}
            <Home className="mr-2 h-5 w-5" /><span> Home</span>
          </Link>
        </div>
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products"
              className="w-full py-2 pl-4 pr-10 rounded-full text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700" aria-label="Submit search">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/users/products" passHref>
            <Button variant="ghost" className="text-white hover:bg-gray-800">Products</Button>
          </Link>
          <Link href="/users/cart" passHref>
            <Button variant="ghost" className="text-white hover:bg-gray-800">
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
            </Button>
          </Link>
          {/* <div className="bg-transparent bg-clip-padding  hover:bg-gray-800"> */}
          {user ? (
            <Link href="/users/profil" passHref>
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                <User className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/users/login" passHref>
                <Button variant="outline" className="text-black border-white hover:bg-gray-900 hover:text-white transition-colors duration-200">
                  <LogIn className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
              {/* <Link href="/users/register" passHref>
                <Button variant="link" className=" text-white hover:bg-blue-700 transition-colors duration-200">
                  <span className="hidden sm:inline">Sign Up</span>
                </Button>
              </Link> */}
            </div>
          )}
          {/* </div> */}
        </nav>
      </div>
    </header>
  );
}