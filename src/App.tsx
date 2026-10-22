import { useHashRoute } from './router'
import { useStore } from './store/StoreContext'
import { navigate } from './router'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import OrderPage from './pages/OrderPage'

function renderRoute(path: string) {
  const [segment, param] = path.replace(/^#\/?/, '').split('/')

  switch (segment) {
    case '':
    case undefined:
      return <HomePage />
    case 'product':
      return <ProductPage id={param ?? ''} />
    case 'cart':
      return <CartPage />
    case 'checkout':
      return <CheckoutPage />
    case 'orders':
      return <OrdersPage />
    case 'order':
      return <OrderPage id={param ?? ''} />
    default:
      return (
        <div className="page">
          <h1>Page not found</h1>
          <button className="btn" onClick={() => navigate('/')}>
            Back to shop
          </button>
        </div>
      )
  }
}

export default function App() {
  const path = useHashRoute()
  const { cartCount } = useStore()

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <button className="brand" onClick={() => navigate('/')}>
            <span aria-hidden="true">🥖</span> Shop Local
          </button>
          <nav className="nav">
            <button className="linklike" onClick={() => navigate('/orders')}>
              Orders
            </button>
            <button className="btn btn--sm" onClick={() => navigate('/cart')}>
              Basket
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </nav>
        </div>
      </header>

      <main>{renderRoute(path)}</main>

      <footer className="footer">
        <p className="muted small">
          Shop Local · 12 Example Street · Open Tue–Sat, 7am–4pm
        </p>
        <p className="muted small">
          Frontend prototype — no real payments, all data stored in your browser.
        </p>
      </footer>
    </>
  )
}
