import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import Badge from '../ui/Badge'
import StarRating from '../ui/StarRating'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../lib/utils'

// Placeholder image using sage gradient
function ProductImagePlaceholder({ alt, collection }) {
  const gradients = {
    skin: 'from-sage-100 to-ivory-200',
    balance: 'from-gold-50 to-ivory-200',
    ritual: 'from-charcoal-50/30 to-ivory-200',
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradients[collection] || gradients.skin} flex items-center justify-center`}>
      <div className="text-center px-4">
        <span className="font-display text-4xl font-light text-sage-300 block mb-1">L</span>
        <span className="text-2xs font-body uppercase tracking-widest text-charcoal-50">{alt}</span>
      </div>
    </div>
  )
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    toast.success(`${product.name} added to basket`, {
      style: { background: '#FDFCFA', color: '#2C2C2A', border: '1px solid #E5D9C2' },
      iconTheme: { primary: '#4A6741', secondary: '#FDFCFA' },
    })
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group bg-cream rounded-md shadow-card overflow-hidden"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-product overflow-hidden bg-ivory">
          <ProductImagePlaceholder alt={product.images[0]?.alt || product.name} collection={product.collection} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {discount && <Badge variant="gold">–{discount}%</Badge>}
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 text-xs font-body font-medium uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                added
                  ? 'bg-sage text-cream'
                  : 'bg-charcoal text-cream hover:bg-charcoal-400'
              }`}
            >
              {added ? <><Check size={14} /> Added</> : <><ShoppingBag size={14} /> Add to basket</>}
            </motion.button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="label-xs text-sage mb-1.5">{product.collectionLabel}</p>
          <h3 className="font-display text-lg font-light text-charcoal mb-1 leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm font-body text-charcoal-100 line-clamp-2 mb-3 leading-relaxed">
            {product.tagline}
          </p>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} className="mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-body font-medium text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-body text-charcoal-50 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {product.isSubscribable && (
              <span className="text-2xs font-body text-sage-500 tracking-wide">Subscribe & save</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
