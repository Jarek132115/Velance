import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Helmet><title>Page not found — VELANCE</title></Helmet>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-display text-8xl font-light text-sage-100 mb-4">404</p>
          <h1 className="font-display text-display-sm font-light text-charcoal mb-4">
            This page doesn&#39;t exist
          </h1>
          <p className="body-base text-charcoal-100 mb-8 max-w-md mx-auto">
            You might have followed an old link. Let&#39;s get you back somewhere useful.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/"><Button variant="primary">Go home</Button></Link>
            <Link to="/shop"><Button variant="secondary">Shop all products</Button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
