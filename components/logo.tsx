import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="relative h-14 w-14 mr-2">
          <div className="absolute inset-0 bg-red-600 transform rotate-45"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">TOP</div>
        </div>
        <span className="text-sm font-medium whitespace-nowrap">Modern Furniture</span>
      </div>
    </Link>
  )
}
