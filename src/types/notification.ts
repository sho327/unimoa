export type NotificationType = 'task' | 'report' | 'system' | 'comment'

export type Notification = {
    id: string
    groupId?: string // グループ内通知（任意）
    userId: string // 受信者（誰宛か）
    senderId?: string // 通知を発行したユーザー（任意）
    type: NotificationType // タスク更新・日報共有・システム連絡など
    title: string
    description?: string
    relatedId?: string // taskIdやreportIdなど、対象エンティティを参照
    isRead: boolean
    createdAt: string
}
