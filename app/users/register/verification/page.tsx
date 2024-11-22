'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_BASE_URL } from '@/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { toast } from 'react-toastify'

export default function ConfirmCodePage() {
  const [code, setCode] = useState('')
  const [accept, setAccept] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (code.length === 6) {
      setAccept(true);
      setTimeout(() => {
        handleSubmit();
      }, 500);
    } else {
      setAccept(false);
    }
  }, [code]);
  async function verifyCode(email: any, code: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData, {
          theme: "colored",
          autoClose: 3000,
        });
        return { success: false, error: errorData };
      }

      const data = await response.json();
      toast.success("Compte vérifié", {
        theme: "colored",
        autoClose: 3000,
      });
      return { success: true, data };
    } catch (error) {
      console.error('Erreur de requête:', error);
      return { success: false, error };
    }
  }
  const handleSubmit = async () => {

    const email = localStorage.getItem("email_register");
    const res = await verifyCode(email, code)
    router.push("/users/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>Créez votre compte pour commencer à faire vos achats.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Code de vérification</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='text-center font-bold'
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" onClick={() => { handleSubmit() }} className="w-full" disabled={!accept}>
            S'inscrire
          </Button>
          <div className="text-center text-sm">
            Vous avez déjà un compte ?{' '}
            <Link href="/users/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}