"use client"
// ============================================================================
// TeamsCreateDialog コンポーネント
// ============================================================================
// 目的: チーム作成用のダイアログを独立したコンポーネントとして実装
// 利点: 
//   - コードの再利用性向上
//   - 責任の分離（ダイアログの表示ロジックとフォーム状態管理を分離）
//   - テストしやすい構造
//   - メンテナンスしやすいコード

// Modules
import type React from "react"
import { useRef, useState } from "react"
import { Upload } from "lucide-react"

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

// ============================================================================
// 型定義
// ============================================================================
// 初心者向け解説: TypeScriptの型定義
// - コンポーネントが受け取るpropsの型を定義
// - 型安全性を保証し、開発時のエラーを防ぐ

export interface TeamsCreateDialogProps {
  // ダイアログの開閉状態を制御するためのprops
  open: boolean
  onOpenChange: (open: boolean) => void
  
  // チーム作成が完了した時のコールバック関数
  // 作成されたチームの情報を親コンポーネントに渡す
  onTeamCreated: (teamData: {
    name: string
    description: string
    iconFile: File | null
  }) => void
}

// ============================================================================
// TeamsCreateDialog コンポーネント
// ============================================================================
export default function TeamsCreateDialog({
  open,
  onOpenChange,
  onTeamCreated,
}: TeamsCreateDialogProps) {
  // ============================================================================
  // 状態管理（State Management）
  // ============================================================================
  // 初心者向け解説: ReactのuseStateフック
  // - コンポーネント内で状態を管理するためのフック
  // - 状態が変更されると、コンポーネントが再レンダリングされる
  
  // フォームの入力値を管理する状態
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  
  // 画像ファイル関連の状態管理
  // 初心者向け解説: ファイルアップロードの仕組み
  // - newTeamIconFile: 実際のファイルオブジェクトを保存
  // - newTeamIconPreviewUrl: プレビュー表示用の一時URLを保存
  const [newTeamIconFile, setNewTeamIconFile] = useState<File | null>(null)
  const [newTeamIconPreviewUrl, setNewTeamIconPreviewUrl] = useState<string | null>(null)
  
  // 初心者向け解説: useRefフック
  // - DOM要素への直接的な参照を取得するためのフック
  // - ここでは隠しinput要素を参照するために使用
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // ============================================================================
  // イベントハンドラー（Event Handlers）
  // ============================================================================
  
  /**
   * チーム作成フォームの送信処理
   * 初心者向け解説: 
   * - e.preventDefault(): フォームのデフォルトの送信動作を防ぐ
   * - 親コンポーネントに作成されたチーム情報を渡す
   * - フォームをリセットしてダイアログを閉じる
   */
  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 親コンポーネントに作成されたチーム情報を渡す
    onTeamCreated({
      name: teamName,
      description: teamDescription,
      iconFile: newTeamIconFile,
    })
    
    // フォームをリセット
    resetForm()
    
    // ダイアログを閉じる
    onOpenChange(false)
  }

  /**
   * フォームのリセット処理
   * 初心者向け解説:
   * - 全ての入力値を初期状態に戻す
   * - プレビューURLを解放してメモリリークを防ぐ
   */
  const resetForm = () => {
    setTeamName("")
    setTeamDescription("")
    setNewTeamIconFile(null)
    
    // プレビューURLを解放（メモリリーク防止）
    if (newTeamIconPreviewUrl) {
      URL.revokeObjectURL(newTeamIconPreviewUrl)
    }
    setNewTeamIconPreviewUrl(null)
    
    // ファイル入力の値をクリア
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  /**
   * ファイル選択時の処理
   * 初心者向け解説:
   * - ファイルが選択された時の処理
   * - プレビュー用のURLを作成
   * - 既存のプレビューURLがあれば解放
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewTeamIconFile(file)
    
    if (file) {
      // 既存のプレビューURLがあれば解放
      if (newTeamIconPreviewUrl) {
        URL.revokeObjectURL(newTeamIconPreviewUrl)
      }
      
      // 新しいプレビューURLを作成
      const url = URL.createObjectURL(file)
      setNewTeamIconPreviewUrl(url)
    } else {
      setNewTeamIconPreviewUrl(null)
    }
  }

  /**
   * 画像クリア処理
   * 初心者向け解説:
   * - 選択された画像をクリア
   * - プレビューURLを解放
   * - ファイル入力の値をクリア
   */
  const handleClearImage = () => {
    setNewTeamIconFile(null)
    
    if (newTeamIconPreviewUrl) {
      URL.revokeObjectURL(newTeamIconPreviewUrl)
    }
    setNewTeamIconPreviewUrl(null)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // ============================================================================
  // レンダリング（Rendering）
  // ============================================================================
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-sm">
        {/* ダイアログヘッダー */}
        <DialogHeader>
          <DialogTitle>新しいチームを作成</DialogTitle>
          <DialogDescription>チーム名とアイコンを設定して始めましょう</DialogDescription>
        </DialogHeader>

        {/* フォーム */}
        <form onSubmit={handleCreateTeam} className="space-y-4">
          {/* チームアイコン選択セクション */}
          <div className="space-y-2">
            <Label htmlFor="teamIcon">チームアイコン</Label>
            <div className="border-2 border-dashed border-border rounded-sm p-6 text-center space-y-3">
              {/* プレビュー表示エリア */}
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                  {newTeamIconPreviewUrl ? (
                    <img 
                      src={newTeamIconPreviewUrl} 
                      alt="icon preview" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {/* 説明テキスト */}
              <div className="space-y-1">
                <p className="text-foreground font-medium">画像ファイルをアップロード</p>
                <p className="text-sm text-muted-foreground">
                  PNG / JPG / GIF などの画像に対応しています
                </p>
              </div>
              
              {/* ボタン群 */}
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
                    onClick={handleClearImage}
                  >
                    クリア
                  </Button>
                )}
              </div>
              
              {/* 隠しファイル入力 */}
              <input
                id="teamIconInput"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* チーム名入力 */}
          <div className="space-y-2">
            <Label htmlFor="teamName">チーム名</Label>
            <Input
              id="teamName"
              type="text"
              placeholder="〇〇デザイン開発"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          {/* チーム詳細入力 */}
          <div className="space-y-2">
            <Label htmlFor="teamDescription">チーム詳細</Label>
            <Input
              id="teamDescription"
              type="text"
              placeholder="例) 〇〇デザイン開発のためのチームです"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
            />
          </div>

          {/* 送信ボタン */}
          <Button type="submit" className="w-full">
            作成
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
