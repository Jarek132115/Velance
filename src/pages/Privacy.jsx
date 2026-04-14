import { Helmet } from 'react-helmet-async'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — LUMEA</title>
        <meta name="description" content="LUMEA's privacy policy — how we collect, use, and protect your personal data in compliance with GDPR." />
      </Helmet>
      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-12">
          <p className="label-xs text-sage mb-3">Legal</p>
          <h1 className="font-display text-display-sm font-light text-charcoal">Privacy Policy</h1>
          <p className="body-sm text-charcoal-50 mt-2">Last updated: 1 January 2025</p>
        </div>
      </div>
      <div className="container-md py-12">
        <div className="prose prose-charcoal max-w-none font-body text-charcoal-200 space-y-6">
          {[
            { title: '1. Who we are', body: 'LUMEA Ltd is a company registered in Ireland (Company No. 789456). We operate the website lumea.eu and sell premium skincare and wellness products across the European Union. As data controller, we are responsible for your personal data.' },
            { title: '2. Data we collect', body: 'We collect information you give us when you make a purchase (name, email, delivery address, payment information), when you create an account, when you subscribe to our newsletter, and when you take our product quiz. We also collect anonymous analytics data to improve our site.' },
            { title: '3. How we use your data', body: 'We use your data to process and fulfil your orders, communicate about your orders, send marketing emails (with your explicit consent), personalise your experience, and comply with our legal obligations. We do not sell your data to third parties.' },
            { title: '4. Your rights under GDPR', body: 'You have the right to access your personal data, correct inaccurate data, request deletion of your data, object to processing, request data portability, and withdraw consent at any time. To exercise any of these rights, email us at privacy@lumea.eu.' },
            { title: '5. Cookies', body: 'We use essential cookies to run our website and optional analytics cookies to improve it. You can manage your cookie preferences at any time using the cookie settings link in our footer. For full details, see our Cookie Policy.' },
            { title: '6. Data retention', body: 'We retain your order data for 7 years to comply with Irish tax law. Newsletter subscriptions are retained until you unsubscribe. Account data is retained until you request deletion.' },
            { title: '7. Contact', body: 'For privacy enquiries, contact our Data Protection Officer at privacy@lumea.eu or write to LUMEA Ltd, 1 Grand Canal Square, Dublin 2, Ireland.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-display text-xl font-light text-charcoal mb-2">{title}</h2>
              <p className="text-sm leading-relaxed text-charcoal-200">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
