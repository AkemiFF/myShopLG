'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_BASE_URL } from '@/utils/api'
import { showAlert, showInfo } from '@/utils/base'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ForgotPasswordEmailPage() {
    const [email, setEmail] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_BASE_URL}/api/forgot-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                showInfo('Un code de vérification a été envoyé à votre email');
                localStorage.setItem("email", email);
                router.push('/users/login/forgot-password/verify')
            } else {
                const errorData = await response.json()
                showAlert(errorData.detail || "Une erreur s'est produite")
            }
        } catch (error) {
            showAlert("Une erreur s'est produite")
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Mot de passe oublié</CardTitle>
                    <CardDescription>Entrez votre adresse email pour recevoir un code de vérification.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Envoyer le code</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}