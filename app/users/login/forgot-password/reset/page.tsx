'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_BASE_URL } from '@/utils/api'
import { showAlert, showInfo } from '@/utils/base'
import getAccessToken, { removeTokens } from '@/utils/cookies'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ForgotPasswordResetPage() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            showAlert("Les mots de passe ne correspondent pas")
            return
        }
        try {
            const access = await getAccessToken();
            const response = await fetch(`${API_BASE_URL}/api/reset-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify({ new_password: newPassword }),
            })

            if (response.ok) {
                showInfo('Mot de passe réinitialisé avec succès');
                removeTokens();
                router.push('/users/login');
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
                    <CardTitle>Réinitialisation du mot de passe</CardTitle>
                    <CardDescription>Entrez votre nouveau mot de passe.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Réinitialiser le mot de passe</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}