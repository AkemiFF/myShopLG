'use client'

import OrderStatus from '@/components/OrderStatus'
import { payCheck } from '@/utils/payCheck'
import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'


export default function OrderConfirmation() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOrderAccepted, setIsOrderAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    const verifyOrder = async () => {
      const check = await payCheck();
      console.log(check);

      if (check) {
        setIsOrderAccepted(true);
        setIsLoading(false);
      } else {
        setIsOrderAccepted(false)
        setIsLoading(false);
      }
    }
    verifyOrder();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoadingSpinner visible={isLoading} />
      {!isLoading && <OrderStatus isAccepted={isOrderAccepted} />}
    </div>
  )
}

