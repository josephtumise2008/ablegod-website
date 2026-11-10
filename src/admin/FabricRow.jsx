import { useState } from 'react'
import { STATUS_LABELS } from '../data/products'
import { formatNaira } from '../lib/format'

const STATUS_OPTIONS = [
  { value: 'in-stock', active: 'bg-instock text-white' },
  { value: 'low-stock', active: 'bg-lowstock text-white' },
  { value: 'sold-out', active: 'bg-ink text-white' },
]

const MAX_PRICE = 10_000_000

/** One fabric in the admin list: change its stock status and price. */
export default function FabricRow({ product, onUpdate }) {
  const [editingPrice, setEditingPrice] = useState(false)
  const [priceInput, setPriceInput] = useState(String(product.price))
  const [saved, setSaved] = useState(false)

  const flashSaved = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1600)
  }

  const savePrice = () => {
    const price = Number.parseInt(priceInput.replace(/[^\d]/g, ''), 10)
    if (Number.isFinite(price) && price > 0 && price <= MAX_PRICE) {
      onUpdate(product.id, { price })
      flashSaved()
    } else {
      setPriceInput(String(product.price))
    }
    setEditingPrice(false)
  }

  const setStatus = (status) => {
    if (status === product.status) return
    onUpdate(product.id, { status })
    flashSaved()
  }

  return (
    <li className="flex gap-4 py-4">
      <img
        src={product.image}
        alt=""
        className={`size-20 shrink-0 rounded-xl bg-sand object-cover sm:size-24 ${
          product.status === 'sold-out' ? 'opacity-50 grayscale' : ''
        }`}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{product.name}</p>
            <p className="text-xs text-muted">{product.colour}</p>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold text-instock transition-opacity duration-300 ${
              saved ? 'opacity-100' : 'opacity-0'
            }`}
            aria-live="polite"
          >
            {saved ? '✓ Saved' : ''}
          </span>
        </div>

        <div className="mt-2">
          {editingPrice ? (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                savePrice()
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor={`price-${product.id}`} className="sr-only">
                Price per yard for {product.name}
              </label>
              <span className="text-sm text-muted">₦</span>
              <input
                id={`price-${product.id}`}
                type="text"
                inputMode="numeric"
                maxLength={9}
                autoFocus
                value={priceInput}
                onChange={(event) => setPriceInput(event.target.value)}
                onBlur={savePrice}
                className="w-28 rounded-lg border border-gold bg-white px-2 py-1 text-sm font-semibold text-ink focus:outline-none"
              />
              <span className="text-xs text-muted">/ yard</span>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setPriceInput(String(product.price))
                setEditingPrice(true)
              }}
              className="group inline-flex items-center gap-2 rounded-lg py-1 text-sm"
            >
              <span className="font-semibold text-ink">{formatNaira(product.price)}</span>
              <span className="text-muted">/ yard</span>
              <span className="text-xs font-semibold text-wine underline-offset-2 group-hover:underline">
                Edit
              </span>
            </button>
          )}
        </div>

        <div
          className="mt-3 inline-flex rounded-full border border-line bg-white p-1"
          role="radiogroup"
          aria-label={`Stock status for ${product.name}`}
        >
          {STATUS_OPTIONS.map((option) => {
            const active = product.status === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setStatus(option.value)}
                className={`rounded-full px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
                  active ? option.active : 'text-muted hover:text-ink'
                }`}
              >
                {STATUS_LABELS[option.value].replace('Few yards left', 'Few left')}
              </button>
            )
          })}
        </div>
      </div>
    </li>
  )
}
