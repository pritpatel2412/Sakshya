'use client'

import React, { use } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function PublicProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
      <nav className="bg-white border-b-2 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-[hsl(var(--primary))] hover:opacity-80 cursor-pointer">Sakshya</h1>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-2 border-[hsl(var(--primary))]">
          <CardHeader>
            <CardTitle className="text-3xl text-[hsl(var(--primary))]">Public Profile</CardTitle>
            <CardDescription>Verified Credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--primary))] mb-2">User ID:</h3>
                <p className="text-muted-foreground font-mono">{userId}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--primary))] mb-4">Shared Credentials</h3>
                <div className="space-y-3">
                  <Card className="border border-gray-200">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground text-center">No credentials shared yet</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Link href="/">
                  <Button variant="outline" className="border-2 border-[hsl(var(--primary))] bg-transparent">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

