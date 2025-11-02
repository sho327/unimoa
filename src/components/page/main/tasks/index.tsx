'use client'
// Modules
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
// Layout/Components
import PageHeader from '@/components/layout/page-header'
// Types
import { Task, TaskStatus } from '@/types'
// Page/Components
import CreateModal from './create-modal'
import TaskTable from './task-table'
import TaskCardList from './task-card-list'
// ================================================
// モックデータ
// ================================================
import { mockTasks } from '@/mocks/task'
// ================================================

// 一覧表示タイプ(table/card-list)
const listType: 'table' | 'card-list' = 'table'

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

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
            })
        )
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <PageHeader
                Icon={CheckCircle}
                iconVariant="task"
                pageTitle="タスク"
                pageDescription="チームのタスクを管理して進捗を追跡"
                isBackButton={false}
            >
                <CreateModal
                    isOpen={isCreateModalOpen}
                    onOpenChange={setIsCreateModalOpen}
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
