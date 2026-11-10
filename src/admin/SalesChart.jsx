import { formatNaira } from '../lib/format'

/** Short Naira label for chart values: 845000 -> ₦845k, 1120000 -> ₦1.1m */
function shortNaira(amount) {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`
  return `₦${Math.round(amount / 1000)}k`
}

const WIDTH = 420
const HEIGHT = 200
const TOP = 26
const BOTTOM = 28
const GAP = 10

/**
 * Simple bar chart of sales per day. The best day is shown in wine,
 * the rest in a lighter tone, with the value written above each bar.
 */
export default function SalesChart({ data }) {
  const max = Math.max(...data.map((item) => item.amount))
  const barWidth = (WIDTH - GAP * (data.length - 1)) / data.length
  const plotHeight = HEIGHT - TOP - BOTTOM
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <figure>
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full max-h-72"
        role="img"
        aria-label={`Sales this week, total ${formatNaira(total)}`}
      >
        <line
          x1="0"
          x2={WIDTH}
          y1={HEIGHT - BOTTOM}
          y2={HEIGHT - BOTTOM}
          stroke="var(--color-line)"
        />
        {data.map((item, index) => {
          const barHeight = Math.max(4, (item.amount / max) * plotHeight)
          const x = index * (barWidth + GAP)
          const y = HEIGHT - BOTTOM - barHeight
          const isBest = item.amount === max

          return (
            <g key={item.day}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="6"
                fill={isBest ? 'var(--color-wine)' : 'var(--color-gold-light)'}
                opacity={isBest ? 1 : 0.55}
                className="origin-bottom animate-fade-up"
                style={{ animationDelay: `${index * 70}ms`, transformBox: 'fill-box' }}
              >
                <title>{`${item.day}: ${formatNaira(item.amount)}`}</title>
              </rect>
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-ink text-[12px] font-semibold"
              >
                {shortNaira(item.amount)}
              </text>
              <text
                x={x + barWidth / 2}
                y={HEIGHT - 8}
                textAnchor="middle"
                className="fill-muted text-[12px]"
              >
                {item.day}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
