import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Sun, Moon, Plus, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import StarRating from '../components/ui/StarRating'
import { routine } from '../data/collections'
import { getProductById } from '../data/products'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/utils'

// ─── Product gradient by position ────────────────────────────────────────────
const stepGradients = [
  'from-gold-50 to-ivory-200',
  'from-sage-100 to-ivory-200',
  'from-ivory-200 to-gold-50',
  'from-charcoal-50/20 to-ivory-200',
]

// ─── Step row ─────────────────────────────────────────────────────────────────
function RoutineStep({ step, index, timeOfDay }) {
  const product = getProductById(step.productId)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) return null

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    toast.success(`${product.name} added to basket`, {
      style: { background: '#FDFCFA', color: '#2C2C2A', border: '1px solid #E5D9C2' },
      iconTheme: { primary: '#4A6741', secondary: '#FDFCFA' },
    })
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[72px_80px_1fr_180px_140px] items-center gap-4 md:gap-6 py-5 border-b border-ivory-200 last:border-0"
    >
      {/* Step number */}
      <div className="w-10 h-10 rounded-full border-2 border-sage flex items-center justify-center flex-shrink-0">
        <span className="font-display text-lg font-light text-sage">{step.step}</span>
      </div>

      {/* Product image placeholder */}
      <div className={`hidden md:flex w-20 h-20 rounded-sm bg-gradient-to-br ${stepGradients[index % 4]} items-center justify-center flex-shrink-0`}>
        <span className="font-display text-2xl text-sage-200">{product.name[0]}</span>
      </div>

      {/* Product info */}
      <div className="min-w-0">
        <p className="text-2xs font-body uppercase tracking-widest text-sage mb-0.5">{product.collectionLabel}</p>
        <Link to={`/product/${product.slug}`} className="font-display text-lg font-light text-charcoal hover:text-sage transition-colors line-clamp-1">
          {product.name}
        </Link>
        <p className="text-sm text-charcoal-100 mt-1 leading-relaxed">{step.instruction}</p>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} className="mt-2" />
      </div>

      {/* Price */}
      <div className="hidden md:block text-right">
        <p className="font-body font-medium text-charcoal">{formatPrice(product.price)}</p>
        {product.compareAtPrice && (
          <p className="text-xs text-charcoal-50 line-through">{formatPrice(product.compareAtPrice)}</p>
        )}
        {product.isSubscribable && (
          <p className="text-2xs text-sage mt-0.5">Subscribe & save 15%</p>
        )}
      </div>

      {/* Add to cart */}
      <div className="flex-shrink-0">
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-body font-medium uppercase tracking-wider transition-all ${
            added
              ? 'bg-sage text-cream'
              : 'bg-charcoal text-cream hover:bg-charcoal-400'
          }`}
        >
          {added ? <><Check size={13} /> Added</> : <><Plus size={13} /> Add to bag</>}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Add all button ───────────────────────────────────────────────────────────
function AddAllButton({ steps, label }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddAll = () => {
    steps.forEach(step => {
      const product = getProductById(step.productId)
      if (product) addItem(product)
    })
    setAdded(true)
    toast.success(`${steps.length} products added to your basket`, {
      style: { background: '#FDFCFA', color: '#2C2C2A', border: '1px solid #E5D9C2' },
    })
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <Button variant={added ? 'secondary' : 'primary'} onClick={handleAddAll} disabled={added}>
      {added ? <><Check size={15} /> All added to basket</> : `Add full ${label} routine to bag`}
    </Button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Routine() {
  const morningProduct = getProductById(routine.mask.productId)

  return (
    <>
      <Helmet>
        <title>The LUMEA Routine — AM/PM Anti-Aging Skincare System</title>
        <meta name="description" content="The complete LUMEA morning and evening skincare routine for women in their 40s and 50s. Six products. One system. Formulated for hormonal skin." />
      </Helmet>

      {/* Hero */}
      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-14 md:py-20">
          <p className="label-xs text-sage mb-3">Designed to work together</p>
          <h1 className="font-display text-display-md md:text-display-lg font-light text-charcoal mb-5 max-w-2xl">
            Six products. One complete routine.
          </h1>
          <p className="body-lg text-charcoal-100 max-w-2xl">
            Every LUMEA product is designed to work with the others. Use the full routine for the best results — or start with one product and build from there. Each step addresses a specific consequence of oestrogen decline.
          </p>
        </div>
      </div>

      <div className="container-xl py-12 md:py-16 space-y-16">
        {/* Morning routine */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-100 flex items-center justify-center">
                <Sun size={18} className="text-gold" />
              </div>
              <div>
                <p className="label-xs text-gold mb-0.5">Morning</p>
                <h2 className="font-display text-2xl font-light text-charcoal">AM Routine — 4 steps</h2>
              </div>
            </div>
            <AddAllButton steps={routine.morning} label="morning" />
          </div>

          <div className="bg-cream rounded-md shadow-card px-4 md:px-8 divide-y divide-ivory-200">
            {routine.morning.map((step, i) => (
              <RoutineStep key={step.productId} step={step} index={i} timeOfDay="morning" />
            ))}
          </div>

          <div className="mt-4 bg-gold-50 border border-gold-100 rounded-md px-5 py-4">
            <p className="text-sm font-body text-charcoal-100 leading-relaxed">
              <strong className="text-charcoal">Pro tip:</strong> Always finish your morning routine with SPF 30+ — Vitamin C and peptides enhance your skin&#39;s sensitivity to UV, so sun protection is non-negotiable.
            </p>
          </div>
        </section>

        {/* Evening routine */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-charcoal-50/20 border border-charcoal-200/20 flex items-center justify-center">
                <Moon size={18} className="text-charcoal-200" />
              </div>
              <div>
                <p className="label-xs text-charcoal-100 mb-0.5">Evening</p>
                <h2 className="font-display text-2xl font-light text-charcoal">PM Routine — 3 steps</h2>
              </div>
            </div>
            <AddAllButton steps={routine.evening} label="evening" />
          </div>

          <div className="bg-cream rounded-md shadow-card px-4 md:px-8 divide-y divide-ivory-200">
            {routine.evening.map((step, i) => (
              <RoutineStep key={step.productId} step={step} index={i} timeOfDay="evening" />
            ))}
          </div>
        </section>

        {/* Mask callout */}
        <section>
          <div className="bg-charcoal rounded-md p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Moon size={16} className="text-gold" />
                  <span className="label-xs text-gold">Twice weekly — replaces step 3 on mask nights</span>
                </div>
                <h2 className="font-display text-display-sm font-light text-cream mb-3">
                  Midnight Resurfacing Mask
                </h2>
                <p className="body-base text-charcoal-50 mb-4 leading-relaxed">
                  {routine.mask.instruction}
                </p>
                <p className="text-sm text-charcoal-100">
                  AHA acids + Centella Asiatica + Polyglutamic Acid. No rinse. Smoother skin by morning.
                </p>
              </div>
              {morningProduct && (
                <div className="bg-charcoal-300/20 rounded-md p-6 border border-charcoal-300/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-display text-xl font-light text-cream">{morningProduct.name}</p>
                      <StarRating rating={morningProduct.rating} reviewCount={morningProduct.reviewCount} size={12} className="mt-1.5" />
                    </div>
                    <p className="font-display text-xl text-cream">{formatPrice(morningProduct.price)}</p>
                  </div>
                  <Link to={`/product/${morningProduct.slug}`}>
                    <Button variant="white" fullWidth>View product</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl">
          <h2 className="font-display text-display-sm font-light text-charcoal mb-8">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do I need all six products?',
                a: 'No. Start with the product that addresses your most pressing concern — most women begin with the Renewal Serum or the Moisture Cream. Each product works independently. The full routine produces the best results, but one product is still a meaningful upgrade.',
              },
              {
                q: 'In what order do I apply them?',
                a: 'Thinnest to thickest. Serums first (Vitamin C, Renewal), then eye treatment, then moisturiser, then neck cream. The routine guide above shows the exact sequence for morning and evening.',
              },
              {
                q: 'Can I use the Vitamin C serum and the Renewal Serum on the same day?',
                a: 'Yes — they work well together. Use the Vitamin C serum in the morning (it works with daylight for maximum antioxidant benefit) and the Renewal Serum in the evening (Bakuchiol is most effective overnight).',
              },
              {
                q: 'What if I have very sensitive skin?',
                a: 'All LUMEA products are formulated without synthetic fragrance, parabens, or harsh preservatives. The Midnight Mask is calibrated for reactive skin — the AHAs are at a concentration specifically chosen to be effective without causing irritation in perimenopausal skin.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-ivory-200 pb-6">
                <h3 className="font-body font-medium text-charcoal mb-2">{q}</h3>
                <p className="text-sm text-charcoal-100 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
