'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Trash2 } from 'lucide-react'
import { decryptCredential, type EncryptedCredential } from '@/lib/encryption'

interface DisplayCredential {
  id: string
  title: string
  description: string
  credentialType: string
  createdAt: string
}

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<DisplayCredential[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        // Load encrypted credentials from localStorage
        const storedEncrypted = localStorage.getItem('vericred_credentials')
        if (!storedEncrypted) {
          setCredentials([])
          setLoading(false)
          return
        }

        const encryptedCredentials: EncryptedCredential[] = JSON.parse(storedEncrypted)
        const decrypted: DisplayCredential[] = []

        // Decrypt each credential
        for (const encrypted of encryptedCredentials) {
          try {
            const decrypted_data = await decryptCredential(encrypted)
            decrypted.push({
              id: encrypted.id,
              title: encrypted.title,
              description: decrypted_data.description,
              credentialType: encrypted.credentialType,
              createdAt: encrypted.createdAt,
            })
          } catch (err) {
            console.error(`Failed to decrypt credential ${encrypted.id}:`, err)
          }
        }

        setCredentials(decrypted)
      } catch (err) {
        console.error('Error loading credentials:', err)
        setError('Failed to load credentials')
      } finally {
        setLoading(false)
      }
    }

    loadCredentials()
  }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this credential?')) return

    try {
      const storedEncrypted = localStorage.getItem('vericred_credentials')
      if (storedEncrypted) {
        const filtered = JSON.parse(storedEncrypted).filter((c: EncryptedCredential) => c.id !== id)
        localStorage.setItem('vericred_credentials', JSON.stringify(filtered))
        setCredentials(credentials.filter((c) => c.id !== id))
      }
    } catch (err) {
      console.error('Error deleting credential:', err)
      setError('Failed to delete credential')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/dashboard">
                <h1 className="text-3xl font-bold text-[hsl(var(--primary))] cursor-pointer hover:opacity-80">
                  Sakshya
                </h1>
              </Link>
              <nav className="flex gap-6">
                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-[hsl(var(--primary))] font-semibold transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/credentials"
                  className="text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))] font-semibold"
                >
                  Credentials
                </Link>
              </nav>
            </div>
            <Link href="/dashboard">
              <Button className="bg-[hsl(var(--destructive))] text-white hover:opacity-90 rounded-lg font-semibold">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-[hsl(var(--primary))]">Your Credentials</h2>
            <p className="text-muted-foreground mt-2">Securely encrypted and verified credentials</p>
          </div>
          <Link href="/credentials/upload">
            <Button className="bg-[hsl(var(--primary))] text-white hover:opacity-90 rounded-lg font-semibold px-6 py-3 text-lg">
              + Upload New
            </Button>
          </Link>
        </div>

        {error && (
          <Card className="mb-6 border-2 border-red-500 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700 font-semibold">{error}</p>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--primary))] mx-auto mb-4"></div>
            <p className="text-foreground font-semibold">Loading credentials...</p>
          </div>
        ) : credentials.length === 0 ? (
          <Card className="border-2 border-dashed border-[hsl(var(--primary))] bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Lock className="w-16 h-16 text-[hsl(var(--primary))] mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No credentials yet</h3>
              <p className="text-muted-foreground mb-6">Upload your first credential to get started</p>
              <Link href="/credentials/upload">
                <Button className="bg-[hsl(var(--secondary))] text-white hover:opacity-90 rounded-lg font-semibold">
                  Upload First Credential
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {credentials.map((credential) => (
              <Card
                key={credential.id}
                className="border-2 border-[hsl(var(--primary))] hover:shadow-lg transition-all cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <CardTitle className="text-xl text-[hsl(var(--primary))]">{credential.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-2 line-clamp-2">{credential.description}</CardDescription>
                    </div>
                    <span className="bg-[hsl(var(--secondary))] text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                      {credential.credentialType}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Added on {new Date(credential.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/credentials/${credential.id}`}>
                        <Button className="bg-[hsl(var(--secondary))] text-white hover:opacity-90 rounded-lg font-semibold">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(credential.id)}
                        className="bg-[hsl(var(--destructive))] text-white hover:opacity-90 rounded-lg font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
