import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Unimoa - チームのためのやさしいグループウェア",
  description: "チームのつながりをやさしくサポートする、親しみやすいグループウェア",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body 
        className={`${inter.className} font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}
/**
  コンポーネント内でテーマを切り替える場合：
  Apply to layout.tsx
  テーマ切り替え
  ------------------------------------------------------------
  import { useTheme } from 'next-themes'

  function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    
    return (
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        テーマ切り替え
      </button>
    )
  }
  ------------------------------------------------------------
  このコンポーネントにより、ユーザーはアプリケーション全体でダークモードとライトモードを切り替えることができます。
 */
