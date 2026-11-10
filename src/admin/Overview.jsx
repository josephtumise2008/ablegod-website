import { formatNaira } from '../lib/format'
import { useProducts } from '../store/ProductsContext'
import { DEMO_ORDERS, DEMO_WEEKLY_SALES } from './demoData'
import OrdersList, { FullStoreBadge } from './OrdersList'
import SalesChart from './SalesChart'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function StatCard({ label, value, tone = 'text-ink', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-line bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-20px_rgba(28,23,20,0.5)] sm:p-5"
    >
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={`mt-2 font-display text-4xl font-semibold ${tone}`}>{value}</p>
    </button>
  )
}

export default function Overview({ onOpenTab }) {
  const { products } = useProducts()
  const count = (status) => products.filter((product) => product.status === status).length
  const weekTotal = DEMO_WEEKLY_SALES.reduce((sum, day) => sum + day.amount, 0)
  const awaitingPayment = DEMO_ORDERS.filter((order) => order.status === 'pending').length

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted">{greeting()},</p>
        <h2 className="font-display text-4xl font-semibold text-ink">AbleGod Enterprise</h2>
      </div>

      <section>
        <h3 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Your fabrics</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="In the shop" value={products.length} onClick={() => onOpenTab('fabrics')} />
          <StatCard label="Available" value={count('in-stock')} tone="text-instock" onClick={() => onOpenTab('fabrics')} />
          <StatCard label="Few yards left" value={count('low-stock')} tone="text-lowstock" onClick={() => onOpenTab('fabrics')} />
          <StatCard label="Sold out" value={count('sold-out')} tone="text-soldout" onClick={() => onOpenTab('fabrics')} />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">Sales this week</h3>
            <p className="mt-1 font-display text-4xl font-semibold text-ink">{formatNaira(weekTotal)}</p>
            <p className="text-xs text-muted">
              Best day: Saturday · {awaitingPayment} order awaiting payment
            </p>
          </div>
          <FullStoreBadge />
        </div>
        <div className="mt-6">
          <SalesChart data={DEMO_WEEKLY_SALES} />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">Latest orders</h3>
          <button
            type="button"
            onClick={() => onOpenTab('orders')}
            className="text-sm font-semibold text-wine underline-offset-4 hover:underline"
          >
            See all
          </button>
        </div>
        <OrdersList limit={3} />
      </section>
    </div>
  )
}
