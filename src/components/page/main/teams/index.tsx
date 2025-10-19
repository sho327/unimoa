"use client"
// Modules
import type React from "react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Users, Upload } from "lucide-react"
// UI/Components
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Layout/Modules
import PageHeader from "@/components/layout/page-header"
import ClientMainLayout from "@/components/layout/client-main-layout"

// Mock teams data
// 初心者にもわかりやすいよう、各チームは「アイコン(emoji)・名前・概要(description)」で構成
const mockTeams = [
  {
    id: "1",
    name: "デザインチーム",
    emoji: "🎨",
    description: "UI/UX デザインとブランド体験の向上に取り組むチームです。",
    memberCount: 5,
  },
  {
    id: "2",
    name: "開発チーム",
    emoji: "💻",
    description: "Web アプリケーションの実装・運用を担当しています。",
    memberCount: 8,
  },
  {
    id: "3",
    name: "マーケティング",
    emoji: "📢",
    description: "プロダクトの価値を伝え、ユーザーとの接点を広げます。",
    memberCount: 4,
  },
]

export default function TeamsPage() {
  const router = useRouter()
  const [teams] = useState(mockTeams)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamDescription, setNewTeamDescription] = useState("")
  // 初心者向け解説:
  // - アップロードした画像ファイルを保持するための state（newTeamIconFile）
  // - プレビュー表示用に ObjectURL を保持する state（newTeamIconPreviewUrl）
  const [newTeamIconFile, setNewTeamIconFile] = useState<File | null>(null)
  const [newTeamIconPreviewUrl, setNewTeamIconPreviewUrl] = useState<string | null>(null)
  // 初心者向け解説: ボタンから隠し input をクリックさせるための参照
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreateOpen(false)
    setNewTeamName("")
    // 作成後はプレビューとファイルをクリア
    setNewTeamIconFile(null)
    setNewTeamIconPreviewUrl(null)
  }

  const handleTeamClick = (teamId: string) => {
    router.push(`/team/${teamId}`)
  }

  return (
    <ClientMainLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* ページヘッダー（タイトル行） */}
        <PageHeader 
          pageTitle="チーム"
          pageDescription="チームを選択して始めましょう"
          isBackButton={false}
        >
          {/* 新規作成ボタン/新規作成モーダル */}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            {/* 新規作成ボタン(ダイアログトリガー) */}
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 rounded-sm">
                <Plus className="w-4 h-4" />
                新規作成
              </Button>
            </DialogTrigger>
            {/* 新規作成ダイアログ */}
            <DialogContent className="rounded-sm">
              {/* ダイアログ/ヘッダー */}
              <DialogHeader>
                <DialogTitle>新しいチームを作成</DialogTitle>
                <DialogDescription>チーム名とアイコンを設定して始めましょう</DialogDescription>
              </DialogHeader>
              {/* ダイアログ/ボディ */}
              <form onSubmit={handleCreateTeam} className="space-y-4">
                {/* チーム/アイコン選択（画像アップロード） */}
                {/* 初心者向け解説:
                   - input type="file" で画像を選ぶと、onChange で File を state に保存します。
                   - 画面で即時プレビューできるよう、URL.createObjectURL で一時URLを作成します。 */}
                <div className="space-y-2">
                  <Label htmlFor="teamIcon">チームアイコン</Label>
                  <div className="border-2 border-dashed border-border rounded-sm p-6 text-center space-y-3">
                    <div className="flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                        {newTeamIconPreviewUrl ? (
                          <img src={newTeamIconPreviewUrl} alt="icon preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground font-medium">画像ファイルをアップロード</p>
                      <p className="text-sm text-muted-foreground">PNG / JPG / GIF などの画像に対応しています</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        className="rounded-sm bg-transparent"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        画像を選択
                      </Button>
                      {newTeamIconPreviewUrl && (
                        <Button
                          variant="ghost"
                          className="rounded-sm"
                          type="button"
                          onClick={() => {
                            setNewTeamIconFile(null)
                            if (newTeamIconPreviewUrl) URL.revokeObjectURL(newTeamIconPreviewUrl)
                            setNewTeamIconPreviewUrl(null)
                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                        >
                          クリア
                        </Button>
                      )}
                    </div>
                    {/* ネイティブのファイル入力。画面には見せず、上のボタンからトリガーします */}
                    <input
                      id="teamIconInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        setNewTeamIconFile(file)
                        if (file) {
                          // 既存のプレビューURLがあれば解放
                          if (newTeamIconPreviewUrl) URL.revokeObjectURL(newTeamIconPreviewUrl)
                          const url = URL.createObjectURL(file)
                          setNewTeamIconPreviewUrl(url)
                        } else {
                          setNewTeamIconPreviewUrl(null)
                        }
                      }}
                    />
                  </div>
                </div>
                {/* チーム/名称 */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">チーム名</Label>
                  <Input
                    id="teamName"
                    type="text"
                    placeholder="〇〇デザイン開発"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    required
                  />
                </div>
                {/* チーム/詳細 */}
                <div className="space-y-2">
                  <Label htmlFor="emoji">チーム詳細</Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="例) 〇〇デザイン開発のためのチームです"
                    value={newTeamDescription}
                    onChange={(e) => setNewTeamDescription(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  作成
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </PageHeader>

        {/* チーム一覧（アイコン・名前・概要） */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="cursor-pointer hover:shadow-md transition-shadow border bg-card rounded-sm"
              onClick={() => handleTeamClick(team.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  {/* チームのアイコン */}
                  {/* 初心者向け解説:
                      - 画像URL（team.iconUrl）があれば AvatarImage で表示します。
                      - 画像がなければ AvatarFallback でチーム名の先頭1文字を表示します。 */}
                  <Avatar className="w-12 h-12">
                    {/** team.iconUrl は今はモックなので未設定ですが、将来的に保存されたURLを想定 */}
                    {/** 何もない場合は AvatarFallback が自動的に表示されます */}
                    <AvatarImage src={(team as any).iconUrl} alt={`${team.name} icon`} />
                    <AvatarFallback className="text-sm font-medium">
                      {team.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    {/* チーム名称 */}
                    <CardTitle className="text-base font-semibold truncate">{team.name}</CardTitle>
                    {/* チーム詳細 */}
                    <CardDescription className="mt-1 line-clamp-2">
                      {team.description}
                    </CardDescription>
                    {/* メンバー数 */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                      <Users className="w-3.5 h-3.5" />
                      {team.memberCount} 人
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </ClientMainLayout>
  )
}
