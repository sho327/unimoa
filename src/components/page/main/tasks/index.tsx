"use client"
// Modules
import { useState } from "react"
import { CheckCircle } from "lucide-react"
// Layout/Components
import PageHeader from "@/components/layout/page-header"
// Types
import { Task, TaskStatus } from "@/types"
// Page/Components
import CreateModal from "./create-modal"
import TaskTable from "./task-table"
import TaskCardList from "./task-card-list"

// 一覧表示タイプ(table/card-list)
const listType: 'table' | 'card-list' = 'table'

// モックデータ
const mockTasks: Task[] = [
  {
    id: '1',
    groupId: '1',
    title: 'ホームページ/モックデザイン',
    description: 'ホームページのモックアップデザイン',
    assigneeId: '1',
    status: 'todo',
    createdAt: new Date('2025/11/01 00:00:00'),
    updatedAt: new Date('2025/11/01 00:00:00'),
  },
  {
    id: '2',
    groupId: '1',
    title: 'タスクページ/モックデザイン',
    description: 'タスクページのモックアップデザイン',
    assigneeId: '1',
    status: 'in_progress',
    createdAt: new Date('2025/11/01 00:00:00'),
    updatedAt: new Date('2025/11/01 00:00:00'),
  },
  {
    id: '3',
    groupId: '1',
    title: '完了したタスク',
    description: 'これは完了したタスクの例です',
    assigneeId: '1',
    status: 'completed',
    createdAt: new Date('2025/11/01 00:00:00'),
    updatedAt: new Date('2025/11/02 00:00:00'),
    completedAt: new Date('2025/11/02 00:00:00'),
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: String(tasks.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks([...tasks, newTask])
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const statusOrder: TaskStatus[] = ['todo', 'in_progress', 'completed']
          const currentIndex = statusOrder.indexOf(task.status)
          const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]
          const updatedTask: Task = {
            ...task,
            status: nextStatus,
            updatedAt: new Date(),
          }
          if (nextStatus === 'completed') {
            updatedTask.completedAt = new Date()
          } else if (nextStatus === 'in_progress') {
            updatedTask.startedAt = new Date()
          }
          return updatedTask
        }
        return task
      }),
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader 
        Icon={CheckCircle}
        pageTitle="タスク"
        pageDescription="チームのタスクを管理して進捗を追跡"
        isBackButton={false}
      >
        <CreateModal
          isOpen={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onSubmit={handleCreateTask}
        />
      </PageHeader>

      {/* 表示タイプに応じて切り替え */}
      {listType === 'table' ? (
        <TaskTable tasks={tasks} onToggleStatus={toggleTaskStatus} />
      ) : (
        <TaskCardList tasks={tasks} onToggleStatus={toggleTaskStatus} />
      )}
    </div>
  )
}
