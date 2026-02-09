'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!agreedToTerms) {
      setError('You must agree to terms and privacy policy')
      setLoading(false)
      return
    }

    try {
      // Simulate signup delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // Store user in localStorage (demo mode)
      localStorage.setItem('vericred_user', JSON.stringify({ email, createdAt: new Date() }))
      router.push('/dashboard')
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-[hsl(var(--primary))]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[hsl(var(--primary))]">Sakshya</CardTitle>
          <CardDescription className="text-base mt-2">Create your credential vault account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-semibold">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-2 border-[hsl(var(--primary))] rounded-lg focus:border-[hsl(var(--secondary))]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                I agree to the{' '}
                <Link href="/legal/terms" className="text-[hsl(var(--primary))] hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/legal/privacy" className="text-[hsl(var(--primary))] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[hsl(var(--primary))] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
