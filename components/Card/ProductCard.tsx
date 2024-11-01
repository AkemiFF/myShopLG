import { Product } from "@/lib/store";
import { MoreHorizontalIcon, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";


const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
            src={`${product.images[0] ? product.images[0].image : "/placeholder.svg"}?height=200&width=200&text=Product ${product.id}`}
            alt={`Product ${product.id}`}
            className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < (product?.average_rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                />
            ))}
            <span className="text-sm ml-1">({product.review_count})</span>
        </div>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <div className="flex items-center space-x-5 mb-2">
            <Button className="w-fit h-12">Add to Cart</Button>
            <Link href={`/users/products/${product.id}`}>
                <Button size="icon" variant="outline" className="w-12 h-12">
                    <MoreHorizontalIcon />
                </Button>
            </Link>
        </div>
    </div>
)
export default ProductCard;