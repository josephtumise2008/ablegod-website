import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products'

/**
 * Holds the fabric list for the whole app, so changes made in the admin
 * preview show up in the shop straight away.
 *
 * In this sample, changes are kept only in this browser tab (sessionStorage).
 * In the full version this is where the app would load from and save to the
 * real database.
 */
const STORAGE_KEY = 'ablegod-demo-products'

const ProductsContext = createContext(null)

const VALID_STATUSES = ['in-stock', 'low-stock', 'sold-out']

/** Only accept saved items that have the expected shape and a local image. */
function isValidProduct(item) {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.colour === 'string' &&
    typeof item.category === 'string' &&
    Number.isFinite(item.price) &&
    VALID_STATUSES.includes(item.status) &&
    typeof item.image === 'string' &&
    item.image.startsWith('/images/')
  )
}

function loadSaved() {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY)
    if (!saved) return PRODUCTS
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed) || !parsed.every(isValidProduct)) return PRODUCTS
    return parsed
  } catch {
    return PRODUCTS
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(loadSaved)

  useEffect(() => {
    try {
      // Photos picked in the admin are temporary "blob:" links that stop
      // working after a reload, so those products are not saved.
      const saveable = products.filter((product) => !product.image.startsWith('blob:'))
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saveable))
    } catch {
      // Storage can be full or blocked (private mode). The demo still works.
    }
  }, [products])

  const updateProduct = useCallback((id, changes) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, ...changes } : product)),
    )
  }, [])

  const addProduct = useCallback((product) => {
    setProducts((current) => [product, ...current])
  }, [])

  const resetProducts = useCallback(() => setProducts(PRODUCTS), [])

  const value = useMemo(
    () => ({ products, updateProduct, addProduct, resetProducts }),
    [products, updateProduct, addProduct, resetProducts],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used inside <ProductsProvider>')
  return context
}
