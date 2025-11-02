export type WorkLog = {
    id: string
    taskId: string
    userId: string
    startTime: string
    endTime?: string
    durationMinutes?: number
    memo?: string
    createdAt: string
}
