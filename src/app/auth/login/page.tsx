// Modules
import { cookies } from 'next/headers'
// Page/Components
import Login from '@/components/page/auth/login'

const SELECTED_GROUP_ID_COOKIE = 'selectedGroupId'

/**
 * ログインページ
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default function LoginPage() {
    // ============================================================================
    // 変数（Constant）
    // ============================================================================
    // 1. cookies() の結果を any にキャストして delete メソッドを呼び出す
    ;(cookies() as any).delete(SELECTED_GROUP_ID_COOKIE)

    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return <Login />
}
