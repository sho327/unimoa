"use client"

import { MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Task, TaskStatus } from "@/types"

interface TaskCardListItemProps {
  task: Task
  onToggleStatus?: (taskId: string) => void
}

const statusLabels: Record<TaskStatus, string> = {
  todo: "未着手",
  in_progress: "進行中",
  completed: "完了",
}

const statusColors: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-700 border-gray-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
}

export default function TaskCardListItem({ task, onToggleStatus }: TaskCardListItemProps) {
  return (
    <Card className="border-border rounded-lg shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={task.status === "completed"}
              onCheckedChange={() => onToggleStatus?.(task.id)}
              className="mt-1 rounded"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-base text-foreground mb-2 ${
                  task.status === "completed" ? "line-through opacity-60" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={`rounded-full text-xs border ${statusColors[task.status]}`}
                >
                  {statusLabels[task.status]}
                </Badge>
                {task.completedAt && (
                  <span className="text-xs text-muted-foreground">
                    完了: {task.completedAt.toLocaleDateString("ja-JP")}
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>作成: {task.createdAt.toLocaleDateString("ja-JP")}</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 shrink-0">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

