export type Notification = {
    id: string
    type: "task" | "note" | "calender" | "fileManagement"
    title: string
    description: string
    timestamp: string
    isRead: boolean
}
export type Notifications = [
    {
        teamId: string
        teamName: string
        notifications: Notification[],
    }
]
export interface NotificationBadgeProps {
    count: number
}