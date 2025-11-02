'use client'
// Modules
import type React from 'react'
import { useRouter } from 'next/navigation'
import { LucideIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
// UI/Components
import { Button } from '@/components/ui/button'

/**
 * ページヘッダーコンポーネント
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default function PageHeader({
    Icon,
    iconVariant = 'default',
    pageTitle,
    pageDescription,
    isBackButton,
    children,
}: {
    Icon?: LucideIcon
    iconVariant?: 'default' | 'home' | 'task' | 'report' | 'setting'
    pageTitle: string
    pageDescription: string
    isBackButton: boolean
    children?: React.ReactNode
}) {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    const router = useRouter()
    // ============================================================================
    // テンプレート（コンポーネント描画処理）
    // ============================================================================
    return (
        <>
            {/* 戻るボタン */}
            {isBackButton && (
                <div className="mb-4 flex items-center gap-4">
                    <Link href="/teams">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-700"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            戻る
                        </Button>
                    </Link>
                </div>
            )}
            {/* ページアイコン/タイトル/詳細 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="bg-secondary rounded-xl p-3">
                            <Icon
                                className={
                                    'h-6 w-6' +
                                    (iconVariant === 'default'
                                        ? ' text-gray-600'
                                        : iconVariant === 'home'
                                          ? ' text-primary'
                                          : iconVariant === 'task'
                                            ? ' text-chart-2'
                                            : iconVariant === 'report'
                                              ? ' text-chart-3'
                                              : iconVariant === 'setting'
                                                ? ' text-chart-4'
                                                : ' text-gray-600')
                                }
                            />
                        </div>
                    )}
                    <div>
                        <h1 className="text-foreground text-2xl font-semibold">{pageTitle}</h1>
                        <p className="text-muted-foreground mt-1">{pageDescription}</p>
                    </div>
                </div>
                {/* 作成ボタンがある場合等は、各自childrenにてページ側で設定 */}
                {children}
            </div>
        </>
    )
}
