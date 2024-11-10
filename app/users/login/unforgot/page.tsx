'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminLayoutContext } from '@/context/AdminLayoutContext'
import { API_BASE_URL } from '@/utils/api'
import { setAdminTokens, setTokens } from '@/utils/cookies'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const { userInfo, setUserInfo } = useAdminLayoutContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      username: email,
      password: password,
    };

    fetch(`${API_BASE_URL}api/user/admin/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        if (!response.ok) {
          toast.error('Mot de passe ou Email incorrecte', {
            theme: "colored",
            autoClose: 3000,
          });

        }
        return response.json();
      })
      .then(data => {

        if (data.is_admin) {
          setTokens(data.token.access, data.token.refresh);
          setAdminTokens(data.token.access, data.token.refresh);
          setUserInfo(data.user_info);
          toast.success('Connexion réussi', {
            theme: "colored",
            autoClose: 2000,
          });
          setTimeout(() => {
            router.push('/admin');
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre compte pour accéder à vos commandes et préférences.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="votre@email.com"
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Se connecter</Button>
            <div className="text-center text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="text-center text-sm">
              Vous n'avez pas de compte ?{' '}
              <Link href="/users/register" className="text-blue-600 hover:underline">
                S'inscrire
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}