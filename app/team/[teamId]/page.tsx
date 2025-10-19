import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckSquare, FileText, Calendar, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

// Mock recent activity data
const recentActivity = [
  {
    id: 1,
    user: "アリス",
    action: "がタスクを完了しました",
    item: "ホームページのモックアップデザイン",
    time: "2時間前",
    emoji: "✅",
  },
  {
    id: 2,
    user: "ボブ",
    action: "がノートを追加しました",
    item: "ミーティングノート - Q1計画",
    time: "4時間前",
    emoji: "📝",
  },
  {
    id: 3,
    user: "キャロル",
    action: "がファイルをアップロードしました",
    item: "ブランドガイドライン.pdf",
    time: "5時間前",
    emoji: "📎",
  },
  {
    id: 4,
    user: "デビッド",
    action: "がイベントを作成しました",
    item: "チームスタンドアップ",
    time: "1日前",
    emoji: "📅",
  },
]

const quickStats = [
  { label: "進行中のタスク", value: "12", icon: CheckSquare, color: "text-primary" },
  { label: "ノート", value: "8", icon: FileText, color: "text-chart-2" },
  { label: "イベント", value: "5", icon: Calendar, color: "text-chart-3" },
  { label: "進捗率", value: "68%", icon: TrendingUp, color: "text-chart-4" },
]

export default function TeamHomePage({ params }: { params: { teamId: string } }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold text-foreground">チームホーム</h1>
        <p className="text-muted-foreground text-sm">おかえりなさい！チームの最新情報をチェックしましょう。</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border rounded-xl shadow-sm hover:shadow transition-shadow">
              <CardContent className="pt-5 pb-4 px-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`w-7 h-7 ${stat.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">クイックアクション</CardTitle>
          <CardDescription className="text-sm">よく使う操作にすばやくアクセス</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-2.5">
            <Link href={`/team/${params.teamId}/tasks`}>
              <Button
                variant="outline"
                className="w-full rounded-lg h-auto py-3.5 hover:bg-accent hover:border-primary/20 transition-colors bg-transparent"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <Plus className="w-5 h-5" />
                  <span className="text-sm font-medium">新しいタスク</span>
                </div>
              </Button>
            </Link>
            <Link href={`/team/${params.teamId}/notes`}>
              <Button
                variant="outline"
                className="w-full rounded-lg h-auto py-3.5 hover:bg-accent hover:border-primary/20 transition-colors bg-transparent"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium">新しいノート</span>
                </div>
              </Button>
            </Link>
            <Link href={`/team/${params.teamId}/calendar`}>
              <Button
                variant="outline"
                className="w-full rounded-lg h-auto py-3.5 hover:bg-accent hover:border-primary/20 transition-colors bg-transparent"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">新しいイベント</span>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">最近のアクティビティ</CardTitle>
          <CardDescription className="text-sm">チームの活動状況を確認</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors border border-transparent hover:border-border"
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {activity.user.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-2">
                    <span>{activity.emoji}</span>
                    <span className="truncate">{activity.item}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
