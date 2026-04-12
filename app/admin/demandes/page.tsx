'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Inquiry } from '@/lib/types'

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  in_discussion: 'bg-yellow-500/20 text-yellow-400',
  refused: 'bg-red-500/20 text-red-400',
  follow_up: 'bg-orange-500/20 text-orange-400',
  accepted: 'bg-green-500/20 text-green-400',
}

const statusLabels: Record<string, string> = {
  new: 'Nouvelle',
  in_discussion: 'En discussion',
  refused: 'Refusée',
  follow_up: 'À suivre',
  accepted: 'Acceptée',
}

const emptyForm = {
  contact_name: '',
  channel: '',
  offer_amount: '',
  status: 'new' as Inquiry['status'],
  notes: '',
  contacted_at: '',
}

export default function DemandesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)

  const supabase = createClient()

  async function fetchInquiries() {
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    setInquiries(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchInquiries() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      contact_name: form.contact_name,
      channel: form.channel,
      offer_amount: form.offer_amount ? Number(form.offer_amount) : null,
      status: form.status,
      notes: form.notes || null,
      contacted_at: form.contacted_at || new Date().toISOString(),
    }

    if (editId) {
      await supabase.from('inquiries').update(payload).eq('id', editId)
    } else {
      await supabase.from('inquiries').insert(payload)
    }

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    fetchInquiries()
  }

  function handleEdit(inq: Inquiry) {
    setForm({
      contact_name: inq.contact_name,
      channel: inq.channel,
      offer_amount: inq.offer_amount?.toString() ?? '',
      status: inq.status,
      notes: inq.notes ?? '',
      contacted_at: inq.contacted_at?.split('T')[0] ?? '',
    })
    setEditId(inq.id)
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette demande ?')) return
    await supabase.from('inquiries').delete().eq('id', id)
    fetchInquiries()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Demandes</h1>
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
            <label className="block text-sm text-slate-300 mb-1">Nom du contact</label>
            <input value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Canal</label>
            <input value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="Courriel, téléphone, Kijiji..." />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Montant offert ($)</label>
            <input type="number" value={form.offer_amount} onChange={(e) => setForm({ ...form, offer_amount: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Statut</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Inquiry['status'] })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none">
              <option value="new">Nouvelle</option>
              <option value="in_discussion">En discussion</option>
              <option value="follow_up">À suivre</option>
              <option value="refused">Refusée</option>
              <option value="accepted">Acceptée</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Date de contact</label>
            <input type="date" value={form.contacted_at} onChange={(e) => setForm({ ...form, contacted_at: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
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
      ) : inquiries.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucune demande</div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left px-4 py-3 font-medium">Contact</th>
                <th className="text-left px-4 py-3 font-medium">Canal</th>
                <th className="text-left px-4 py-3 font-medium">Offre</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="text-slate-300 hover:bg-slate-700/50">
                  <td className="px-4 py-3 font-medium">{inq.contact_name}</td>
                  <td className="px-4 py-3">{inq.channel}</td>
                  <td className="px-4 py-3">{inq.offer_amount ? `${inq.offer_amount.toLocaleString('fr-CA')} $` : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[inq.status]}`}>
                      {statusLabels[inq.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{new Date(inq.contacted_at).toLocaleDateString('fr-CA')}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(inq)} className="text-wood hover:text-wood-light text-xs">Modifier</button>
                    <button onClick={() => handleDelete(inq.id)} className="text-red-400 hover:text-red-300 text-xs">Supprimer</button>
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
