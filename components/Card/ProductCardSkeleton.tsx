import { Star } from 'lucide-react'

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-gray-300" />
        ))}
        <div className="w-8 h-4 bg-gray-300 ml-1 rounded"></div>
      </div>
      <div className="h-4 bg-gray-300 w-1/4 mb-2 rounded"></div>
      <div className="flex items-center space-x-5 mb-2">
        <div className="w-24 h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton

