'use client'

import { MoreVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Task, TaskStatus } from '@/types'

interface TaskCardListItemProps {
    task: Task
    onToggleStatus?: (taskId: string) => void
}

const statusLabels: Record<TaskStatus, string> = {
    todo: '未着手',
    in_progress: '進行中',
    completed: '完了',
}

const statusColors: Record<TaskStatus, string> = {
    todo: 'bg-gray-100 text-gray-700 border-gray-200',
    in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
}

export default function TaskCardListItem({ task, onToggleStatus }: TaskCardListItemProps) {
    return (
        <Card className="border-border rounded-lg shadow-sm transition-shadow hover:shadow">
            <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-1 items-start gap-3">
                        <Checkbox
                            checked={task.status === 'completed'}
                            onCheckedChange={() => onToggleStatus?.(task.id)}
                            className="mt-1 rounded"
                        />
                        <div className="min-w-0 flex-1">
                            <h3
                                className={`text-foreground mb-2 text-base font-medium ${
                                    task.status === 'completed' ? 'line-through opacity-60' : ''
                                }`}
                            >
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                                    {task.description}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={`rounded-full border text-xs ${statusColors[task.status]}`}
                                >
                                    {statusLabels[task.status]}
                                </Badge>
                                {task.completedAt && (
                                    <span className="text-muted-foreground text-xs">
                                        完了: {task.completedAt.toLocaleDateString('ja-JP')}
                                    </span>
                                )}
                            </div>
                            <div className="text-muted-foreground mt-2 text-xs">
                                <p>作成: {task.createdAt.toLocaleDateString('ja-JP')}</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
