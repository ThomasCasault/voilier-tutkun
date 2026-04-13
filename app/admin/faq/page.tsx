'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { FAQ } from '@/lib/types'

const emptyForm = {
  question: '',
  answer: '',
  category: '',
  sort_order: '0',
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)

  const supabase = createClient()

  async function fetchFAQs() {
    const { data } = await supabase
      .from('faq')
      .select('*')
      .order('sort_order', { ascending: true })
    setFaqs(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchFAQs() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      question: form.question,
      answer: form.answer,
      category: form.category,
      sort_order: Number(form.sort_order),
    }

    if (editId) {
      await supabase.from('faq').update(payload).eq('id', editId)
    } else {
      await supabase.from('faq').insert(payload)
    }

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    fetchFAQs()
  }

  function handleEdit(faq: FAQ) {
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort_order: faq.sort_order.toString(),
    })
    setEditId(faq.id)
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette question ?')) return
    await supabase.from('faq').delete().eq('id', id)
    fetchFAQs()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">FAQ</h1>
        <button
          onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Catégorie</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="Général, Construction, Navigation..." />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Ordre</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Question</label>
            <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Réponse</label>
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required rows={3} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" />
          </div>
          <button type="submit" className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-6 py-2 rounded-lg text-sm transition-colors">
            {editId ? 'Sauvegarder les modifications' : 'Sauvegarder'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-slate-400">Chargement...</div>
      ) : faqs.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucune question</div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-navy/30 text-blue-300 text-xs px-2 py-0.5 rounded">{faq.category}</span>
                    <span className="text-slate-500 text-xs">#{faq.sort_order}</span>
                  </div>
                  <h3 className="text-slate-100 font-medium mb-2">{faq.question}</h3>
                  <p className="text-slate-400 text-sm">{faq.answer}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(faq)} className="text-wood hover:text-wood-light text-xs">Modifier</button>
                  <button onClick={() => handleDelete(faq.id)} className="text-red-400 hover:text-red-300 text-xs">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
