"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Task } from "@/types"
import TaskTableItems from "./task-table-items"

interface TaskTableProps {
  tasks: Task[]
  onToggleStatus?: (taskId: string) => void
}

export default function TaskTable({ tasks, onToggleStatus }: TaskTableProps) {
  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <Table>
        <TableHeader
          style={{backgroundColor: '#2C3E50'}} 
        >
          <TableRow
            className="hover:bg-[#2C3E50]" 
          >
            <TableHead className="w-12"></TableHead>
            <TableHead
              className="text-white font-semibold" 
            >
              タスク名
            </TableHead>
            <TableHead 
              className="text-white font-semibold" 
              >
                説明
            </TableHead>
            <TableHead 
              className="text-white font-semibold" 
              >
                ステータス
            </TableHead>
            <TableHead 
              className="text-white font-semibold" 
              >
                作成日
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TaskTableItems tasks={tasks} onToggleStatus={onToggleStatus} />
        </TableBody>
      </Table>
    </div>
  )
}

