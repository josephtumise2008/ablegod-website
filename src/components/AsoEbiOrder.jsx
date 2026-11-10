import { useMemo, useState } from 'react'
import { formatNaira } from '../lib/format'
import { cleanText, openWhatsApp } from '../lib/whatsapp'
import { useProducts } from '../store/ProductsContext'
import { WhatsAppIcon } from './icons'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

const EVENT_TYPES = ['Wedding', 'Traditional engagement', 'Birthday', 'Burial', 'Thanksgiving', 'Other']

const LIMITS = {
  guests: { min: 1, max: 2000 },
  yards: { min: 1, max: 10 },
}

const INITIAL_FORM = {
  name: '',
  eventType: EVENT_TYPES[0],
  eventDate: '',
  fabricId: '',
  guests: '10',
  yardsPerGuest: '5',
  location: '',
}

function toWholeNumber(value) {
  const number = Number.parseInt(value, 10)
  return Number.isNaN(number) ? 0 : number
}

function validate(form, availableFabrics) {
  const errors = {}
  const guests = toWholeNumber(form.guests)
  const yards = toWholeNumber(form.yardsPerGuest)

  if (cleanText(form.name).length < 2) errors.name = 'Please enter your name.'
  if (!availableFabrics.some((fabric) => fabric.id === form.fabricId))
    errors.fabricId = 'Please choose a fabric.'
  if (guests < LIMITS.guests.min || guests > LIMITS.guests.max)
    errors.guests = `Enter between ${LIMITS.guests.min} and ${LIMITS.guests.max} guests.`
  if (yards < LIMITS.yards.min || yards > LIMITS.yards.max)
    errors.yardsPerGuest = `Enter between ${LIMITS.yards.min} and ${LIMITS.yards.max} yards.`
  if (cleanText(form.location).length < 2) errors.location = 'Please tell us where to deliver.'

  return errors
}

const inputStyles =
  'mt-2 w-full rounded-xl border border-ivory/15 bg-ivory/[0.06] px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 transition focus:border-gold-light focus:bg-ivory/[0.1] focus:outline-none'

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ivory/90">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-gold-light" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function AsoEbiOrder() {
  const { products } = useProducts()
  const availableFabrics = useMemo(
    () => products.filter((product) => product.status !== 'sold-out'),
    [products],
  )

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  // If the chosen fabric sells out, fall back to the first available one.
  const selectedId = availableFabrics.some((item) => item.id === form.fabricId)
    ? form.fabricId
    : (availableFabrics[0]?.id ?? '')
  const fabric = availableFabrics.find((item) => item.id === selectedId)
  const totalYards = toWholeNumber(form.guests) * toWholeNumber(form.yardsPerGuest)
  const estimate = useMemo(
    () => (fabric && totalYards > 0 ? fabric.price * totalYards : 0),
    [fabric, totalYards],
  )

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validate({ ...form, fabricId: selectedId }, availableFabrics)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    const message = [
      'Hello AbleGod, I want to order aso-ebi.',
      '',
      `Name: ${cleanText(form.name, 60)}`,
      `Event: ${form.eventType}${form.eventDate ? ` on ${form.eventDate}` : ''}`,
      `Fabric: ${fabric.name} (${fabric.colour})`,
      `Guests: ${toWholeNumber(form.guests)}`,
      `Yards per guest: ${toWholeNumber(form.yardsPerGuest)}`,
      `Total: ${totalYards} yards`,
      `Delivery to: ${cleanText(form.location, 80)}`,
      '',
      'Please confirm availability and the bulk price.',
    ].join('\n')

    openWhatsApp(message)
  }

  return (
    <section id="aso-ebi" className="bg-wine py-20 text-ivory lg:py-28">
      <div className="mx-auto grid max-w-[96rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12 xl:px-16">
        <div className="lg:col-span-5">
          <SectionHeading
            light
            eyebrow="Aso-ebi orders"
            title="Dress your whole family in one colour"
            intro="Brides, celebrants and family heads: choose a fabric, tell us how many guests, and we'll prepare and package every bundle for your event."
          />

          <Reveal as="ul" delay={120} className="mt-10 space-y-5">
            {[
              ['Any quantity', 'From 5 guests to 500, we package every set separately.'],
              ['Bulk pricing', 'The more yards you order, the better the price per yard.'],
              ['Delivered to you', 'We send to Lagos, Abuja, anywhere in Nigeria and abroad.'],
            ].map(([title, text]) => (
              <li key={title} className="flex gap-4">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-light" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-0.5 text-sm text-ivory/70">{text}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal as="figure" delay={200} className="mt-10 hidden overflow-hidden rounded-3xl lg:block">
            <img
              src="/images/deliveries/aso-ebi-package.jpg"
              alt="A packaged aso-ebi lace set ready for delivery"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-7">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-ivory/10 bg-wine-dark/60 p-6 sm:p-8 lg:p-10"
        >
          <h3 className="font-display text-3xl font-semibold">Aso-ebi order form</h3>
          <p className="mt-1 text-sm text-ivory/60">
            Your order is sent to our WhatsApp. We reply with availability and your final bulk price.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Your name" htmlFor="ae-name" error={errors.name}>
              <input
                id="ae-name"
                type="text"
                autoComplete="name"
                maxLength={60}
                value={form.name}
                onChange={update('name')}
                placeholder="e.g. Mrs Adaeze Okafor"
                className={inputStyles}
              />
            </Field>

            <Field label="Event" htmlFor="ae-event">
              <select
                id="ae-event"
                value={form.eventType}
                onChange={update('eventType')}
                className={inputStyles}
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type} className="text-ink">
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Fabric" htmlFor="ae-fabric" error={errors.fabricId}>
              <select
                id="ae-fabric"
                value={selectedId}
                onChange={update('fabricId')}
                className={inputStyles}
              >
                {availableFabrics.map((item) => (
                  <option key={item.id} value={item.id} className="text-ink">
                    {item.name} · {formatNaira(item.price)}/yd
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Event date (optional)" htmlFor="ae-date">
              <input
                id="ae-date"
                type="date"
                value={form.eventDate}
                onChange={update('eventDate')}
                className={`${inputStyles} [color-scheme:dark]`}
              />
            </Field>

            <Field label="Number of guests" htmlFor="ae-guests" error={errors.guests}>
              <input
                id="ae-guests"
                type="number"
                inputMode="numeric"
                min={LIMITS.guests.min}
                max={LIMITS.guests.max}
                value={form.guests}
                onChange={update('guests')}
                className={inputStyles}
              />
            </Field>

            <Field label="Yards per guest" htmlFor="ae-yards" error={errors.yardsPerGuest}>
              <input
                id="ae-yards"
                type="number"
                inputMode="numeric"
                min={LIMITS.yards.min}
                max={LIMITS.yards.max}
                value={form.yardsPerGuest}
                onChange={update('yardsPerGuest')}
                className={inputStyles}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Delivery location" htmlFor="ae-location" error={errors.location}>
                <input
                  id="ae-location"
                  type="text"
                  autoComplete="address-level2"
                  maxLength={80}
                  value={form.location}
                  onChange={update('location')}
                  placeholder="City and state, or country if outside Nigeria"
                  className={inputStyles}
                />
              </Field>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] text-ivory/50 uppercase">Estimated total</p>
              <p className="mt-1 font-display text-3xl font-semibold">
                {estimate > 0 ? formatNaira(estimate) : '—'}
              </p>
              <p className="text-xs text-ivory/50">
                {totalYards > 0 ? `${totalYards} yards at retail price. Bulk discount applied on confirmation.` : ''}
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold whitespace-nowrap text-wine transition duration-300 hover:-translate-y-0.5 hover:bg-sand"
            >
              <WhatsAppIcon className="size-4" />
              Send order on WhatsApp
            </button>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  )
}
