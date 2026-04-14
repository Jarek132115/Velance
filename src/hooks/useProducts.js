import { useMemo } from 'react'
import { products } from '../data/products'

export const useProducts = (filters = {}) => {
  const {
    collection,
    tags,
    sortBy = 'featured',
    minPrice,
    maxPrice,
  } = filters

  const filtered = useMemo(() => {
    let result = [...products]

    if (collection) {
      result = result.filter((p) => p.collection === collection)
    }

    if (tags && tags.length > 0) {
      result = result.filter((p) =>
        tags.some((tag) => p.tags.includes(tag))
      )
    }

    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= minPrice)
    }

    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
        break
    }

    return result
  }, [collection, tags, sortBy, minPrice, maxPrice])

  return { products: filtered, total: filtered.length }
}

export const useProduct = (slug) => {
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug])
  const related = useMemo(
    () => products.filter((p) => p.collection === product?.collection && p.id !== product?.id).slice(0, 3),
    [product]
  )
  return { product, related }
}

export const useBestsellers = (limit = 4) => {
  return useMemo(
    () => products.filter((p) => p.isBestseller).slice(0, limit),
    [limit]
  )
}
