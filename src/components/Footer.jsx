import { NAV_LINKS, STORE } from '../config/store'
import { whatsappLink } from '../lib/whatsapp'
import { InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from './icons'
import Reveal from './Reveal'
import { Logo, buttonStyles } from './ui'

function ContactBanner() {
  return (
    <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12 xl:px-16">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-wine px-6 py-14 text-center sm:px-12 lg:py-24">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-light uppercase">
          Visit or message us
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight font-semibold text-ivory sm:text-5xl">
          Found a fabric you love? Let&apos;s get it to you.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ivory/75">
          Send us a message for prices, more colours, or to confirm stock before you visit our
          shop at {STORE.address}.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(`Hello ${STORE.name}, I saw your website and I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles.light}
          >
            <WhatsAppIcon className="size-4" />
            Chat on WhatsApp
          </a>
          <a href={`tel:${STORE.phoneTel}`} className={buttonStyles.outlineLight}>
            <PhoneIcon className="size-4" />
            Call {STORE.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="pt-20 lg:pt-28">
      <ContactBanner />

      <div className="mt-20 bg-ink text-ivory">
        <div className="mx-auto grid max-w-[96rem] gap-10 px-5 py-16 sm:px-8 md:grid-cols-4 lg:px-12 xl:px-16">
          <div className="md:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
              Premium fabric importer. Beaded lace, sample lace, sentor, bridal, brocade and luxury
              fabrics for weddings, designers and aso-ebi. Wholesale and retail.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-ivory/70 transition hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li>
                <a
                  href={STORE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 transition hover:text-ivory"
                >
                  <MapPinIcon className="mt-0.5 size-4 shrink-0" />
                  {STORE.address}
                </a>
              </li>
              <li>
                <a href={`tel:${STORE.phoneTel}`} className="flex gap-2.5 transition hover:text-ivory">
                  <PhoneIcon className="size-4 shrink-0" />
                  {STORE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={STORE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 transition hover:text-ivory"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  {STORE.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10">
          <p className="mx-auto max-w-[96rem] px-5 py-6 text-xs text-ivory/45 sm:px-8 lg:px-12 xl:px-16">
            © {year} {STORE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
