import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image gallery skeleton */}
        <div className="w-full md:w-1/2">
          <div className="relative h-96 mb-4">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-md" />
              ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="w-full md:w-1/2">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-6" />

          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />

          <Skeleton className="h-8 w-1/2 mb-6" />

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Specifications skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-1/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
