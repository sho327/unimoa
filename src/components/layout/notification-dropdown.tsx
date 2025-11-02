'use client'
// Modules
import { useState } from 'react'
import { Bell, Trophy, Megaphone, CheckCircle, FolderOpen, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
// UI/Components
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
// Types
import { Notification } from '@/components/layout/types'

interface NotificationDropdownProps {
    notifications: Notification[]
    unreadCount: number
    onMarkAsRead: (id: string) => void
    onMarkAllAsRead: () => void
}

// Helper function to get icon based on notification type
const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'task':
            return <Trophy className="h-4 w-4 text-amber-600" />
        case 'note':
            return <Megaphone className="h-4 w-4 text-blue-600" />
        case 'calender':
            return <CheckCircle className="h-4 w-4 text-emerald-600" />
        case 'fileManagement':
            return <FolderOpen className="h-4 w-4 text-purple-600" />
        default:
            return <Bell className="h-4 w-4 text-slate-600" />
    }
}

// Helper function to format timestamp
const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return '今'
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    return `${Math.floor(diffInMinutes / 1440)}日前`
}

export function NotificationDropdown({
    notifications,
    unreadCount,
    onMarkAsRead,
    onMarkAllAsRead,
}: NotificationDropdownProps) {
    // ============================================================================
    // 状態管理（State Management）
    // ============================================================================
    // States: コンポーネントの状態管理
    // - isOpen: お知らせドロップダウンの開閉状態
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // ============================================================================
    // 変数（Constant Management）
    // ============================================================================
    // Constants: 変数
    // - router: ルーター
    const router = useRouter()
    // ============================================================================
    // イベントハンドラー（Event Handlers）
    // ============================================================================
    /**
     * お知らせタップ時の処理
     * 初心者向け解説:
     * - ダイアログから受け取ったチーム情報を処理
     * - 実際のアプリケーションでは、ここでAPIを呼び出してチームを作成
     * - 今回はモックデータなので、コンソールに出力するだけ
     */
    const handleMarkAsRead = (id: string) => {
        onMarkAsRead(id)
    }

    const handleMarkAllAsRead = () => {
        onMarkAllAsRead()
    }

    const handleNotificationClick = (notification: Notification) => {
        // Mark as read first
        handleMarkAsRead(notification.id)
        // Navigate to notification detail page
        router.push(`/notifications/${notification.id}`)
        setIsOpen(false)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            {/* ドロップダウントリガー */}
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/10 relative hover:text-gray-700"
                >
                    <Bell className="size-4.5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-0 -right-0 flex h-3 w-3 items-center justify-center bg-red-500 p-1 text-xs text-white">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            {/* ドロップダウンメニュー */}
            <DropdownMenuContent
                className="z-50 max-h-96 w-[calc(100vw-2rem)] sm:w-80"
                align="end"
                side="bottom"
                forceMount
            >
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span className="font-semibold">お知らせ</span>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            className="h-6 px-2 text-xs text-slate-600 hover:text-slate-800"
                        >
                            すべて既読
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <ScrollArea className="h-64">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-slate-500">
                            <Bell className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                            <p className="text-sm">お知らせはありません</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`hover:bg-primary/10 cursor-pointer p-3 hover:text-gray-700 ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="flex w-full items-start gap-3">
                                        <div className="mt-0.5 flex-shrink-0">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p
                                                    className={`text-sm leading-tight font-medium ${
                                                        !notification.isRead
                                                            ? 'text-slate-900'
                                                            : 'text-slate-700'
                                                    }`}
                                                >
                                                    {notification.title}
                                                </p>
                                                {!notification.isRead && (
                                                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                                                )}
                                            </div>
                                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                                {notification.description}
                                            </p>
                                            <p className="mt-2 text-xs text-slate-400">
                                                {formatTimestamp(notification.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {notifications.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="hover:bg-primary/10 cursor-pointer text-center text-sm text-slate-600 hover:text-gray-700"
                            onClick={() => {
                                router.push('/notifications')
                                setIsOpen(false)
                            }}
                        >
                            すべてのお知らせを見る
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
