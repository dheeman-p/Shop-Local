import { useState } from 'react'
import { formatPrice, PRODUCTS } from '../data/products'
import { navigate } from '../router'
import { useStore } from '../store/StoreContext'

export default function ProductPage({ id }: { id: string }) {
  const { addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="page">
        <h1>Product not found</h1>
        <p className="muted">That item may have sold out or been removed.</p>
        <button className="btn" onClick={() => navigate('/')}>
          Back to shop
        </button>
      </div>
    )
  }

  return (
    <div className="page product">
      <button className="linklike muted" onClick={() => navigate('/')}>
        ← Back to shop
      </button>

      <div className="product__layout">
        <div className="product__media" aria-hidden="true">
          {product.emoji}
        </div>

        <div className="product__info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>

          <dl className="meta">
            <div>
              <dt>Allergens</dt>
              <dd>{product.allergens.join(', ') || 'None declared'}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{product.inStock ? 'Baked daily' : 'Sold out today'}</dd>
            </div>
          </dl>

          <div className="product__actions">
            <div className="stepper">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              className="btn"
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product.id, quantity)
                navigate('/cart')
              }}
            >
              {product.inStock ? 'Add to basket' : 'Sold out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
