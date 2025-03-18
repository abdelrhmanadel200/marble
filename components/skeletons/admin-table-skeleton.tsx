import { Skeleton } from "@/components/ui/skeleton"

export function AdminTableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 p-4 flex gap-4">
        {Array(columns)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={`header-${index}`} className="h-6 w-full" />
          ))}
      </div>

      {/* Rows */}
      {Array(rows)
        .fill(0)
        .map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="border-t p-4 flex gap-4">
            {Array(columns)
              .fill(0)
              .map((_, colIndex) => (
                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-6 w-full" />
              ))}
          </div>
        ))}
    </div>
  )
}
