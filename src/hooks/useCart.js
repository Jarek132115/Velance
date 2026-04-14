import useCartStore from '../store/cartStore'
import { FREE_DELIVERY_THRESHOLD } from '../lib/utils'

export const useCart = () => {
  const store = useCartStore()

  const subtotal = store.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const itemCount = store.items.reduce((sum, i) => sum + i.quantity, 0)
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  const hasFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD

  return {
    items: store.items,
    isOpen: store.isOpen,
    subtotal,
    itemCount,
    amountToFreeDelivery,
    hasFreeDelivery,
    openCart: store.openCart,
    closeCart: store.closeCart,
    toggleCart: store.toggleCart,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  }
}
