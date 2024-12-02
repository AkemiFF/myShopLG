import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ProductImageSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <Skeleton className="w-full h-[400px]" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="w-full h-[100px]" />
        ))}
      </div>
    </div>
  )
}

const ProductInfoSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-5 w-5 rounded-full" />
        ))}
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-8 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

const TabsContentSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  )
}

const SimilarProductsSkeleton = () => {
  return (
    <div className="mt-12">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="w-full h-[200px] mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImageSkeleton />
          <ProductInfoSkeleton />
        </div>

        <Tabs defaultValue="description" className="mt-8">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <TabsContentSkeleton />
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <TabsContentSkeleton />
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <TabsContentSkeleton />
          </TabsContent>
        </Tabs>

        <SimilarProductsSkeleton />
      </main>
    </div>
  )
}

