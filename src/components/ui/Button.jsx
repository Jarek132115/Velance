import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-sage text-cream hover:bg-sage-600 focus-visible:ring-sage',
  secondary: 'bg-transparent border border-sage text-sage hover:bg-sage-50 focus-visible:ring-sage',
  ghost: 'bg-transparent text-charcoal hover:bg-ivory focus-visible:ring-charcoal',
  gold: 'bg-gold text-cream hover:bg-gold-500 shadow-gold focus-visible:ring-gold',
  dark: 'bg-charcoal text-cream hover:bg-charcoal-500 focus-visible:ring-charcoal',
  white: 'bg-cream text-charcoal hover:bg-ivory border border-ivory-300 focus-visible:ring-charcoal',
}

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-wider',
  md: 'px-6 py-3 text-sm tracking-wider',
  lg: 'px-8 py-4 text-sm tracking-wider',
  xl: 'px-10 py-5 text-base tracking-wider',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  fullWidth,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-body font-medium uppercase tracking-widest rounded-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  )
}
