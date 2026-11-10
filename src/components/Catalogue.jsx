import { useCallback, useMemo, useState } from 'react'
import { CATEGORIES } from '../data/products'
import { useProducts } from '../store/ProductsContext'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import Reveal from './Reveal'
import { SearchIcon } from './icons'
import { SectionHeading } from './ui'

export default function Catalogue() {
  const { products } = useProducts()
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [hideSoldOut, setHideSoldOut] = useState(false)
  const [selected, setSelected] = useState(null)

  const closeModal = useCallback(() => setSelected(null), [])

  const visibleProducts = useMemo(() => {
    const search = query.trim().toLowerCase()
    return products.filter((product) => {
      if (category !== 'all' && product.category !== category) return false
      if (hideSoldOut && product.status === 'sold-out') return false
      if (!search) return true
      return `${product.name} ${product.colour}`.toLowerCase().includes(search)
    })
  }, [products, category, query, hideSoldOut])

  const countFor = (id) =>
    id === 'all' ? products.length : products.filter((product) => product.category === id).length

  return (
    <section id="shop" className="border-t border-line bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The collection"
            title="Shop our fabrics"
            intro="Every fabric with its colour, price per yard and stock status. Tap any fabric to see it up close and order straight on WhatsApp."
          />

          <Reveal delay={150} className="relative w-full lg:w-80">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <label htmlFor="fabric-search" className="sr-only">
              Search fabrics
            </label>
            <input
              id="fabric-search"
              type="search"
              value={query}
              maxLength={60}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by colour or name"
              className="w-full rounded-full border border-line bg-ivory py-3 pr-4 pl-11 text-sm text-ink transition placeholder:text-muted/80 focus:border-gold focus:outline-none"
            />
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            {CATEGORIES.map((item) => {
              const active = item.id === category
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'border-wine bg-wine text-ivory'
                      : 'border-line bg-ivory text-ink hover:border-ink/40'
                  }`}
                >
                  {item.label}
                  <span className={`ml-1.5 text-xs ${active ? 'text-ivory/70' : 'text-muted'}`}>
                    {countFor(item.id)}
                  </span>
                </button>
              )
            })}
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink select-none">
            <input
              type="checkbox"
              checked={hideSoldOut}
              onChange={(event) => setHideSoldOut(event.target.checked)}
              className="size-4 accent-wine"
            />
            Hide sold-out fabrics
          </label>
        </div>

        {visibleProducts.length > 0 ? (
          // The key makes the cards animate in again whenever the filters change.
          <div
            key={`${category}-${hideSoldOut}-${query.trim()}`}
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8"
          >
            {visibleProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 90} className="flex">
                <ProductCard product={product} onView={setSelected} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="font-display text-2xl text-ink">No fabrics match your search.</p>
            <p className="mt-2 text-sm text-muted">
              Try another colour, or message us. We may have it in the shop.
            </p>
          </div>
        )}
      </div>

      {selected && <ProductModal product={selected} onClose={closeModal} />}
    </section>
  )
}
