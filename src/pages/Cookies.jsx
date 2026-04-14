import { Helmet } from 'react-helmet-async'

const cookieTypes = [
  { name: 'Essential cookies', description: 'Required for the website to function. Cannot be disabled. Includes session management and cart storage.', always: true },
  { name: 'Analytics cookies', description: 'Help us understand how visitors use our site. We use Plausible Analytics, a privacy-first, GDPR-compliant tool with no personal data tracking.', always: false },
  { name: 'Marketing cookies', description: 'Used to show you relevant products. We use these minimally and only with your explicit consent.', always: false },
]

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — VELANCE</title>
      </Helmet>
      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-12">
          <p className="label-xs text-sage mb-3">Legal</p>
          <h1 className="font-display text-display-sm font-light text-charcoal">Cookie Policy</h1>
          <p className="body-sm text-charcoal-50 mt-2">Last updated: 1 January 2025</p>
        </div>
      </div>
      <div className="container-md py-12">
        <div className="font-body text-charcoal-200 space-y-8">
          <div>
            <h2 className="font-display text-xl font-light text-charcoal mb-3">What are cookies?</h2>
            <p className="text-sm leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit, like your cart contents and preferences.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-light text-charcoal mb-5">Cookies we use</h2>
            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div key={type.name} className="bg-cream rounded-md p-5 border border-ivory-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-body font-medium text-charcoal">{type.name}</h3>
                    {type.always ? (
                      <span className="text-2xs font-body uppercase tracking-widest text-sage bg-sage-50 px-2 py-1 rounded-sm">Always active</span>
                    ) : (
                      <span className="text-2xs font-body uppercase tracking-widest text-charcoal-50 bg-ivory px-2 py-1 rounded-sm border border-ivory-300">Optional</span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal-100 leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-light text-charcoal mb-3">Managing your preferences</h2>
            <p className="text-sm leading-relaxed">
              You can manage your cookie preferences at any time using the &#39;Cookie settings&#39; link in our footer. You can also control cookies through your browser settings, though this may affect how our website functions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
