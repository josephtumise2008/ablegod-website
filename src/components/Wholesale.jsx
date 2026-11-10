import { whatsappLink } from '../lib/whatsapp'
import { ArrowRightIcon, GlobeIcon, ScissorsIcon, UsersIcon } from './icons'
import Reveal from './Reveal'
import { SectionHeading, buttonStyles } from './ui'

const AUDIENCES = [
  {
    icon: ScissorsIcon,
    title: 'Fashion designers',
    text: 'Steady supply of new beaded and bridal designs for your clients, with first look at fresh arrivals.',
  },
  {
    icon: UsersIcon,
    title: 'Resellers & boutiques',
    text: 'Buy by the bundle at wholesale prices and resell in your own city or online store.',
  },
  {
    icon: GlobeIcon,
    title: 'Buyers abroad',
    text: 'Order from the UK, US or anywhere else. We pack carefully and ship worldwide.',
  },
]

export default function Wholesale() {
  return (
    <section id="wholesale" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            eyebrow="Wholesale"
            title="Better prices when you buy in bulk"
            intro="We are a premium fabric importer, so designers and resellers get wholesale prices that are separate from our retail prices."
          />
          <Reveal delay={150} className="lg:justify-self-end">
            <a
              href={whatsappLink(
                "Hello AbleGod, I'm a designer/reseller. Please send me your wholesale price list.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.primary}
            >
              Request wholesale price list
              <ArrowRightIcon className="size-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              key={title}
              delay={index * 120}
              className="group bg-ivory p-8 transition-colors duration-500 hover:bg-white lg:p-12"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-sand text-wine transition-colors duration-500 group-hover:bg-wine group-hover:text-ivory">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
