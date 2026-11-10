import { formatNaira } from './format'

/** WhatsApp message when a customer orders a fabric. */
export function orderMessage(product, yards) {
  const quantity = yards ? `\nQuantity: ${yards} yards` : ''
  return [
    "Hello AbleGod, I'd like to order:",
    '',
    product.name,
    `Colour: ${product.colour}`,
    `Price: ${formatNaira(product.price)} per yard${quantity}`,
    '',
    'Is it available?',
  ].join('\n')
}

/** WhatsApp message when a customer wants to know about a restock. */
export function restockMessage(product) {
  return `Hello AbleGod, please let me know when ${product.name} (${product.colour}) is back in stock.`
}
