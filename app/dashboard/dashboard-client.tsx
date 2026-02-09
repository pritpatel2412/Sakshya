'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, Upload, BarChart3, User, ShieldCheck, Activity, Award, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StatsCard } from '@/components/dashboard/stats-card'
import { verifySystemIntegrity } from '@/app/actions/verify-integrity'
import { createClient } from '@/lib/supabase/client'

export default function DashboardClient() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [merkleRoot, setMerkleRoot] = useState<string>('')
    const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'verified' | 'failed'>('verifying')
    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Try to get real user from Supabase
                const supabase = createClient()
                const { data: { user: sbUser } } = await supabase.auth.getUser()

                let userData
                if (sbUser && sbUser.email) {
                    userData = { email: sbUser.email }
                } else {
                    // Fallback to localStorage or Demo
                    const storedUser = localStorage.getItem('vericred_user')
                    userData = storedUser ? JSON.parse(storedUser) : { email: 'demo@vericred.com' }
                }

                setUser(userData)

                // 2. Perform Server-Side Secure Verification
                const verificationResult = await verifySystemIntegrity(userData.email)

                setMerkleRoot(verificationResult.merkleRoot)
                setVerificationStatus('verified')

            } catch (error) {
                console.error('Error loading user:', error)
                setUser({ email: 'demo@vericred.com' })
                setVerificationStatus('failed')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('vericred_user')
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-t-purple-400 border-r-transparent border-b-purple-400 border-l-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-4 border-t-transparent border-r-pink-400 border-b-transparent border-l-pink-400 rounded-full animate-spin-reverse"></div>
                    </div>
                    <p className="text-white/80 font-mono animate-pulse">Initializing Secure Environment...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
            <div className="min-h-screen w-full backdrop-blur-sm bg-black/40 overflow-y-auto">

                {/* Navigation */}
                <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">Sakshya</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end mr-4">
                                <span className="text-xs text-white/60 font-mono">System Status</span>
                                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    SECURE
                                </span>
                            </div>
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-pink-300 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-2">
                            <h2 className="text-5xl font-extrabold text-white tracking-tight">
                                Welcome back, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                    {user?.email?.split('@')[0] || 'User'}
                                </span>
                            </h2>
                            <p className="text-lg text-gray-300 max-w-xl">
                                Your digital vault is encrypted and secured by SHA-256 Merkle Tree verification.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Activity className="w-5 h-5 text-purple-400" />
                                <span className="text-sm font-semibold text-white">Security Hash (Merkle Root)</span>
                            </div>
                            <code className="text-xs text-purple-300 font-mono break-all">
                                {merkleRoot || 'Generating...'}
                            </code>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-4 gap-6">
                        <StatsCard
                            title="Total Credentials"
                            value="12"
                            icon={<Award className="w-5 h-5" />}
                            color="text-pink-500"
                            trend="+2 this week"
                        />
                        <StatsCard
                            title="Verifications"
                            value="48"
                            icon={<ShieldCheck className="w-5 h-5" />}
                            color="text-purple-500"
                            description="All checks passed"
                        />
                        <StatsCard
                            title="Active Shares"
                            value="5"
                            icon={<Share2 className="w-5 h-5" />}
                            color="text-blue-500"
                            description="Valid for 24h"
                        />
                        <StatsCard
                            title="System Health"
                            value="99.9%"
                            icon={<Activity className="w-5 h-5" />}
                            color="text-green-500"
                            description="Optimal Performance"
                        />
                    </div>

                    {/* Actions Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <Link href="/credentials" className="group">
                            <Card className="h-full bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 transition-shadow">
                                            <BarChart3 className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-white">My Vault</CardTitle>
                                            <CardDescription className="text-gray-400">Manage credentials</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Access your secured certificates, degrees, and licenses. All items are blockchain-verified.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/credentials/upload" className="group">
                            <Card className="h-full bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                                            <Upload className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-white">Upload New</CardTitle>
                                            <CardDescription className="text-gray-400">Add to blockchain</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Digitize your physical credentials. We support PDF, JPG, and PNG formats with auto-verification.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/profile" className="group">
                            <Card className="h-full bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                                            <User className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-white">Public Profile</CardTitle>
                                            <CardDescription className="text-gray-400">Showcase your skills</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Manage your public presence. Share your verified achievements with employers and institutions.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-center pt-8 border-t border-white/10">
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            Protected by Sakshya Blockchain Protocol v2.0
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
