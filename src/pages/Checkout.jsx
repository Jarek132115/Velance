import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ShieldCheck, Lock } from 'lucide-react'
import Button from '../components/ui/Button'
import { useCart } from '../hooks/useCart'
import { formatPrice, getDeliveryOptions, getVatAmount, EU_COUNTRIES, generateOrderNumber } from '../lib/utils'
import { getStripe, stripeElementsAppearance } from '../lib/stripe'

// ─── Order summary sidebar ────────────────────────────────────────────────────
function OrderSummary({ items, subtotal, deliveryPrice, vat, total }) {
  return (
    <div className="bg-ivory rounded-md p-6 sticky top-28">
      <h2 className="font-display text-xl font-light text-charcoal mb-6">Order summary</h2>

      <div className="space-y-4 mb-6 pb-6 border-b border-ivory-300">
        {items.map(item => (
          <div key={item.key} className="flex gap-3">
            <div className={`w-14 h-16 rounded-sm flex-shrink-0 bg-gradient-to-br ${
              item.product.collection === 'skin' ? 'from-sage-100 to-ivory-200' :
              item.product.collection === 'balance' ? 'from-gold-50 to-ivory-200' :
              'from-charcoal-50/20 to-ivory-200'
            } flex items-center justify-center`}>
              <span className="font-display text-lg text-sage-300">L</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-charcoal line-clamp-1">{item.product.name}</p>
              <p className="text-xs text-charcoal-50">Qty {item.quantity}</p>
              {item.isSubscription && (
                <p className="text-2xs text-sage mt-0.5">Monthly subscription</p>
              )}
            </div>
            <span className="text-sm font-body font-medium text-charcoal flex-shrink-0">
              {formatPrice(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm font-body">
        <div className="flex justify-between text-charcoal-100">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-charcoal-100">
          <span>Delivery</span>
          <span>{deliveryPrice === 0 ? 'Free' : formatPrice(deliveryPrice)}</span>
        </div>
        <div className="flex justify-between text-charcoal-100">
          <span>VAT (20%)</span>
          <span>{formatPrice(vat)}</span>
        </div>
        <div className="flex justify-between font-medium text-charcoal text-base pt-3 border-t border-ivory-300">
          <span>Total</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-charcoal-50">
        <ShieldCheck size={13} className="text-sage" />
        <span>Secured by Stripe. Your payment details are encrypted.</span>
      </div>
    </div>
  )
}

// ─── Inner form (requires Stripe context) ─────────────────────────────────────
function CheckoutForm({ orderData, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [gdprConsent, setGdprConsent] = useState(false)

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'IE',
    delivery: 'standard',
  })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const deliveryOptions = getDeliveryOptions(orderData.subtotal)
  const selectedDelivery = deliveryOptions.find(d => d.id === form.delivery) || deliveryOptions[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    try {
      // Create payment intent
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(orderData.total * 100),
          currency: 'eur',
          metadata: { email: form.email },
        }),
      })

      if (!res.ok) {
        // In test mode without a backend, simulate success
        const orderNumber = generateOrderNumber()
        onSuccess({ orderNumber, email: form.email })
        return
      }

      const { client_secret } = await res.json()

      const card = elements.getElement(CardElement)
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card,
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            address: {
              line1: form.address,
              city: form.city,
              postal_code: form.postcode,
              country: form.country,
            },
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message)
      } else if (paymentIntent.status === 'succeeded') {
        const orderNumber = generateOrderNumber()
        onSuccess({ orderNumber, email: form.email })
      }
    } catch (err) {
      // No backend — demo mode
      const orderNumber = generateOrderNumber()
      onSuccess({ orderNumber, email: form.email })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'input-base'
  const labelClass = 'block text-xs font-body font-medium text-charcoal uppercase tracking-wider mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact */}
      <section>
        <h2 className="font-display text-xl font-light text-charcoal mb-5 pb-3 border-b border-ivory-200">
          Contact
        </h2>
        <div>
          <label className={labelClass}>Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className={inputClass}
          />
          <label className="flex items-start gap-2.5 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={e => setGdprConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-sage flex-shrink-0"
            />
            <span className="text-xs text-charcoal-100">
              I agree to receive order updates by email. We will never share your data.
            </span>
          </label>
        </div>
      </section>

      {/* Delivery address */}
      <section>
        <h2 className="font-display text-xl font-light text-charcoal mb-5 pb-3 border-b border-ivory-200">
          Delivery address
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required className={inputClass} placeholder="Sophie" />
          </div>
          <div>
            <label className={labelClass}>Last name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required className={inputClass} placeholder="Marchand" />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Address</label>
            <input name="address" value={form.address} onChange={handleChange} required className={inputClass} placeholder="12 Rue de la Paix" />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="Dublin" />
          </div>
          <div>
            <label className={labelClass}>Postcode</label>
            <input name="postcode" value={form.postcode} onChange={handleChange} required className={inputClass} placeholder="D02 YX12" />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Country</label>
            <select name="country" value={form.country} onChange={handleChange} className={inputClass}>
              {EU_COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Delivery options */}
      <section>
        <h2 className="font-display text-xl font-light text-charcoal mb-5 pb-3 border-b border-ivory-200">
          Delivery
        </h2>
        <div className="space-y-3">
          {deliveryOptions.map(option => (
            <label
              key={option.id}
              className={`flex items-center justify-between gap-4 p-4 rounded-md border-2 cursor-pointer transition-all ${
                form.delivery === option.id
                  ? 'border-sage bg-sage-50'
                  : 'border-ivory-300 hover:border-sage-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={form.delivery === option.id}
                  onChange={handleChange}
                  className="accent-sage"
                />
                <div>
                  <p className="text-sm font-body font-medium text-charcoal">{option.label}</p>
                  <p className="text-xs text-charcoal-50">{option.description}</p>
                </div>
              </div>
              <span className="text-sm font-body font-medium text-charcoal flex-shrink-0">
                {option.price === 0 ? 'Free' : formatPrice(option.price)}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Payment */}
      <section>
        <h2 className="font-display text-xl font-light text-charcoal mb-5 pb-3 border-b border-ivory-200">
          Payment
        </h2>
        <div className="stripe-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '15px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#2C2C2A',
                  '::placeholder': { color: '#8C8C88' },
                },
                invalid: { color: '#dc2626' },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-charcoal-50">
          <Lock size={12} className="text-sage" />
          <span>Test mode: use card 4242 4242 4242 4242, any future date, any CVC</span>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-sm px-4 py-3">
            {error}
          </p>
        )}
      </section>

      <Button
        type="submit"
        variant="primary"
        size="xl"
        fullWidth
        loading={loading}
        disabled={!stripe}
      >
        <Lock size={16} /> Place order — {formatPrice(orderData.total)}
      </Button>
    </form>
  )
}

// ─── Main checkout page ───────────────────────────────────────────────────────
export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const deliveryPrice = subtotal >= 65 ? 0 : 4.99
  const vat = getVatAmount(subtotal + deliveryPrice)
  const total = subtotal + deliveryPrice

  const handleSuccess = ({ orderNumber, email }) => {
    clearCart()
    navigate(`/order-confirmation?order=${orderNumber}&email=${encodeURIComponent(email)}`)
  }

  const stripePromise = getStripe()

  return (
    <>
      <Helmet>
        <title>Checkout — VELANCE</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-8">
          <div className="flex items-center gap-2 text-sm font-body text-charcoal-100">
            <Lock size={13} className="text-sage" />
            <span className="font-medium text-charcoal">Secure checkout</span>
            <span>· Your information is protected</span>
          </div>
        </div>
      </div>

      <div className="container-xl py-10 md:py-14">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-light text-charcoal mb-4">Your basket is empty</h1>
            <Button onClick={() => navigate('/shop')}>Continue shopping</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Form */}
            <Elements
              stripe={stripePromise}
              options={{ appearance: stripeElementsAppearance }}
            >
              <CheckoutForm
                orderData={{ items, subtotal, deliveryPrice, vat, total }}
                onSuccess={handleSuccess}
              />
            </Elements>

            {/* Summary */}
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryPrice={deliveryPrice}
              vat={vat}
              total={total}
            />
          </div>
        )}
      </div>
    </>
  )
}
