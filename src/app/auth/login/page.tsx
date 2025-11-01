"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
// Store
import { useStore } from "@/store"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showToast, setShowToast] = useState(true);
  // ============================================================================
  // 状態管理（State Management）
  // ============================================================================
  // StoreStates: コンポーネントの状態管理(Store)
  const { setIsLoading } = useStore();

  // ============================================================================
  // 変数（Constant Management）
  // ============================================================================
  // Constants: 変数
  // - router: ルーター
  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleSubmit = () => {
    setIsLoading(true);

    // ```
    // // 2秒後に完了
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setShowToast(true);

    //   // 3秒後にトーストを消す
    //   setTimeout(() => {
    //     setShowToast(false);
    //   }, 3000);
    // }, 2000);
    // ```

  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock login - in production, this would authenticate with your backend
    if (email && password) {
      router.push("/home")
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* ログイン/カード */}
      <Card className="border-border rounded-xl">
        <CardHeader className="space-y-0.5 text-center">
          <CardTitle className="text-2xl">おかえりなさい</CardTitle>
          <CardDescription>Tasrepoアカウントにログイン</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <Button type="submit" className="font-semibold w-full rounded-lg" size="lg">
              ログイン
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            アカウントをお持ちでない方は{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              新規登録
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* トースト通知 */}
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-2 border border-pink-100">
            <CheckCircle className="w-6 h-6 text-primary mx-auto" />
            <span className="text-gray-700 font-medium">
              タスクの登録が完了しました
            </span>
          </div>
        </div>
      )}
    </>
  )
}
