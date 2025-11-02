'use client'
// Modules
import { CheckCircle } from 'lucide-react'
// Store
import { useLoadingStore } from '@/store/loading'

/**
 * ページローディング表示コンポーネント
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default function LoadingOverlay() {
    // ============================================================================
    // 状態管理（State Management）
    // ============================================================================
    // StoreStates: コンポーネントの状態管理(Store)
    const { isLoading } = useLoadingStore()
    // ============================================================================
    // テンプレート（コンポーネント描画処理）
    // ============================================================================
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="animate-sway mb-3">
                            <CheckCircle className="text-primary mx-auto h-7 w-7" />
                        </div>
                        <p className="text-lg font-medium text-gray-600">読み込み中です...</p>
                    </div>
                </div>
            )}
        </>
    )
}
