import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, CheckSquare, FileText, Calendar, FolderOpen } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Unimoa</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">
                ログイン
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full">はじめる</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            チームのための、かわいいグループウェア
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            チームがつながり、協力し、一緒に成長するための優しい空間。シンプルで直感的、そして心を込めてデザインされています。
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="rounded-full px-8">
                無料で始める
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="チームスペース"
            description="各チーム専用のスペースを作成し、メンバー管理も簡単に"
          />
          <FeatureCard
            icon={<CheckSquare className="w-8 h-8" />}
            title="タスク管理"
            description="絵文字やタグでタスクを管理し、進捗を可視化"
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="共有ノート"
            description="ドキュメントで協力し、知識を整理して保管"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="チームカレンダー"
            description="イベントをスケジュールし、みんなの予定を一目で確認"
          />
          <FeatureCard
            icon={<FolderOpen className="w-8 h-8" />}
            title="ファイルギャラリー"
            description="ファイルを共有し、自動整理と美しいギャラリービュー"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="チームホーム"
            description="最近のアクティビティとチームの進捗を一つの優しいダッシュボードで"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Unimoa - チームのつながりを優しくサポート</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 space-y-3 hover:shadow-lg transition-shadow">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
