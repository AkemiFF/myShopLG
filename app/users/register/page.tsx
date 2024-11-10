'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_BASE_URL } from '@/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const rooter = useRouter();
  async function registerUser(username: any, first_name: any, email: any, password: any) {
    try {
      const response = await fetch(`${API_BASE_URL}api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, first_name, email, password }),
      });

      if (!response.ok) {
        // Affiche les erreurs de validation si la réponse n'est pas 201 Created
        const errorData = await response.json();
        toast.error(errorData.message,
          { duration: 2000 });
        return { success: false, error: errorData };
      }

      const data = await response.json();
      console.log('Utilisateur créé avec succès:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Erreur de requête:', error);
      return { success: false, error };
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.')
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    if (password.length < 8) {
      setError('Doit faire au moins 8 caractères')
      return
    }

    if (!/[A-Z]/.test(password)) {
      setError('Le mot de passe doit contenir au moins une lettre majuscule.');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Le mot de passe doit contenir au moins une lettre minuscule.');
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError('Le mot de passe doit contenir au moins un chiffre.');
      return;
    }
    const username = name.split(' ')[0]
    registerUser(username, name, email, password);
    localStorage.setItem('email_register', email)
    rooter.push('/users/register/verification');
  }
  const setError = (message: string) => {
    toast.error(message);
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>Créez votre compte pour commencer à faire vos achats.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  conditions d'utilisation
                </Link>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={!acceptTerms}>
              Continuer
            </Button>
            <div className="text-center text-sm">
              Vous avez déjà un compte ?{' '}
              <Link href="/users/login" className="text-blue-600 hover:underline">
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}