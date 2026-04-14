import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getProductById } from '../data/products'

// ─── Ingredient data ──────────────────────────────────────────────────────────
const keyIngredients = [
  {
    name: 'Bakuchiol 1.5%',
    category: 'Retinol Alternative',
    tagline: 'The retinol alternative dermatologists are prescribing instead',
    what: 'A plant-derived compound extracted from the seeds of Psoralea corylifolia. Used in Ayurvedic medicine for centuries, and now the subject of multiple peer-reviewed clinical trials.',
    evidence: 'A double-blind, randomised study published in the British Journal of Dermatology (2019) found Bakuchiol equally effective to 0.5% retinol for reducing fine lines and wrinkles, with significantly less irritation. A 2018 study found it upregulates collagen Types I, III, and IV — the same mechanism as retinol.',
    whoFor: 'Women with reactive or perimenopausal skin who cannot tolerate retinol. Safe for use during hormonal fluctuations that increase skin sensitivity.',
    products: ['lumea-001'],
    colour: 'sage',
  },
  {
    name: 'Argireline® (Acetyl Hexapeptide-3)',
    category: 'Patented Peptide',
    tagline: 'The peptide that relaxes expression lines at their source',
    what: 'A patented synthetic peptide that inhibits the release of neurotransmitters responsible for facial muscle contractions. Often called the topical Botox alternative — though the mechanism differs, the result is similar.',
    evidence: 'Clinical studies by Lipotec (the patent holder) show Argireline® reduces the depth of expression wrinkles by up to 27% after 4 weeks of daily use at 5% concentration. Used in our Renewal Serum at this clinical concentration.',
    whoFor: 'Anyone targeting expression lines — particularly around the eyes and forehead, which deepen as oestrogen decline causes skin to thin and lose elasticity.',
    products: ['lumea-001'],
    colour: 'gold',
  },
  {
    name: 'Matrixyl 3000®',
    category: 'Collagen-Stimulating Peptide',
    tagline: 'The gold standard for rebuilding collagen from within',
    what: 'A combination of two Matrikines — Palmitoyl Tripeptide-1 and Palmitoyl Tetrapeptide-7 — that signal fibroblasts to produce collagen and elastin. Developed by Sederma, the standard reference in peptide skincare.',
    evidence: 'A published study showed Matrixyl 3000® doubles the amount of collagen produced by fibroblasts in vitro. A 12-week in vivo study showed a 45% reduction in deep wrinkles. It is one of the most studied peptide complexes in skincare science.',
    whoFor: 'Skin that has lost structural support from oestrogen decline. Works best as an evening active, when skin repair processes are most active.',
    products: ['lumea-001'],
    colour: 'charcoal',
  },
  {
    name: "Matrixyl Synthe'6®",
    category: 'Advanced Peptide Complex',
    tagline: 'Six youth proteins, one molecule',
    what: "An advanced peptide complex from Sederma, more recent and more comprehensive than Matrixyl 3000®. Stimulates six key structural proteins — not just collagen — that determine skin's firmness and architecture.",
    evidence: "In vitro studies show Matrixyl Synthe'6® stimulates Collagen I, III, IV, Fibronectin, Hyaluronic Acid, and Laminin 5 simultaneously. An in vivo study showed visible reduction in deep wrinkles after 2 months of use at 1% concentration.",
    whoFor: 'The neck and décolletage, which lose collagen faster than the face. Used in the Neck & Décolletage Firming Cream specifically because this area requires the most advanced collagen stimulation available.',
    products: ['lumea-006'],
    colour: 'sage',
  },
  {
    name: 'Haloxyl™',
    category: 'Patented Eye Ingredient',
    tagline: 'The only ingredient that addresses the vascular cause of dark circles',
    what: 'A patented complex combining N-Hydroxysuccinimide, Chrysin, Palmitoyl Tripeptide-1, and Palmitoyl Tetrapeptide-7. Specifically developed to address the haemoglobin degradation products that cause dark circles.',
    evidence: 'Clinical studies by Sederma show Haloxyl™ reduces dark circle intensity by up to 60% over 56 days. It works by improving lymphatic drainage and breaking down the iron-containing pigments that create the bluish-brown colour under the eye.',
    whoFor: 'Women with vascular or pigmented dark circles — both of which are exacerbated by hormonal fluctuation, poor sleep from perimenopause, and the gradual thinning of the orbital skin that reveals underlying vasculature.',
    products: ['lumea-004'],
    colour: 'gold',
  },
  {
    name: 'Eyeliss™',
    category: 'Patented Eye Ingredient',
    tagline: 'Clinically proven to reduce under-eye bags in 8 weeks',
    what: 'A patented peptide complex from Sederma combining Hesperidin Methyl Chalcone, Dipeptide VW, and Lipophilic Caffeic Acid Ester. Targets the multiple mechanisms that cause under-eye bags.',
    evidence: 'Published clinical studies show Eyeliss™ reduces bag severity by 65% over 56 days. It works by improving lymphatic drainage, reducing capillary permeability, and increasing skin firmness in the orbital area.',
    whoFor: 'Women experiencing the persistent morning puffiness that perimenopausal progesterone fluctuation causes — puffiness that no longer resolves by mid-morning as it did in earlier years.',
    products: ['lumea-004'],
    colour: 'charcoal',
  },
  {
    name: 'L-Ascorbic Acid 15%',
    category: 'Vitamin C',
    tagline: 'The only form of Vitamin C with clinical proof behind it',
    what: 'Pure, stabilised Vitamin C at its most bioavailable form. The only form of Vitamin C with published peer-reviewed evidence for brightening, collagen stimulation, and antioxidant protection. Other Vitamin C derivatives (Ascorbyl Glucoside, Magnesium Ascorbyl Phosphate, etc.) have far less evidence.',
    evidence: 'Studies show L-Ascorbic Acid at 15%, pH 2.5–3.0, paired with Ferulic Acid, provides significantly greater antioxidant protection than UV-protective agents alone. Duke University research showed the combination provides 8x greater photoprotection than either ingredient independently.',
    whoFor: 'Women with uneven skin tone, sun damage, or the greyish dullness that slowed cell turnover causes after 40. Best used in the morning, under SPF.',
    products: ['lumea-005'],
    colour: 'gold',
  },
  {
    name: 'Ferulic Acid 0.5%',
    category: 'Antioxidant Stabiliser',
    tagline: 'The ingredient that makes Vitamin C three times more effective',
    what: 'A naturally occurring phenolic antioxidant found in plant cell walls. Its primary role in skincare is as a stabiliser and potentiator — it prevents Vitamin C from oxidising and dramatically amplifies its efficacy.',
    evidence: 'Research published in the Journal of Investigative Dermatology showed that combining L-Ascorbic Acid with Ferulic Acid doubles its photoprotective capacity and triples its overall antioxidant effectiveness. The combination is now considered the reference standard for antioxidant formulation.',
    whoFor: 'Anyone using a Vitamin C serum. Ferulic Acid is not optional — without it, L-Ascorbic Acid oxidises quickly, turning orange and losing its potency.',
    products: ['lumea-005'],
    colour: 'sage',
  },
  {
    name: 'Oat Beta-Glucan',
    category: 'Anti-Inflammatory',
    tagline: 'The best clinically proven calming ingredient for reactive skin',
    what: 'A polysaccharide derived from oat kernels. One of the most extensively studied calming ingredients in dermatology, with a track record in clinical settings for treating eczema, psoriasis, and post-procedure skin — as well as routine skin inflammation.',
    evidence: 'Multiple double-blind placebo-controlled studies confirm Oat Beta-Glucan reduces erythema (redness), pruritus (itching), and transepidermal water loss. The FDA approves it as a skin protectant. Particularly relevant for the flushing and reactivity that oestrogen fluctuation triggers.',
    whoFor: 'Women experiencing the heightened skin reactivity, redness, and sensitivity that is among the most common and least acknowledged skin consequences of perimenopause.',
    products: ['lumea-002'],
    colour: 'charcoal',
  },
  {
    name: 'DMAE (Dimethylaminoethanol)',
    category: 'Firming Agent',
    tagline: 'Visible tightening in 20 minutes from the first application',
    what: 'A naturally occurring compound found in small quantities in the brain and certain fish. As a topical, it works by stabilising cell membranes and increasing acetylcholine production, which stimulates muscle tone and creates a visible tightening effect.',
    evidence: 'A randomised clinical trial published in the American Journal of Clinical Dermatology showed DMAE significantly improved facial sagging, fine lines, and the overall appearance of skin firmness. Effects are visible within 20 minutes because DMAE acts directly on cell membrane stability.',
    whoFor: 'Women targeting the loss of jaw definition and neck firmness — areas where sagging is caused by both collagen loss and reduced muscle tone, which DMAE specifically addresses.',
    products: ['lumea-006'],
    colour: 'gold',
  },
]

const colourClasses = {
  sage: { bg: 'bg-sage-50', border: 'border-sage-100', badge: 'text-sage bg-sage-50' },
  gold: { bg: 'bg-gold-50', border: 'border-gold-100', badge: 'text-gold-600 bg-gold-50' },
  charcoal: { bg: 'bg-ivory', border: 'border-ivory-300', badge: 'text-charcoal-200 bg-ivory' },
}

// ─── Ingredient card ──────────────────────────────────────────────────────────
function IngredientCard({ ingredient, index }) {
  const colours = colourClasses[ingredient.colour]
  const relatedProducts = ingredient.products.map(id => getProductById(id)).filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`bg-cream rounded-md border ${colours.border} overflow-hidden shadow-card`}
    >
      <div className={`px-6 py-5 ${colours.bg} border-b ${colours.border}`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className={`text-2xs font-body uppercase tracking-widest ${colours.badge} px-2.5 py-1 rounded-sm inline-block mb-2`}>
              {ingredient.category}
            </span>
            <h3 className="font-display text-xl font-light text-charcoal">{ingredient.name}</h3>
          </div>
        </div>
        <p className="body-sm text-charcoal-100 italic mt-1">{ingredient.tagline}</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div>
          <p className="label-xs text-charcoal mb-2">What it is</p>
          <p className="text-sm font-body text-charcoal-200 leading-relaxed">{ingredient.what}</p>
        </div>
        <div>
          <p className="label-xs text-charcoal mb-2">The evidence</p>
          <p className="text-sm font-body text-charcoal-200 leading-relaxed">{ingredient.evidence}</p>
        </div>
        <div>
          <p className="label-xs text-charcoal mb-2">Best for</p>
          <p className="text-sm font-body text-charcoal-200 leading-relaxed">{ingredient.whoFor}</p>
        </div>

        {relatedProducts.length > 0 && (
          <div className="pt-4 border-t border-ivory-200">
            <p className="label-xs text-charcoal mb-3">Found in</p>
            <div className="flex flex-wrap gap-2">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-body text-sage border border-sage-200 bg-sage-50 px-3 py-1.5 rounded-sm hover:bg-sage-100 transition-colors"
                >
                  {p.name} <ArrowRight size={11} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Ingredients() {
  return (
    <>
      <Helmet>
        <title>Our Ingredients — LUMEA Skincare Science</title>
        <meta name="description" content="The clinical evidence behind every LUMEA active ingredient. Bakuchiol, Argireline®, Matrixyl 3000®, Haloxyl™, Eyeliss™, L-Ascorbic Acid and more — explained honestly." />
      </Helmet>

      {/* Hero */}
      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-14 md:py-20">
          <p className="label-xs text-sage mb-3">Transparency by design</p>
          <h1 className="font-display text-display-md md:text-display-lg font-light text-charcoal mb-5 max-w-2xl">
            Every ingredient. The clinical evidence. Explained.
          </h1>
          <p className="body-lg text-charcoal-100 max-w-2xl">
            We do not use proprietary blends to hide concentrations. We do not call ingredients &#8220;plant extracts&#8221; when their clinical names are more accurate. This is everything we use and why we use it.
          </p>
        </div>
      </div>

      <div className="container-xl py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {keyIngredients.map((ingredient, i) => (
            <IngredientCard key={ingredient.name} ingredient={ingredient} index={i} />
          ))}
        </div>

        {/* Trust note */}
        <div className="mt-14 bg-sage text-cream rounded-md p-8 md:p-10">
          <h2 className="font-display text-display-sm font-light mb-4">What we do not use</h2>
          <p className="body-base text-sage-100 mb-6">
            Every LUMEA formula is free from synthetic fragrance, parabens, formaldehyde-releasing preservatives, mineral oils, and PEGs. Not because these ingredients are necessarily harmful at the concentrations used in cosmetics — but because they add no benefit, and we will not use an ingredient that does not earn its place in the formula.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Synthetic fragrance', 'Parabens', 'Mineral oil', 'PEGs', 'Formaldehyde releasers', 'Artificial colours'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-sage-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-sage-200 text-xs leading-none">✕</span>
                </div>
                <span className="text-sm text-sage-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
