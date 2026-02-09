'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent))]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-[hsl(var(--primary))] bg-transparent">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border-2 border-[hsl(var(--primary))] p-8 md:p-12">
          <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-8">Cookie Policy</h1>
          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">1. What Are Cookies?</h2>
              <p>Cookies are small pieces of data stored on your device when you visit our website. They help us remember your preferences and improve your browsing experience.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">2. Types of Cookies We Use</h2>
              <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mt-4 mb-2">Essential Cookies:</h3>
              <p>These cookies are necessary for the website to function properly and cannot be disabled. They are used for authentication and security.</p>
              
              <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mt-4 mb-2">Analytics Cookies:</h3>
              <p>These cookies help us understand how visitors interact with our website so we can improve it.</p>
              
              <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mt-4 mb-2">Preference Cookies:</h3>
              <p>These cookies remember your choices and preferences to personalize your experience.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">3. Third-Party Cookies</h2>
              <p>We may use third-party services that place cookies on your device for analytics, advertising, and other purposes. You can control these through your browser settings.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">4. Your Cookie Choices</h2>
              <p>You can control cookies through your browser settings. You can:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accept or reject cookies</li>
                <li>Delete existing cookies</li>
                <li>Set your browser to refuse cookies</li>
              </ul>
              <p className="mt-4">Please note that disabling essential cookies may affect the functionality of our website.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">5. Cookie Retention</h2>
              <p>Cookies are typically retained for different periods depending on their type:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Session cookies: Deleted when you close your browser</li>
                <li>Persistent cookies: Retained for up to 2 years</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">6. Updates to This Policy</h2>
              <p>We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the new policy on our website.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">7. Contact Us</h2>
              <p>If you have questions about our cookie usage, please contact us at: privacy@vericred.com</p>
            </div>

            <div className="pt-8 border-t border-gray-300">
              <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
