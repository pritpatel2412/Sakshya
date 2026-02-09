'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { LogOut, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  full_name: string
  bio: string
  public_profile_url: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      // Demo mode - load from localStorage
      try {
        const storedUser = localStorage.getItem('vericred_user')
        const user = storedUser ? JSON.parse(storedUser) : { email: 'demo@vericred.com', id: 'demo-user' }

        setProfile({
          id: user.id,
          email: user.email || '',
          full_name: fullName,
          bio: bio,
          public_profile_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${user.id}`,
        })
      } catch (err) {
        console.error('Error loading profile:', err)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--primary))]" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
      <header className="bg-white border-b-2 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Button variant="ghost" className="text-[hsl(var(--primary))]">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">My Profile</h1>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[hsl(var(--destructive))] text-white hover:opacity-90"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <Card className="border-2 border-[hsl(var(--primary))]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[hsl(var(--primary))]">Edit Profile</CardTitle>
            <CardDescription>Manage your public profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="border-2 border-muted bg-muted text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-semibold">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-2 border-[hsl(var(--primary))] rounded-lg focus:border-[hsl(var(--secondary))]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-semibold">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others about your credentials and achievements..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                  className="border-2 border-[hsl(var(--primary))] rounded-lg focus:border-[hsl(var(--secondary))] min-h-32 resize-none"
                />
                <p className="text-sm text-muted-foreground">{bio.length}/500 characters</p>
              </div>

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              {success && <p className="text-green-600 text-sm font-semibold">Profile updated successfully!</p>}

              <Button
                type="submit"
                disabled={saving}
                className="w-full h-12 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {profile && (
          <Card className="mt-8 border-2 border-[hsl(var(--secondary))]">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--secondary))]">Public Profile URL</CardTitle>
              <CardDescription>Share this link with others to verify your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input
                  value={profile.public_profile_url}
                  readOnly
                  className="border-2 border-[hsl(var(--secondary))] bg-gray-50 font-mono text-sm"
                />
                <Button
                  onClick={() => navigator.clipboard.writeText(profile.public_profile_url)}
                  className="bg-[hsl(var(--secondary))] text-white hover:opacity-90 rounded-lg font-semibold"
                >
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
