// Layout/Components
import ClientMainLayout from '@/components/layout/client-main-layout'
// Supabase
import { fetchAuthenticatedUserData } from '@/lib/supabase/user-data'

/**
 * メインレイアウト
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const profileWithGroups = await fetchAuthenticatedUserData()
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return <ClientMainLayout profileWithGroups={profileWithGroups}>{children}</ClientMainLayout>
}
