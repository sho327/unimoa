"use client"
// ============================================================================
// TeamsPage コンポーネント
// ============================================================================
// 目的: チーム一覧表示とチーム作成機能を提供するメインページ
// 改善点: ダイアログ部分を独立したコンポーネントに分離し、責任を明確化

// Modules
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, UsersRound } from "lucide-react"

// UI/Components
import { Button } from "@/components/ui/button"

// Layout/Components
import PageHeader from "@/components/layout/page-header"
import ClientMainLayout from "@/components/layout/client-main-layout"

// Common/Components
import EmptyState from "@/components/common/empty-state"

// Page/Components
import TeamsItem from "@/components/page/main/teams/teams-item"
import TeamsCreateDialog from "@/components/page/main/teams/teams-create-dialog"

// Types
import { Team } from "@/types/team"

// Mocks
import { MockTeams } from "@/mocks/teams"

export default function TeamsPage() {
  // ============================================================================
  // 状態管理（State Management）
  // ============================================================================
  // 初心者向け解説: コンポーネントの状態管理
  // - teams: チーム一覧のデータ
  // - isCreateOpen: チーム作成ダイアログの開閉状態
  
  const router = useRouter()
  const [teams] = useState<Team[]>(MockTeams)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // ============================================================================
  // イベントハンドラー（Event Handlers）
  // ============================================================================
  
  /**
   * チーム作成完了時の処理
   * 初心者向け解説:
   * - ダイアログから受け取ったチーム情報を処理
   * - 実際のアプリケーションでは、ここでAPIを呼び出してチームを作成
   * - 今回はモックデータなので、コンソールに出力するだけ
   */
  const handleTeamCreated = (teamData: {
    name: string
    description: string
    iconFile: File | null
  }) => {
    // 初心者向け解説: 実際のアプリケーションでは、ここでAPIを呼び出します
    console.log("新しいチームが作成されました:", teamData)
    
    // ダイアログを閉じる
    setIsCreateOpen(false)
    
    // 実際のアプリケーションでは、ここでチーム一覧を更新します
    // setTeams([...teams, newTeam])
  }

  /**
   * チームクリック時の処理
   * 初心者向け解説: チーム詳細ページに遷移
   */
  const handleTeamClick = (teamId: string) => {
    router.push(`/team/${teamId}`)
  }

  // ============================================================================
  // レンダリング（Rendering）
  // ============================================================================
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
          {/* 新規作成ボタン */}
          <Button 
            size="sm" 
            className="gap-2 rounded-md"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4" />
            新規作成
          </Button>
        </PageHeader>

        {/* チーム一覧（アイコン・名前・概要） */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams && teams.map((team) => (
            <TeamsItem 
              key={team.id}
              team={team}
              handleTeamClick={handleTeamClick}
            />
          ))}
        </div>

        {/* チームが0件の場合の表示 */}
        {teams.length === 0 && (
          <EmptyState
            Icon={UsersRound}
            title="まだチームがありません"
            description="下のボタンから新しいチームを作成しましょう。"
            actionLabel="最初のチームを作成"
            onAction={() => setIsCreateOpen(true)}
          />
        )}

        {/* チーム作成ダイアログ */}
        <TeamsCreateDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onTeamCreated={handleTeamCreated}
        />
      </div>
    </ClientMainLayout>
  )
}