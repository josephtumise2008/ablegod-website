const ITEMS = [
  'Beaded lace',
  'Sample lace',
  'Sentor',
  'Bridal lace',
  'Brocade',
  'Luxury crystal',
  'Aso-ebi',
  'Wholesale & retail',
]

/** Slowly scrolling band of fabric types. Pauses when hovered. */
export default function FabricMarquee() {
  // The list is repeated twice so the loop has no visible gap.
  const loop = [...ITEMS, ...ITEMS]

  return (
    <div className="group overflow-hidden border-y border-wine-dark bg-wine py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 pr-8 font-display text-2xl font-semibold whitespace-nowrap text-ivory sm:text-3xl"
          >
            {item}
            <span className="text-base text-gold-light">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
