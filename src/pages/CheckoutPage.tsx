import { useState, type FormEvent } from 'react'
import { formatPrice } from '../data/products'
import { navigate } from '../router'
import { useStore, type Customer } from '../store/StoreContext'

const DELIVERY_FEE = 3.5

export default function CheckoutPage() {
  const { cartLines, cartTotal, placeOrder } = useStore()
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    fulfilment: 'pickup',
  })

  if (cartLines.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p className="empty">Your basket is empty — add something first.</p>
        <button className="btn" onClick={() => navigate('/')}>
          Browse the shop
        </button>
      </div>
    )
  }

  const fee = customer.fulfilment === 'delivery' ? DELIVERY_FEE : 0

  const update = (field: keyof Customer, value: string) =>
    setCustomer((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const order = placeOrder(customer)
    navigate(`/order/${order.id}`)
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      <p className="muted small">
        Prototype — no payment is taken and no data leaves your browser.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend>How would you like it?</legend>
          <label className="radio">
            <input
              type="radio"
              name="fulfilment"
              checked={customer.fulfilment === 'pickup'}
              onChange={() => update('fulfilment', 'pickup')}
            />
            Collect from the shop — free
          </label>
          <label className="radio">
            <input
              type="radio"
              name="fulfilment"
              checked={customer.fulfilment === 'delivery'}
              onChange={() => update('fulfilment', 'delivery')}
            />
            Local delivery — {formatPrice(DELIVERY_FEE)}
          </label>
        </fieldset>

        <label className="field">
          <span>Full name</span>
          <input
            className="input"
            required
            value={customer.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            className="input"
            type="email"
            required
            value={customer.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="field">
          <span>Phone</span>
          <input
            className="input"
            type="tel"
            required
            value={customer.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoComplete="tel"
          />
        </label>

        {customer.fulfilment === 'delivery' && (
          <label className="field">
            <span>Delivery address</span>
            <textarea
              className="input"
              required
              rows={3}
              value={customer.address}
              onChange={(e) => update('address', e.target.value)}
              autoComplete="street-address"
            />
          </label>
        )}

        <label className="field">
          <span>Order notes (optional)</span>
          <textarea
            className="input"
            rows={2}
            placeholder="Allergies, a message on the cake…"
            value={customer.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </label>

        <div className="summary">
          <div className="summary__row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="summary__row">
            <span>{customer.fulfilment === 'delivery' ? 'Delivery' : 'Collection'}</span>
            <span>{fee === 0 ? 'Free' : formatPrice(fee)}</span>
          </div>
          <div className="summary__row summary__row--total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal + fee)}</strong>
          </div>

          <button className="btn btn--block" type="submit">
            Place order
          </button>
        </div>
      </form>
    </div>
  )
}
