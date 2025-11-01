"use client"
// Modules
import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function ClientMainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* ロゴ */}
        <Link href="/home" className="flex items-center justify-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">Tasrepo</span>
        </Link>

        { children }
      </div>
    </div>
  )
}
