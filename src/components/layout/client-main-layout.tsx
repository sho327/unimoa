"use client"
// Modules
import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, User } from "lucide-react"
// UI/Modules
import { Button } from "@/components/ui/button"

export default function ClientMainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Unimoa</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-sm">
                <User className="w-4 h-4 mr-1.5" />
                プロフィール
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-sm" onClick={() => router.push("/")}>
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        { children }
      </main>
    </div>
  )
}
