// Modules
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Database } from '@/types/Database' // データベース型定義

interface CommonState {
    /* 選択中グループ */
    selectGroup: Database['public']['Tables']['groups']['Row'] | null
    setSelectGroup: (selectGroup: Database['public']['Tables']['groups']['Row'] | null) => void
    clearSelectGroup: () => void
    /* 選択中テーマ */
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
    toggleTheme: () => void
    /* ページローディング */
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}

export const useCommonStore = create<CommonState>()(
    persist(
        (set, get) => ({
            /* 選択中グループ */
            selectGroup: null,
            setSelectGroup: (selectGroup) => set({ selectGroup: selectGroup }),
            clearSelectGroup: () => set({ selectGroup: null }),
            /* 選択中テーマ */
            theme: 'light',
            setTheme: (theme) => set({ theme }),
            toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
            /* ページローディング */
            isLoading: false,
            setIsLoading: (isLoading) => set({ isLoading: isLoading }),
        }),
        { name: 'common' }
    )
)
