"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock signup - in production, this would create an account
    if (name && email && password) {
      router.push("/home")
    }
  }

  return (
    <>
      {/* 新規登録/カード */}
      <Card className="border-border rounded-xl">
        <CardHeader className="space-y-0.5 text-center">
          <CardTitle className="text-2xl">アカウント作成</CardTitle>
          <CardDescription>今日からチームでコラボレーションを始めましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                type="text"
                placeholder="あなたの名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
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
              アカウント作成
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            すでにアカウントをお持ちの方は{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              ログイン
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
