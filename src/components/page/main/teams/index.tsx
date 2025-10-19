"use client"
// Modules
import type React from "react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Upload, UsersRound } from "lucide-react"
// UI/Components
import { Button } from "@/components/ui/button"
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
// Layout/Components
import PageHeader from "@/components/layout/page-header"
import ClientMainLayout from "@/components/layout/client-main-layout"
// Common/Components
import EmptyState from "@/components/common/empty-state"
// Page/Components
import TeamsItem from "@/components/page/main/teams/teams-item"
// Types
import { Team } from "@/types/team"
// Mocks
import { MockTeams } from "@/mocks/teams"

export default function TeamsPage() {
  const router = useRouter()
  const [teams] = useState<Team[]>(MockTeams)
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
          Icon={UsersRound}
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
          {teams && teams.map((team) => (
            <TeamsItem 
              key={team.id}
              team={team}
              handleTeamClick={(teamId: string) => handleTeamClick(team.id)}
              />
          ))}
        </div>
        {/* チームが0件の場合の表示 */}
        {teams.length === 0 && (
          <EmptyState
            Icon={UsersRound}
            title="チームが見つかりません"
            description="新しいチームを作成してください。"
            actionLabel="最初のチームを作成"
            onAction={() => setIsCreateOpen(true)}
          />
        )}
      </div>
    </ClientMainLayout>
  )
}
