'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { ActivityLog } from '@/lib/types'

const categoryColors: Record<string, string> = {
  annonce: 'bg-blue-500/20 text-blue-400',
  demande: 'bg-green-500/20 text-green-400',
  prix: 'bg-yellow-500/20 text-yellow-400',
  visite: 'bg-purple-500/20 text-purple-400',
  maintenance: 'bg-orange-500/20 text-orange-400',
  autre: 'bg-slate-500/20 text-slate-400',
}

const categories = [
  { value: 'annonce', label: 'Annonce' },
  { value: 'demande', label: 'Demande' },
  { value: 'prix', label: 'Prix' },
  { value: 'visite', label: 'Visite' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'autre', label: 'Autre' },
]

export default function JournalPage() {
  const [entries, setEntries] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ category: 'autre', text: '' })

  const supabase = createClient()

  async function fetchEntries() {
    const { data } = await supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
    setEntries(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchEntries() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await supabase.from('activity_log').insert({
      category: form.category,
      text: form.text,
    })
    setForm({ category: 'autre', text: '' })
    setShowForm(false)
    fetchEntries()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette entrée ?')) return
    await supabase.from('activity_log').delete().eq('id', id)
    fetchEntries()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Journal d&apos;activité</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Catégorie</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none">
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Texte</label>
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required rows={3} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="Que s'est-il passé ?" />
          </div>
          <button type="submit" className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-6 py-2 rounded-lg text-sm transition-colors">
            Enregistrer
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-slate-400">Chargement...</div>
      ) : entries.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucune entrée</div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-start gap-4">
              <div className="shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-wood" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${categoryColors[entry.category] ?? categoryColors.autre}`}>
                    {entry.category}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {new Date(entry.created_at).toLocaleDateString('fr-CA')} — {new Date(entry.created_at).toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">{entry.text}</p>
              </div>
              <button onClick={() => handleDelete(entry.id)} className="text-red-400 hover:text-red-300 text-xs shrink-0">
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
