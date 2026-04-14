import { Helmet } from 'react-helmet-async'

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — LUMEA</title>
      </Helmet>
      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-12">
          <p className="label-xs text-sage mb-3">Legal</p>
          <h1 className="font-display text-display-sm font-light text-charcoal">Terms & Conditions</h1>
          <p className="body-sm text-charcoal-50 mt-2">Last updated: 1 January 2025</p>
        </div>
      </div>
      <div className="container-md py-12">
        <div className="font-body text-charcoal-200 space-y-6">
          {[
            { title: '1. Agreement', body: 'By using the LUMEA website and purchasing our products, you agree to these terms. LUMEA Ltd is registered in Ireland.' },
            { title: '2. Products and pricing', body: 'All prices shown are in EUR and include VAT where applicable. We reserve the right to change prices at any time. Prices at the time of your order are confirmed in your order confirmation email.' },
            { title: '3. Orders and payment', body: 'Orders are confirmed when payment is successfully processed. We accept all major credit and debit cards via Stripe. In the event a product is unavailable after order, we will notify you and issue a full refund.' },
            { title: '4. Delivery', body: 'We aim to dispatch all orders within 1–2 business days. Standard delivery takes 3–5 business days across EU markets. Express delivery takes 1–2 business days. Free delivery is available on orders over €65.' },
            { title: '5. Returns', body: 'You have 30 days from receipt to return any product in its original, unopened condition. To initiate a return, email returns@lumea.eu with your order number. Refunds are processed within 5 business days of receiving your return.' },
            { title: '6. Subscriptions', body: 'Subscription orders are processed monthly on the date of your original purchase. You can cancel, pause, or modify your subscription at any time from your account dashboard or by emailing us. No cancellation fees apply.' },
            { title: '7. Product information', body: 'Our products are cosmetics or food supplements, not medicines. They are not intended to diagnose, treat, cure, or prevent any medical condition. Consult your healthcare professional before use if you are pregnant, breastfeeding, or taking medication.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-display text-xl font-light text-charcoal mb-2">{title}</h2>
              <p className="text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
