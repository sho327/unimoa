'use client'

import { ThemeProvider } from 'next-themes'
import { useThemeStore } from '@/store/theme'
import { useEffect } from 'react'

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore((s) => s.theme)

    // Zustand と next-themes の同期
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return (
        <ThemeProvider attribute="class" defaultTheme={theme}>
            {children}
        </ThemeProvider>
    )
}
