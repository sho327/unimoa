"use client"
// Modules
import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

export default function ClientMainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

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
          </div>
          <div className="flex items-center gap-2">
            <NotificationDropdown 
              notifications={[]}
              unreadCount={3}
              onMarkAsRead={() => {}}
              onMarkAllAsRead={() => {}}
              />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size="sm" className="hover:bg-primary/10 hover:text-gray-700">
                  {/* <User className="size-5 mr-2" /> */}
                  <Avatar className="w-7.5 h-7.5 mr-1">
                    <AvatarImage src={''} alt={`${''} icon`} />
                    <AvatarFallback className="text-sm font-medium bg-secondary">
                      サ
                    </AvatarFallback>
                  </Avatar>
                  サンプルユーザ1
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                {/* <DropdownMenuLabel>マイアカウント</DropdownMenuLabel> */}
                  <div className="flex flex-col space-y-2 py-1 px-0.5">
                      <p className="text-sm font-medium leading-none">サンプルユーザ1</p>
                      <div className="flex items-center space-x-2">
                      {/* 入れるか検討中 */}
                      {/* <p className="text-xs leading-none text-muted-foreground">⭐ レベル 50</p>
                      <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          👑 Premium
                      </Badge> */}
                      </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-gray-700">
                  <Link href="/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    プロフィール
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-gray-700">
                  <Link href="#" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    ログアウト
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  チーム選択に戻る
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        { children }
      </main>
    </div>
  )
}
