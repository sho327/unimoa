'use client'
// Modules
import type React from 'react'
import Link from 'next/link'
import { useRouter, useParams, usePathname } from 'next/navigation'
import {
    Sparkles,
    User,
    LogOut,
    Building2,
    ChevronDown,
    Plus,
    Crown,
    Check,
    Users,
    CheckCircle,
} from 'lucide-react'
// UI/Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
// Layout/Components
import { NotificationDropdown } from '@/components/layout/notification-dropdown'
import { UserMenuDropdown } from '@/components/layout/user-menu-dropdown'
// Types
import type { Team, NavItem } from '@/components/layout/types'
// Types
import { useMount } from '@/hooks/use-mount'

/**
 * メインレイアウトコンポーネント(クライアントコンポーネント)
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default function ClientMainLayout({ children }: { children: React.ReactNode }) {
    // ============================================================================
    // 変数（Constant Management）
    // ============================================================================
    // Constants: 変数
    // - router  : ルーター
    // - pathname: 現在のパス名
    const router = useRouter()
    const pathname = usePathname()

    useMount(() => {
        console.log('Tasrepoを起動しました 🚀')
    })
    // チームIDがあるか判定
    // const teamId = params.teamId as string | undefined
    const teamId = '1'

    // チーム情報やナビはteamIdがある時だけセット
    const team: Team | null = teamId
        ? { id: teamId, name: 'チーム名が入ります', emoji: '✨' }
        : null
    const navItems: NavItem[] = teamId
        ? [
              { href: `/home`, label: 'ホーム', icon: require('lucide-react').Home },
              { href: `/tasks`, label: 'タスク', icon: require('lucide-react').CheckCircle },
              { href: `/reports`, label: '日報', icon: require('lucide-react').FileText },
              // { href: `/calendar`, label: "カレンダー", icon: require("lucide-react").Calendar },
              // { href: `/files`, label: "ファイル", icon: require("lucide-react").FolderOpen },
              { href: `/members`, label: 'メンバー', icon: require('lucide-react').Users },
              { href: `/settings`, label: '設定', icon: require('lucide-react').Settings },
          ]
        : []

    const handleLogout = () => {
        router.push('/teams')
    }
    const groups = [
        { id: '1', name: '個人グループ', description: '個人用グループ', role: 'owner' },
        { id: '2', name: 'Unimoa開発', description: 'Unimoa開発', role: 'admin' },
        // { id: "3", name: "マーケティング", description: "マーケティング部門", role: "member" },
    ]
    // ============================================================================
    // テンプレート（コンポーネント描画処理）
    // ============================================================================
    return (
        <div className="bg-background min-h-screen">
            <header className="bg-card sticky top-0 z-50 h-[58px] border-b shadow-xs">
                <div className="container mx-auto flex h-full items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <Link href="/teams" className="flex items-center gap-2.5">
                            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
                                <CheckCircle className="text-primary-foreground h-5 w-5" />
                            </div>
                            <span className="text-foreground text-xl font-bold">Tasrepo</span>
                        </Link>
                        {/* チーム名はteamIdがある時だけ表示 */}
                        {/* {team && (
              <>
                <div className="hidden md:block h-4 w-px bg-gray-300 mx-2" />
                <span className="hidden md:inline font-semibold text-foreground text-sm">{team.name}</span>
              </>
            )} */}
                        <div className="mx-2 hidden h-4 w-px bg-gray-300 md:block" />
                        {/* グループ選択 */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-between rounded-lg border-gray-200 bg-white hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-600" />
                                        <span className="truncate text-gray-700">
                                            {/* {currentOrg.name} */}
                                            {groups[0].name}
                                        </span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 rounded-xl border-gray-200"
                                align="start"
                            >
                                <DropdownMenuLabel className="text-gray-700">
                                    グループを選択
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {groups.map((group) => (
                                    <DropdownMenuItem
                                        key={group.id}
                                        onClick={() => {
                                            // handleOrgSelect(org)
                                        }}
                                        className="flex cursor-pointer items-center justify-between rounded-lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {group.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {group.role}
                                                </p>
                                            </div>
                                        </div>
                                        {/* {currentOrg.id === org.id && <Check className="w-4 h-4 text-emerald-600" />} */}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    asChild
                                    // disabled={!canCreateMoreOrgs}
                                >
                                    <Link
                                        href="/organizations?action=create"
                                        className="flex items-center gap-2 rounded-lg"
                                        onClick={() => {
                                            // スマホの場合のみサイドバーを閉じる
                                            // if (isMobile) {
                                            //   setOpenMobile(false)
                                            // }
                                        }}
                                    >
                                        <Plus className="h-4 w-4 text-emerald-600" />
                                        <span>新しいグループを作成</span>
                                        {/* {!user.isPremium && organizations.length >= 1 && <Crown className="w-3 h-3 text-amber-500 ml-auto" />} */}
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
            {/* {teamId && ( */}
            <nav className="border-border bg-card/80 sticky top-[58px] z-40 hidden border-b backdrop-blur-sm md:block">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex items-center gap-1 overflow-x-auto py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={isActive ? 'default' : 'ghost'}
                                        size="sm"
                                        className={`rounded-lg whitespace-nowrap ${isActive ? 'shadow-sm' : 'hover:bg-primary/10 hover:text-gray-700'}`}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
            {/* )} */}
            <main className="container mx-auto px-6 py-8">{children}</main>
        </div>
    )
}
