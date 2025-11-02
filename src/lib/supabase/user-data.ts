import { supabaseServer } from './server' // サーバークライアントのインスタンスを取得する関数
import type { User } from '@supabase/supabase-js'
import { Database } from '@/types/Database' // データベース型定義

// ============================================================================
// 1. 型定義
// ============================================================================

// 所属グループをネストしたプロフィール情報の型定義
// Row の型をそのまま使用し、リレーションシップで結合されたグループ情報を追加
export type ProfileWithGroups = Database['public']['Tables']['profiles']['Row'] & {
    memberships: {
        groups: Database['public']['Tables']['groups']['Row']
    }[]
}

// ============================================================================
// 2. 認証済みユーザー取得
// ============================================================================

/**
 * 現在ログインしているユーザーセッション情報を取得
 * (既存の getSessionUser.ts の内容を統合)
 * @returns User | null
 */
export const getSessionUser = async (): Promise<User | null> => {
    const supabase = await supabaseServer()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) return null
    return data.user
}

// ============================================================================
// 3. プロフィールとグループ一覧の取得 (今回追加するメイン関数)
// ============================================================================

/**
 * 認証済みユーザーのプロフィールと所属グループ一覧をフェッチする
 * @returns ProfileWithGroups | null
 */
export async function fetchAuthenticatedUserData(): Promise<ProfileWithGroups | null> {
    const user = await getSessionUser()
    if (!user) {
        return null
    }

    const supabase = await supabaseServer()

    // SupabaseのPostgREST機能を使用して、JOIN相当の複雑なデータを一度に取得
    const { data: profileData, error } = await supabase
        .from('profiles')
        .select(
            `
            *,
            memberships!memberships_user_id_fkey(
                groups(*)
            )
        `
        )
        .eq('id', user.id)
        .single()

    if (error) {
        console.error('Error fetching user data in server utils:', error.message)
        // データ取得エラー
        return null
    }

    // 取得データを型キャストして返す
    return profileData as ProfileWithGroups
}
