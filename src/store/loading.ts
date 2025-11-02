import { create } from 'zustand'

interface LoadingState {
    // ページローディング
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
    // ページローディング
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}))
