export type TaskStatus = 'todo' | 'in_progress' | 'completed'

export interface Task {
    id: string
    groupId: string
    title: string
    description?: string
    assigneeId?: string
    status: TaskStatus
    createdAt: Date
    updatedAt: Date
    completedAt?: Date
    startedAt?: Date
}
