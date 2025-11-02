import { supabaseServer } from './server'

/**
 * 現在のユーザーが所属するグループ一覧を取得
 * @returns User | null
 */
export const getUserGroups = async (userId: string) => {
    const supabase = await supabaseServer()

    const { data, error } = await supabase
        .from('memberships')
        .select(
            `
            group_id,
            role,
            status,
            groups (
                id,
                name,
                description,
                created_at
            )
        `
        )
        .eq('user_id', userId)
        .eq('status', 'active')

    if (error) throw error
    return (
        data?.map((m) => ({
            id: m.groups.id,
            name: m.groups.name,
            description: m.groups.description,
            role: m.role,
            status: m.status,
        })) ?? []
    )
}
