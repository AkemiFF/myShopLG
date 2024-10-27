'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: 'Mon E-commerce',
    email: 'contact@monecommerce.com',
    address: '123 Rue du Commerce, 75001 Paris',
    allowGuestCheckout: true,
    enableReviews: true,
    enableWishlist: true,
  })

  const [adminPassword, setAdminPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleStoreSettingsChange = (e:any) => {
    const { name, value } = e.target
    setStoreSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (name: string) => {
    setStoreSettings(prev => ({ ...prev, [name]: !prev[name]}));
  };

  const handlePasswordChange = (e:any) => {
    const { name, value } = e.target
    setAdminPassword(prev => ({ ...prev, [name]: value }))
  }

  const handleStoreSettingsSubmit = (e:any) => {
    e.preventDefault()
    // Here you would typically send the updated settings to your backend
    console.log('Updated store settings:', storeSettings)
  }

  const handlePasswordSubmit = (e:any) => {
    e.preventDefault()
    // Here you would typically send the new password to your backend
    console.log('Password change request:', adminPassword)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Paramètres du magasin</TabsTrigger>
          <TabsTrigger value="account">Compte administrateur</TabsTrigger>
        </TabsList>
        <TabsContent value="store">
          <Card>
            <form onSubmit={handleStoreSettingsSubmit}>
              <CardHeader>
                <CardTitle>Paramètres du magasin</CardTitle>
                <CardDescription>
                  Gérez les informations et les paramètres de votre boutique en ligne.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nom du magasin</Label>
                  <Input
                    id="storeName"
                    name="name"
                    value={storeSettings.name}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email de contact</Label>
                  <Input
                    id="storeEmail"
                    name="email"
                    type="email"
                    value={storeSettings.email}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Adresse</Label>
                  <Input
                    id="storeAddress"
                    name="address"
                    value={storeSettings.address}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowGuestCheckout"
                    checked={storeSettings.allowGuestCheckout}
                    onCheckedChange={() => handleToggleChange('allowGuestCheckout')}
                  />
                  <Label htmlFor="allowGuestCheckout">Autoriser les achats sans compte</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableReviews"
                    checked={storeSettings.enableReviews}
                    onCheckedChange={() => handleToggleChange('enableReviews')}
                  />
                  <Label htmlFor="enableReviews">Activer les avis produits</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableWishlist"
                    checked={storeSettings.enableWishlist}
                    onCheckedChange={() => handleToggleChange('enableWishlist')}
                  />
                  <Label htmlFor="enableWishlist">Activer la liste de souhaits</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Enregistrer les modifications</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
                <CardDescription>
                  Mettez à jour le mot de passe de votre compte administrateur.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    name="current"
                    type="password"
                    value={adminPassword.current}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    name="new"
                    type="password"
                    value={adminPassword.new}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    name="confirm"
                    type="password"
                    value={adminPassword.confirm}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Changer le mot de passe</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}