'use client'
// Modules
import type React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams, usePathname } from 'next/navigation'
import {
    // Sparkles,
    // User,
    // LogOut,
    // Building2,
    ChevronDown,
    Plus,
    // Crown,
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
import { NotificationDropdown } from '@/components/layout/parts/notification-dropdown'
import { UserMenuDropdown } from '@/components/layout/parts/user-menu-dropdown'
// Types
import type { LayoutNavItem } from '@/types'
import type { Team } from '@/components/layout/types'
// Constants
import { appInfo, pageRoutes } from '@/constants'
// Store
import { useCommonStore } from '@/store/common'
import { useProfileWithGroupsStore } from '@/store/profile-with-group'
// Hooks
import { useMount } from '@/hooks/use-mount'
// Supabase
import type { ProfileWithGroups } from '@/lib/supabase/user-data'

type Props = {
    children: React.ReactNode
    profileWithGroups: ProfileWithGroups | null
}
/**
 * メインレイアウトコンポーネント(クライアントコンポーネント)
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default function ClientMainLayout({ children, profileWithGroups }: Props) {
    // ============================================================================
    // グローバル状態（GlobalState）
    // ============================================================================
    const { selectGroup, setSelectGroup } = useCommonStore()
    const { setProfileWithGroups } = useProfileWithGroupsStore()

    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    const router = useRouter()
    const pathname = usePathname()
    const navItems: LayoutNavItem[] = [
        { href: pageRoutes.MAIN.HOME, label: 'ホーム', icon: require('lucide-react').Home },
        {
            href: pageRoutes.MAIN.TASK.LIST,
            label: 'タスク',
            icon: require('lucide-react').CheckCircle,
        },
        {
            href: pageRoutes.MAIN.REPORT.LIST,
            label: '日報',
            icon: require('lucide-react').FileText,
        },
        { href: pageRoutes.MAIN.ME.SETTING, label: '設定', icon: require('lucide-react').Settings },
        // { href: `/calendar`, label: "カレンダー", icon: require("lucide-react").Calendar },
        // { href: `/files`, label: "ファイル", icon: require("lucide-react").FolderOpen },
        // { href: `/member`, label: 'メンバー', icon: require('lucide-react').Users },
    ]

    // ============================================================================
    // 初期描画時の処理（Mounted）
    // ============================================================================
    useMount(() => {
        /* 選択中グループの設定 */
        // 1. 所属グループ(メンバーシップ)が存在しない場合は null に設定し、早期リターン
        const memberships = profileWithGroups?.memberships
        if (!memberships || memberships.length === 0) {
            setSelectGroup(null)
            return
        }

        // 2. 個人グループのリストを取得 (頻繁に使うため変数化)
        const personalGroup = memberships.find((m) => m.groups.is_personal)?.groups || null

        // 3. 選択中グループの存在チェックと設定

        // 3A. selectGroup が未設定の場合: 個人グループを設定
        if (!selectGroup) {
            setSelectGroup(personalGroup)
            return
        }

        // 3B. selectGroup が設定済みだが、所属グループ内に存在しない場合: 個人グループに切り替え
        const isGroupExist = memberships.some((m) => m.groups.id === selectGroup.id)

        if (!isGroupExist) {
            setSelectGroup(personalGroup)
            // 処理終了
        }

        // 3C. (selectGroupが設定済みで、所属グループ内に存在する場合): 何もしない (現状維持)
    })

    // ============================================================================
    // Effect(Watch)処理（Effect(Watch)）
    // ============================================================================
    useEffect(() => {
        if (profileWithGroups) setProfileWithGroups(profileWithGroups)
        else setProfileWithGroups(null)
        console.log(profileWithGroups)
    }, [profileWithGroups, setProfileWithGroups])

    // ============================================================================
    // アクション処理（Action）
    // ============================================================================
    const handleLogout = () => {
        router.push('/auth/login')
    }

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
                            <span className="text-foreground text-xl font-bold">
                                {appInfo.APP_NAME}
                            </span>
                        </Link>
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
                                            {selectGroup?.name}
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
                                {profileWithGroups?.memberships.map((membership, itemIndex) => (
                                    <DropdownMenuItem
                                        key={itemIndex}
                                        onClick={() => {
                                            // handleOrgSelect(org)
                                        }}
                                        className="flex cursor-pointer items-center justify-between rounded-lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {membership.groups.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {membership.groups.role}
                                                </p>
                                            </div>
                                        </div>
                                        {selectGroup && selectGroup.id === membership.groups.id && (
                                            <Check className="h-4 w-4 text-emerald-600" />
                                        )}
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
                        <UserMenuDropdown
                            userName={profileWithGroups?.name}
                            onLogout={handleLogout}
                        />
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
