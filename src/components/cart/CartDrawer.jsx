import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'
import Button from '../ui/Button'
import { formatPrice, FREE_DELIVERY_THRESHOLD } from '../../lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, itemCount, amountToFreeDelivery, hasFreeDelivery } = useCart()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-drawer"
            aria-label="Shopping basket"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-200">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-sage" />
                <h2 className="font-display text-xl font-light text-charcoal">
                  Your basket {itemCount > 0 && <span className="text-charcoal-50">({itemCount})</span>}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-charcoal-200 hover:text-charcoal transition-colors rounded-sm"
                aria-label="Close basket"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center mb-5">
                  <ShoppingBag size={24} className="text-sage-200" />
                </div>
                <h3 className="font-display text-xl font-light text-charcoal mb-2">Your basket is empty</h3>
                <p className="body-sm text-charcoal-100 mb-8">
                  Explore our collections to find what&#39;s right for you.
                </p>
                <Button variant="primary" onClick={closeCart}>
                  <Link to="/shop">Shop now</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                <div className="px-6 py-4 bg-ivory border-b border-ivory-200">
                  {hasFreeDelivery ? (
                    <div className="flex items-center gap-2 text-sage">
                      <Package size={14} />
                      <span className="text-xs font-body font-medium">You&#39;ve unlocked free delivery!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-body text-charcoal-100">
                          {formatPrice(amountToFreeDelivery)} away from free delivery
                        </span>
                        <span className="text-xs font-body text-charcoal-50">€{FREE_DELIVERY_THRESHOLD} threshold</span>
                      </div>
                      <div className="h-1 bg-ivory-300 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-sage rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6">
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </div>

                {/* Summary + CTA */}
                <div className="border-t border-ivory-200 px-6 py-6 space-y-4 bg-cream">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-medium text-charcoal">Subtotal</span>
                    <span className="font-body font-semibold text-charcoal text-lg">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs font-body text-charcoal-50">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link to="/checkout" onClick={closeCart} className="block">
                    <Button variant="primary" size="lg" fullWidth>
                      Proceed to checkout
                    </Button>
                  </Link>
                  <button
                    onClick={closeCart}
                    className="w-full text-center text-xs font-body uppercase tracking-widest text-charcoal-100 hover:text-charcoal transition-colors py-1"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
