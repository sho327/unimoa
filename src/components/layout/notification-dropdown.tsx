"use client"
// Modules
import { useState } from "react"
import { Bell, Trophy, Megaphone, CheckCircle, FolderOpen, X } from "lucide-react"
import { useRouter } from "next/navigation"
// UI/Components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
// Types
import { Notification } from "@/components/layout/types"


interface NotificationDropdownProps {
    notifications: Notification[]
    unreadCount: number
    onMarkAsRead: (id: string) => void
    onMarkAllAsRead: () => void
}

// Helper function to get icon based on notification type
const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "task":
            return <Trophy className="w-4 h-4 text-amber-600" />
        case "note":
            return <Megaphone className="w-4 h-4 text-blue-600" />
        case "calender":
            return <CheckCircle className="w-4 h-4 text-emerald-600" />
        case "fileManagement":
            return <FolderOpen className="w-4 h-4 text-purple-600" />
        default:
            return <Bell className="w-4 h-4 text-slate-600" />
    }
}

// Helper function to format timestamp
const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "今"
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    return `${Math.floor(diffInMinutes / 1440)}日前`
}

export function NotificationDropdown({
    notifications,
    unreadCount,
    onMarkAsRead,
    onMarkAllAsRead
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
                <Button variant='ghost' size="sm" className="relative hover:bg-primary/10 hover:text-gray-700">
                    <Bell className="size-4.5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-0 -right-0 w-3 h-3 p-1 bg-red-500 text-white text-xs flex items-center justify-center">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            {/* ドロップダウンメニュー */}
            <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-80 max-h-96 z-50" align="end" side="bottom" forceMount>
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
                            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <p className="text-sm">お知らせはありません</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`p-3 cursor-pointer hover:bg-primary/10 hover:text-gray-700 ${!notification.isRead ? "bg-blue-50/50" : ""}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="flex items-start gap-3 w-full">
                                        <div className="flex-shrink-0 mt-0.5">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className={`text-sm font-medium leading-tight ${!notification.isRead ? "text-slate-900" : "text-slate-700"
                                                    }`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.isRead && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                                {notification.description}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-2">
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
                            className="text-center text-sm text-slate-600 hover:bg-primary/10 hover:text-gray-700 cursor-pointer"
                            onClick={() => {
                                router.push("/notifications")
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