import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Group } from '@/types'

interface GroupState {
    group: Group | null
    setGroup: (group: Group) => void
    clearGroup: () => void
}

export const useGroupStore = create<GroupState>()(
    persist(
        (set) => ({
            group: null,
            setGroup: (group) => set({ group: group }),
            clearGroup: () => set({ group: null }),
        }),
        // ローカルストレージ/キー名
        { name: 'group' }
    )
)

// ============================================================================
// 将来的
// ============================================================================
// • グループ切替セレクタ（<Select>）で setGroup() 呼び出し
// • すべてのAPIリクエストに group_id を含めて送信
// • GROUP_ID を Supabase RPCやRLSポリシーと連携
