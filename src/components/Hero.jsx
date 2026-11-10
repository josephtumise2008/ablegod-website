import { STORE } from '../config/store'
import { ArrowRightIcon, MapPinIcon } from './icons'
import { buttonStyles } from './ui'

const HIGHLIGHTS = [
  { value: 'Imported', label: 'Premium laces' },
  { value: 'Wholesale', label: 'and retail prices' },
  { value: 'Worldwide', label: 'Delivery' },
]

/** Staggered entrance: each step appears a little after the one before. */
const step = (index) => ({ animationDelay: `${120 + index * 110}ms` })

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[96rem] items-center gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pt-16 lg:pb-28 xl:px-16">
        <div className="lg:col-span-6">
          <p
            style={step(0)}
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-xs font-medium text-muted"
          >
            <MapPinIcon className="size-3.5 text-gold" />
            {STORE.address}
          </p>

          <h1
            style={step(1)}
            className="mt-6 animate-fade-up font-display text-5xl leading-[1.02] font-semibold text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Premium laces for your <span className="text-wine italic">biggest days.</span>
          </h1>

          <p
            style={step(2)}
            className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-muted"
          >
            Beaded lace, luxury crystal, bridal lace and aso-ebi fabrics, imported and sold
            straight from our shop in Aba. See every fabric, colour and price before you order.
          </p>

          <div style={step(3)} className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row">
            <a href="#shop" className={`group ${buttonStyles.primary}`}>
              Shop fabrics
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#aso-ebi" className={buttonStyles.secondary}>
              Order aso-ebi in bulk
            </a>
          </div>

          <dl
            style={step(4)}
            className="mt-12 grid max-w-lg animate-fade-up grid-cols-3 gap-6 border-t border-line pt-6"
          >
            {HIGHLIGHTS.map((item) => (
              <div key={item.value}>
                <dt className="font-display text-xl font-semibold text-wine sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-1 text-xs text-muted sm:text-sm">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <figure className="col-span-3 overflow-hidden rounded-[2rem] bg-sand">
              <img
                src="/images/fabrics/champagne-bridal-lace.jpg"
                alt="Champagne bridal beaded lace displayed on a mannequin"
                className="aspect-[4/5] h-full w-full animate-scale-in object-cover"
                style={{ animationDelay: '150ms' }}
                fetchPriority="high"
              />
            </figure>
            <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
              <figure className="overflow-hidden rounded-[1.5rem] bg-sand">
                <img
                  src="/images/fabrics/gold-crystal-lace.jpg"
                  alt="Gold luxury crystal lace laid flat"
                  className="aspect-square w-full animate-scale-in object-cover"
                  style={{ animationDelay: '350ms' }}
                />
              </figure>
              <figure className="flex-1 overflow-hidden rounded-[1.5rem] bg-sand">
                <img
                  src="/images/fabrics/emerald-beaded-lace.jpg"
                  alt="Emerald beaded lace on a mannequin"
                  className="h-full w-full animate-scale-in object-cover"
                  style={{ animationDelay: '550ms' }}
                />
              </figure>
            </div>
          </div>

          {/* Outer div fades in once; inner div floats gently. */}
          <div
            className="absolute -bottom-6 left-4 animate-fade-up sm:left-8"
            style={{ animationDelay: '900ms' }}
          >
            <div className="animate-float rounded-2xl border border-line bg-ivory px-5 py-4 shadow-[0_18px_40px_-20px_rgba(28,23,20,0.35)]">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                Trusted vendor in Aba
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                Delivered to Lagos, Abuja &amp; the UK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
