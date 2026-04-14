import { Helmet } from 'react-helmet-async'
import { User, Package, Settings } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'

export default function Account() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <>
      <Helmet>
        <title>My Account — LUMEA</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-12">
          <p className="label-xs text-sage mb-3">My account</p>
          <h1 className="font-display text-display-sm font-light text-charcoal">
            {isAuthenticated ? `Welcome back${user?.email ? `, ${user.email.split('@')[0]}` : ''}` : 'Sign in to your account'}
          </h1>
        </div>
      </div>

      <div className="container-xl py-12">
        {isAuthenticated ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Package, label: 'My orders', desc: 'View your order history and track deliveries.' },
              { icon: User, label: 'Profile', desc: 'Update your personal details and preferences.' },
              { icon: Settings, label: 'Subscriptions', desc: 'Manage your active LUMEA subscriptions.' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-cream rounded-md shadow-card p-6">
                <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-sage" />
                </div>
                <h3 className="font-display text-lg font-light text-charcoal mb-2">{label}</h3>
                <p className="text-sm text-charcoal-100">{desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-sm mx-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center mx-auto mb-6">
              <User size={24} className="text-sage-200" />
            </div>
            <h2 className="font-display text-2xl font-light text-charcoal mb-3">Sign in to LUMEA</h2>
            <p className="text-sm text-charcoal-100 mb-8">Access your orders, subscriptions, and saved preferences.</p>
            <Button variant="primary" fullWidth className="mb-3">Sign in</Button>
            <Button variant="secondary" fullWidth>Create account</Button>
          </div>
        )}
      </div>
    </>
  )
}
