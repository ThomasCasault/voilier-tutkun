'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Listing } from '@/lib/types'

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  expired: 'bg-red-500/20 text-red-400',
  to_renew: 'bg-orange-500/20 text-orange-400',
  draft: 'bg-slate-500/20 text-slate-400',
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  expired: 'Expirée',
  to_renew: 'À renouveler',
  draft: 'Brouillon',
}

const emptyForm = {
  platform: '',
  url: '',
  status: 'draft' as Listing['status'],
  published_at: '',
  expires_at: '',
  notes: '',
}

export default function AnnoncesPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)

  const supabase = createClient()

  async function fetchListings() {
    const { data } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
    setListings(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchListings() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      platform: form.platform,
      url: form.url,
      status: form.status,
      published_at: form.published_at || null,
      expires_at: form.expires_at || null,
      notes: form.notes || null,
    }

    if (editId) {
      await supabase.from('listings').update(payload).eq('id', editId)
    } else {
      await supabase.from('listings').insert(payload)
    }

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    fetchListings()
  }

  function handleEdit(listing: Listing) {
    setForm({
      platform: listing.platform,
      url: listing.url,
      status: listing.status,
      published_at: listing.published_at ?? '',
      expires_at: listing.expires_at ?? '',
      notes: listing.notes ?? '',
    })
    setEditId(listing.id)
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette annonce ?')) return
    await supabase.from('listings').delete().eq('id', id)
    fetchListings()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Annonces</h1>
        <button
          onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Plateforme</label>
            <input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="Kijiji, Marketplace, YachtWorld..." />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">URL</label>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Statut</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Listing['status'] })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none">
              <option value="draft">Brouillon</option>
              <option value="active">Active</option>
              <option value="expired">Expirée</option>
              <option value="to_renew">À renouveler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Publiée le</label>
            <input type="date" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Expire le</label>
            <input type="date" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-1">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-6 py-2 rounded-lg text-sm transition-colors">
              {editId ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-slate-400">Chargement...</div>
      ) : listings.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucune annonce</div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left px-4 py-3 font-medium">Plateforme</th>
                <th className="text-left px-4 py-3 font-medium">URL</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-left px-4 py-3 font-medium">Publiée</th>
                <th className="text-left px-4 py-3 font-medium">Expire</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {listings.map((l) => (
                <tr key={l.id} className="text-slate-300 hover:bg-slate-700/50">
                  <td className="px-4 py-3 font-medium">{l.platform}</td>
                  <td className="px-4 py-3">
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block max-w-48">
                      {l.url}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[l.status]}`}>
                      {statusLabels[l.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{l.published_at ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-400">{l.expires_at ?? '—'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(l)} className="text-wood hover:text-wood-light text-xs">Modifier</button>
                    <button onClick={() => handleDelete(l.id)} className="text-red-400 hover:text-red-300 text-xs">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
