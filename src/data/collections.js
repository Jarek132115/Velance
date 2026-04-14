export const collections = [
  {
    id: 'skincare',
    name: 'Skincare',
    slug: 'skincare',
    label: 'All Products',
    description: 'Luxury anti-aging skincare formulated for the hormonal skin of women in their 40s and 50s. Six products. One complete routine.',
    longDescription: 'We built VELANCE because we could not find what we were looking for. Skincare that acknowledged what hormonal change actually does to skin — and formulated specifically around that reality. Every VELANCE product is designed to work as part of a complete morning and evening routine.',
    concerns: ['Firming', 'Hydration', 'Radiance', 'Eye care', 'Resurfacing', 'Neck & chest'],
    productCount: 6,
    image: null,
    imageAlt: 'VELANCE skincare collection — six luxury anti-aging products on marble',
  },
]

export const concerns = [
  { id: 'firming', label: 'Firming & Lifting', products: ['velance-001', 'velance-006'] },
  { id: 'hydration', label: 'Deep Hydration', products: ['velance-002'] },
  { id: 'radiance', label: 'Radiance & Glow', products: ['velance-005', 'velance-003'] },
  { id: 'eye-care', label: 'Eye Care', products: ['velance-004'] },
  { id: 'resurfacing', label: 'Resurfacing', products: ['velance-003'] },
  { id: 'neck', label: 'Neck & Chest', products: ['velance-006'] },
]

export const routine = {
  morning: [
    { step: 1, productId: 'velance-005', instruction: 'Apply 3–4 drops to clean skin. Press gently — do not rub.' },
    { step: 2, productId: 'velance-004', instruction: 'Pat around the orbital bone using ring finger. Never pull.' },
    { step: 3, productId: 'velance-002', instruction: 'Apply to face and neck. Allow 60 seconds to absorb.' },
    { step: 4, productId: 'velance-006', instruction: 'Apply upward strokes from chest to jawline. Daily.' },
  ],
  evening: [
    { step: 1, productId: 'velance-001', instruction: 'Apply 3–4 drops to clean skin. Use nightly.' },
    { step: 2, productId: 'velance-004', instruction: 'Pat around the orbital bone. Retinyl Palmitate works overnight.' },
    { step: 3, productId: 'velance-002', instruction: 'Apply as final step. Or use Midnight Mask instead (2× weekly).' },
  ],
  mask: {
    productId: 'velance-003',
    instruction: 'Replace evening moisturiser with the Mask 2× per week. Apply a thin layer. Sleep in it. No rinse.',
    frequency: 'Twice weekly',
  },
}

export const getCollectionById = (id) => collections.find(c => c.id === id)
