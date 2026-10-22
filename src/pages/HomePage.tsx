import { useMemo, useState } from 'react'
import { CATEGORIES, formatPrice, PRODUCTS, type Category } from '../data/products'
import { navigate } from '../router'
import { useStore } from '../store/StoreContext'

export default function HomePage() {
  const { addToCart } = useStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured')

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesTerm =
        term === '' ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      return matchesCategory && matchesTerm
    })

    switch (sort) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [query, category, sort])

  return (
    <div className="page">
      <section className="hero">
        <h1>Baked this morning, on your street.</h1>
        <p>Small-batch bread, pastries and cakes from our shop around the corner.</p>
      </section>

      <div className="toolbar">
        <input
          type="search"
          className="input"
          placeholder="Search bread, pastries, cakes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        <select
          className="input"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      <div className="chips" role="tablist" aria-label="Filter by category">
        {(['All', ...CATEGORIES] as const).map((option) => (
          <button
            key={option}
            role="tab"
            aria-selected={category === option}
            className={category === option ? 'chip chip--active' : 'chip'}
            onClick={() => setCategory(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="empty">Nothing matches “{query}”. Try a different search.</p>
      ) : (
        <div className="grid">
          {results.map((product) => (
            <article key={product.id} className="card">
              <button
                className="card__media"
                onClick={() => navigate(`/product/${product.id}`)}
                aria-label={`View ${product.name}`}
              >
                <span aria-hidden="true">{product.emoji}</span>
              </button>
              <div className="card__body">
                <h3>
                  <button
                    className="linklike"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </button>
                </h3>
                <p className="muted card__desc">{product.description}</p>
                <div className="card__footer">
                  <strong>{formatPrice(product.price)}</strong>
                  <button
                    className="btn btn--sm"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id)}
                  >
                    {product.inStock ? 'Add' : 'Sold out'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
