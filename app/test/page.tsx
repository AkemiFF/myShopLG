'use client'

import { Button } from '@/components/ui/button';
import { payCheck } from '@/utils/payCheck';
import { initiateCartPayment } from '@/utils/payments';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
    const router = useRouter()
    const handlePay = async () => {
        const data = await initiateCartPayment(1, router);
        console.log(data);
    }
    useEffect(() => {
        const res = payCheck('REF4835T150P0')
        console.log(Promise.resolve(res));

    }, []);

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
            <Button onClick={handlePay} name='Home' />
        </div>
    )
}