import ProductCard from './ProductCard'
import { ProductGridSkeleton } from '../ui/Skeleton'

export default function ProductGrid({ products, loading = false, emptyMessage = 'No products found.' }) {
  if (loading) return <ProductGridSkeleton count={6} />

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-2xl text-charcoal-50">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
