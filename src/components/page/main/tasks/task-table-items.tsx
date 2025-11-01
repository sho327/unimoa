"use client"

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Task, TaskStatus } from "@/types"

interface TaskTableItemsProps {
  tasks: Task[]
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

export default function TaskTableItems({ tasks, onToggleStatus }: TaskTableItemsProps) {
  if (tasks.length === 0) {
    return (
      <TableRow className="hover:bg-white">
        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
          タスクがありません
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      {tasks.map((task) => (
        <TableRow key={task.id} className="hover:bg-primary/10">
          <TableCell className="text-center">
            <Checkbox
              checked={task.status === "completed"}
              onCheckedChange={() => onToggleStatus?.(task.id)}
              className="rounded"
            />
          </TableCell>
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <span className={task.status === "completed" ? "line-through opacity-60" : ""}>
                {task.title}
              </span>
            </div>
          </TableCell>
          <TableCell className="text-muted-foreground max-w-md">
            <div className="truncate">{task.description || "-"}</div>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className={`rounded-full text-xs border ${statusColors[task.status]}`}
            >
              {statusLabels[task.status]}
            </Badge>
          </TableCell>
          <TableCell className="text-muted-foreground text-sm">
            {task.createdAt.toLocaleDateString("ja-JP")}
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

