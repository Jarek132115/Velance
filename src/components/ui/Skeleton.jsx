import { cn } from '../../lib/utils'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('skeleton rounded', className)}
      {...props}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-cream rounded-md overflow-hidden shadow-card">
      <Skeleton className="w-full aspect-product" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-9 w-28 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TextSkeleton({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4 rounded', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  )
}
