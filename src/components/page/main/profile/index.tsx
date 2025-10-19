"use client"
// Modules
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
// UI/Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// Layout/Modules
import ClientMainLayout from "@/components/layout/client-main-layout"

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("山田太郎")
  const [email, setEmail] = useState("yamada@example.com")
  const [bio, setBio] = useState("デザインとコードが好きです")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock profile update - in production, this would save to database
    alert("プロフィールを更新しました")
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("新しいパスワードが一致しません")
      return
    }
    // Mock password update - in production, this would update password
    alert("パスワードを更新しました")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <ClientMainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">プロフィール設定</h1>
          <p className="text-muted-foreground mt-2">アカウント情報を管理</p>
        </div>

        {/* Profile Picture */}
        <Card className="border-border rounded-3xl">
          <CardHeader>
            <CardTitle>プロフィール画像</CardTitle>
            <CardDescription>アバターをアップロードして個性を表現しましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" className="rounded-xl bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  画像をアップロード
                </Button>
                <p className="text-xs text-muted-foreground">JPG、PNG、GIF（最大5MB）</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="border-border rounded-3xl">
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
            <CardDescription>名前とプロフィール情報を更新</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Input
                  id="bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="あなたについて教えてください"
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="rounded-xl">
                プロフィールを更新
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="border-border rounded-3xl">
          <CardHeader>
            <CardTitle>パスワード変更</CardTitle>
            <CardDescription>アカウントのセキュリティを保護</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">現在のパスワード</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">新しいパスワード</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="rounded-xl">
                パスワードを更新
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-destructive">危険な操作</CardTitle>
            <CardDescription>アカウントの削除は取り消せません</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="rounded-xl">
              アカウントを削除
            </Button>
          </CardContent>
        </Card>
      </div>
    </ClientMainLayout>
  )
}
