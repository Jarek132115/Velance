import { cn } from '../../lib/utils'

const variants = {
  sage: 'bg-sage-50 text-sage-600 border border-sage-100',
  gold: 'bg-gold-50 text-gold-600 border border-gold-100',
  ivory: 'bg-ivory border border-ivory-300 text-charcoal-200',
  charcoal: 'bg-charcoal text-cream',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  new: 'bg-sage text-cream',
  bestseller: 'bg-gold text-cream',
  subscription: 'bg-sage-50 text-sage border border-sage-200',
}

export default function Badge({ children, variant = 'sage', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-sm text-2xs font-body font-medium uppercase tracking-widest',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
