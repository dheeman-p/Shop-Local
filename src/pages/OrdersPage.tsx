import { formatPrice } from '../data/products'
import { navigate } from '../router'
import { useStore } from '../store/StoreContext'

export default function OrdersPage() {
  const { orders } = useStore()

  return (
    <div className="page">
      <h1>Order history</h1>

      {orders.length === 0 ? (
        <>
          <p className="empty">You have not placed any orders yet.</p>
          <button className="btn" onClick={() => navigate('/')}>
            Browse the shop
          </button>
        </>
      ) : (
        <ul className="orders">
          {orders.map((order) => (
            <li key={order.id} className="order-row">
              <div>
                <strong>{order.id}</strong>
                <span className="muted small">
                  {new Date(order.placedAt).toLocaleString('en-GB')}
                </span>
                <span className="muted small">
                  {order.lines.reduce((sum, line) => sum + line.quantity, 0)} items ·{' '}
                  {order.customer.fulfilment === 'pickup' ? 'Collection' : 'Delivery'}
                </span>
              </div>
              <strong>{formatPrice(order.total)}</strong>
              <button className="linklike" onClick={() => navigate(`/order/${order.id}`)}>
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
