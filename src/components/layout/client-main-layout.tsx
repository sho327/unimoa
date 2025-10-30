"use client"
// Modules
import type React from "react"
import Link from "next/link"
import { useRouter, useParams, usePathname } from "next/navigation"
import { Sparkles, User, LogOut } from "lucide-react"
// UI/Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
// Layout/Components
import { NotificationDropdown } from "@/components/layout/notification-dropdown"
import type { Team, NavItem } from "@/components/layout/types"
import { UserMenuDropdown } from "@/components/layout/user-menu-dropdown"

export default function ClientMainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  // チームIDがあるか判定
  const teamId = params.teamId as string | undefined

  // チーム情報やナビはteamIdがある時だけセット
  const team: Team | null = teamId ? { id: teamId, name: "チーム名が入ります", emoji: "✨" } : null
  const navItems: NavItem[] = teamId
    ? [
        { href: `/team/${teamId}`, label: "ホーム", icon: require("lucide-react").Home },
        { href: `/team/${teamId}/tasks`, label: "タスク", icon: require("lucide-react").CheckSquare },
        { href: `/team/${teamId}/notes`, label: "ノート", icon: require("lucide-react").FileText },
        { href: `/team/${teamId}/calendar`, label: "カレンダー", icon: require("lucide-react").Calendar },
        { href: `/team/${teamId}/files`, label: "ファイル", icon: require("lucide-react").FolderOpen },
        { href: `/team/${teamId}/members`, label: "メンバー", icon: require("lucide-react").Users },
        { href: `/team/${teamId}/settings`, label: "設定", icon: require("lucide-react").Settings },
      ]
    : []

  const handleLogout = () => {
    router.push("/teams")
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/teams" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Unimoa</span>
            </Link>
            {/* チーム名はteamIdがある時だけ表示 */}
            {team && (
              <>
                <div className="hidden md:block h-4 w-px bg-gray-300 mx-2" />
                <span className="hidden md:inline font-semibold text-foreground text-sm">{team.name}</span>
              </>
            )}
          </div>
          {/* 右側: ユーザーメニュー、通知など今後共通化予定 */}
          <div className="flex items-center gap-2">
            <NotificationDropdown 
                notifications={[]}
                unreadCount={3}
                onMarkAsRead={() => {}}
                onMarkAllAsRead={() => {}}
                />
            <UserMenuDropdown userName="サンプルユーザ1" onLogout={handleLogout} />
          </div>
        </div>
      </header>
      {/* ヘッダー下ナビもteamIdある時のみ表示 */}
      {teamId && (
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
                      className={`rounded-lg whitespace-nowrap ${isActive ? "shadow-sm" : "hover:bg-primary/10 hover:text-gray-700"}`}
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
      )}
      <main className="container mx-auto px-6 py-8">
        { children }
      </main>
    </div>
  )
}
