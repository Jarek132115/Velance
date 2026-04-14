import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'

const values = [
  {
    label: 'Ingredient transparency',
    body: 'We name every active, at what concentration, and why it is there. No proprietary blends used to obscure weak formulas. No "complex" names for what is simply plant water.',
  },
  {
    label: 'Clinical actives at clinical doses',
    body: 'An ingredient included at 0.01% does nothing. We use actives at the concentrations shown to produce results in published clinical studies — not at the trace amounts that allow a brand to name them on the label.',
  },
  {
    label: 'Hormone-first formulation',
    body: 'Every LUMEA formula starts with one question: what does oestrogen decline do to this part of the skin, and what does the evidence say addresses it? Not what does the trend cycle say, and not what margins allow.',
  },
  {
    label: 'Honest positioning',
    body: 'We sit between Augustinus Bader and Elemis — not because of packaging or brand story, but because our formulas use the same quality of actives at comparable or higher concentrations, at a price that reflects our direct model.',
  },
]

const milestones = [
  { year: '2024', event: 'LUMEA founded — first formulas developed with SelfNamed, Riga' },
  { year: '2025', event: 'EU Cosmetics Regulation certification completed · First 500 customers' },
  { year: '2026', event: 'European launch across 7 markets · Full six-product range released' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>Our Story — LUMEA Anti-Aging Skincare</title>
        <meta name="description" content="Why we built LUMEA — luxury anti-aging skincare for women in their 40s and 50s, formulated around the hormonal reality that most skincare brands ignore." />
      </Helmet>

      {/* Hero — sage background */}
      <section className="bg-sage text-cream">
        <div className="container-xl py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="label-xs text-sage-100 mb-5">Our story</p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl font-light text-cream mb-8 text-balance">
              We built LUMEA because we couldn&#39;t find what we were looking for.
            </h1>
            <p className="body-lg text-sage-100 leading-relaxed">
              Skincare that acknowledged what hormonal change actually does to skin — and formulated specifically around that reality — was almost non-existent. So we built it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main story */}
      <section className="bg-ivory">
        <div className="container-xl py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Story text */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="body-lg text-charcoal-100 leading-relaxed">
                  Skincare brands that acknowledge what hormonal change actually does to skin are almost non-existent. Most anti-aging products are designed around the skin of a 25-year-old, or for a woman who is simply &#8220;getting older&#8221; — without acknowledging the specific, biological mechanisms of oestrogen decline.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="body-lg text-charcoal-100 leading-relaxed">
                  We are not those brands. Every product we make is formulated around the hormonal reality of skin in the 40s and 50s. The thinning. The reactivity. The loss of glow. The texture changes that seem to happen overnight. The barrier damage. The puffiness that does not resolve by 10am anymore.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <p className="body-lg text-charcoal-100 leading-relaxed">
                  We address the cause, not just the visible effect. And we tell you exactly what we&#39;re using, at what concentration, and what the evidence says about it — because we think the women buying this deserve that level of honesty.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="body-lg text-charcoal-100 leading-relaxed">
                  Six products. One complete routine. Formulated with the same quality of actives used in products sold at two or three times the price — because our direct model removes the margin that luxury department store brands are built on.
                </p>
              </motion.div>
            </div>

            {/* Visual + milestones */}
            <div className="space-y-8">
              {/* Visual placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-sage-100 to-ivory-200 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="font-display text-7xl font-light text-sage-200 block">L</span>
                    <span className="font-display text-lg font-light text-sage-400 tracking-[0.25em] uppercase mt-2 block">
                      Lumea
                    </span>
                    <span className="label-xs text-gold mt-3 block">EU-certified · Founded 2024</span>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                {milestones.map(({ year, event }) => (
                  <div key={year} className="flex gap-4">
                    <span className="font-display text-lg text-gold flex-shrink-0 w-12">{year}</span>
                    <p className="text-sm font-body text-charcoal-200 leading-relaxed">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream section-py">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="label-xs text-sage mb-3">How we work</p>
            <h2 className="font-display text-display-sm md:text-display-md font-light text-charcoal">
              What we commit to
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-ivory rounded-md p-6 border border-ivory-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-6 bg-sage rounded-full flex-shrink-0" />
                  <h3 className="font-body font-medium text-charcoal">{value.label}</h3>
                </div>
                <p className="text-sm font-body text-charcoal-100 leading-relaxed">{value.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-cream section-py-sm">
        <div className="container-xl text-center">
          <h2 className="font-display text-display-sm font-light mb-4">
            See what we&#39;re made of
          </h2>
          <p className="body-base text-charcoal-50 mb-8 max-w-lg mx-auto">
            Read the ingredient science, take the quiz, or go straight to the collection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/ingredients">
              <Button variant="white">Read the ingredient science <ArrowRight size={15} /></Button>
            </Link>
            <Link to="/shop">
              <Button variant="secondary" className="border-charcoal-300 text-charcoal-50 hover:border-cream hover:text-cream">
                Shop the collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
