'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
    description?: string
    trend?: string
    color?: string
}

export function StatsCard({ title, value, icon, description, trend, color = "text-primary" }: StatsCardProps) {
    return (
        <Card className="backdrop-blur-xl bg-white/40 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300", color.replace('text-', 'bg-'))} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {title}
                </CardTitle>
                <div className={cn("p-2 rounded-full bg-white/50 backdrop-blur-sm", color)}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    {value}
                </div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                        {trend && <span className="text-green-600 font-semibold">{trend}</span>}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
