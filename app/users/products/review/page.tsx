import React from 'react'
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ProductReviewsPage() {
  const product = {
    name: "Produit Incroyable",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    totalReviews: 1234
  }

  const reviews = [
    { id: 1, author: "Jean D.", rating: 5, date: "27 octobre 2023", title: "Excellent produit !", content: "Ce produit a dépassé toutes mes attentes. Je le recommande vivement !", helpful: 45, unhelpful: 2 },
    { id: 2, author: "Marie L.", rating: 4, date: "15 octobre 2023", title: "Très bon, mais...", content: "Le produit est de bonne qualité, mais la livraison a pris plus de temps que prévu.", helpful: 20, unhelpful: 1 },
    { id: 3, author: "Pierre M.", rating: 3, date: "5 octobre 2023", title: "Correct, sans plus", content: "Le produit remplit sa fonction, mais il n'a rien d'exceptionnel pour son prix.", helpful: 15, unhelpful: 5 },
  ]

  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto py-8">
        <div className="flex items-center space-x-4 mb-8">
          <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-5 w-5 ${star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-xl font-semibold">{product.rating}</span>
              <span className="ml-2 text-gray-600">({product.totalReviews} avis)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Avis des clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="helpful">Plus utiles</SelectItem>
                    <SelectItem value="highest">Meilleures notes</SelectItem>
                    <SelectItem value="lowest">Moins bonnes notes</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
              {reviews.map((review) => (
                <div key={review.id} className="border-b py-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 font-semibold">{review.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Par {review.author} le {review.date}</p>
                  <p className="mb-2">{review.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Utile ({review.helpful})
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Pas utile ({review.unhelpful})
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4">Charger plus d'avis</Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
              </CardHeader>
              <CardContent>
                {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center mb-2">
                    <span className="w-16">{rating.stars} étoiles</span>
                    <Progress value={rating.percentage} className="h-4 flex-1 mx-2" />
                    <span className="w-12 text-right">{rating.percentage}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Écrire un avis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Votre note</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="review-title" className="block text-sm font-medium mb-1">Titre de l'avis</label>
                    <input
                      type="text"
                      id="review-title"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Résumez votre avis en un titre"
                    />
                  </div>
                  <div>
                    <label htmlFor="review-content" className="block text-sm font-medium mb-1">Votre avis</label>
                    <Textarea
                      id="review-content"
                      placeholder="Qu'avez-vous aimé ou pas ? Pour quoi utilisez-vous ce produit ?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button className="w-full">Soumettre l'avis</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
