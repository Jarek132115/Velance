import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ProductGrid from '../components/product/ProductGrid'
import { useProducts } from '../hooks/useProducts'
import { getCollectionById } from '../data/collections'

export default function Collection() {
  const { slug } = useParams()
  const collection = getCollectionById(slug)
  const { products } = useProducts({ collection: slug })

  if (!collection) {
    return (
      <div className="container-xl py-32 text-center">
        <h1 className="font-display text-3xl font-light text-charcoal mb-4">Collection not found</h1>
        <Link to="/shop" className="text-sage hover:text-sage-600">Back to shop</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{collection.name} Collection — LUMEA</title>
        <meta name="description" content={collection.description} />
      </Helmet>

      <div className="bg-ivory border-b border-ivory-200">
        <div className="container-xl py-14 md:py-20">
          <p className="label-xs text-sage mb-3">{collection.name} line</p>
          <h1 className="font-display text-display-md md:text-display-lg font-light text-charcoal mb-4 max-w-2xl">
            {collection.headline}
          </h1>
          <p className="body-lg text-charcoal-100 max-w-xl">{collection.description}</p>
        </div>
      </div>

      <div className="container-xl py-12 md:py-16">
        <ProductGrid products={products} />
      </div>
    </>
  )
}
