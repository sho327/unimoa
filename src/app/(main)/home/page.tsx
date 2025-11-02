// Modules
import { redirect } from 'next/navigation'
// Page/Components
import Home from '@/components/page/main/home'
// Supabase
import { getSessionUser } from '@/lib/supabase/getSessionUser'

/**
 * ホームページ
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default async function HomePage() {
    const user = await getSessionUser()

    // 未認証の場合、リダイレクト
    if (!user) {
        redirect('/auth/login')
    }
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return <Home />
}
