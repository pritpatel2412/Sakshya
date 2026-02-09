import { createClient } from '@/lib/supabase/server'
import { createBlockchainVerification } from '@/lib/blockchain'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const credentialId = (await params).id

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: credential, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('id', credentialId)
    .eq('user_id', user.id)
    .single()

  if (error || !credential) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 })
  }

  return NextResponse.json({ credential })
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const credentialId = (await params).id

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: credential, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('id', credentialId)
    .eq('user_id', user.id)
    .single()

  if (error || !credential) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 })
  }

  // Create blockchain verification
  const verification = await createBlockchainVerification(credentialId, user.id)

  // Update credential with verification
  const { data: updated, error: updateError } = await supabase
    .from('credentials')
    .update({
      blockchain_hash: verification.hash,
      blockchain_verified: true,
    })
    .eq('id', credentialId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ verification, credential: updated })
}
