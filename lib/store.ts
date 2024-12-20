import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}
interface ProductImage {
  image: string;
}
export interface Review {
  created_at: string;
  username: string;
  id: string;
  rating: number;
  title: string;
  author: string;
  date: string;
  content: string;
  helpful: number;
}
// Interface principale pour Product
export interface Product {
  rating: number
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  weight: string;
  length: string;
  width: string;
  height: string;
  sku: string;
  average_rating: number;
  review_count: number;
  category: Category;
  images: ProductImage[];
  reviews: Review[];
}
export interface Category {
  id: string;
  name: string;
  fr_name: string;
  description?: string;
}
interface User {
  id: number
  name: string
  email: string
}

interface StoreState {
  cart: CartItem[]
  user: User | null
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  login: (user: User) => void
  logout: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      user: null,
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] }
        }),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'e-commerce-store',
    }
  )
)