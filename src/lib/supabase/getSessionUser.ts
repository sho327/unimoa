import { supabaseServer } from './server'
import type { User } from '@supabase/supabase-js'

/**
 * 現在ログインしているユーザーを取得
 * @returns User | null
 */
export const getSessionUser = async (): Promise<User | null> => {
    const supabase = await supabaseServer()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) return null
    return data.user
}
