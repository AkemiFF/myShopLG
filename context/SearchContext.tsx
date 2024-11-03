"use client"
import { Product } from '@/lib/store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface SearchContextType {
    search: Product[] | null;
    setSearch: (search: Product[] | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<Product[] | null>(null);

    // Load search data from localStorage
    useEffect(() => {
        const storedSearch = localStorage.getItem('searchContext');
        if (storedSearch) {
            setSearch(JSON.parse(storedSearch));
        }
    }, []);

    // Save search data to localStorage
    useEffect(() => {
        if (search) {
            localStorage.setItem('searchContext', JSON.stringify(search));
        } else {
            localStorage.removeItem('searchContext');
        }
    }, [search]);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};
