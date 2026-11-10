import { useEffect, useState } from 'react'
import { NAV_LINKS, STORE } from '../config/store'
import { whatsappLink } from '../lib/whatsapp'
import { CloseIcon, MenuIcon, TruckIcon, WhatsAppIcon } from './icons'
import { Logo } from './ui'

function AnnouncementBar() {
  return (
    <div className="bg-wine-dark text-ivory">
      <p className="mx-auto flex max-w-[96rem] items-center justify-center gap-2 px-4 py-2 text-center text-xs tracking-wide">
        <TruckIcon className="size-4 shrink-0 text-gold-light" />
        Delivery across Nigeria and worldwide
        <span className="hidden sm:inline"> · Wholesale and retail · CAC registered</span>
      </p>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'border-line bg-ivory/90 shadow-[0_8px_24px_-18px_rgba(28,23,20,0.4)] backdrop-blur-md'
            : 'border-transparent bg-ivory'
        }`}
      >
        <nav className="mx-auto flex h-18 max-w-[96rem] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-ink/80 transition hover:text-wine after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-wine after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(`Hello ${STORE.name}, I'd like to make an enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-ivory transition hover:bg-wine-dark sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              Chat with us
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-full p-2 text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div id="mobile-menu" className="animate-drop-down border-t border-line bg-ivory lg:hidden">
            <ul className="mx-auto max-w-[96rem] px-5 py-4 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-line/70 py-3.5 font-display text-2xl font-semibold text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a
                  href={whatsappLink(`Hello ${STORE.name}, I'd like to make an enquiry.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-wine py-3.5 text-sm font-semibold text-ivory"
                >
                  <WhatsAppIcon className="size-4" />
                  Chat with us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
