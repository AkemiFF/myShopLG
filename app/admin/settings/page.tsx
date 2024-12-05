'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStoreSettings } from '@/context/StoreSettingsContext'
import { API_BASE_URL } from "@/utils/api"
import getAccessToken from "@/utils/cookies"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from "react-toastify"

export default function AdminSettingsPage() {
  const { storeSettings, setStoreSettings } = useStoreSettings();

  const [settings, setSettings] = useState({
    name: storeSettings.name,
    email: storeSettings.email,
    address: storeSettings.address,
    allowGuestCheckout: storeSettings.allowGuestCheckout,
    enableReviews: storeSettings.enableReviews,
    enableWishlist: storeSettings.enableWishlist,
  })

  const [adminPassword, setAdminPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handlesettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (name: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdminPassword(prev => ({ ...prev, [name]: value }))
  }

  const handlesettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreSettings(settings);
    setSuccessMessage('Paramètres du magasin mis à jour avec succès')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new password to your backend
    if (adminPassword.new !== adminPassword.confirm) {
      setErrorMessage('Les nouveaux mots de passe ne correspondent pas')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    // console.log('Password change request:', adminPassword)
    setSuccessMessage('Mot de passe mis à jour avec succès')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  async function clearCache() {
    try {
      const access = await getAccessToken()
      const response = await fetch(`${API_BASE_URL}/api/clear-cache/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        },

      });

      if (!response.ok) {
        throw new Error('Failed to clear cache');
      }

      const data = await response.json();
      console.log('Cache Effacé:', data.message);
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 500,
      });
      alert('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert('Error clearing cache');
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-[#EAEDED]">
      <h1 className="text-3xl font-bold text-[#232F3E]">Paramètres</h1>

      {successMessage && (
        <Alert variant="default" className="bg-[#EAF6EC] border-[#067D68] text-[#067D68]">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Succès</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive" className="bg-[#FFF5F5] border-[#D13212] text-[#D13212]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="store" className="space-y-4">
        <TabsList className="bg-[#232F3E] text-white">
          <TabsTrigger value="store" className="data-[state=active]:bg-[#FF9900] data-[state=active]:text-[#232F3E]">Cache</TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-[#FF9900] data-[state=active]:text-[#232F3E]">Compte administrateur</TabsTrigger>
        </TabsList>
        <TabsContent value="store">
          <Card className="bg-white shadow-sm">
            <form onSubmit={handlesettingsSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl text-[#232F3E]">Paramètres du magasin</CardTitle>
                <CardDescription className="text-[#545B64]">
                  Effacer les caches en cas de cache plein
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button type="submit" onClick={clearCache} className="bg-[#ff8000] hover:bg-[#ff3131] text-[#232F3E] font-bold">Effacer les caches</Button>
                </div>
              </CardContent>

            </form>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card className="bg-white shadow-sm">
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl text-[#232F3E]">Changer le mot de passe</CardTitle>
                <CardDescription className="text-[#545B64]">
                  Mettez à jour le mot de passe de votre compte administrateur.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[#232F3E]">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    name="current"
                    type="password"
                    value={adminPassword.current}
                    onChange={handlePasswordChange}
                    className="border-[#D5D9D9] focus:border-[#FF9900] focus:ring-[#FF9900]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-[#232F3E]">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    name="new"
                    type="password"
                    value={adminPassword.new}
                    onChange={handlePasswordChange}
                    className="border-[#D5D9D9] focus:border-[#FF9900] focus:ring-[#FF9900]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#232F3E]">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    name="confirm"
                    type="password"
                    value={adminPassword.confirm}
                    onChange={handlePasswordChange}
                    className="border-[#D5D9D9] focus:border-[#FF9900] focus:ring-[#FF9900]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-[#FF9900] hover:bg-[#FFAC31] text-[#232F3E] font-bold">Changer le mot de passe</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}