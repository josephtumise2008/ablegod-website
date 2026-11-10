import { formatNaira } from '../lib/format'
import { orderMessage, restockMessage } from '../lib/messages'
import { whatsappLink } from '../lib/whatsapp'
import { BellIcon, WhatsAppIcon } from './icons'
import { StatusBadge } from './ui'

export default function ProductCard({ product, onView }) {
  const soldOut = product.status === 'sold-out'

  return (
    <article className="group flex w-full flex-col">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative overflow-hidden rounded-2xl bg-sand text-left transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-24px_rgba(28,23,20,0.45)]"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={`${product.name}, ${product.colour}`}
          loading="lazy"
          className={`aspect-[4/5] w-full object-cover transition duration-700 ease-(--ease-soft) group-hover:scale-[1.06] ${
            soldOut ? 'opacity-60 grayscale-[35%]' : ''
          }`}
        />
        <span className="absolute top-3 left-3 rounded-full bg-ivory shadow-sm">
          <StatusBadge status={product.status} />
        </span>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-ivory/95 py-2 text-center text-xs font-semibold text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          Quick view
        </span>
      </button>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs tracking-wide text-muted">{product.colour}</p>
        <h3 className="mt-1 font-display text-xl leading-snug font-semibold text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink">
          <span className="font-semibold">{formatNaira(product.price)}</span>
          <span className="text-muted"> / yard</span>
        </p>

        <div className="mt-auto pt-4">
          {soldOut ? (
            <a
              href={whatsappLink(restockMessage(product))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-2 py-2.5 text-xs font-semibold sm:text-sm text-muted transition hover:border-ink/40 hover:text-ink"
            >
              <BellIcon className="size-4" />
              Notify me<span className="hidden sm:inline"> when available</span>
            </a>
          ) : (
            <a
              href={whatsappLink(orderMessage(product))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-wine px-2 py-2.5 text-xs font-semibold sm:text-sm text-wine transition duration-300 hover:bg-wine hover:text-ivory"
            >
              <WhatsAppIcon className="size-4" />
              Order on WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
