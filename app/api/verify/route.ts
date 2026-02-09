import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { credentialId, status, notes } = body

  const { data: credential, error: credError } = await supabase
    .from('credentials')
    .select('user_id')
    .eq('id', credentialId)
    .single()

  if (credError || !credential) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 })
  }

  const { data: verification, error } = await supabase.from('verification_records').insert([
    {
      credential_id: credentialId,
      verifier_user_id: user.id,
      verification_status: status || 'verified',
      verification_notes: notes,
      verified_at: new Date().toISOString(),
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ verification }, { status: 201 })
}

export async function GET(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const credentialId = searchParams.get('credentialId')

  if (!credentialId) {
    return NextResponse.json({ error: 'credentialId required' }, { status: 400 })
  }

  const { data: verifications, error } = await supabase
    .from('verification_records')
    .select('*')
    .eq('credential_id', credentialId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ verifications })
}
