import { Skeleton } from "@/components/ui/skeleton";

const CategoryButtonsSkeleton = () => {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-24 flex-grow md:flex-grow-0" />
            ))}
        </div>
    )
}

export default CategoryButtonsSkeleton;