import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ChevronDown, ChevronLeft, Check, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'
import ProductCard from '../components/product/ProductCard'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { formatPrice, formatDate } from '../lib/utils'
import { mockReviews } from '../data/products'

// ─── Image gallery ────────────────────────────────────────────────────────────
function ImageGallery({ product }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const gradients = {
    skin: 'from-sage-100 to-ivory-200',
    balance: 'from-gold-50 to-ivory-200',
    ritual: 'from-charcoal-50/20 to-ivory-200',
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className={`aspect-product bg-gradient-to-br ${gradients[product.collection]} rounded-md overflow-hidden relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <span className="font-display text-8xl font-light text-sage-200">{product.name[0]}</span>
            <p className="font-display text-lg font-light text-sage-400 mt-2 tracking-wide">{product.name}</p>
            <p className="label-xs text-gold mt-3">{product.sku}</p>
          </div>
        </div>
        {product.isBestseller && (
          <div className="absolute top-4 left-4">
            <Badge variant="bestseller">Bestseller</Badge>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`aspect-square bg-gradient-to-br ${gradients[product.collection]} rounded-sm overflow-hidden border-2 transition-all ${
              activeIdx === i ? 'border-sage' : 'border-transparent'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-lg text-sage-300">{i + 1}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Ingredient accordion ────────────────────────────────────────────────────
function IngredientAccordion({ ingredients }) {
  const [open, setOpen] = useState(null)

  if (!ingredients || ingredients.length === 0) return null

  return (
    <div className="border-t border-ivory-200">
      {ingredients.map((ing, i) => (
        <div key={ing.name} className="border-b border-ivory-200">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sage flex-shrink-0" />
              <span className="text-sm font-body font-medium text-charcoal">{ing.name}</span>
            </div>
            <ChevronDown
              size={16}
              className={`text-charcoal-50 transition-transform duration-200 flex-shrink-0 ml-2 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-body text-charcoal-100 pb-4 pl-5 leading-relaxed">
                  {ing.benefit}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function ReviewsSection({ product }) {
  const reviews = mockReviews[product.id] || []

  const defaultReviews = [
    { id: 'r1', name: 'Sarah K.', location: 'London, UK', rating: 5, date: '2024-11-01', verified: true, body: 'Genuinely impressive product. I could see a difference within the first week. The formulation feels premium and the results back that up.' },
    { id: 'r2', name: 'Martine D.', location: 'Paris, France', rating: 4, date: '2024-10-15', verified: true, body: 'Very good product. Takes patience — about 3 weeks to see results — but worth it. Would buy again.' },
    { id: 'r3', name: 'Helena V.', location: 'Berlin, Germany', rating: 5, date: '2024-09-28', verified: true, body: 'Finally something that actually works. I\'ve recommended it to three friends already. The ingredient transparency is why I trust VELANCE.' },
    { id: 'r4', name: 'Aine M.', location: 'Cork, Ireland', rating: 5, date: '2024-09-10', verified: true, body: 'I appreciate that VELANCE explains what each ingredient does. This isn\'t marketing fluff — it\'s a brand that respects its customers.' },
  ]

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews

  return (
    <div className="mt-16 pt-12 border-t border-ivory-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-display-sm font-light text-charcoal">Customer Reviews</h2>
        <div className="flex items-center gap-3">
          <StarRating rating={product.rating} size={16} />
          <span className="text-sm font-body text-charcoal-100">
            {product.rating}/5 · {product.reviewCount} reviews
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {displayReviews.map((review) => (
          <div key={review.id} className="bg-ivory rounded-md p-5">
            <StarRating rating={review.rating} size={13} className="mb-3" />
            <p className="text-sm font-body text-charcoal leading-relaxed mb-4 italic">
              &#8220;{review.body}&#8221;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-body font-medium text-charcoal">{review.name}</p>
                <p className="text-xs text-charcoal-50">{review.location} · {formatDate(review.date)}</p>
              </div>
              {review.verified && (
                <div className="flex items-center gap-1 text-sage">
                  <ShieldCheck size={13} />
                  <span className="text-2xs font-body uppercase tracking-wider">Verified</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Product() {
  const { slug } = useParams()
  const { product, related } = useProduct(slug)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isSubscription, setIsSubscription] = useState(false)
  const [adding, setAdding] = useState(false)
  const [benefitsOpen, setBenefitsOpen] = useState(true)

  if (!product) {
    return (
      <div className="container-xl py-32 text-center">
        <h1 className="font-display text-3xl font-light text-charcoal mb-4">Product not found</h1>
        <Link to="/shop"><Button>Back to shop</Button></Link>
      </div>
    )
  }

  const unitPrice = isSubscription
    ? product.price * (1 - (product.subscriptionDiscount || 15) / 100)
    : product.price

  const handleAddToCart = async () => {
    setAdding(true)
    for (let i = 0; i < quantity; i++) addItem(product, { isSubscription })
    toast.success(`${product.name} added to basket`, {
      style: { background: '#FDFCFA', color: '#2C2C2A', border: '1px solid #E5D9C2' },
      iconTheme: { primary: '#4A6741', secondary: '#FDFCFA' },
    })
    await new Promise(r => setTimeout(r, 600))
    setAdding(false)
  }

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: 'VELANCE' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — VELANCE</title>
        <meta name="description" content={product.shortDescription} />
        <meta property="og:title" content={`${product.name} — VELANCE`} />
        <meta property="og:description" content={product.shortDescription} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container-xl py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-body text-charcoal-50 mb-8">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/collection/${product.collection}`} className="hover:text-charcoal transition-colors capitalize">
            {product.collectionLabel}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div>
            <ImageGallery product={product} />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="sage">{product.collectionLabel}</Badge>
              {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.stock < 10 && product.stock > 0 && (
                <Badge variant="gold">Only {product.stock} left</Badge>
              )}
            </div>

            <h1 className="font-display text-display-sm md:text-display-md font-light text-charcoal mb-2">
              {product.name}
            </h1>
            <p className="body-lg text-charcoal-100 mb-4">{product.tagline}</p>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} className="mb-6" />

            {/* Subscription toggle */}
            {product.isSubscribable ? (
              <div className="bg-ivory rounded-md p-4 mb-6 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="purchase-type"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                    className="w-4 h-4 accent-sage"
                  />
                  <div>
                    <span className="text-sm font-body font-medium text-charcoal">
                      One-time purchase — {formatPrice(product.price)}
                    </span>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="purchase-type"
                    checked={isSubscription}
                    onChange={() => setIsSubscription(true)}
                    className="w-4 h-4 accent-sage"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-body font-medium text-charcoal">
                        Subscribe &amp; save {product.subscriptionDiscount}% —{' '}
                        <span className="text-sage font-semibold">{formatPrice(unitPrice)}/month</span>
                      </span>
                      <Badge variant="sage">Best value</Badge>
                    </div>
                    <p className="text-xs text-charcoal-50 mt-0.5">Delivered monthly. Cancel anytime.</p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="mb-6" />
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl text-charcoal">
                {formatPrice(unitPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-charcoal-50 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
              {product.compareAtPrice && (
                <Badge variant="gold">
                  Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-ivory-300 rounded-sm overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-charcoal-200 hover:text-charcoal hover:bg-ivory transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-11 h-11 flex items-center justify-center text-sm font-body font-medium text-charcoal border-x border-ivory-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-charcoal-200 hover:text-charcoal hover:bg-ivory transition-colors text-lg"
                >
                  +
                </button>
              </div>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={adding}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of stock' : adding ? 'Adding…' : 'Add to basket'}
              </Button>
            </div>

            {/* Reassurances */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-ivory-200">
              {[
                { icon: Truck, text: 'Free delivery over €65' },
                { icon: RefreshCw, text: '30-day returns' },
                { icon: ShieldCheck, text: 'EU-certified formula' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-body text-charcoal-100">
                  <Icon size={13} className="text-sage" />
                  {text}
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <button
                onClick={() => setBenefitsOpen(b => !b)}
                className="w-full flex items-center justify-between py-3 border-b border-ivory-200"
              >
                <span className="label-xs text-charcoal">Benefits</span>
                <ChevronDown size={16} className={`text-charcoal-50 transition-transform ${benefitsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {benefitsOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 py-2.5 border-b border-ivory-100 last:border-0">
                        <Check size={14} className="text-sage flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-body text-charcoal-200">{benefit}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Key ingredients */}
            {product.ingredients.length > 0 && (
              <div>
                <h3 className="label-xs text-charcoal py-3 border-b border-ivory-200">Key Ingredients</h3>
                <IngredientAccordion ingredients={product.ingredients} />
              </div>
            )}
          </div>
        </div>

        {/* Full description */}
        <div className="mt-16 pt-12 border-t border-ivory-200 max-w-2xl">
          <h2 className="font-display text-display-sm font-light text-charcoal mb-6">About this product</h2>
          {product.description.split('\n\n').map((para, i) => (
            <p key={i} className="body-base text-charcoal-100 mb-4 leading-relaxed">{para}</p>
          ))}
        </div>

        {/* Reviews */}
        <ReviewsSection product={product} />

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-ivory-200">
            <h2 className="font-display text-display-sm font-light text-charcoal mb-8">
              Customers also love
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
