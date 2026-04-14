import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function Card({ children, className, hover = false, onClick, ...props }) {
  const Component = hover ? motion.div : 'div'
  const motionProps = hover ? {
    whileHover: { y: -4, boxShadow: '0 4px 20px rgba(44, 44, 42, 0.12), 0 8px 32px rgba(44, 44, 42, 0.08)' },
    transition: { duration: 0.2, ease: 'easeOut' },
  } : {}

  return (
    <Component
      onClick={onClick}
      className={cn(
        'bg-cream rounded-md shadow-card overflow-hidden',
        hover && 'cursor-pointer',
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}
