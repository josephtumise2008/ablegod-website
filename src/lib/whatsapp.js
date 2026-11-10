import { STORE } from '../config/store'

const MAX_MESSAGE_LENGTH = 1000

/**
 * Cleans text typed by a customer before it goes into a WhatsApp message:
 * removes control characters, collapses extra spaces and limits the length.
 */
export function cleanText(value, maxLength = 120) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

/**
 * Builds a safe wa.me link with a pre-written message.
 * The message is URL-encoded, so customer input cannot change the link.
 */
export function whatsappLink(message = '') {
  const text = String(message).slice(0, MAX_MESSAGE_LENGTH)
  const base = `https://wa.me/${STORE.whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Opens WhatsApp in a new tab without giving that tab access to this page. */
export function openWhatsApp(message) {
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
}
