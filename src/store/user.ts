import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface UserState {
    user: User | null
    setUser: (user: User | null) => void
    clearUser: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        { name: 'user' }
    )
)

// ============================================================================
// ポイント
// ============================================================================
// • persist でリロードしてもログイン状態を一時的に保持
// • Supabaseの onAuthStateChange と連動すれば完璧
// • clearUser() はログアウト時に必ず呼ぶ
