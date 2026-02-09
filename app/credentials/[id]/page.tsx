'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js' // Import createClient from supabase-js

interface Credential {
  id: string
  title: string
  description: string
  credential_type: string
  created_at: string
  blockchain_hash?: string
  blockchain_verified?: boolean
  metadata?: Record<string, any>
}

export default function CredentialDetailPage() {
  const [credential, setCredential] = useState<Credential | null>(null)
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [shareCode, setShareCode] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const credentialId = params.id as string

  useEffect(() => {
    // Demo mode - load mock credential
    const mockCredential: Credential = {
      id: credentialId as string,
      title: 'University Degree',
      description: 'Bachelor of Science in Computer Science',
      credential_type: 'education',
      created_at: new Date().toISOString(),
      blockchain_hash: '0x1234567890abcdef',
      blockchain_verified: true,
    }
    setCredential(mockCredential)
    setLoading(false)
  }, [credentialId])

  const handleVerify = async () => {
    setVerifying(true)
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCredential(prev => prev ? { ...prev, blockchain_verified: true } : null)
    } catch (error) {
      alert('Failed to verify credential')
    } finally {
      setVerifying(false)
    }
  }

  const handleShare = () => {
    const code = `SHARE_${credentialId.substring(0, 8).toUpperCase()}_${Date.now().toString(16).toUpperCase()}`
    setShareCode(code)
  }

  const handleLogout = async () => {
    const supabase = createClient('your-supabase-url', 'your-supabase-key') // Declare createClient with appropriate arguments
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
        <header className="bg-white shadow-sm border-b-2 border-[hsl(var(--primary))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/dashboard">
              <h1 className="text-3xl font-bold text-[hsl(var(--primary))] cursor-pointer hover:opacity-80">
                VeriCred
              </h1>
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--primary))]"></div>
        </div>
      </div>
    )
  }

  if (!credential) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
        <header className="bg-white shadow-sm border-b-2 border-[hsl(var(--primary))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/dashboard">
              <h1 className="text-3xl font-bold text-[hsl(var(--primary))] cursor-pointer hover:opacity-80">
                VeriCred
              </h1>
            </Link>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="border-2 border-[hsl(var(--destructive))]">
            <CardContent className="pt-6">
              <p className="text-destructive font-semibold mb-4">Credential not found</p>
              <Link href="/credentials">
                <Button className="bg-[hsl(var(--primary))] text-white hover:opacity-90 rounded-lg">
                  Back to Credentials
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <h1 className="text-3xl font-bold text-[hsl(var(--primary))] cursor-pointer hover:opacity-80">
                VeriCred
              </h1>
            </Link>
            <Button
              onClick={handleLogout}
              className="bg-[hsl(var(--destructive))] text-white hover:opacity-90 rounded-lg font-semibold"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/credentials" className="text-[hsl(var(--primary))] hover:underline mb-4 block">
          ← Back to Credentials
        </Link>

        <Card className="border-2 border-[hsl(var(--primary))] mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-4xl font-bold text-[hsl(var(--primary))]">{credential.title}</CardTitle>
                <CardDescription className="text-lg mt-2">{credential.description}</CardDescription>
              </div>
              <span className="bg-[hsl(var(--secondary))] text-white px-4 py-2 rounded-full font-semibold">
                {credential.credential_type}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Created</h3>
                <p className="text-muted-foreground">{new Date(credential.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Status</h3>
                <div className="flex items-center gap-2">
                  {credential.blockchain_verified ? (
                    <>
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-semibold">Verified on Blockchain</span>
                    </>
                  ) : (
                    <>
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                      <span className="text-yellow-600 font-semibold">Pending Verification</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {credential.blockchain_hash && (
              <div className="bg-gradient-to-r from-[hsl(var(--secondary))]/10 to-[hsl(var(--accent))]/10 p-4 rounded-lg border border-[hsl(var(--secondary))]">
                <h3 className="font-semibold text-foreground mb-2">Blockchain Hash</h3>
                <p className="text-sm text-muted-foreground font-mono break-all">{credential.blockchain_hash}</p>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              {!credential.blockchain_verified && (
                <Button
                  onClick={handleVerify}
                  disabled={verifying}
                  className="bg-[hsl(var(--secondary))] text-white hover:opacity-90 rounded-lg font-semibold px-6"
                >
                  {verifying ? 'Verifying...' : 'Verify on Blockchain'}
                </Button>
              )}
              <Button
                onClick={handleShare}
                className="bg-[hsl(var(--primary))] text-white hover:opacity-90 rounded-lg font-semibold px-6"
              >
                Share Credential
              </Button>
              <Link href="/credentials">
                <Button className="bg-muted text-foreground hover:opacity-90 rounded-lg font-semibold px-6 border-2 border-[hsl(var(--primary))]">
                  Back to List
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {shareCode && (
          <Card className="border-2 border-[hsl(var(--secondary))]">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--secondary))]">Share Code Generated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">Share this code with others to verify your credential:</p>
              <div className="bg-[hsl(var(--secondary))]/10 p-4 rounded-lg border-2 border-[hsl(var(--secondary))]">
                <p className="text-2xl font-bold text-center text-[hsl(var(--secondary))] tracking-widest">{shareCode}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(shareCode)}
                className="text-[hsl(var(--secondary))] hover:underline font-semibold"
              >
                Copy to clipboard
              </button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
