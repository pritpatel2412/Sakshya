'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-[hsl(var(--secondary))]">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[hsl(var(--primary))]">Account Created!</CardTitle>
          <CardDescription className="text-base mt-2">
            Check your email to confirm your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground text-center">
            We've sent a confirmation link to your email address. Please click it to verify your account and start using Sakshya.
          </p>

          <div className="pt-4 space-y-3">
            <Link href="/auth/login">
              <Button className="w-full h-12 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:opacity-90">
                Return to Login
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full h-12 border-2 border-[hsl(var(--primary))] bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Didn't receive the email? Check your spam folder or contact support@vericred.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
