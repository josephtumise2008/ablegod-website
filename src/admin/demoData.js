/**
 * SAMPLE DATA for the admin preview only.
 * In the full online store, orders and sales come from real payments.
 */

export const DEMO_WEEKLY_SALES = [
  { day: 'Mon', amount: 410000 },
  { day: 'Tue', amount: 265000 },
  { day: 'Wed', amount: 590000 },
  { day: 'Thu', amount: 380000 },
  { day: 'Fri', amount: 845000 },
  { day: 'Sat', amount: 1120000 },
  { day: 'Sun', amount: 320000 },
]

export const ORDER_STATUSES = {
  paid: { label: 'Paid', style: 'bg-instock/10 text-instock' },
  pending: { label: 'Awaiting payment', style: 'bg-lowstock/10 text-lowstock' },
  shipped: { label: 'Out for delivery', style: 'bg-wine/10 text-wine' },
  delivered: { label: 'Delivered', style: 'bg-soldout/15 text-muted' },
}

export const DEMO_ORDERS = [
  {
    id: 'AG-1048',
    customer: 'Chioma A.',
    location: 'Lekki, Lagos',
    items: 'Emerald Beaded Lace · 5 yards',
    total: 140000,
    status: 'paid',
    time: '12 min ago',
  },
  {
    id: 'AG-1047',
    customer: 'Bisi O. (Aso-ebi)',
    location: 'Ibadan, Oyo',
    items: 'Pink Cord Lace · 120 yards, 24 guests',
    total: 780000,
    status: 'pending',
    time: '1 hr ago',
  },
  {
    id: 'AG-1046',
    customer: 'Ngozi E.',
    location: 'London, UK',
    items: 'Champagne Bridal Beaded Lace · 6 yards',
    total: 270000,
    status: 'shipped',
    time: 'Yesterday',
  },
  {
    id: 'AG-1045',
    customer: 'Tunde Designs',
    location: 'Wuse, Abuja',
    items: 'Gold Luxury Crystal Lace · 15 yards (wholesale)',
    total: 495000,
    status: 'delivered',
    time: '2 days ago',
  },
  {
    id: 'AG-1044',
    customer: 'Amaka U.',
    location: 'Enugu',
    items: 'Wine Pearl Lace · 5 yards',
    total: 135000,
    status: 'delivered',
    time: '3 days ago',
  },
]
