import { STORE } from '../config/store'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

/** Floating WhatsApp button, always visible in the bottom-right corner. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(`Hello ${STORE.name}, I'd like to make an enquiry.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AbleGod on WhatsApp"
      className="fixed right-5 bottom-5 z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.4)] transition hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
