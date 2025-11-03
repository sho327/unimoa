'use client'
// Modules
import type React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
// UI/Components
import { Button } from '@/components/ui/button'
// Layout/Components
import { HeaderGroupSelectDropdown } from '@/components/layout/parts/header-group-select-dropdown'
import {
    HeaderNotificationDropdown,
    Notification,
} from '@/components/layout/parts/header-notification-dropdown'
import { HeaderUserMenuDropdown } from '@/components/layout/parts/header-user-menu-dropdown'
// Types
import type { LayoutNavItem } from '@/types/common'
import type { GroupRow } from '@/types/group'
// Constants
import { appInfo } from '@/constants/appInfo'
import { pageRoutes } from '@/constants/pageRoutes'
// Store
import { useCommonStore } from '@/store/common'
import { useProfileWithGroupsStore } from '@/store/profileWithGroup'
// Hooks
import { useMount } from '@/hooks/use-mount'
import { useIsMobile } from '@/hooks/use-mobile'
// Supabase
import type { ProfileWithGroups } from '@/lib/supabase/userData'

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
    const isMobile = useIsMobile()
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
    /* グループ選択/ドロップダウンイベント */
    const handleOnSelectGroup = (selectGroup: GroupRow) => {
        console.log(`selectGroup: ${selectGroup}`)
    }
    const handleOnCreateGroup = () => {
        console.log('グループ新規作成ボタンが押下されました')
    }
    /* お知らせ/ドロップダウンイベント */
    const handleOnClickNotificationItem = (notification: Notification) => {
        console.log('OnClickNotificationItem')
    }
    const handleOnClickAllRead = () => {
        console.log('OnClickAllRead')
    }
    /* ユーザメニュー/ドロップダウンイベント */
    const handleOnClickLogoutItem = () => {
        router.push('/auth/login')
    }

    // ============================================================================
    // テンプレート（コンポーネント描画処理）
    // ============================================================================
    return (
        <div className="bg-background min-h-screen">
            <header className="bg-card sticky top-0 z-50 h-[58px] border-b shadow-xs">
                <div
                    className={
                        'container mx-auto flex h-full items-center justify-between px-3 sm:px-6'
                    }
                >
                    {/* 左側: ロゴ、グループ選択 */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href="/teams" className="flex items-center gap-2.5">
                            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
                                <CheckCircle className="text-primary-foreground h-5 w-5" />
                            </div>
                            <span className="text-foreground text-xl font-bold">
                                {appInfo.APP_NAME}
                            </span>
                        </Link>
                        <div className="mx-2 hidden h-4 w-px bg-gray-300 md:block" />
                        {/* グループ選択/ドロップダウン */}
                        <HeaderGroupSelectDropdown
                            selectGroup={selectGroup}
                            membershipWithGroup={
                                profileWithGroups ? profileWithGroups.memberships : null
                            }
                            onSelectGroup={handleOnSelectGroup}
                            onCreateGroup={handleOnCreateGroup}
                        />
                    </div>
                    {/* 右側: お知らせ、ユーザーメニュー */}
                    <div className="flex items-center gap-2">
                        {/* お知らせ/ドロップダウン */}
                        <HeaderNotificationDropdown
                            notifications={[]}
                            unreadCount={3}
                            onClickNotificationItem={handleOnClickNotificationItem}
                            onClickAllRead={handleOnClickAllRead}
                        />
                        {/* ユーザメニュー/ドロップダウン */}
                        <HeaderUserMenuDropdown
                            displayUserName={profileWithGroups ? profileWithGroups.name : null}
                            userIconSrc={profileWithGroups ? profileWithGroups.avatar_url : null}
                            onClickLogoutItem={handleOnClickLogoutItem}
                        />
                    </div>
                </div>
            </header>
            {/* ヘッダー下ナビ */}
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
            <main className="container mx-auto px-6 py-8">{children}</main>
        </div>
    )
}
