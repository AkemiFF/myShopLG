'use client'

import { Button } from '@/components/ui/button';
import { initiateCartPayment } from '@/utils/payments';

export default function LoginPage() {
    const handlePay = async () => {
        const data = await initiateCartPayment(1);
        console.log(data);
    }
    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
            <Button onClick={handlePay} name='Home' />
        </div>
    )
}