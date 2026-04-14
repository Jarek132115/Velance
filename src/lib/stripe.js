import { loadStripe } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'

// Singleton stripe instance
let stripePromise
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

// Stripe Elements appearance config — matches LUMEA brand
export const stripeElementsAppearance = {
  theme: 'flat',
  variables: {
    colorPrimary: '#4A6741',
    colorBackground: '#ffffff',
    colorText: '#2C2C2A',
    colorDanger: '#dc2626',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizeBase: '15px',
    borderRadius: '6px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      border: '1px solid #E5D9C2',
      boxShadow: 'none',
      padding: '12px 16px',
      fontSize: '15px',
      transition: 'border-color 0.2s ease',
    },
    '.Input:focus': {
      border: '1px solid #4A6741',
      boxShadow: '0 0 0 3px rgba(74, 103, 65, 0.1)',
      outline: 'none',
    },
    '.Label': {
      color: '#2C2C2A',
      fontSize: '13px',
      fontWeight: '500',
      letterSpacing: '0.02em',
      marginBottom: '6px',
    },
    '.Error': {
      color: '#dc2626',
      fontSize: '13px',
    },
  },
}
