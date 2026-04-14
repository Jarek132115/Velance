import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('lumea-cookie-consent')
    if (!consent) {
      // Delay to avoid blocking above-the-fold
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('lumea-cookie-consent', 'all')
    setVisible(false)
  }

  const essential = () => {
    localStorage.setItem('lumea-cookie-consent', 'essential')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal text-cream border-t border-charcoal-300"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm font-body text-charcoal-50 max-w-2xl leading-relaxed">
                We use cookies to improve your experience, personalise content, and analyse site traffic.
                Essential cookies are always active.{' '}
                <Link to="/cookies" className="underline hover:text-cream transition-colors">
                  Cookie Policy
                </Link>
                {' · '}
                <Link to="/privacy" className="underline hover:text-cream transition-colors">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={essential}
                  className="px-4 py-2 text-xs font-body font-medium uppercase tracking-widest text-charcoal-50 border border-charcoal-300 rounded-sm hover:border-cream hover:text-cream transition-all"
                >
                  Essential only
                </button>
                <button
                  onClick={accept}
                  className="px-5 py-2 text-xs font-body font-medium uppercase tracking-widest bg-sage text-cream rounded-sm hover:bg-sage-400 transition-colors"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
