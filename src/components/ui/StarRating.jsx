import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function StarRating({ rating, reviewCount, size = 14, className }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="text-gold fill-gold" />
        ))}
        {hasHalf && (
          <div className="relative">
            <Star size={size} className="text-ivory-300 fill-ivory-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={size} className="text-gold fill-gold" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-ivory-300 fill-ivory-300" />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-charcoal-50 font-body">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  )
}
