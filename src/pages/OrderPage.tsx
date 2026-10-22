import { formatPrice } from '../data/products'
import { navigate } from '../router'
import { useStore } from '../store/StoreContext'

export default function OrderPage({ id }: { id: string }) {
  const { orders } = useStore()
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="page">
        <h1>Order not found</h1>
        <button className="btn" onClick={() => navigate('/')}>
          Back to shop
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="success">
        <span className="success__mark" aria-hidden="true">
          ✓
        </span>
        <h1>Thanks, {order.customer.name.split(' ')[0]}!</h1>
        <p className="muted">
          Order <strong>{order.id}</strong> is confirmed.
          {order.customer.fulfilment === 'pickup'
            ? ' We will have it ready for collection shortly.'
            : ' We will deliver within the next few hours.'}
        </p>
      </div>

      <ul className="lines">
        {order.lines.map(({ product, quantity }) => (
          <li key={product.id} className="line">
            <span className="line__media" aria-hidden="true">
              {product.emoji}
            </span>
            <div className="line__main">
              <strong>{product.name}</strong>
              <span className="muted">× {quantity}</span>
            </div>
            <strong className="line__total">
              {formatPrice(product.price * quantity)}
            </strong>
          </li>
        ))}
      </ul>

      <div className="summary">
        <div className="summary__row summary__row--total">
          <span>Total paid</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>
      </div>

      <div className="summary__actions">
        <button className="linklike muted" onClick={() => navigate('/orders')}>
          View all orders
        </button>
        <button className="btn" onClick={() => navigate('/')}>
          Continue shopping
        </button>
      </div>
    </div>
  )
}
