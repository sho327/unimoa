"use client"
// Modules
import type React from "react"
import { useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Home, CheckSquare, FileText, Calendar, FolderOpen, Settings, Users, User, Menu } from "lucide-react"
// UI/Components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Mock team data
const mockTeams: Record<string, { name: string; emoji: string }> = {
  "1": { name: "デザインチーム", emoji: "🎨" },
  "2": { name: "開発チーム", emoji: "💻" },
  "3": { name: "マーケティング", emoji: "📢" },
}

export default function ClientMainTeamLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const teamId = params.teamId as string
  const team = mockTeams[teamId] || { name: "チーム", emoji: "✨" }

  const navItems = [
    { href: `/team/${teamId}`, label: "ホーム", icon: Home },
    { href: `/team/${teamId}/tasks`, label: "タスク", icon: CheckSquare },
    { href: `/team/${teamId}/notes`, label: "ノート", icon: FileText },
    { href: `/team/${teamId}/calendar`, label: "カレンダー", icon: Calendar },
    { href: `/team/${teamId}/files`, label: "ファイル", icon: FolderOpen },
    { href: `/team/${teamId}/members`, label: "メンバー", icon: Users },
    { href: `/team/${teamId}/settings`, label: "設定", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* モバイル用メニュー */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-lg hover:bg-accent">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{team.emoji}</span>
                      <span className="font-semibold text-foreground text-lg">{team.name}</span>
                    </div>
                  </div>
                  <nav className="flex-1 p-3">
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              className={`w-full justify-start rounded-lg ${isActive ? "shadow-sm" : ""}`}
                            >
                              <Icon className="w-4 h-4 mr-3" />
                              {item.label}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* PC用メニュー */}
            <Link href="/teams" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Unimoa</span>
            </Link>
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-accent/50 rounded-lg border border-border">
              <span className="text-2xl">{team.emoji}</span>
              <span className="font-medium text-foreground text-sm">{team.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-lg hover:bg-accent">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="rounded-lg hidden md:inline-flex hover:bg-accent text-sm"
              onClick={() => router.push("/teams")}
            >
              チーム切替
            </Button>
          </div>
        </div>
      </header>

      {/* タブレット以上の場合、ヘッダー下部に表示/ナビゲーション */}
      <nav className="hidden md:block border-b border-border bg-card/80 backdrop-blur-sm sticky top-[57px] z-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`rounded-lg whitespace-nowrap ${isActive ? "shadow-sm" : ""}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main 
        className="container mx-auto px-4 lg:px-6 py-6 lg:py-8"
        >
          {children}
      </main>
    </div>
  )
}
