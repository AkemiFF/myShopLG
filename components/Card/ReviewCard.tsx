import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/context/UserContext"
import { Review } from "@/lib/store"
import { API_BASE_URL } from "@/utils/api"
import getAccessToken from "@/utils/cookies"
import { format } from "date-fns"
import { ChevronRight, Star } from 'lucide-react'
import { SetStateAction, useState } from "react"
import { toast } from "react-toastify"

interface ProductReviewsProps {
    reviews: Review[]
    id: number
    fetchProduct: (id: number) => void;
}

export default function ProductReviews({ reviews, id, fetchProduct }: ProductReviewsProps) {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [titleReview, setTitleReview] = useState('');
    const [contentReview, setContentReview] = useState('');
    const [displayedReviews, setDisplayedReviews] = useState(4);

    const handleTitleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setTitleReview(e.target.value);
    };

    const handleContentChange = (e: { target: { value: SetStateAction<string> } }) => {
        setContentReview(e.target.value);
    };

    const handleReviewAdd = (e: any) => {
        if (user) {
            setIsModalOpen(true);
        } else {
            toast.error('Veuillez vous connecter pour ajouter un avis', {
                delay: 300,
                theme: "colored"
            });
        }

    }
    const createReview = async (reviewData: any) => {
        const access = await getAccessToken();
        try {
            const response = await fetch(`${API_BASE_URL}/api/product/reviews/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`, // Si tu utilises des tokens pour l'authentification
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la critique');
            }

            const data = await response.json();
            toast.info('Avis ajouté', {
                delay: 300,
                theme: "colored"
            })
            await fetchProduct(id);
            return data;
        } catch (error) {
            console.error('Erreur:', error);
            toast.info('Vous ne pouvez pas ajouter plus d\'un avis', {
                delay: 300,
                theme: "colored"
            })
            return null;
        }
    };


    const handleSeeMoreReviews = () => {
        setDisplayedReviews(prev => prev + 5)
    }

    const handleSubmitReview = (event: React.FormEvent) => {
        event.preventDefault()
        const reviewData = {
            product: id,
            rating: rating,
            title: titleReview,
            content: contentReview,
        };
        // console.log('Review submitted:', reviewData)
        createReview(reviewData);
        setIsModalOpen(false)
    }
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold">Customer Reviews</CardTitle>
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleReviewAdd}
                >
                    Write a customer review
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {reviews.slice(0, displayedReviews).map((review) => (
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
                                {review.username.replaceAll("_", " ")} | {format(new Date(review.created_at), 'dd MMM yyyy, HH:mm:ss')}
                            </div>
                            <p className="text-gray-700 mb-4">{review.content}</p>
                            <Separator className="my-4" />
                        </div>
                    ))}
                </div>
                {displayedReviews < reviews.length && (
                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="link"
                            className="text-blue-600 hover:text-orange-500 flex items-center"
                            onClick={handleSeeMoreReviews}
                        >
                            See more reviews
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                )}
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
                                <Input
                                    id="title"
                                    value={titleReview}
                                    onChange={handleTitleChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="review" className="text-right">
                                    Review
                                </Label>
                                <Textarea
                                    id="review"
                                    value={contentReview}
                                    onChange={handleContentChange}
                                    className="col-span-3"
                                />
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