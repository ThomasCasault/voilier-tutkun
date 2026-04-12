'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Document } from '@/lib/types'

const emptyForm = {
  title: '',
  doc_type: 'inspection',
  url: '',
  notes: '',
}

const docTypes = [
  { value: 'inspection', label: 'Inspection' },
  { value: 'facture', label: 'Facture' },
  { value: 'assurance', label: 'Assurance' },
  { value: 'immatriculation', label: 'Immatriculation' },
  { value: 'photo', label: 'Photo' },
  { value: 'plan', label: 'Plan' },
  { value: 'autre', label: 'Autre' },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)

  const supabase = createClient()

  async function fetchDocuments() {
    const { data } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
    setDocuments(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchDocuments() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      title: form.title,
      doc_type: form.doc_type,
      url: form.url,
      notes: form.notes || null,
    }

    if (editId) {
      await supabase.from('documents').update(payload).eq('id', editId)
    } else {
      await supabase.from('documents').insert(payload)
    }

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    fetchDocuments()
  }

  function handleEdit(doc: Document) {
    setForm({
      title: doc.title,
      doc_type: doc.doc_type,
      url: doc.url,
      notes: doc.notes ?? '',
    })
    setEditId(doc.id)
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce document ?')) return
    await supabase.from('documents').delete().eq('id', id)
    fetchDocuments()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Documents</h1>
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
            <label className="block text-sm text-slate-300 mb-1">Titre</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Type</label>
            <select value={form.doc_type} onChange={(e) => setForm({ ...form, doc_type: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none">
              {docTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">URL</label>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Notes</label>
            <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
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
      ) : documents.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucun document</div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left px-4 py-3 font-medium">Titre</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">URL</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {documents.map((doc) => (
                <tr key={doc.id} className="text-slate-300 hover:bg-slate-700/50">
                  <td className="px-4 py-3 font-medium">{doc.title}</td>
                  <td className="px-4 py-3">
                    <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded capitalize">{doc.doc_type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block max-w-48">{doc.url}</a>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{new Date(doc.created_at).toLocaleDateString('fr-CA')}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(doc)} className="text-wood hover:text-wood-light text-xs">Modifier</button>
                    <button onClick={() => handleDelete(doc.id)} className="text-red-400 hover:text-red-300 text-xs">Supprimer</button>
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
