"use client"
// Modules
import { CheckCircle } from "lucide-react"
// Store
import { useStore } from "@/store"

/**
 * ページローディング表示コンポーネント
 * @args 
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 * @returns store.isLoadingがtrueの場合: ローディングオーバーレイ表示
*/
export default function LoadingOverlay() {
    // ============================================================================
    // 状態管理（State Management）
    // ============================================================================
    // StoreStates: コンポーネントの状態管理(Store)
    const { isLoading } = useStore();
    // ============================================================================
    // テンプレート（コンポーネント描画処理）
    // ============================================================================
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="mb-3 animate-sway">
                            <CheckCircle className="w-7 h-7 text-primary mx-auto" />
                        </div>
                        <p className="text-gray-600 text-lg font-medium">
                            読み込み中です...
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}