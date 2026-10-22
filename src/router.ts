import { useEffect, useState } from 'react'

/**
 * Minimal hash-based router — no react-router dependency for a prototype.
 * Routes: #/  #/product/:id  #/cart  #/checkout  #/orders  #/order/:id
 */
export function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

export function navigate(path: string) {
  window.location.hash = path
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
