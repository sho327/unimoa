"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MoreVertical } from "lucide-react"

type Task = {
  id: number
  title: string
  emoji: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  tags: string[]
  assignee: string
  dueDate?: string
}

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: 1,
    title: "ホームページのモックアップデザイン",
    emoji: "🎨",
    status: "done",
    priority: "high",
    tags: ["デザイン", "UI"],
    assignee: "アリス",
    dueDate: "2024-03-15",
  },
  {
    id: 2,
    title: "ユーザー認証の実装",
    emoji: "🔐",
    status: "in-progress",
    priority: "high",
    tags: ["バックエンド", "セキュリティ"],
    assignee: "ボブ",
    dueDate: "2024-03-20",
  },
  {
    id: 3,
    title: "ドキュメント作成",
    emoji: "📝",
    status: "todo",
    priority: "medium",
    tags: ["ドキュメント"],
    assignee: "キャロル",
  },
  {
    id: 4,
    title: "CI/CDパイプラインのセットアップ",
    emoji: "⚙️",
    status: "todo",
    priority: "medium",
    tags: ["DevOps"],
    assignee: "デビッド",
  },
  {
    id: 5,
    title: "マーケティング資料作成",
    emoji: "📢",
    status: "in-progress",
    priority: "low",
    tags: ["マーケティング"],
    assignee: "イブ",
    dueDate: "2024-03-25",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    emoji: "✨",
    priority: "medium" as const,
    tags: "",
  })

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    const task: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      emoji: newTask.emoji,
      status: "todo",
      priority: newTask.priority,
      tags: newTask.tags.split(",").map((t) => t.trim()),
      assignee: "あなた",
    }
    setTasks([...tasks, task])
    setIsCreateOpen(false)
    setNewTask({ title: "", emoji: "✨", priority: "medium", tags: "" })
  }

  const toggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const statusOrder: Task["status"][] = ["todo", "in-progress", "done"]
          const currentIndex = statusOrder.indexOf(task.status)
          const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]
          return { ...task, status: nextStatus }
        }
        return task
      }),
    )
  }

  const todoTasks = tasks.filter((t) => t.status === "todo")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const doneTasks = tasks.filter((t) => t.status === "done")

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">タスク</h1>
          <p className="text-muted-foreground mt-1 text-sm">チームのタスクを管理して進捗を追跡</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-lg shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              新しいタスク
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-xl">
            <DialogHeader>
              <DialogTitle>新しいタスクを作成</DialogTitle>
              <DialogDescription className="text-sm">チームのボードにタスクを追加</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskEmoji" className="text-sm">
                  絵文字
                </Label>
                <Input
                  id="taskEmoji"
                  type="text"
                  value={newTask.emoji}
                  onChange={(e) => setNewTask({ ...newTask, emoji: e.target.value })}
                  maxLength={2}
                  className="rounded-lg text-2xl text-center max-w-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskTitle" className="text-sm">
                  タスク名
                </Label>
                <Input
                  id="taskTitle"
                  type="text"
                  placeholder="何をする必要がありますか？"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm">
                  優先度
                </Label>
                <Select value={newTask.priority} onValueChange={(v) => setNewTask({ ...newTask, priority: v as any })}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">低</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm">
                  タグ（カンマ区切り）
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="デザイン, フロントエンド, 緊急"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  className="rounded-lg"
                />
              </div>
              <Button type="submit" className="w-full rounded-lg">
                タスク作成
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <TaskColumn title="未着手" count={todoTasks.length} tasks={todoTasks} onToggle={toggleTaskStatus} />

        {/* In Progress Column */}
        <TaskColumn title="進行中" count={inProgressTasks.length} tasks={inProgressTasks} onToggle={toggleTaskStatus} />

        {/* Done Column */}
        <TaskColumn title="完了" count={doneTasks.length} tasks={doneTasks} onToggle={toggleTaskStatus} />
      </div>
    </div>
  )
}

function TaskColumn({
  title,
  count,
  tasks,
  onToggle,
}: {
  title: string
  count: number
  tasks: Task[]
  onToggle: (id: number) => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <Badge variant="secondary" className="rounded-full text-xs px-2.5">
          {count}
        </Badge>
      </div>
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={onToggle} />
        ))}
      </div>
    </div>
  )
}

function TaskCard({ task, onToggle }: { task: Task; onToggle: (id: number) => void }) {
  const priorityColors = {
    low: "bg-chart-3/15 text-chart-3 border-chart-3/20",
    medium: "bg-chart-2/15 text-chart-2 border-chart-2/20",
    high: "bg-destructive/15 text-destructive border-destructive/20",
  }

  const priorityLabels = {
    low: "低",
    medium: "中",
    high: "高",
  }

  return (
    <Card className="border-border rounded-lg shadow-sm hover:shadow transition-shadow cursor-pointer">
      <CardContent className="p-3.5 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 flex-1">
            <Checkbox
              checked={task.status === "done"}
              onCheckedChange={() => onToggle(task.id)}
              className="mt-1 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{task.emoji}</span>
                <h3
                  className={`font-medium text-sm text-foreground ${task.status === "done" ? "line-through opacity-60" : ""}`}
                >
                  {task.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge className={`rounded-full text-xs border ${priorityColors[task.priority]}`}>
                  {priorityLabels[task.priority]}
                </Badge>
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              {task.dueDate && (
                <p className="text-xs text-muted-foreground mt-2">
                  期限: {new Date(task.dueDate).toLocaleDateString("ja-JP")}
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-lg h-7 w-7">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
