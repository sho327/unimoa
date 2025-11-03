'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Task } from '@/types'
import TaskTableItems from './task-table-items'

interface TaskTableProps {
    tasks: Task[]
    onToggleStatus?: (taskId: string) => void
}

/**
 * タスク一覧テーブルコンポーネント
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/03
 */
export default function TaskTable({ tasks, onToggleStatus }: TaskTableProps) {
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <div className="rounded-lg border bg-white shadow-sm">
            <Table>
                <TableHeader style={{ backgroundColor: '#2C3E50' }}>
                    <TableRow className="hover:bg-[#2C3E50]">
                        <TableHead className="w-12 rounded-tl-lg"></TableHead>
                        <TableHead className="font-semibold text-white">タスク名</TableHead>
                        <TableHead className="font-semibold text-white">説明</TableHead>
                        <TableHead className="font-semibold text-white">ステータス</TableHead>
                        <TableHead className="font-semibold text-white">作成日</TableHead>
                        <TableHead className="w-12 rounded-tr-lg"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TaskTableItems tasks={tasks} onToggleStatus={onToggleStatus} />
                </TableBody>
            </Table>
        </div>
    )
}
