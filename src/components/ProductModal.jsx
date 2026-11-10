import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '../data/products'
import { formatNaira } from '../lib/format'
import { orderMessage, restockMessage } from '../lib/messages'
import { whatsappLink } from '../lib/whatsapp'
import { BellIcon, CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './icons'
import { StatusBadge } from './ui'

const MIN_YARDS = 1
const MAX_YARDS = 500

export default function ProductModal({ product, onClose }) {
  const [yards, setYards] = useState(5)
  const closeButtonRef = useRef(null)

  // Lock page scrolling, focus the close button and allow Escape to close.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const soldOut = product.status === 'sold-out'
  const category = CATEGORIES.find((item) => item.id === product.category)
  const total = product.price * yards

  const updateYards = (value) => {
    const number = Number.parseInt(value, 10)
    if (Number.isNaN(number)) return setYards(MIN_YARDS)
    setYards(Math.min(MAX_YARDS, Math.max(MIN_YARDS, number)))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-5xl animate-slide-up overflow-y-auto rounded-t-3xl bg-ivory sm:rounded-3xl md:grid-cols-2"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-ivory/90 p-2 text-ink shadow-sm transition hover:bg-ivory"
          aria-label="Close"
        >
          <CloseIcon className="size-5" />
        </button>

        <img
          src={product.image}
          alt={`${product.name}, ${product.colour}`}
          className="aspect-[4/5] h-full w-full bg-sand object-cover md:aspect-auto"
        />

        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">
            {category?.label}
          </p>
          <h2 id="product-modal-title" className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {product.name}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusBadge status={product.status} />
            <span className="text-sm text-muted">Colour: {product.colour}</span>
          </div>

          <p className="mt-5 text-2xl font-semibold text-ink">
            {formatNaira(product.price)} <span className="text-base font-normal text-muted">per yard</span>
          </p>

          <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

          {soldOut ? (
            <div className="mt-auto pt-8">
              <p className="rounded-2xl bg-sand p-4 text-sm text-muted">
                This fabric is sold out right now. Send us a message and we&apos;ll tell you as soon as
                new stock arrives.
              </p>
              <a
                href={whatsappLink(restockMessage(product))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-ivory"
              >
                <BellIcon className="size-4" />
                Notify me on WhatsApp
              </a>
            </div>
          ) : (
            <div className="mt-auto pt-8">
              <label htmlFor="yards" className="text-sm font-semibold text-ink">
                How many yards?
              </label>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center rounded-full border border-line bg-white">
                  <button
                    type="button"
                    onClick={() => updateYards(yards - 1)}
                    className="p-3 text-ink disabled:opacity-30"
                    disabled={yards <= MIN_YARDS}
                    aria-label="Fewer yards"
                  >
                    <MinusIcon className="size-4" />
                  </button>
                  <input
                    id="yards"
                    type="number"
                    inputMode="numeric"
                    min={MIN_YARDS}
                    max={MAX_YARDS}
                    value={yards}
                    onChange={(event) => updateYards(event.target.value)}
                    className="w-14 bg-transparent text-center font-semibold text-ink [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => updateYards(yards + 1)}
                    className="p-3 text-ink disabled:opacity-30"
                    disabled={yards >= MAX_YARDS}
                    aria-label="More yards"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </div>
                <p className="text-sm text-muted">
                  Total: <span className="font-semibold text-ink">{formatNaira(total)}</span>
                </p>
              </div>

              <a
                href={whatsappLink(orderMessage(product, yards))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine py-3.5 text-sm font-semibold text-ivory transition hover:bg-wine-dark"
              >
                <WhatsAppIcon className="size-4" />
                Order on WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Your order opens in WhatsApp with the fabric details already written.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
