import { STATUS_LABELS } from '../data/products'
import Reveal from './Reveal'

/** AbleGod wordmark, styled after the gold-on-black shop logo. */
export function Logo({ light = false }) {
  return (
    <a href="#top" className="group flex flex-col leading-none" aria-label="AbleGod Enterprise home">
      <span
        className={`font-display text-2xl font-bold tracking-wide sm:text-[1.7rem] ${
          light ? 'text-ivory' : 'text-wine'
        }`}
      >
        AbleGod
      </span>
      <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.32em] text-gold uppercase">
        House of Fabric
      </span>
    </a>
  )
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light = false }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">{eyebrow}</p>
      )}
      <h2
        className={`mt-3 font-display text-4xl leading-tight font-semibold sm:text-5xl ${
          light ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-ivory/75' : 'text-muted'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}

const STATUS_STYLES = {
  'in-stock': 'bg-instock/10 text-instock',
  'low-stock': 'bg-lowstock/10 text-lowstock',
  'sold-out': 'bg-soldout/15 text-soldout',
}

const STATUS_DOTS = {
  'in-stock': 'bg-instock',
  'low-stock': 'bg-lowstock',
  'sold-out': 'bg-soldout',
}

export function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${STATUS_DOTS[status]}`} aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}

/** Shared button styles, so every button on the site looks consistent. */
export const buttonStyles = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-ivory transition duration-300 hover:-translate-y-0.5 hover:bg-wine-dark hover:shadow-[0_10px_24px_-10px_rgba(90,26,39,0.6)] disabled:cursor-not-allowed disabled:opacity-50',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-ivory',
  light:
    'inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-semibold text-wine transition duration-300 hover:-translate-y-0.5 hover:bg-sand',
  outlineLight:
    'inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 px-6 py-3 text-sm font-semibold text-ivory transition duration-300 hover:-translate-y-0.5 hover:border-ivory hover:bg-ivory/10',
}
