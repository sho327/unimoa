'use client'
// Modules
import type React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
// Constants
import { appInfo } from '@/constants'

export default function ClientMainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    return (
        <div className="from-background to-secondary/20 flex min-h-screen items-center justify-center bg-gradient-to-b p-4">
            <div className="w-full max-w-md space-y-6">
                {/* ロゴ */}
                <Link href="/home" className="flex items-center justify-center gap-2">
                    <div className="bg-primary flex h-11 w-11 items-center justify-center rounded-xl">
                        <CheckCircle className="text-primary-foreground h-7 w-7" />
                    </div>
                    <span className="text-foreground text-3xl font-bold">{appInfo.APP_NAME}</span>
                </Link>

                {children}
            </div>
        </div>
    )
}
