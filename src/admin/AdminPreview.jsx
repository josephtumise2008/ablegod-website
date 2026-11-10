import { useEffect, useState } from 'react'
import { handleNavClick } from '../lib/router'
import { useProducts } from '../store/ProductsContext'
import FabricManager from './FabricManager'
import OrdersList, { FullStoreBadge } from './OrdersList'
import Overview from './Overview'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'fabrics', label: 'Fabrics' },
  { id: 'orders', label: 'Orders' },
]

/**
 * ADMIN PREVIEW (sample only)
 * Shows the shop owner how he will manage his website from his phone.
 * There is no login or database in this preview. In the full version this
 * page sits behind a secure login and saves to a real database.
 */
export default function AdminPreview() {
  const [tab, setTab] = useState('overview')
  const { resetProducts } = useProducts()

  useEffect(() => {
    document.title = 'Admin preview | AbleGod Enterprise'
    // Keep the admin page out of Google search results.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.title = 'AbleGod Enterprise | Premium Laces & Fabrics in Aba'
      meta.remove()
    }
  }, [])

  const openTab = (id) => {
    setTab(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-sand/60">
      <header className="sticky top-0 z-30 bg-ink text-ivory">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-bold">AbleGod</span>
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] text-gold-light uppercase">Admin</span>
          </div>
          <a
            href="/"
            onClick={(event) => handleNavClick(event, '/')}
            className="rounded-full border border-ivory/25 px-4 py-2 text-xs font-semibold transition hover:bg-ivory hover:text-ink"
          >
            View shop →
          </a>
        </div>

        <nav className="mx-auto flex max-w-5xl gap-1 px-5 sm:px-8" aria-label="Admin sections">
          {TABS.map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openTab(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`relative px-3 pt-1 pb-3 text-sm font-semibold transition-colors ${
                  active ? 'text-ivory' : 'text-ivory/55 hover:text-ivory'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gold-light transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm text-ink sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold">Admin preview.</span> This is a demo of how you will manage
            your website. Changes stay on this device only, and sales and orders are sample data.
          </p>
          <button
            type="button"
            onClick={resetProducts}
            className="shrink-0 self-start rounded-full border border-ink/20 px-4 py-1.5 text-xs font-semibold transition hover:bg-ink hover:text-ivory sm:self-auto"
          >
            Reset demo
          </button>
        </div>

        {/* key restarts the entrance animation when the tab changes */}
        <main key={tab} className="animate-fade-up">
          {tab === 'overview' && <Overview onOpenTab={openTab} />}
          {tab === 'fabrics' && <FabricManager />}
          {tab === 'orders' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl font-semibold text-ink">Orders</h2>
                  <p className="text-sm text-muted">Every paid order, who paid and what to deliver.</p>
                </div>
                <FullStoreBadge />
              </div>
              <div className="mt-6 rounded-2xl border border-line bg-white px-5">
                <OrdersList />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
