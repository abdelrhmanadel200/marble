import { Skeleton } from "@/components/ui/skeleton"

export function CategorySkeleton() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Skeleton className="h-10 w-16 rounded-md" />
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 rounded-md" />
        ))}
    </div>
  )
}
