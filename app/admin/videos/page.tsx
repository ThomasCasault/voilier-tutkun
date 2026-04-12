'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { YoutubeVideo } from '@/lib/types'

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return match ? match[1] : null
}

const emptyForm = { title: '', url: '', description: '' }

export default function VideosPage() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)

  const supabase = createClient()

  async function fetchVideos() {
    const { data } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('created_at', { ascending: false })
    setVideos(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchVideos() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      title: form.title,
      url: form.url,
      description: form.description || null,
    }

    if (editId) {
      await supabase.from('youtube_videos').update(payload).eq('id', editId)
    } else {
      await supabase.from('youtube_videos').insert(payload)
    }

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    fetchVideos()
  }

  function handleEdit(video: YoutubeVideo) {
    setForm({
      title: video.title,
      url: video.url,
      description: video.description ?? '',
    })
    setEditId(video.id)
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette vidéo ?')) return
    await supabase.from('youtube_videos').delete().eq('id', id)
    fetchVideos()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Vidéos YouTube</h1>
        <button
          onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null) }}
          className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Titre</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="Ex: Norwalk Island Sharpie 26 — Sailing Review" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">URL YouTube</label>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="https://www.youtube.com/watch?v=..." />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Description (optionnel)</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:border-wood focus:outline-none" placeholder="Pourquoi cette vidéo est pertinente..." />
          </div>
          <button type="submit" className="bg-wood hover:bg-wood-light text-navy-dark font-bold px-6 py-2 rounded-lg text-sm transition-colors">
            {editId ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-slate-400">Chargement...</div>
      ) : videos.length === 0 ? (
        <div className="text-slate-400 text-center py-12">Aucune vidéo</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((v) => {
            const ytId = getYoutubeId(v.url)
            return (
              <div key={v.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                {ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                ) : (
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="block w-full aspect-video bg-slate-900 flex items-center justify-center text-blue-400 hover:underline">
                    Ouvrir la vidéo
                  </a>
                )}
                <div className="p-4">
                  <h3 className="text-slate-100 font-medium">{v.title}</h3>
                  {v.description && <p className="text-slate-400 text-sm mt-1">{v.description}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-slate-500 text-xs">{new Date(v.created_at).toLocaleDateString('fr-CA')}</span>
                    <div className="space-x-2">
                      <button onClick={() => handleEdit(v)} className="text-wood hover:text-wood-light text-xs">Modifier</button>
                      <button onClick={() => handleDelete(v.id)} className="text-red-400 hover:text-red-300 text-xs">Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
