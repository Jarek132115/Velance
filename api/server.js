import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const app = express()
const PORT = process.env.PORT || 3001

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia',
})

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
)

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))

// Raw body for Stripe webhook — must come before json middleware
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    console.log('Payment succeeded:', paymentIntent.id)

    // Update order status in Supabase
    if (supabase && process.env.SUPABASE_URL) {
      await supabase
        .from('orders')
        .update({ status: 'paid', stripe_payment_id: paymentIntent.id })
        .eq('stripe_payment_intent_id', paymentIntent.id)
    }
  }

  res.json({ received: true })
})

app.use(express.json())

// ─── POST /api/create-payment-intent ──────────────────────────────────────────
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', metadata = {} } = req.body

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    })

    res.json({ client_secret: paymentIntent.client_secret })
  } catch (error) {
    console.error('PaymentIntent error:', error)
    res.status(500).json({ error: error.message })
  }
})

// ─── GET /api/products ────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    // In production, fetch from Supabase
    const { collection, limit = 50 } = req.query
    // For now, return mock data signal
    res.json({ message: 'Products served from frontend data layer', collection, limit })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─── POST /api/orders ─────────────────────────────────────────────────────────
app.post('/api/orders', async (req, res) => {
  try {
    const { orderData, paymentIntentId } = req.body

    if (!orderData) return res.status(400).json({ error: 'Missing order data' })

    const order = {
      stripe_payment_intent_id: paymentIntentId,
      customer_email: orderData.email,
      items: orderData.items,
      subtotal: orderData.subtotal,
      delivery_price: orderData.deliveryPrice,
      total: orderData.total,
      delivery_address: orderData.address,
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    if (supabase && process.env.SUPABASE_URL) {
      const { data, error } = await supabase.from('orders').insert([order]).select()
      if (error) throw error
      res.json({ success: true, order: data[0] })
    } else {
      // Mock response without Supabase
      res.json({ success: true, order: { ...order, id: `mock-${Date.now()}` } })
    }
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({ error: error.message })
  }
})

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`VELANCE API running on http://localhost:${PORT}`)
})

export default app
