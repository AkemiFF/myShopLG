'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'


const productData = {
  id: 1,
  name: 'T-shirt Premium',
  description: 'Un t-shirt confortable et élégant, parfait pour toutes les occasions.',
  price: 29.99,
  category: 'Vêtements',
  stock: 100,
  image: '/placeholder.svg?height=300&width=300',
}

export default function AdminProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(productData)
  
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Here you would typically update the product in your backend
    // console.log('Updated product:', product)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Détails du produit #{id}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Image du produit</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Changer l'image</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations du produit</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit</Label>
                <Input
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select name="category" value={product.category} onValueChange={(value: any) => handleInputChange({ target: { name: 'category', value } })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vêtements">Vêtements</SelectItem>
                    <SelectItem value="Chaussures">Chaussures</SelectItem>
                    <SelectItem value="Accessoires">Accessoires</SelectItem>
                    <SelectItem value="Électronique">Électronique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Enregistrer les modifications</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}