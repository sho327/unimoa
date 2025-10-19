"use client"
// Modules
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Users } from "lucide-react"
// UI/Modules
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
// Layout/Modules
import ClientMainLayout from "@/components/layout/client-main-layout"

// Mock teams data
const mockTeams = [
  { id: "1", name: "デザインチーム", emoji: "🎨", memberCount: 5 },
  { id: "2", name: "開発チーム", emoji: "💻", memberCount: 8 },
  { id: "3", name: "マーケティング", emoji: "📢", memberCount: 4 },
]

export default function TeamsPage() {
  const router = useRouter()
  const [teams] = useState(mockTeams)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamEmoji, setNewTeamEmoji] = useState("✨")

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreateOpen(false)
    setNewTeamName("")
    setNewTeamEmoji("✨")
  }

  const handleTeamClick = (teamId: string) => {
    router.push(`/team/${teamId}`)
  }

  return (
    <ClientMainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">チーム</h1>
            <p className="text-sm text-muted-foreground mt-1">チームを選択して始めましょう</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" />
                新規作成
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しいチームを作成</DialogTitle>
                <DialogDescription>チーム名と絵文字を設定して始めましょう</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emoji">チーム絵文字</Label>
                  <Input
                    id="emoji"
                    type="text"
                    placeholder="✨"
                    value={newTeamEmoji}
                    onChange={(e) => setNewTeamEmoji(e.target.value)}
                    maxLength={2}
                    className="text-2xl text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamName">チーム名</Label>
                  <Input
                    id="teamName"
                    type="text"
                    placeholder="素敵なチーム"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  作成
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="cursor-pointer hover:shadow-md transition-shadow border bg-card"
              onClick={() => handleTeamClick(team.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
                    {team.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold truncate">{team.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 text-xs mt-0.5">
                      <Users className="w-3.5 h-3.5" />
                      {team.memberCount} 人
                    </CardDescription>
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
