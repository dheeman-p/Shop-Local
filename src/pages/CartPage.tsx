import { formatPrice } from '../data/products'
import { navigate } from '../router'
import { useStore } from '../store/StoreContext'

export default function CartPage() {
  const { cartLines, cartTotal, setQuantity, removeFromCart, clearCart } = useStore()

  if (cartLines.length === 0) {
    return (
      <div className="page">
        <h1>Your basket</h1>
        <p className="empty">Your basket is empty.</p>
        <button className="btn" onClick={() => navigate('/')}>
          Browse the shop
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Your basket</h1>

      <ul className="lines">
        {cartLines.map(({ product, quantity }) => (
          <li key={product.id} className="line">
            <span className="line__media" aria-hidden="true">
              {product.emoji}
            </span>
            <div className="line__main">
              <button className="linklike" onClick={() => navigate(`/product/${product.id}`)}>
                {product.name}
              </button>
              <span className="muted">{formatPrice(product.price)} each</span>
            </div>
            <div className="stepper">
              <button
                onClick={() => setQuantity(product.id, quantity - 1)}
                aria-label={`Decrease ${product.name}`}
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(product.id, quantity + 1)}
                aria-label={`Increase ${product.name}`}
              >
                +
              </button>
            </div>
            <strong className="line__total">
              {formatPrice(product.price * quantity)}
            </strong>
            <button
              className="linklike muted"
              onClick={() => removeFromCart(product.id)}
              aria-label={`Remove ${product.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <div className="summary__row">
          <span>Subtotal</span>
          <strong>{formatPrice(cartTotal)}</strong>
        </div>
        <p className="muted small">Collection is free. Delivery is £3.50 within 3 miles.</p>
        <div className="summary__actions">
          <button className="linklike muted" onClick={clearCart}>
            Clear basket
          </button>
          <button className="btn" onClick={() => navigate('/checkout')}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
