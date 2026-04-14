import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Leaf, FlaskConical, RotateCcw, Truck, Star, Sun, Moon } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'
import StarRating from '../components/ui/StarRating'
import Badge from '../components/ui/Badge'
import { useBestsellers } from '../hooks/useProducts'
import { routine } from '../data/collections'
import { products, getProductById } from '../data/products'
import { formatPrice } from '../lib/utils'
import { useCart } from '../hooks/useCart'

// ─── Fade-in section wrapper ─────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Trust icons ──────────────────────────────────────────────────────────────
const trustItems = [
  { icon: Leaf, label: 'EU Certified', sub: 'Every ingredient validated' },
  { icon: FlaskConical, label: 'Clinical Formulas', sub: 'Actives at proven doses' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'Full refund, no questions' },
  { icon: Truck, label: 'Free Delivery €65+', sub: 'Across all EU markets' },
]

// ─── Homepage reviews ─────────────────────────────────────────────────────────
const reviews = [
  {
    id: 1, name: 'Catherine M.', location: 'Dublin, Ireland', rating: 5,
    body: 'My facialist noticed before I even mentioned it. Six weeks in and my skin is genuinely, measurably firmer.',
    product: 'Renewal Serum',
  },
  {
    id: 2, name: 'Isabelle R.', location: 'Lyon, France', rating: 5,
    body: 'Finally a brand that acknowledges what perimenopause actually does to your skin. The products back up every claim.',
    product: 'Deep Repair Moisture Cream',
  },
  {
    id: 3, name: 'Helen T.', location: 'Edinburgh, UK', rating: 5,
    body: 'I wake up and my husband says I look like I had a facial. Twice a week. That is it. My skin has not looked this good in a decade.',
    product: 'Midnight Resurfacing Mask',
  },
]

// ─── Routine step card ────────────────────────────────────────────────────────
function RoutineStepCard({ step, stepNumber, delay = 0 }) {
  const product = getProductById(step.productId)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) return null

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

  return (
    <FadeIn delay={delay} className="flex flex-col bg-cream rounded-md shadow-card overflow-hidden group">
      {/* Image placeholder */}
      <div className="h-36 bg-gradient-to-br from-sage-50 to-ivory-200 relative flex items-center justify-center">
        <span className="font-display text-5xl font-light text-sage-200">{stepNumber}</span>
        <div className="absolute top-3 left-3">
          <span className="text-2xs font-body uppercase tracking-widest text-sage bg-sage-50 border border-sage-100 px-2 py-1 rounded-sm">
            Step {stepNumber}
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-2xs font-body uppercase tracking-widest text-gold mb-1">{product.collectionLabel}</p>
        <h3 className="font-display text-base font-light text-charcoal leading-snug mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs font-body text-charcoal-100 leading-relaxed mb-3 line-clamp-2 flex-1">
          {step.instruction}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body font-medium text-sm text-charcoal">{formatPrice(product.price)}</span>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
            className={`text-xs font-body font-medium uppercase tracking-wider px-3 py-2 rounded-sm transition-all ${
              added
                ? 'bg-sage text-cream'
                : 'bg-charcoal text-cream hover:bg-charcoal-400'
            }`}
          >
            {added ? 'Added ✓' : 'Add'}
          </motion.button>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!gdpr) { toast.error('Please confirm you\'re happy to receive emails.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    toast.success('You\'re in. Welcome to LUMEA.')
    setEmail(''); setGdpr(false); setLoading(false)
  }

  return (
    <section className="bg-sage section-py">
      <div className="container-xl">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="label-xs text-sage-100 mb-3">Join the community</p>
            <h2 className="font-display text-display-md md:text-display-lg font-light text-cream mb-4">
              The skincare education you never got
            </h2>
            <p className="body-lg text-sage-100 mb-10">
              What oestrogen decline does to your skin. Which actives actually work. Why your routine needs to change after 40. No filler, no spam.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-sm text-cream placeholder-sage-200 focus:outline-none focus:border-white/50 font-body text-sm"
                />
                <Button type="submit" variant="white" size="lg" loading={loading} className="flex-shrink-0">
                  Join LUMEA
                </Button>
              </div>
              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdpr}
                  onChange={e => setGdpr(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-cream flex-shrink-0"
                />
                <span className="text-xs text-sage-100 leading-relaxed">
                  I&#39;m happy to receive LUMEA emails. Unsubscribe anytime. We will never share your data.{' '}
                  <Link to="/privacy" className="underline hover:text-cream">Privacy Policy</Link>.
                </span>
              </label>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const bestsellers = useBestsellers(4)
  const [activeRoutineTab, setActiveRoutineTab] = useState('morning')

  const routineSteps = activeRoutineTab === 'morning' ? routine.morning : routine.evening

  return (
    <>
      <Helmet>
        <title>LUMEA — Luxury Anti-Aging Skincare for Women 40+</title>
        <meta name="description" content="Luxury anti-aging skincare formulated for the hormonal skin of women in their 40s and 50s. EU-certified. Clinical actives. Honest science." />
        <meta property="og:title" content="LUMEA — Finally. Skincare that understands what your hormones are doing." />
        <meta property="og:description" content="Luxury anti-aging skincare for women in their 40s and 50s. Formulated around the biological reality of oestrogen decline." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="min-h-[90vh] bg-ivory flex items-center overflow-hidden">
        <div className="container-xl w-full py-16 md:py-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center min-h-[80vh]">
            {/* Text */}
            <div className="order-2 md:order-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="label-xs text-sage mb-5"
              >
                Luxury anti-aging skincare
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="font-display text-display-md md:text-display-lg lg:text-display-xl font-light text-charcoal mb-6 text-balance"
              >
                Finally. Skincare that understands what your{' '}
                <em className="italic text-sage">hormones are doing.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="body-lg text-charcoal-100 mb-10 max-w-md"
              >
                Luxury anti-aging formulations for women in their 40s and 50s. Because your skin changed — your skincare should too.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    Shop the collection <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button variant="secondary" size="lg">
                    Find my routine
                  </Button>
                </Link>
              </motion.div>
              {/* Social proof micro-strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mt-10"
              >
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-gold fill-gold" />)}
                </div>
                <span className="text-sm font-body text-charcoal-100">
                  4.8 average · 883 verified reviews across Europe
                </span>
              </motion.div>
            </div>

            {/* Editorial visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 md:order-2 relative"
            >
              <div className="aspect-square md:aspect-[4/5] bg-gradient-to-br from-sage-100 via-sage-50 to-ivory-200 rounded-md overflow-hidden relative">
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-sage-200/40 blur-xl" />
                <div className="absolute bottom-12 left-8 w-32 h-32 rounded-full bg-gold-100/50 blur-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="font-display text-8xl md:text-9xl font-extralight text-sage-200 block leading-none">L</span>
                    <span className="font-display text-xl font-light text-sage-400 tracking-[0.2em] uppercase mt-2 block">Lumea</span>
                    <span className="label-xs text-gold mt-3 block">6 products. One complete routine.</span>
                  </div>
                </div>
                {/* Floating review card */}
                <div className="absolute bottom-6 right-6 bg-cream rounded-sm shadow-card px-4 py-3 max-w-[180px]">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-gold fill-gold" />)}
                  </div>
                  <p className="text-2xs font-body text-charcoal leading-snug">
                    &#8220;My facialist noticed before I mentioned it.&#8221;
                  </p>
                  <p className="text-2xs text-charcoal-50 mt-1">— Catherine M., Dublin</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-cream border-y border-ivory-200">
        <div className="container-xl py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {trustItems.map(({ icon: Icon, label, sub }, i) => (
              <FadeIn key={label} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center mb-1">
                    <Icon size={18} className="text-sage" />
                  </div>
                  <p className="font-body font-medium text-sm text-charcoal">{label}</p>
                  <p className="text-xs text-charcoal-100 leading-relaxed hidden md:block">{sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Routine system ───────────────────────────────────────────── */}
      <section className="section-py bg-ivory">
        <div className="container-xl">
          <FadeIn className="text-center mb-10">
            <p className="label-xs text-sage mb-3">Designed to work together</p>
            <h2 className="font-display text-display-md md:text-display-lg font-light text-charcoal mb-4">
              Six products. One complete routine.
            </h2>
            <p className="body-lg text-charcoal-100 max-w-xl mx-auto">
              Every LUMEA product is formulated to work as part of a morning and evening routine. Start with one. Build from there.
            </p>
          </FadeIn>

          {/* AM/PM tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveRoutineTab('morning')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-body font-medium transition-all ${
                activeRoutineTab === 'morning'
                  ? 'bg-gold text-cream shadow-gold'
                  : 'border border-ivory-300 text-charcoal-200 hover:border-sage-200'
              }`}
            >
              <Sun size={15} /> Morning routine
            </button>
            <button
              onClick={() => setActiveRoutineTab('evening')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-body font-medium transition-all ${
                activeRoutineTab === 'evening'
                  ? 'bg-charcoal text-cream'
                  : 'border border-ivory-300 text-charcoal-200 hover:border-charcoal-200'
              }`}
            >
              <Moon size={15} /> Evening routine
            </button>
          </div>

          {/* Step cards */}
          <motion.div
            key={activeRoutineTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-4 ${
              activeRoutineTab === 'morning'
                ? 'grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto'
            }`}
          >
            {routineSteps.map((step, i) => (
              <RoutineStepCard key={step.productId + activeRoutineTab} step={step} stepNumber={step.step} delay={i * 0.06} />
            ))}
          </motion.div>

          {/* Mask callout */}
          {activeRoutineTab === 'evening' && (
            <FadeIn className="mt-6 max-w-3xl mx-auto">
              <div className="bg-charcoal text-cream rounded-md p-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Moon size={14} className="text-gold" />
                    <span className="label-xs text-gold">2× weekly — swap step 3</span>
                  </div>
                  <p className="font-display text-lg font-light">Midnight Resurfacing Mask</p>
                  <p className="text-xs text-charcoal-50 mt-1">{routine.mask.instruction}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-body font-medium text-cream">{formatPrice(79)}</span>
                  <Link to="/product/midnight-resurfacing-mask">
                    <Button variant="white" size="sm">View product</Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn className="text-center mt-10">
            <Link to="/routine">
              <Button variant="secondary">
                See the full routine guide <ArrowRight size={16} />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Bestsellers ──────────────────────────────────────────────────── */}
      <section className="section-py bg-cream">
        <div className="container-xl">
          <FadeIn className="flex items-end justify-between mb-10">
            <div>
              <p className="label-xs text-sage mb-3">Most loved</p>
              <h2 className="font-display text-display-sm md:text-display-md font-light text-charcoal">
                Bestsellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-xs font-body font-medium uppercase tracking-widest text-sage hover:text-sage-600 transition-colors"
            >
              View all six <ArrowRight size={14} />
            </Link>
          </FadeIn>
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-scroll md:grid md:grid-cols-4 md:overflow-visible">
            {bestsellers.map((product, i) => (
              <FadeIn
                key={product.id}
                delay={i * 0.08}
                className="w-72 flex-shrink-0 snap-item md:w-auto md:flex-shrink"
              >
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why LUMEA ────────────────────────────────────────────────────── */}
      <section className="section-py bg-charcoal text-cream overflow-hidden">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Quote visual */}
            <FadeIn className="order-2 md:order-1">
              <div className="aspect-square bg-gradient-to-br from-sage-800 to-charcoal-500 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <blockquote className="font-display text-2xl md:text-3xl font-light text-cream italic leading-relaxed text-center">
                    &#8220;Skincare brands that acknowledge what hormonal change does to skin are almost non-existent. We are not those brands.&#8221;
                  </blockquote>
                </div>
                <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-gold/20 blur-xl" />
                <div className="absolute top-6 left-6 w-24 h-24 rounded-full bg-sage-500/10 blur-2xl" />
              </div>
            </FadeIn>

            {/* Text */}
            <div className="order-1 md:order-2">
              <FadeIn>
                <p className="label-xs text-sage mb-5">Why we exist</p>
                <h2 className="font-display text-display-sm md:text-display-md font-light text-cream mb-6">
                  Built for women being ignored by luxury skincare
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="body-lg text-charcoal-50 mb-6 leading-relaxed">
                  Most anti-aging products are designed around the skin of a 25-year-old, or for a woman who is simply &#8220;getting older&#8221; — without acknowledging the specific mechanisms of oestrogen decline. We are not those brands.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="body-base text-charcoal-100 mb-8 leading-relaxed">
                  Every LUMEA product is formulated around the hormonal reality of skin in the 40s and 50s: the thinning, the reactivity, the loss of glow, the texture changes. We address the cause, not just the visible effect.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-3 mb-8">
                  {[
                    'Actives at clinically proven doses — not at marketing concentrations',
                    'Every ingredient justified — no fragrance, no filler',
                    'Formulated with perimenopause in mind, from day one',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                      </div>
                      <p className="body-sm text-cream">{point}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <Link to="/about">
                  <Button variant="white">Read our story <ArrowRight size={16} /></Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ─────────────────────────────────────────────────── */}
      <section className="section-py bg-ivory">
        <div className="container-xl">
          <FadeIn className="text-center mb-12">
            <p className="label-xs text-sage mb-3">883 verified reviews</p>
            <h2 className="font-display text-display-sm md:text-display-md font-light text-charcoal">
              Real women. Real results.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.1}>
                <div className="bg-cream rounded-md shadow-card p-6 flex flex-col h-full">
                  <StarRating rating={review.rating} size={14} className="mb-4" />
                  <p className="font-display text-lg font-light text-charcoal italic leading-relaxed flex-1 mb-6">
                    &#8220;{review.body}&#8221;
                  </p>
                  <div className="flex items-center justify-between border-t border-ivory-200 pt-4">
                    <div>
                      <p className="text-sm font-body font-medium text-charcoal">{review.name}</p>
                      <p className="text-xs text-charcoal-50">{review.location}</p>
                    </div>
                    <Badge variant="sage">{review.product}</Badge>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <NewsletterSection />
    </>
  )
}
