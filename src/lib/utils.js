// ─── Currency ───────────────────────────────────────────────────────────────
// Detect currency from browser locale
export const detectCurrency = () => {
  try {
    const locale = navigator.language || 'en-GB'
    const gbLocales = ['en-GB', 'en-IE', 'ga-IE']
    if (gbLocales.some(l => locale.startsWith(l.split('-')[0]) && locale.includes('-GB') || locale.includes('-IE'))) {
      return { code: 'GBP', symbol: '£', rate: 0.86 }
    }
  } catch {
    // fallback
  }
  return { code: 'EUR', symbol: '€', rate: 1 }
}

let _currency = null
export const getCurrency = () => {
  if (!_currency) _currency = detectCurrency()
  return _currency
}

export const formatPrice = (amountEur, options = {}) => {
  const { showVat = false, showSubscription = false, subscriptionDiscount = 0 } = options
  const { symbol, rate, code } = getCurrency()
  let amount = amountEur * rate

  if (showSubscription && subscriptionDiscount > 0) {
    amount = amount * (1 - subscriptionDiscount / 100)
  }

  const formatted = new Intl.NumberFormat(code === 'GBP' ? 'en-GB' : 'de-DE', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)

  if (showVat) return `${formatted} inc. VAT`
  return formatted
}

export const formatPriceRaw = (amountEur) => {
  const { rate } = getCurrency()
  return (amountEur * rate).toFixed(2)
}

// ─── String helpers ──────────────────────────────────────────────────────────
export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const truncate = (str, len = 120) =>
  str.length <= len ? str : str.slice(0, len).trimEnd() + '…'

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

// ─── Number helpers ──────────────────────────────────────────────────────────
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const formatNumber = (n) =>
  new Intl.NumberFormat('en-GB').format(n)

// ─── Array helpers ───────────────────────────────────────────────────────────
export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

// ─── Date helpers ─────────────────────────────────────────────────────────────
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// ─── VAT ─────────────────────────────────────────────────────────────────────
export const VAT_RATE = 0.2

export const addVat = (amount) => amount * (1 + VAT_RATE)
export const removeVat = (amount) => amount / (1 + VAT_RATE)
export const getVatAmount = (total) => total * (VAT_RATE / (1 + VAT_RATE))

// ─── Delivery ────────────────────────────────────────────────────────────────
export const FREE_DELIVERY_THRESHOLD = 65 // EUR

export const getDeliveryOptions = (subtotal) => [
  {
    id: 'standard',
    label: 'Standard delivery',
    description: '3–5 working days',
    price: subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 4.99,
    isFree: subtotal >= FREE_DELIVERY_THRESHOLD,
  },
  {
    id: 'express',
    label: 'Express delivery',
    description: '1–2 working days',
    price: 9.99,
    isFree: false,
  },
]

// ─── EU Countries ─────────────────────────────────────────────────────────────
export const EU_COUNTRIES = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'GB', name: 'United Kingdom' },
]

// ─── Star rating ─────────────────────────────────────────────────────────────
export const getStars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return { full, half, empty }
}

// ─── Generate order number ────────────────────────────────────────────────────
export const generateOrderNumber = () => {
  const prefix = 'LM'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// ─── Class name merge (simple) ────────────────────────────────────────────────
export const cn = (...classes) => classes.filter(Boolean).join(' ')
