'use client'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import Link from 'next/link'

export default function CartIndicator() {
  const cart = useStore((state) => state.cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href="/cart">
      <Button variant="outline" className="relative"><
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}