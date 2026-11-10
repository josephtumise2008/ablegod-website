import { useMemo, useState } from 'react'
import { useProducts } from '../store/ProductsContext'
import { SearchIcon } from '../components/icons'
import AddFabricForm from './AddFabricForm'
import FabricRow from './FabricRow'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'in-stock', label: 'Available' },
  { id: 'low-stock', label: 'Few left' },
  { id: 'sold-out', label: 'Sold out' },
]

export default function FabricManager() {
  const { products, updateProduct, addProduct } = useProducts()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [adding, setAdding] = useState(false)
  const [notice, setNotice] = useState('')

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase()
    return products.filter((product) => {
      if (filter !== 'all' && product.status !== filter) return false
      return !search || `${product.name} ${product.colour}`.toLowerCase().includes(search)
    })
  }, [products, filter, query])

  const handleAdd = (product) => {
    addProduct(product)
    setAdding(false)
    setFilter('all')
    setNotice(`${product.name} is now live in the shop.`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-ink">Fabrics</h2>
          <p className="text-sm text-muted">Tap a stock button or price to change it. The shop updates instantly.</p>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-ivory transition hover:bg-wine-dark"
          >
            + Add fabric
          </button>
        )}
      </div>

      {adding && (
        <div className="mt-6">
          <AddFabricForm onAdd={handleAdd} onCancel={() => setAdding(false)} />
        </div>
      )}

      {notice && (
        <p className="mt-6 animate-drop-down rounded-xl bg-instock/10 px-4 py-3 text-sm font-medium text-instock" role="status">
          ✓ {notice}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
          <label htmlFor="admin-search" className="sr-only">
            Search fabrics
          </label>
          <input
            id="admin-search"
            type="search"
            maxLength={60}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fabrics"
            className="w-full rounded-full border border-line bg-white py-2.5 pr-4 pl-10 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {FILTERS.map((item) => {
            const count =
              item.id === 'all' ? products.length : products.filter((p) => p.status === item.id).length
            const active = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                  active ? 'border-ink bg-ink text-ivory' : 'border-line bg-white text-ink'
                }`}
              >
                {item.label} <span className={active ? 'text-ivory/60' : 'text-muted'}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-ivory px-4 sm:px-5">
        {visible.map((product) => (
          <FabricRow key={product.id} product={product} onUpdate={updateProduct} />
        ))}
        {visible.length === 0 && <li className="py-10 text-center text-sm text-muted">No fabrics here.</li>}
      </ul>
    </div>
  )
}
