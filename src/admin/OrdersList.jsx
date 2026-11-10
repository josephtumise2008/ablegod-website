import { formatNaira } from '../lib/format'
import { DEMO_ORDERS, ORDER_STATUSES } from './demoData'

export function FullStoreBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-[#7a5d2e] uppercase">
      Full online store
    </span>
  )
}

export default function OrdersList({ limit }) {
  const orders = limit ? DEMO_ORDERS.slice(0, limit) : DEMO_ORDERS

  return (
    <ul className="divide-y divide-line">
      {orders.map((order) => {
        const status = ORDER_STATUSES[order.status]
        return (
          <li key={order.id} className="flex items-start justify-between gap-4 py-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-ink">{order.customer}</p>
                <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${status.style}`}>
                  {status.label}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-muted">{order.items}</p>
              <p className="mt-0.5 text-xs text-muted/80">
                {order.id} · {order.location} · {order.time}
              </p>
            </div>
            <p className="shrink-0 font-semibold text-ink">{formatNaira(order.total)}</p>
          </li>
        )
      })}
    </ul>
  )
}
