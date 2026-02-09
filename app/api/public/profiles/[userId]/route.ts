import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = await createClient()
  const userId = (await params).userId

  // Get user's public profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, full_name, bio, avatar_url, created_at')
    .eq('id', userId)
    .single()

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  // Get user's public credentials (those they've shared)
  const { data: credentials, error: credError } = await supabase
    .from('credentials')
    .select(
      'id, title, description, credential_type, created_at, blockchain_verified, blockchain_hash',
    )
    .eq('user_id', userId)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (credError) {
    return NextResponse.json({ error: 'Failed to fetch credentials' }, { status: 500 })
  }

  return NextResponse.json({
    profile,
    credentials,
  })
}
