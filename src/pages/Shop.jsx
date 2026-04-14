import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductGrid from '../components/product/ProductGrid'
import Badge from '../components/ui/Badge'
import { products } from '../data/products'
import { collections, concerns } from '../data/collections'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
]

const PRICE_RANGES = [
  { id: 'under-35', label: 'Under €35', min: 0, max: 35 },
  { id: '35-55', label: '€35 – €55', min: 35, max: 55 },
  { id: '55-plus', label: 'Over €55', min: 55, max: Infinity },
]

export default function Shop() {
  const [activeCollections, setActiveCollections] = useState([])
  const [activeConcerns, setActiveConcerns] = useState([])
  const [activePriceRange, setActivePriceRange] = useState(null)
  const [sortBy, setSortBy] = useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (activeCollections.length > 0) {
      result = result.filter(p => activeCollections.includes(p.collection))
    }

    if (activeConcerns.length > 0) {
      const concernTags = activeConcerns.flatMap(cId => concerns.find(c => c.id === cId)?.tags || [])
      result = result.filter(p => concernTags.some(tag => p.tags.includes(tag)))
    }

    if (activePriceRange) {
      const range = PRICE_RANGES.find(r => r.id === activePriceRange)
      if (range) result = result.filter(p => p.price >= range.min && p.price <= range.max)
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      default: result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
    }

    return result
  }, [activeCollections, activeConcerns, activePriceRange, sortBy])

  const toggleCollection = (id) =>
    setActiveCollections(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])

  const toggleConcern = (id) =>
    setActiveConcerns(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])

  const clearAll = () => {
    setActiveCollections([])
    setActiveConcerns([])
    setActivePriceRange(null)
  }

  const activeFilterCount = activeCollections.length + activeConcerns.length + (activePriceRange ? 1 : 0)

  const FilterSidebar = () => (
    <aside className="space-y-8">
      {/* Collections */}
      <div>
        <h3 className="label-xs text-charcoal mb-4">Collection</h3>
        <div className="space-y-2">
          {collections.map(col => (
            <label key={col.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeCollections.includes(col.id)}
                onChange={() => toggleCollection(col.id)}
                className="w-4 h-4 accent-sage cursor-pointer"
              />
              <span className="text-sm font-body text-charcoal-200 group-hover:text-charcoal transition-colors">
                {col.name}
              </span>
              <span className="text-2xs text-charcoal-50 ml-auto">({col.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Concerns */}
      <div>
        <h3 className="label-xs text-charcoal mb-4">Concern</h3>
        <div className="space-y-2">
          {concerns.map(concern => (
            <label key={concern.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeConcerns.includes(concern.id)}
                onChange={() => toggleConcern(concern.id)}
                className="w-4 h-4 accent-sage cursor-pointer"
              />
              <span className="text-sm font-body text-charcoal-200 group-hover:text-charcoal transition-colors">
                {concern.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="label-xs text-charcoal mb-4">Price</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map(range => (
            <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="price-range"
                checked={activePriceRange === range.id}
                onChange={() => setActivePriceRange(activePriceRange === range.id ? null : range.id)}
                className="w-4 h-4 accent-sage cursor-pointer"
              />
              <span className="text-sm font-body text-charcoal-200 group-hover:text-charcoal transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="text-xs font-body text-sage hover:text-sage-600 uppercase tracking-widest flex items-center gap-1.5"
        >
          <X size={12} /> Clear all filters
        </button>
      )}
    </aside>
  )

  return (
    <>
      <Helmet>
        <title>Shop All — LUMEA Skincare & Wellness</title>
        <meta name="description" content="Shop LUMEA's complete range of skincare, supplements, and wellness products formulated for women 35–55." />
      </Helmet>

      {/* Page header */}
      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-12 md:py-16">
          <p className="label-xs text-sage mb-3">All products</p>
          <h1 className="font-display text-display-md md:text-display-lg font-light text-charcoal">
            The full collection
          </h1>
        </div>
      </div>

      <div className="container-xl py-10 md:py-14">
        <div className="flex gap-10 lg:gap-14">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-ivory-200">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-body text-charcoal border border-ivory-300 px-4 py-2 rounded-sm hover:bg-ivory transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              {/* Active filter pills */}
              <div className="hidden lg:flex flex-wrap gap-2 flex-1">
                {activeCollections.map(id => (
                  <button
                    key={id}
                    onClick={() => toggleCollection(id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sage-50 text-sage text-xs font-body rounded-sm border border-sage-200 hover:bg-sage-100 transition-colors"
                  >
                    {collections.find(c => c.id === id)?.name} <X size={11} />
                  </button>
                ))}
                {activeConcerns.map(id => (
                  <button
                    key={id}
                    onClick={() => toggleConcern(id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-50 text-gold-600 text-xs font-body rounded-sm border border-gold-100 hover:bg-gold-100 transition-colors"
                  >
                    {concerns.find(c => c.id === id)?.label} <X size={11} />
                  </button>
                ))}
                {activePriceRange && (
                  <button
                    onClick={() => setActivePriceRange(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-ivory border border-ivory-300 text-charcoal-200 text-xs font-body rounded-sm hover:bg-ivory-200 transition-colors"
                  >
                    {PRICE_RANGES.find(r => r.id === activePriceRange)?.label} <X size={11} />
                  </button>
                )}
              </div>

              {/* Result count + sort */}
              <div className="flex items-center gap-4 ml-auto">
                <span className="text-sm font-body text-charcoal-50 whitespace-nowrap hidden sm:block">
                  {filteredProducts.length} products
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 border border-ivory-300 rounded-sm text-sm font-body text-charcoal bg-cream focus:outline-none focus:border-sage cursor-pointer"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-50 pointer-events-none" />
                </div>
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-charcoal/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 left-0 h-full w-80 bg-cream z-50 overflow-y-auto shadow-drawer lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-200 sticky top-0 bg-cream">
                <h2 className="font-display text-xl font-light">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
              </div>
              <div className="px-6 py-6">
                <FilterSidebar />
              </div>
              <div className="px-6 py-4 border-t border-ivory-200 sticky bottom-0 bg-cream">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-sage text-cream text-sm font-body font-medium uppercase tracking-widest rounded-sm"
                >
                  View {filteredProducts.length} products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
