"use client"

import { Task } from "@/types"
import TaskCardListItem from "./task-card-list-item"

interface TaskCardListProps {
  tasks: Task[]
  onToggleStatus?: (taskId: string) => void
}

export default function TaskCardList({ tasks, onToggleStatus }: TaskCardListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>タスクがありません</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCardListItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  )
}

