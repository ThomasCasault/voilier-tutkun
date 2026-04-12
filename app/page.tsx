import Image from 'next/image'
import Lightbox from '@/components/Lightbox'
import ScrollReveal from '@/components/ScrollReveal'
import StickyCTA from '@/components/StickyCTA'

export default function HomePage() {
  return (
    <>
      <ScrollReveal />

      {/* ══════ HERO ══════ */}
      <header className="relative">
        <div className="w-full h-[80vh] md:h-[70vh] min-h-[500px] bg-navy-dark overflow-hidden">
          <Image
            src="/images/hero.png"
            alt="Voilier TUTKÜN — Norwalk Island Sharpie 26 sous voile"
            fill
            priority
            className="object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-fade font-serif text-3xl md:text-5xl font-bold text-white leading-snug md:leading-tight">
              Norwalk Island Sharpie 26<br />
              <span className="text-wood-light italic tracking-wide">&laquo; TUTKÜN &raquo;</span>
            </h1>
            <p className="hero-fade-delay mt-2 text-cream/90 text-base md:text-xl font-sans tracking-wide uppercase">
              Conçu par Bruce Kirby — designer du <span className="font-semibold">Laser</span>
            </p>
            <div className="hero-fade-delay2 mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-block bg-wood text-navy-dark font-bold text-xl md:text-2xl px-5 py-2 rounded-md">
                29 900 $
              </span>
              <span className="inline-block text-cream/70 text-sm md:text-base line-through">
                Évalué 65 700 $
              </span>
              <span className="inline-block border border-cream/40 text-cream text-xs px-3 py-1 rounded tracking-wider uppercase">
                AIMAQ / ABYC
              </span>
            </div>
            <nav className="hero-fade-delay3 mt-5 flex flex-wrap gap-2 text-xs md:text-sm">
              {[
                { href: '#histoire', label: "L'histoire" },
                { href: '#galerie', label: 'Galerie' },
                { href: '#specs', label: 'Caractéristiques' },
                { href: '#equipements', label: 'Équipements' },
                { href: '#inspection', label: 'Inspection' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="bg-white/15 backdrop-blur-sm border border-white/20 text-cream px-3 py-1.5 rounded-full hover:bg-white/25 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ══════ L'HISTOIRE ══════ */}
      <section id="histoire" className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal font-serif text-2xl md:text-3xl text-navy-dark font-bold mb-4 text-center">
            L&apos;histoire de TUTKÜN
          </h2>
          <div className="reveal flex justify-center mb-8">
            <div className="w-16 h-0.5 bg-wood rounded-full" />
          </div>
          <div className="reveal space-y-5 font-serif text-gray-700 leading-relaxed text-lg">
            <p>
              <strong className="text-navy-dark">TUTKÜN</strong> a été construit entre 2010 et 2018
              à partir des plans du légendaire Bruce Kirby, le même designer qui a donné au monde
              le Laser, le voilier le plus produit de l&apos;histoire.
              Huit ans de construction amateur soignée en contreplaqué/époxy.
            </p>
            <p>
              Ce n&apos;est pas un voilier de production sorti d&apos;un moule. C&apos;est un bateau de caractère : fond plat, dérive
              escamotable, deux mâts non-haubanés, voiles à livarde. Le Norwalk Island Sharpie tire 10 pouces d&apos;eau
              dérive remontée — il va partout où les autres ne peuvent pas. Rivières peu profondes, anses isolées,
              mouillages sauvages du Bas-Saint-Laurent.
            </p>
            <p>
              Deux propriétaires ont pris soin de ce bateau depuis sa mise à l&apos;eau. Il hiverne à Trois-Pistoles.
            </p>
          </div>
        </div>
      </section>

      {/* ══════ GALERIE ══════ */}
      <section id="galerie" className="py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal font-serif text-2xl md:text-3xl text-navy-dark font-bold mb-8 text-center">
            Galerie
          </h2>
          <Lightbox />
        </div>
      </section>

      {/* ══════ CARACTÉRISTIQUES TECHNIQUES ══════ */}
      <section id="specs" className="bg-navy-dark text-cream py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
            Caractéristiques techniques
          </h2>
          <div className="reveal overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-sm md:text-base">
              <tbody>
                {[
                  ['Construction', '2010–2018 (construction amateur sur plans)'],
                  ['Longueur', '26\'0" (7,9 m)'],
                  ['Maître bau', '8\'0" (2,4 m)'],
                  ['Tirant d\'eau', '10" à 5\'10" (dérive escamotable avec lest)'],
                  ['Déplacement', '1 678 kg (3 700 lb) dont 680 kg de lest'],
                  ['Designer', 'Bruce Kirby'],
                  ['Coque', 'Bois / époxy, fond plat, aucune osmose'],
                  ['Gréement', 'Cat-Ketch (2 mâts non-haubanés, voiles à livarde)'],
                  ['Moteur', 'Yamaha T8 MLHH 8,8 HP (2010) — ~125 h'],
                  ['Carburant', '2 réservoirs portatifs 5 gal'],
                  ['Remorque', 'Incluse'],
                ].map(([label, value], i) => (
                  <tr
                    key={label}
                    className={`${i < 10 ? 'border-b border-white/10' : ''} ${i % 2 === 1 ? 'bg-white/5' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-wood-light w-2/5">{label}</td>
                    <td className="px-4 py-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="reveal mt-8">
            <Image
              src="/images/plan.jpg"
              alt="Plans du Norwalk Island Sharpie 26 par Bruce Kirby"
              width={800}
              height={600}
              className="w-full max-w-2xl mx-auto rounded-lg opacity-80"
            />
            <p className="text-center text-cream/60 text-xs tracking-wide uppercase mt-3">
              Plans originaux — Bruce Kirby
            </p>
          </div>
        </div>
      </section>

      {/* ══════ ÉQUIPEMENTS INCLUS ══════ */}
      <section id="equipements" className="bg-stone-100 py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal font-serif text-2xl md:text-3xl text-navy-dark font-bold mb-8 text-center">
            Équipements inclus
          </h2>
          <div className="reveal-stagger grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Navigation */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-sans font-semibold text-navy-dark mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                Navigation
              </h3>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>Raymarine Element 12 HV + sonde HV-100</li>
                <li>VHF Standard Horizon GX1600E (25W, DSC)</li>
                <li>Antenne VHF 36&quot; SST</li>
                <li>Compas Ritchie</li>
                <li>Panneau solaire Coleman 40W</li>
              </ul>
            </div>

            {/* Mouillage */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-sans font-semibold text-navy-dark mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                Mouillage
              </h3>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>Ancre CQR 15 lb</li>
                <li>50&apos; chaîne 1/4&quot;</li>
                <li>150&apos; câblot 1/2&quot;</li>
              </ul>
            </div>

            {/* Pont */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-sans font-semibold text-navy-dark mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Pont
              </h3>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>6 défenses pare-battages</li>
                <li>2 amarres 1/2&quot; x 15&apos;</li>
                <li>Gaffe aluminium télescopique</li>
                <li>Davier inox</li>
                <li>Feux de navigation, réflecteur radar</li>
              </ul>
            </div>

            {/* Cabine */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-sans font-semibold text-navy-dark mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Cabine
              </h3>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>Intérieur tout bois, 3 hublots par côté</li>
                <li>Table bois à 2 abattants, lavabo inox gravité</li>
                <li>Couchettes avec coussins</li>
                <li>Toilette portative</li>
                <li>Cuisinière Grillmate butane</li>
                <li>Baromètre, hygromètre, thermomètre laiton</li>
              </ul>
            </div>

            {/* Énergie */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-sans font-semibold text-navy-dark mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Énergie
              </h3>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>2 batteries décharge profonde (GR24, 85 AH)</li>
                <li>Panneau distribution 4 circuits</li>
                <li>Panneau solaire Coleman 40W</li>
              </ul>
            </div>

            {/* Voiles & gréement */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-sans font-semibold text-navy-dark mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" /></svg>
                Voiles &amp; gréement
              </h3>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>Grand-voile + génois Dacron 2018</li>
                <li>Écoutes neuves, 3 ris</li>
                <li>Accastillage tout laiton (taquets, chaumards, winches)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ INSPECTION PROFESSIONNELLE ══════ */}
      <section id="inspection" className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal font-serif text-2xl md:text-3xl text-navy-dark font-bold mb-8 text-center">
            Inspection professionnelle
          </h2>
          <div className="reveal bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              Rapport d&apos;expertise maritime complet — <strong>27 pages</strong>, certifié{' '}
              <strong>AIMAQ / ABYC</strong>. Inspection réalisée le 12 mai 2022 par Jacques Bouchard,
              Expertises JB (Chicoutimi).
            </p>
            <p className="text-2xl font-serif font-bold text-navy-dark mb-6">
              Valeur estimée : 65 700 $
            </p>
            <a
              href="/rapport-inspection.pdf"
              className="inline-flex items-center gap-2 bg-navy-dark hover:bg-navy text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Télécharger le rapport d&apos;inspection (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section id="contact" className="bg-navy-dark text-cream py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="reveal font-serif text-2xl md:text-3xl font-bold mb-6">Contact</h2>
          <div className="reveal mb-8">
            <div className="text-4xl md:text-5xl font-serif font-bold text-wood mb-1">29 900 $</div>
            <div className="text-cream/50 text-sm">Évalué 65 700 $ — AIMAQ/ABYC, 2022</div>
            <div className="mt-3 text-cream/65">~21 500 USD — négociable</div>
          </div>
          <div className="space-y-3 mb-8 max-w-sm mx-auto">
            <a
              href="mailto:voilier.casault@gmail.com?subject=TUTKÜN — Norwalk Island Sharpie 26"
              className="flex items-center justify-center gap-2 bg-wood hover:bg-wood-light text-navy-dark font-bold px-8 py-4 rounded-lg transition-colors text-lg w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Écrire au propriétaire
            </a>
            <p className="text-cream/50 text-sm">voilier.casault@gmail.com</p>
            <a
              href="tel:+1XXXXXXXXXX"
              className="flex items-center justify-center gap-2 border-2 border-wood/60 hover:bg-wood/10 text-cream font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Appeler
            </a>
          </div>
          <p className="text-cream/50 text-sm max-w-md mx-auto">
            Trois-Pistoles, QC — visite sur rendez-vous
          </p>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-navy-dark border-t border-white/10 text-cream/40 py-8 px-6 text-center text-sm">
        <p>Trois-Pistoles, Québec</p>
        <p className="mt-2 text-cream/30">&copy; 2026</p>
      </footer>

      {/* ══════ STICKY CTA MOBILE ══════ */}
      <StickyCTA />
    </>
  )
}
