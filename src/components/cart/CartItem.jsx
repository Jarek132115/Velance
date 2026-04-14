import { Minus, Plus, X, RefreshCw } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../lib/utils'
import Badge from '../ui/Badge'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-ivory-200 last:border-0">
      {/* Image placeholder */}
      <div className="w-20 h-24 bg-ivory rounded-sm flex-shrink-0 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${
          item.product.collection === 'skin' ? 'from-sage-100 to-ivory-200' :
          item.product.collection === 'balance' ? 'from-gold-50 to-ivory-200' :
          'from-charcoal-50/30 to-ivory-200'
        } flex items-center justify-center`}>
          <span className="font-display text-2xl text-sage-300">L</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="text-2xs font-body uppercase tracking-widest text-sage mb-0.5">
              {item.product.collectionLabel}
            </p>
            <h4 className="font-display text-base font-light text-charcoal leading-snug line-clamp-1">
              {item.product.name}
            </h4>
          </div>
          <button
            onClick={() => removeItem(item.key)}
            className="p-1 text-charcoal-50 hover:text-charcoal transition-colors flex-shrink-0"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>

        {item.isSubscription && (
          <div className="flex items-center gap-1.5 mb-2">
            <RefreshCw size={10} className="text-sage" />
            <Badge variant="subscription">Monthly subscription · 15% off</Badge>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Quantity stepper */}
          <div className="flex items-center border border-ivory-300 rounded-sm overflow-hidden">
            <button
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-charcoal-200 hover:text-charcoal hover:bg-ivory transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-9 h-8 flex items-center justify-center text-sm font-body text-charcoal border-x border-ivory-300">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-charcoal-200 hover:text-charcoal hover:bg-ivory transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-body font-medium text-charcoal">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-charcoal-50">
                {formatPrice(item.unitPrice)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
