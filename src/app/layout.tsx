// Modules
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// Privider/Components
import { ThemeProvider } from '@/components/providers/theme-provider'
// Global/CSS
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Unimoa - チームのためのシンプルなグループウェア",
  description: "チームのつながりをシンプルで優しいUIでサポートする、親しみやすいグループウェア",
  generator: "React/Next.js",
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
