// Types Supabase pour les tables du projet

export interface Listing {
  id: string
  platform: string
  url: string | null
  status: 'active' | 'expired' | 'to_renew' | 'draft' | 'planned'
  published_at: string | null
  expires_at: string | null
  notes: string | null
  username: string | null
  password: string | null
  created_at: string
}

export interface Inquiry {
  id: string
  contact_name: string
  channel: string
  offer_amount: number | null
  status: 'new' | 'in_discussion' | 'refused' | 'follow_up' | 'accepted'
  notes: string | null
  contacted_at: string
  created_at: string
}

export interface PricingHistory {
  id: string
  price: number
  floor_price: number | null
  note: string | null
  effective_at: string
  created_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
  created_at: string
}

export interface Document {
  id: string
  title: string
  doc_type: string
  url: string
  notes: string | null
  created_at: string
}

export interface ActivityLog {
  id: string
  category: string
  text: string
  created_at: string
}

export interface YoutubeVideo {
  id: string
  title: string
  url: string
  description: string | null
  created_at: string
}
