'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const photos = Array.from({ length: 14 }, (_, i) => ({
  src: `/images/photo-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `TUTKÜN — photo ${i + 1}`,
}))

export default function Lightbox() {
  const [current, setCurrent] = useState<number | null>(null)

  const close = useCallback(() => setCurrent(null), [])
  const prev = useCallback(() => {
    setCurrent((c) => (c !== null ? (c - 1 + photos.length) % photos.length : null))
  }, [])
  const next = useCallback(() => {
    setCurrent((c) => (c !== null ? (c + 1) % photos.length : null))
  }, [])

  useEffect(() => {
    if (current === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [current, close, prev, next])

  return (
    <>
      {/* Galerie */}
      <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group block relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-200 cursor-zoom-in"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Overlay lightbox */}
      {current !== null && (
        <div
          className="lightbox-overlay active"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            className="absolute top-4 right-6 text-white text-4xl leading-none z-[51] w-11 h-11 flex items-center justify-center hover:opacity-70"
            aria-label="Fermer"
          >
            &times;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-5xl z-[51] w-12 h-12 flex items-center justify-center opacity-60 hover:opacity-100"
            aria-label="Précédente"
          >
            &lsaquo;
          </button>
          <Image
            src={photos[current].src}
            alt={photos[current].alt}
            width={1200}
            height={900}
            className="max-w-[88vw] max-h-[85vh] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
            priority
          />
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-5xl z-[51] w-12 h-12 flex items-center justify-center opacity-60 hover:opacity-100"
            aria-label="Suivante"
          >
            &rsaquo;
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {current + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
