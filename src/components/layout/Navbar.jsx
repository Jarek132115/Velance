import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react'
import { useCart } from '../../hooks/useCart'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'The Routine', href: '/routine' },
  { label: 'Ingredients', href: '/ingredients' },
  { label: 'Our Story', href: '/about' },
  { label: 'Quiz', href: '/quiz', highlight: true },
]

export default function Navbar() {
  const { itemCount, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  // Scroll behaviour: hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (y > lastY && y > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Trust bar */}
      <div className="bg-sage text-cream text-2xs font-body font-medium tracking-widest uppercase py-2.5 text-center px-4">
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <span>Free EU delivery over €65</span>
          <span className="hidden sm:inline text-sage-200">·</span>
          <span>EU-certified ingredients</span>
          <span className="hidden sm:inline text-sage-200">·</span>
          <span>30-day returns</span>
        </div>
      </div>

      {/* Navbar */}
      <motion.nav
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-nav border-b border-ivory-200'
            : 'bg-cream border-b border-ivory-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <span className="font-display text-2xl md:text-3xl font-light text-charcoal tracking-[0.12em] uppercase group-hover:text-sage transition-colors duration-200">
                Velance
              </span>
              <span className="block text-2xs font-body tracking-[0.25em] uppercase text-gold mt-0.5 leading-none">
                Made for women in their prime
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3 py-2 font-body text-sm font-medium tracking-wider transition-colors duration-150 rounded-sm
                    ${link.highlight
                      ? 'text-sage border border-sage hover:bg-sage hover:text-cream'
                      : isActive
                        ? 'text-sage'
                        : 'text-charcoal-200 hover:text-charcoal'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/account"
                className="hidden md:flex p-2 text-charcoal-200 hover:text-charcoal transition-colors rounded-sm"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              <button
                onClick={openCart}
                className="relative p-2 text-charcoal-200 hover:text-charcoal transition-colors rounded-sm"
                aria-label={`Cart — ${itemCount} items`}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-sage text-cream text-2xs font-body font-medium rounded-full flex items-center justify-center leading-none px-1"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-charcoal-200 hover:text-charcoal transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-cream z-50 flex flex-col shadow-drawer overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-200">
                <span className="font-display text-xl font-light tracking-[0.12em] uppercase text-charcoal">
                  Velance
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-charcoal-200 hover:text-charcoal transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `block py-3 font-display text-2xl font-light border-b border-ivory-200 transition-colors ${
                          isActive ? 'text-sage' : 'text-charcoal hover:text-sage'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Footer links */}
              <div className="px-6 py-6 border-t border-ivory-200 space-y-3">
                <Link to="/account" className="flex items-center gap-2 text-sm font-body text-charcoal-200 hover:text-charcoal transition-colors">
                  <User size={16} /> My account
                </Link>
              </div>

              {/* Trust strip */}
              <div className="px-6 pb-6">
                <p className="text-2xs font-body tracking-widest uppercase text-charcoal-50 text-center leading-loose">
                  EU-certified · Clean ingredients · 30-day returns
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
