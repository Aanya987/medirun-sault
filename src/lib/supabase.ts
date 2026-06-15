import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Type Definitions for MediRun Tables ────────────────────────────────────

export type UserProfile = {
  id: string                  // UUID, matches auth.users.id
  full_name: string
  email: string
  phone: string | null
  address: string | null
  role: 'customer' | 'rider' | 'partner' | 'admin'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Product = {
  id: string                  // UUID
  name: string
  description: string | null
  category: 'wheelchair' | 'oxygen' | 'monitor' | 'mobility' | 'diagnostic' | 'other'
  price_buy: number | null    // purchase price in INR
  price_rent_daily: number | null  // daily rental price in INR
  stock_quantity: number
  image_url: string | null
  partner_id: string | null   // references users.id (partner store)
  is_available: boolean
  created_at: string
  updated_at: string
}

export type Order = {
  id: string                  // UUID
  order_number: string        // human-readable e.g. MR-20240601-001
  customer_id: string         // references users.id
  rider_id: string | null     // references riders.id
  product_id: string          // references products.id
  order_type: 'buy' | 'rent'
  rental_days: number | null
  quantity: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled'
  delivery_address: string
  delivery_lat: number | null
  delivery_lng: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type Rider = {
  id: string                  // UUID
  user_id: string             // references users.id
  full_name: string
  phone: string
  vehicle_type: 'bike' | 'scooter' | 'van'
  vehicle_number: string
  is_available: boolean
  current_lat: number | null
  current_lng: number | null
  total_deliveries: number
  rating: number | null       // 0.0 – 5.0
  created_at: string
  updated_at: string
}
