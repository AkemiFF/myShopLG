'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_BASE_URL } from '@/utils/api'
import { showAlert, showInfo } from '@/utils/base'
import { setTokens } from '@/utils/cookies'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ForgotPasswordVerifyPage() {
    const [verificationCode, setVerificationCode] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const email = localStorage.getItem('email');
            const response = await fetch(`${API_BASE_URL}api/verify-reset-code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ verification_code: verificationCode, email: email }),
            })

            if (response.ok) {
                showInfo('Code vérifié avec succès')
                localStorage.removeItem('email');
                const data = await response.json();
                setTokens(data.access_token, data.refresh_token);
                router.push('/users/login/forgot-password/reset')
            } else {
                const errorData = await response.json()
                showAlert(errorData.detail || "Code de vérification invalide")
            }
        } catch (error) {
            showAlert("Une erreur s'est produite")
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Vérification du code</CardTitle>
                    <CardDescription>Entrez le code de vérification que vous avez reçu par email.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="verificationCode">Code de vérification</Label>
                            <Input
                                id="verificationCode"
                                type="text"
                                placeholder="Entrez le code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Vérifier le code</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}