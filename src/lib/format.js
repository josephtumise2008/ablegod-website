const numberFormatter = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 })

/** Formats a number as Naira, for example 18000 -> ₦18,000 */
export function formatNaira(amount) {
  return `₦${numberFormatter.format(amount)}`
}
