'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!email || !password) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Store user in localStorage (demo mode)
      localStorage.setItem('vericred_user', JSON.stringify({ email, loggedInAt: new Date() }))
      router.push('/dashboard')
    } catch (err) {
      setError('An error occurred during login')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-[hsl(var(--primary))]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[hsl(var(--primary))]">VeriCred</CardTitle>
          <CardDescription className="text-base mt-2">Sign in to your credential vault</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-[hsl(var(--primary))] rounded-lg focus:border-[hsl(var(--secondary))]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-[hsl(var(--primary))] rounded-lg focus:border-[hsl(var(--secondary))]"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="text-[hsl(var(--primary))] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
