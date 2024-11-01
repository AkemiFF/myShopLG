import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Review } from "@/lib/store"
import { ChevronRight, Star, ThumbsUp } from 'lucide-react'
import { useState } from "react"

interface ProductReviewsProps {
    reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rating, setRating] = useState(0)

    const handleSubmitReview = (event: React.FormEvent) => {
        event.preventDefault()
        // Handle review submission logic here
        console.log('Review submitted')
        setIsModalOpen(false)
    }
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold">Customer Reviews</CardTitle>
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setIsModalOpen(true)}
                >
                    Write a customer review
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="pb-6 last:pb-0">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="font-bold text-lg">{review.title}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {review.author} | {review.date}
                            </div>
                            <p className="text-gray-700 mb-4">{review.content}</p>
                            <div className="flex items-center text-sm text-gray-500">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{review.helpful} people found this helpful</span>
                            </div>
                            <Separator className="my-4" />
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <Button variant="link" className="text-blue-600 hover:text-orange-500 flex items-center">
                        See all reviews
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Write a customer review</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReview}>
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="rating" className="text-right">
                                    Rating
                                </Label>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-6 w-6 cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                                                }`}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input id="title" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="review" className="text-right">
                                    Review
                                </Label>
                                <Textarea id="review" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">Submit Review</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    )
}