'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, Lock, Share2, Zap } from 'lucide-react'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">VeriCred</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight text-foreground">
              Your Digital Credentials,
              <span className="text-primary"> Verified & Secure</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Store certificates, prove authenticity, and share credentials with recruiters and institutions using blockchain-backed verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/sign-up">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg w-full sm:w-auto">
                  Start for Free
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 rounded-full px-8 py-6 text-lg bg-transparent">
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image - Card Showcase */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-accent border-2 border-primary rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-primary rounded-full mb-4 flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">Secure Storage</p>
              <p className="text-xs text-muted-foreground mt-2">Encrypted & protected</p>
            </Card>
            <Card className="bg-accent border-2 border-secondary rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-secondary rounded-full mb-4 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-background" />
              </div>
              <p className="text-sm font-semibold text-foreground">Blockchain Verified</p>
              <p className="text-xs text-muted-foreground mt-2">Tamper-proof proof</p>
            </Card>
            <Card className="bg-accent border-2 border-primary rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-primary rounded-full mb-4 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">Easy Sharing</p>
              <p className="text-xs text-muted-foreground mt-2">Public or private links</p>
            </Card>
            <Card className="bg-accent border-2 border-secondary rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-secondary rounded-full mb-4 flex items-center justify-center">
                <Zap className="w-4 h-4 text-background" />
              </div>
              <p className="text-sm font-semibold text-foreground">Instant Verification</p>
              <p className="text-xs text-muted-foreground mt-2">In seconds, not days</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-t-2 border-border py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose VeriCred?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete solution for managing and verifying your digital credentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'You Own Your Data',
                description: 'Your credentials are stored securely. You control who sees them.',
                icon: Lock,
                accent: 'bg-primary',
              },
              {
                title: 'Blockchain Backed',
                description: 'Tamper-proof verification using Polygon blockchain technology.',
                icon: CheckCircle,
                accent: 'bg-secondary',
              },
              {
                title: 'Public Profiles',
                description: 'Create a professional profile to showcase your verified achievements.',
                icon: Share2,
                accent: 'bg-accent',
              },
            ].map((feature, idx) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={idx}
                  className="border-2 border-border bg-background hover:border-primary hover:shadow-lg transition-all rounded-2xl p-8 text-center"
                >
                  <div
                    className={`w-16 h-16 ${feature.accent} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${
                        feature.accent === 'bg-accent' ? 'text-foreground' : 'text-background'
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '1',
              title: 'Upload',
              description: 'Upload your certificate files securely to your vault',
            },
            {
              step: '2',
              title: 'Hash',
              description: 'Our system generates a unique cryptographic hash',
            },
            {
              step: '3',
              title: 'Record',
              description: 'The hash is stored permanently on the blockchain',
            },
            {
              step: '4',
              title: 'Share',
              description: 'Generate shareable links or public profiles for verification',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20 rounded-3xl my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Secure Your Credentials?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals building their verified credential vault today.
          </p>
          <Link href="/auth/sign-up">
            <Button className="bg-primary-foreground text-primary hover:bg-accent rounded-full px-8 py-6 text-lg font-bold">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 VeriCred. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
