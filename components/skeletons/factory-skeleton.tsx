import { Skeleton } from "@/components/ui/skeleton"

export function FactorySkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-10 w-1/2 mb-6" />

      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Skeleton className="h-64 w-full" />
            </div>
          ))}
      </div>

      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-8" />
    </div>
  )
}
