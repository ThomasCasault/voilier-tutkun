'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { PricingHistory } from '@/lib/types'

export default function PrixPage() {
  const [history, setHistory] = useState<PricingHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ price: '', floor_price: '', note: '', effective_at: '' })

  const supabase = createClient()

  async function fetchHistory() {
    const { data } = await supabase
      .from('pricing_history')
      .select('*')
      .order('effective_at', { ascending: false })
    setHistory(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchHistory() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await supabase.from('pricing_history').insert({
      price: Number(form.price),
      floor_price: form.floor_price ? Number(form.floor_price) : null,
      note: form.note || null,
      effective_at: form.effective_at || new Date().toISOString(),
    })
    setForm({ price: '', floor_price: '', note: '', effective_at: '' })
    setShowForm(false)
    fetchHistory()
  }

  const currentPrice = history[0]?.price ?? 29900
  const floorPrice = history[0]?.floor_price

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Prix</h1>

      {/* Prix actuel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
          <p className="text-slate-400 text-sm mb-2">Prix actuel</p>
          <p className="text-4xl font-bold text-wood">{currentPrice.toLocaleString('fr-CA')} $</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
          <p className="text-slate-400 text-sm mb-2">Prix plancher</p>
          <p className="text-4xl font-bold text-orange-400">
            {floorPrice ? `${floorPrice.toLocaleString('fr-CA')} $` : 'Non défini'}
          </p>
        </div>
      </div>

      {/* Ajouter */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">Historique des prix</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {showForm ? 'Annuler' : '+ Nouveau prix'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Prix ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Prix plancher ($)</label>
            <input type="number" value={form.floor_price} onChange={(e) => setForm({ ...form, floor_price: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Date effective</label>
            <input type="date" value={form.effective_at} onChange={(e) => setForm({ ...form, effective_at: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Note</label>
            <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-6 py-2 rounded-lg text-sm transition-colors">
              Enregistrer
            </button>
          </div>
        </form>
      )}

      {/* Timeline */}
      {loading ? (
        <div className="text-slate-400">Chargement...</div>
      ) : history.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucun historique de prix</div>
      ) : (
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={h.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-wood' : 'bg-slate-600'}`} />
                {i < history.length - 1 && <div className="w-0.5 h-6 bg-slate-700 mt-1" />}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className={`text-xl font-bold ${i === 0 ? 'text-wood' : 'text-slate-400'}`}>
                    {h.price.toLocaleString('fr-CA')} $
                  </span>
                  {h.floor_price && (
                    <span className="text-sm text-slate-500">plancher: {h.floor_price.toLocaleString('fr-CA')} $</span>
                  )}
                </div>
                {h.note && <p className="text-sm text-slate-400 mt-1">{h.note}</p>}
              </div>
              <div className="text-sm text-slate-500">
                {new Date(h.effective_at).toLocaleDateString('fr-CA')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
