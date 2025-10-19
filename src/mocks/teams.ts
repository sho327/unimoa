import { Team } from "@/types/team"
// Mock teams data
// 初心者にもわかりやすいよう、各チームは「アイコン(emoji)・名前・概要(description)」で構成
export const MockTeams: Team[] = [
    {
      id: "1",
      name: "デザインチーム",
      description: "UI/UX デザインとブランド体験の向上に取り組むチームです。",
      memberCount: 5,
      fileGroupId: null,
    },
    {
      id: "2",
      name: "開発チーム",
      description: "Web アプリケーションの実装・運用を担当しています。",
      memberCount: 8,
      fileGroupId: null,
    },
    {
      id: "3",
      name: "マーケティング",
      description: "プロダクトの価値を伝え、ユーザーとの接点を広げます。",
      memberCount: 4,
      fileGroupId: null,
    },
  ]