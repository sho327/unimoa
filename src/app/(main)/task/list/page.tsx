// Page/Components
import TaskList from '@/components/page/main/task/list'
// Supabase
import { fetchAuthenticatedUserData } from '@/lib/supabase/userData'
import { fetchTasksByGroup } from '@/lib/supabase/taskData'

/**
 * タスク一覧ページ
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/02
 */
export default function TaskListPage() {
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return <TaskList />
}
