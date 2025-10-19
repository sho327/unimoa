"use client"
// Modules
import { Users } from "lucide-react"
// UI/Components
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Types
import { Team } from "@/types/team"

export default function TeamsItem({
  team,
  handleTeamClick,
}: {
  team: Team
  handleTeamClick: (teamId: string) => void
}) {
  return (
    <Card
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
  )
}
