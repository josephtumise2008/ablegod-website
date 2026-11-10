import { STORE } from '../config/store'
import { DELIVERIES } from '../data/deliveries'
import { InstagramIcon, ShieldCheckIcon, TruckIcon, GlobeIcon } from './icons'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

const TRUST_POINTS = [
  {
    icon: ShieldCheckIcon,
    title: 'CAC registered business',
    text: 'A registered company you can trust with your money and your event.',
  },
  {
    icon: TruckIcon,
    title: 'Proof of every delivery',
    text: 'We record and share every package before it leaves our shop.',
  },
  {
    icon: GlobeIcon,
    title: 'Nigeria and abroad',
    text: 'Regular deliveries to Lagos, Abuja and customers in the UK.',
  },
]

export default function Deliveries() {
  return (
    <section id="deliveries" className="border-y border-line bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeading
          eyebrow="Trusted vendor in Aba"
          title="Recent deliveries"
          intro="Real orders packed in our shop and sent to customers across Nigeria and abroad."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {DELIVERIES.map((delivery, index) => (
            <Reveal
              as="figure"
              key={delivery.image}
              delay={(index % 4) * 90}
              className="group overflow-hidden rounded-2xl bg-ivory"
            >
              <div className="overflow-hidden">
                <img
                  src={delivery.image}
                  alt={`${delivery.detail}, delivered to ${delivery.destination}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 ease-(--ease-soft) group-hover:scale-[1.06]"
                />
              </div>
              <figcaption className="p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                  {delivery.destination}
                </p>
                <p className="mt-1 text-sm text-ink">{delivery.detail}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
          {TRUST_POINTS.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 120} className="flex gap-4">
              <Icon className="mt-0.5 size-6 shrink-0 text-wine" />
              <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={STORE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-wine underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-4" />
            See more reviews and deliveries on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
