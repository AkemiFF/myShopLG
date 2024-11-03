"use client"

import ProductCard from "@/components/Card/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { useSearch } from "@/context/SearchContext"
import { Category, Product } from "@/lib/store"
import { API_BASE_URL } from "@/utils/api"
import { fetchCategories } from "@/utils/base"
import { ChevronDown, Sliders, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchPage() {
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState('featured')
    const [minRating, setMinRating] = useState(0)
    const { search, setSearch } = useSearch();
    const [mainData, setMainData] = useState<Product[]>([]);
    const productsPerPage = 24
    const handlePriceRangeChange = (value: number[]) => {
        if (value.length === 2) {
            setPriceRange([value[0], value[1]]);
        }
    };

    useEffect(() => {
        return setProducts(search || mainData)
    }, [search, setSearch]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCategories = await fetchCategories()
            setCategories(fetchedCategories)

            try {
                const response = await fetch(`${API_BASE_URL}api/product/`)
                const data = await response.json()
                setProducts(data);
                setMainData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error)
            }
        }
        if (!search || search.length === 0) {
            fetchData()
        }

    }, [])

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category.name === selectedCategory;
        const matchesPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = product.average_rating >= minRating;
        return matchesCategory && matchesPrice && matchesSearch && matchesRating;
    });



    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return Number(a.price) - Number(b.price)
            case 'price-desc':
                return Number(b.price) - Number(a.price)
            case 'rating':
                return b.average_rating - a.average_rating
            default:
                return 0
        }
    })

    const currentProducts = sortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    )

    const clearFilter = () => {
        setSearchTerm("");
        setSelectedCategory("All");
        setPriceRange([0, 1000]);
        setMinRating(0);
        setProducts(mainData);
    }



    const FilterContent = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        key="all"
                        variant={selectedCategory === "All" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("All")}
                        className="text-xs sm:text-sm"
                    >
                        All                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.name ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.name)}
                            className="text-xs sm:text-sm"
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Prix</h3>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="w-full"
                />
                <div className="flex items-center justify-between mt-2">
                    <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 h-8 text-xs sm:text-sm"
                    />
                    <span>-</span>
                    <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 h-8 text-xs sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Avis client</h3>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <Button
                            key={rating}
                            variant={minRating === rating ? "default" : "outline"}
                            onClick={() => setMinRating(rating)}
                            className="w-full justify-start text-xs sm:text-sm"
                        >
                            {Array(rating).fill(0).map((_, i) => (
                                <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-2">et plus</span>
                        </Button>
                    ))}
                </div>
            </div>
            <Button
                key="clear"
                variant="default"
                onClick={() => clearFilter()}
                className="w-full justify-center text-center text-xs sm:text-sm"
            >
                Clear Filter
            </Button>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar for larger screens */}
                    <aside className="hidden md:block w-64 space-y-6">
                        <FilterContent />
                    </aside>

                    {/* Mobile filter button */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="md:hidden mb-4">
                                <Sliders className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <FilterContent />
                        </SheetContent>
                    </Sheet>

                    {/* Main content */}
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        Sort by <ChevronDown className="ml-1 h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-56">
                                    <div className="space-y-2">
                                        {['featured', 'price-asc', 'price-desc', 'rating'].map((option) => (
                                            <Button
                                                key={option}
                                                variant="ghost"
                                                onClick={() => setSortBy(option)}
                                                className="w-full justify-start"
                                            >
                                                {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                                            </Button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}