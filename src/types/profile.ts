// Next.jsで利用するProfileの型
export interface Profile {
    id: string
    name: string
    // email は profiles テーブルに存在しないため削除
    avatarUrl?: string | null // avatarUrlをDBの型に合わせる
    // DBの string | null に合わせる
    createdAt: string | null
}
