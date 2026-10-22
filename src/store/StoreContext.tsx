import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PRODUCTS, type Product } from '../data/products'

export type CartLine = { productId: string; quantity: number }

export type Customer = {
  name: string
  email: string
  phone: string
  address: string
  notes: string
  fulfilment: 'pickup' | 'delivery'
}

export type Order = {
  id: string
  placedAt: string
  lines: { product: Product; quantity: number }[]
  total: number
  customer: Customer
}

type StoreState = {
  cart: CartLine[]
  orders: Order[]
  addToCart: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  placeOrder: (customer: Customer) => Order
  cartCount: number
  cartTotal: number
  cartLines: { product: Product; quantity: number }[]
}

const StoreContext = createContext<StoreState | null>(null)

const CART_KEY = 'shop-local:cart'
const ORDERS_KEY = 'shop-local:orders'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Prototype: ignore quota/private-mode failures.
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => readJson<CartLine[]>(CART_KEY, []))
  const [orders, setOrders] = useState<Order[]>(() => readJson<Order[]>(ORDERS_KEY, []))

  useEffect(() => writeJson(CART_KEY, cart), [cart])
  useEffect(() => writeJson(ORDERS_KEY, orders), [orders])

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((line) => line.productId === productId)
      if (!existing) return [...current, { productId, quantity }]
      return current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: line.quantity + quantity }
          : line,
      )
    })
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) =>
            line.productId === productId ? { ...line, quantity } : line,
          ),
    )
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((line) => line.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.productId)
          return product ? { product, quantity: line.quantity } : null
        })
        .filter((line): line is { product: Product; quantity: number } => line !== null),
    [cart],
  )

  const cartCount = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.quantity, 0),
    [cartLines],
  )

  const cartTotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [cartLines],
  )

  const placeOrder = useCallback(
    (customer: Customer): Order => {
      const order: Order = {
        id: `SL-${Date.now().toString(36).toUpperCase()}`,
        placedAt: new Date().toISOString(),
        lines: cartLines,
        total: cartTotal,
        customer,
      }
      setOrders((current) => [order, ...current])
      setCart([])
      return order
    },
    [cartLines, cartTotal],
  )

  const value: StoreState = {
    cart,
    orders,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    cartCount,
    cartTotal,
    cartLines,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreState {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside <StoreProvider>')
  return context
}
