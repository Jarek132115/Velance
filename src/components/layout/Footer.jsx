import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Play, Share2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const shopLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'Skin Collection', href: '/collection/skin' },
  { label: 'Balance Collection', href: '/collection/balance' },
  { label: 'Ritual Collection', href: '/collection/ritual' },
  { label: 'Gift Sets', href: '/shop?tag=gift-set' },
  { label: 'Bestsellers', href: '/shop?sort=bestseller' },
]

const companyLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'The Science', href: '/our-story#science' },
  { label: 'Sustainability', href: '/our-story#sustainability' },
  { label: 'Take the Quiz', href: '/quiz' },
  { label: 'Stockists', href: '/stockists' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Returns Policy', href: '/returns' },
  { label: 'Accessibility', href: '/accessibility' },
]

export default function Footer({ onCookieSettings }) {
  const [email, setEmail] = useState('')
  const [gdprChecked, setGdprChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!gdprChecked) {
      toast.error('Please confirm you\'re happy to receive emails from LUMEA.')
      return
    }
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800))
    toast.success('You\'re in. Welcome to LUMEA.')
    setEmail('')
    setGdprChecked(false)
    setSubmitting(false)
  }

  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter strip */}
      <div className="bg-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-xl mx-auto text-center">
            <p className="label-xs text-sage-100 mb-3">Join the community</p>
            <h2 className="font-display text-display-sm md:text-display-md font-light text-cream mb-3">
              Honest wellness, delivered to your inbox
            </h2>
            <p className="body-base text-sage-100 mb-8">
              Perimenopause insights, product launches, and skincare education — no filler.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-4">
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 rounded-sm text-cream placeholder-sage-200 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all font-body text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-cream text-sage font-body font-medium text-sm uppercase tracking-widest rounded-sm hover:bg-ivory transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {submitting ? 'Joining…' : 'Join LUMEA'}
                  {!submitting && <ArrowRight size={16} />}
                </button>
              </div>
              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdprChecked}
                  onChange={(e) => setGdprChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-cream flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs text-sage-100 leading-relaxed">
                  I&#39;m happy to receive LUMEA emails. You can unsubscribe at any time. We will never share your data with third parties. View our{' '}
                  <Link to="/privacy" className="underline hover:text-cream transition-colors">Privacy Policy</Link>.
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-light tracking-[0.12em] uppercase text-cream">
                Lumea
              </span>
            </Link>
            <p className="body-sm text-charcoal-50 mb-6 max-w-xs leading-relaxed">
              Premium skincare and wellness for women navigating perimenopause and beyond. Formulated with intention. Sold with honesty.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { icon: Camera, href: '#', label: 'Instagram' },
                { icon: Share2, href: '#', label: 'Facebook' },
                { icon: Play, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-charcoal-300 text-charcoal-50 hover:border-cream hover:text-cream transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="label-xs text-cream mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="body-sm text-charcoal-50 hover:text-cream transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="label-xs text-cream mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="body-sm text-charcoal-50 hover:text-cream transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="label-xs text-cream mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="body-sm text-charcoal-50 hover:text-cream transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onCookieSettings}
                  className="body-sm text-charcoal-50 hover:text-cream transition-colors duration-150 text-left"
                >
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* EU Certifications strip */}
        <div className="mt-14 pt-8 border-t border-charcoal-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Cert badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {['EU Cosmetics Regulation', 'COSMOS Certified', 'Cruelty-Free', 'FSC Packaging'].map((cert) => (
                <span
                  key={cert}
                  className="text-2xs font-body uppercase tracking-widest text-charcoal-50 border border-charcoal-300 px-3 py-1.5 rounded-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-xs font-body text-charcoal-100 text-center md:text-right">
              © {new Date().getFullYear()} LUMEA Ltd. All rights reserved.<br className="md:hidden" />
              <span className="hidden md:inline"> · </span>Registered in Ireland. Company No. 789456.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
