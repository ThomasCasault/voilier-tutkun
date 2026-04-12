'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    activeListings: 0,
    pendingInquiries: 0,
    currentPrice: 0,
    lastActivity: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()

      const [listings, inquiries, pricing, activity] = await Promise.all([
        supabase.from('listings').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('inquiries').select('id', { count: 'exact' }).in('status', ['new', 'in_discussion', 'follow_up']),
        supabase.from('pricing_history').select('price').order('effective_at', { ascending: false }).limit(1),
        supabase.from('activity_log').select('created_at').order('created_at', { ascending: false }).limit(1),
      ])

      setStats({
        activeListings: listings.count ?? 0,
        pendingInquiries: inquiries.count ?? 0,
        currentPrice: pricing.data?.[0]?.price ?? 29900,
        lastActivity: activity.data?.[0]?.created_at
          ? new Date(activity.data[0].created_at).toLocaleDateString('fr-CA')
          : 'Aucune',
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  const cards = [
    { label: 'Annonces actives', value: stats.activeListings, color: 'text-green-400' },
    { label: 'Demandes en cours', value: stats.pendingInquiries, color: 'text-blue-400' },
    { label: 'Prix actuel', value: `${stats.currentPrice.toLocaleString('fr-CA')} $`, color: 'text-wood' },
    { label: 'Dernière activité', value: stats.lastActivity, color: 'text-slate-300' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Chargement...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
