'use client'

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-navy-dark/95 backdrop-blur-sm border-t border-white/10 p-3 flex items-center justify-between gap-3 sm:hidden z-40">
      <div>
        <div className="text-wood font-serif font-bold text-lg">29 900 $</div>
        <div className="text-cream/40 text-xs">Trois-Pistoles, QC</div>
      </div>
      <a
        href="#contact"
        className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-6 py-3 rounded-lg text-sm whitespace-nowrap"
      >
        Contacter
      </a>
    </div>
  )
}
