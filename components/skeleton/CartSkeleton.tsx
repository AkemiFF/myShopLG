import { Skeleton } from "@/components/ui/skeleton"

export function CartSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex justify-between items-center">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      ))}
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-5 w-[80px]" />
          <Skeleton className="h-5 w-[60px]" />
        </div>
      </div>
    </div>
  )
}
