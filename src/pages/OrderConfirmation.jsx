import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, Truck, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'

const steps = [
  {
    icon: Mail,
    title: 'Confirmation email',
    body: 'A confirmation email is on its way to you now with your order details.',
  },
  {
    icon: Package,
    title: 'Order processed',
    body: 'Your order will be carefully packed and prepared within 1–2 business days.',
  },
  {
    icon: Truck,
    title: 'Dispatched with tracking',
    body: 'We\'ll send your tracking information as soon as your parcel leaves us.',
  },
]

export default function OrderConfirmation() {
  const [params] = useSearchParams()
  const orderNumber = params.get('order') || 'VL-XXXXX'
  const email = params.get('email') || ''

  return (
    <>
      <Helmet>
        <title>Order confirmed — VELANCE</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[80vh] bg-ivory flex items-center">
        <div className="container-md py-20 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-sage-50 border-2 border-sage-200 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle size={36} className="text-sage" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="label-xs text-sage mb-3">Order confirmed</p>
            <h1 className="font-display text-display-md font-light text-charcoal mb-4">
              Thank you for your order
            </h1>
            <p className="body-base text-charcoal-100 mb-2">
              Your order <strong className="text-charcoal">{orderNumber}</strong> has been confirmed.
            </p>
            {email && (
              <p className="text-sm text-charcoal-100 mb-10">
                We&#39;ve sent a confirmation to <strong className="text-charcoal">{email}</strong>
              </p>
            )}
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="bg-cream rounded-md shadow-card p-8 mb-10 text-left"
          >
            <h2 className="font-display text-xl font-light text-charcoal text-center mb-8">
              What happens next
            </h2>
            <div className="space-y-6">
              {steps.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-sage" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-charcoal mb-1">{title}</p>
                    <p className="text-sm text-charcoal-100 leading-relaxed">{body}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute ml-5 mt-10 h-6 w-px bg-ivory-300" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Continue shopping <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="secondary" size="lg">
                View my account
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}
