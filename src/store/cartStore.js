import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Open / close cart drawer
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Add item — handles quantity increment if already in cart
      addItem: (product, options = {}) => {
        const { isSubscription = false } = options
        const key = `${product.id}-${isSubscription ? 'sub' : 'one'}`

        set((state) => {
          const existing = state.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                key,
                product,
                quantity: 1,
                isSubscription,
                unitPrice: isSubscription
                  ? product.price * (1 - (product.subscriptionDiscount || 15) / 100)
                  : product.price,
              },
            ],
          }
        })
      },

      // Remove item by key
      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        })),

      // Update quantity — removes if qty < 1
      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          get().removeItem(key)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        }))
      },

      // Clear all items
      clearCart: () => set({ items: [] }),

      // ─── Computed values ─────────────────────────────────────────────────
      get count() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      get subtotal() {
        return get().items.reduce(
          (sum, i) => sum + i.unitPrice * i.quantity,
          0
        )
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    {
      name: 'velance-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useCartStore
