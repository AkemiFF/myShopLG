import { Star } from "lucide-react";
import { Button } from "./ui/button";

const ProductCard: React.FC<{ product: string }> = ({ product }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
            src={`/placeholder.svg?height=200&width=200&text=Product ${product}`}
            alt={`Product ${product}`}
            className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="font-semibold mb-2">Product {product}</h3>
        <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
            ))}
            <span className="text-sm ml-1">(123)</span>
        </div>
        <p className="text-gray-600 mb-2">$19.99</p>
        <Button className="w-full">Add to Cart</Button>
    </div>
)
export default ProductCard;