import { useState } from 'react'
import { CATEGORIES } from '../data/products'
import { cleanText } from '../lib/whatsapp'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const EMPTY = { name: '', colour: '', category: 'beaded', price: '', status: 'in-stock' }

const inputStyles =
  'mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-gold focus:outline-none'

/**
 * Form to add a new fabric. In this preview the photo stays on this device;
 * in the full version it is uploaded to the store's image storage.
 */
export default function AddFabricForm({ onAdd, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const pickPhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) return setError('Please choose a JPG, PNG or WebP photo.')
    if (file.size > MAX_PHOTO_SIZE) return setError('Photo is too large. Maximum size is 5 MB.')
    if (photo) URL.revokeObjectURL(photo)
    setPhoto(URL.createObjectURL(file))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = cleanText(form.name, 60)
    const colour = cleanText(form.colour, 40)
    const price = Number.parseInt(form.price.replace(/[^\d]/g, ''), 10)

    if (!photo) return setError('Please add a photo of the fabric.')
    if (name.length < 3) return setError('Please enter the fabric name.')
    if (colour.length < 2) return setError('Please enter the colour.')
    if (!Number.isFinite(price) || price <= 0) return setError('Please enter the price per yard.')

    onAdd({
      id: `new-${Date.now()}`,
      name,
      colour,
      category: form.category,
      price,
      status: form.status,
      image: photo,
      description: `${name} in ${colour.toLowerCase()}. New arrival at AbleGod.`,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="animate-drop-down rounded-2xl border border-line bg-white p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl font-semibold text-ink">Add new fabric</h3>
        <button type="button" onClick={onCancel} className="text-sm font-semibold text-muted hover:text-ink">
          Cancel
        </button>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[9rem_1fr]">
        <label className="flex aspect-square w-32 cursor-pointer sm:w-auto flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gold bg-sand text-center text-xs font-semibold text-wine">
          {photo ? (
            <img src={photo} alt="Selected fabric" className="h-full w-full object-cover" />
          ) : (
            <>
              <span className="text-2xl">+</span>
              Add photo
            </>
          )}
          <input type="file" accept={ALLOWED_TYPES.join(',')} onChange={pickPhoto} className="sr-only" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink sm:col-span-2">
            Fabric name
            <input value={form.name} onChange={update('name')} maxLength={60} placeholder="e.g. Peach Beaded Lace" className={inputStyles} />
          </label>
          <label className="text-sm font-medium text-ink">
            Colour
            <input value={form.colour} onChange={update('colour')} maxLength={40} placeholder="e.g. Peach" className={inputStyles} />
          </label>
          <label className="text-sm font-medium text-ink">
            Price per yard (₦)
            <input value={form.price} onChange={update('price')} inputMode="numeric" maxLength={9} placeholder="e.g. 25000" className={inputStyles} />
          </label>
          <label className="text-sm font-medium text-ink">
            Category
            <select value={form.category} onChange={update('category')} className={inputStyles}>
              {CATEGORIES.filter((item) => item.id !== 'all').map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-ink">
            Stock
            <select value={form.status} onChange={update('status')} className={inputStyles}>
              <option value="in-stock">Available</option>
              <option value="low-stock">Few yards left</option>
              <option value="sold-out">Sold out</option>
            </select>
          </label>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm font-medium text-wine" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-wine py-3 text-sm font-semibold text-ivory transition hover:bg-wine-dark"
      >
        Add to shop
      </button>
    </form>
  )
}
