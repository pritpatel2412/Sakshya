'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-[hsl(var(--primary))] mb-8">Privacy Policy</h1>
          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">1. Introduction</h2>
              <p>Sakshya ("we", "our", or "us") operates the Sakshya website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">2. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Email address, password, name, and other account information</li>
                <li><strong>Credential Data:</strong> Documents and credentials you upload for verification</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visit</li>
                <li><strong>Cookie Data:</strong> Session identifiers and preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">3. Use of Data</h2>
              <p>Sakshya uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">4. Security of Data</h2>
              <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">5. Data Retention</h2>
              <p>We will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: privacy@vericred.com</p>
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
