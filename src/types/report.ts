export interface Report {
    id: string
    groupId: string
    userId: string
    date: string // "2025-11-01"
    content: string
    generatedFromTaskIds: string[]
    createdAt: string
    updatedAt: string
}
