import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'
import { useCart } from '../hooks/useCart'
import { products } from '../data/products'
import toast from 'react-hot-toast'

const STEPS = [
  {
    id: 'concern',
    question: 'What\'s your main concern right now?',
    subtitle: 'Choose the one that feels most urgent to you.',
    options: [
      { value: 'skin-aging', label: 'My skin feels different — less firm, more dry', icon: '✦' },
      { value: 'hair', label: 'My hair is thinning or changing texture', icon: '◎' },
      { value: 'energy', label: 'I\'m exhausted — wired but tired', icon: '◈' },
      { value: 'hormones', label: 'Hot flushes, night sweats, mood shifts', icon: '◐' },
    ],
  },
  {
    id: 'skin',
    question: 'How does your skin feel most of the time?',
    subtitle: 'Be honest — we can handle it.',
    options: [
      { value: 'dry', label: 'Dry and tight, especially after cleansing', icon: '◎' },
      { value: 'uneven', label: 'Uneven tone, dark spots, or dullness', icon: '◈' },
      { value: 'reactive', label: 'Reactive, flushing, or sensitive to products', icon: '◐' },
      { value: 'fine-lines', label: 'Fine lines and loss of firmness', icon: '✦' },
    ],
  },
  {
    id: 'symptoms',
    question: 'Which perimenopause symptoms do you experience?',
    subtitle: 'Select all that apply.',
    multi: true,
    options: [
      { value: 'hot-flushes', label: 'Hot flushes or night sweats', icon: '◎' },
      { value: 'sleep', label: 'Disrupted sleep', icon: '◈' },
      { value: 'mood', label: 'Mood changes or anxiety', icon: '◐' },
      { value: 'brain-fog', label: 'Brain fog or difficulty concentrating', icon: '✦' },
      { value: 'none', label: 'None of the above / I\'m not sure', icon: '○' },
    ],
  },
  {
    id: 'routine',
    question: 'What does your current routine look like?',
    subtitle: 'No judgement — we just want to understand where you are.',
    options: [
      { value: 'minimal', label: 'Very minimal — cleanser and moisturiser', icon: '○' },
      { value: 'some', label: 'A few steps — I have some products I use regularly', icon: '◎' },
      { value: 'full', label: 'A considered routine — serums, SPF, the lot', icon: '✦' },
      { value: 'nothing', label: 'Honestly, I\'ve given up on most things', icon: '◐' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your monthly wellness budget?',
    subtitle: 'We\'ll tailor our recommendations to work for you.',
    options: [
      { value: 'under-50', label: 'Up to €50 / month', icon: '○' },
      { value: '50-100', label: '€50–€100 / month', icon: '◎' },
      { value: '100-plus', label: 'Over €100 / month', icon: '✦' },
      { value: 'flexible', label: 'It depends on the product', icon: '◐' },
    ],
  },
]

// ─── Product recommendation logic ─────────────────────────────────────────────
function getRecommendations(answers) {
  const { concern, skin, symptoms = [], budget } = answers

  let recommended = []

  if (concern === 'hormones' || (symptoms && symptoms.includes('hot-flushes'))) {
    recommended.push(products.find(p => p.id === 'balance-001'))
  }

  if (concern === 'skin-aging' || skin === 'fine-lines') {
    recommended.push(products.find(p => p.id === 'skin-001'))
  }

  if (skin === 'dry') {
    recommended.push(products.find(p => p.id === 'skin-002'))
  }

  if (concern === 'hair') {
    recommended.push(products.find(p => p.id === 'balance-004'))
    recommended.push(products.find(p => p.id === 'ritual-001'))
  }

  if (concern === 'energy' || (symptoms && symptoms.includes('brain-fog'))) {
    recommended.push(products.find(p => p.id === 'balance-003'))
  }

  // Deduplicate and limit to 3
  const seen = new Set()
  recommended = recommended.filter(p => p && !seen.has(p.id) && seen.add(p.id))

  // Fill to 3 with bestsellers if needed
  if (recommended.length < 3) {
    const bestsellers = products.filter(p => p.isBestseller && !seen.has(p.id))
    recommended.push(...bestsellers.slice(0, 3 - recommended.length))
  }

  return recommended.slice(0, 3)
}

// ─── Step component ───────────────────────────────────────────────────────────
function QuizStep({ step, selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {step.options.map((option) => {
        const isSelected = step.multi
          ? Array.isArray(selected) && selected.includes(option.value)
          : selected === option.value

        return (
          <motion.button
            key={option.value}
            onClick={() => onSelect(option.value)}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-start gap-4 p-4 rounded-md border-2 text-left transition-all duration-150 ${
              isSelected
                ? 'border-sage bg-sage-50 shadow-soft'
                : 'border-ivory-300 bg-cream hover:border-sage-200 hover:bg-ivory'
            }`}
          >
            <span className={`text-xl flex-shrink-0 mt-0.5 ${isSelected ? 'text-sage' : 'text-charcoal-50'}`}>
              {option.icon}
            </span>
            <span className={`text-sm font-body leading-relaxed ${isSelected ? 'text-sage font-medium' : 'text-charcoal-200'}`}>
              {option.label}
            </span>
            {isSelected && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sage flex items-center justify-center">
                <span className="text-cream text-xs">✓</span>
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Results component ────────────────────────────────────────────────────────
function QuizResults({ recommendations, answers, onRetake }) {
  const { addItem } = useCart()

  const addAll = () => {
    recommendations.forEach(p => addItem(p))
    toast.success('Your ritual has been added to your basket', {
      style: { background: '#FDFCFA', color: '#2C2C2A', border: '1px solid #E5D9C2' },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <p className="label-xs text-sage mb-3">Your personalised ritual</p>
        <h2 className="font-display text-display-md font-light text-charcoal mb-4">
          Based on your answers, these are your products
        </h2>
        <p className="body-base text-charcoal-100 max-w-lg mx-auto">
          We&#39;ve matched you with three products that address your specific concerns. Start with any one, or add the full ritual.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="primary" size="lg" onClick={addAll}>
          Add all to basket
        </Button>
        <button
          onClick={onRetake}
          className="flex items-center gap-2 text-sm font-body text-charcoal-100 hover:text-charcoal transition-colors"
        >
          <RotateCcw size={14} /> Retake the quiz
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [complete, setComplete] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  const step = STEPS[currentStep]
  const totalSteps = STEPS.length
  const progress = ((currentStep) / totalSteps) * 100

  const currentAnswer = answers[step?.id]

  const handleSelect = (value) => {
    if (step.multi) {
      const current = answers[step.id] || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      setAnswers(prev => ({ ...prev, [step.id]: updated }))
    } else {
      setAnswers(prev => ({ ...prev, [step.id]: value }))
    }
  }

  const canProceed = step?.multi
    ? (answers[step?.id] || []).length > 0
    : !!answers[step?.id]

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      const recs = getRecommendations(answers)
      setRecommendations(recs)
      setComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleRetake = () => {
    setCurrentStep(0)
    setAnswers({})
    setComplete(false)
    setRecommendations([])
  }

  return (
    <>
      <Helmet>
        <title>Find Your Ritual — VELANCE Skincare Quiz</title>
        <meta name="description" content="Take the VELANCE 5-step quiz to find your personalised skincare and wellness ritual for perimenopause and beyond." />
      </Helmet>

      {/* Hero */}
      <div className="bg-sage text-cream">
        <div className="container-xl py-14 md:py-20 text-center">
          <p className="label-xs text-sage-100 mb-3">Personalised ritual</p>
          <h1 className="font-display text-display-md md:text-display-lg font-light mb-4">
            Find your VELANCE ritual
          </h1>
          <p className="body-lg text-sage-100 max-w-md mx-auto">
            Answer 5 honest questions. Get three products matched to your life.
          </p>
        </div>
      </div>

      <div className="container-md py-12 md:py-16">
        {!complete ? (
          <>
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-body text-charcoal-50">
                  Question {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-xs font-body text-charcoal-50">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div className="h-1 bg-ivory-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-sage rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="font-display text-display-sm font-light text-charcoal mb-2">
                    {step.question}
                  </h2>
                  <p className="body-base text-charcoal-100">{step.subtitle}</p>
                  {step.multi && (
                    <p className="text-xs text-sage mt-1">Select all that apply</p>
                  )}
                </div>

                <QuizStep
                  step={step}
                  selected={currentAnswer}
                  onSelect={handleSelect}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-ivory-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-sm font-body text-charcoal-100 hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed}
              >
                {currentStep === totalSteps - 1 ? 'See my ritual' : 'Next'}
                <ArrowRight size={16} />
              </Button>
            </div>
          </>
        ) : (
          <QuizResults
            recommendations={recommendations}
            answers={answers}
            onRetake={handleRetake}
          />
        )}
      </div>
    </>
  )
}
