// Layout/Components
import ClientMainLayout from '@/components/layout/client-main-layout'
// Supabase
import { getSessionUser, getUserGroups } from '@/lib/supabase/queries'

/**
 * メインレイアウト
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await getSessionUser()
    const groups = user ? await getUserGroups(user.id) : []
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return <ClientMainLayout>{children}</ClientMainLayout>
}
