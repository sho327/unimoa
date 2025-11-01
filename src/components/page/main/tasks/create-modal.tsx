"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Task, TaskStatus } from "@/types"

interface CreateModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export default function CreateModal({ isOpen, onOpenChange, onSubmit }: CreateModalProps) {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    status: "todo" as TaskStatus,
    assigneeId: "",
    groupId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      groupId: formData.groupId || "1", // TODO: 実際のgroupIdを取得
      title: formData.title,
      description: formData.description || undefined,
      status: formData.status,
      assigneeId: formData.assigneeId || undefined,
    })
    setFormData({
      title: "",
      description: "",
      status: "todo",
      assigneeId: "",
      groupId: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taskTitle" className="text-sm">
              タスク名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="taskTitle"
              type="text"
              placeholder="何をする必要がありますか？"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taskDescription" className="text-sm">
              説明
            </Label>
            <Textarea
              id="taskDescription"
              placeholder="タスクの詳細を入力してください"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="rounded-lg min-h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taskStatus" className="text-sm">
              ステータス
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as TaskStatus })}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">未着手</SelectItem>
                <SelectItem value="in_progress">進行中</SelectItem>
                <SelectItem value="completed">完了</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full rounded-lg">
            タスク作成
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

