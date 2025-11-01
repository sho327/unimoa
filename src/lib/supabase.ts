export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    name: string
                    email: string
                    avatar_url: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    avatar_url?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    avatar_url?: string | null
                    created_at?: string | null
                }
            }

            groups: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    owner_id: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    owner_id?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    owner_id?: string | null
                    created_at?: string | null
                }
            }

            memberships: {
                Row: {
                    id: string
                    user_id: string
                    group_id: string
                    role: 'admin' | 'member' | 'guest'
                    status: 'active' | 'invited' | 'removed'
                    invited_by: string | null
                    joined_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    group_id: string
                    role?: 'admin' | 'member' | 'guest'
                    status?: 'active' | 'invited' | 'removed'
                    invited_by?: string | null
                    joined_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    group_id?: string
                    role?: 'admin' | 'member' | 'guest'
                    status?: 'active' | 'invited' | 'removed'
                    invited_by?: string | null
                    joined_at?: string | null
                }
            }

            tasks: {
                Row: {
                    id: string
                    group_id: string
                    title: string
                    description: string | null
                    assignee_id: string | null
                    status: 'todo' | 'in_progress' | 'done'
                    due_date: string | null
                    start_at: string | null
                    end_at: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    group_id: string
                    title: string
                    description?: string | null
                    assignee_id?: string | null
                    status?: 'todo' | 'in_progress' | 'done'
                    due_date?: string | null
                    start_at?: string | null
                    end_at?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    group_id?: string
                    title?: string
                    description?: string | null
                    assignee_id?: string | null
                    status?: 'todo' | 'in_progress' | 'done'
                    due_date?: string | null
                    start_at?: string | null
                    end_at?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }

            work_logs: {
                Row: {
                    id: string
                    task_id: string
                    user_id: string
                    start_time: string
                    end_time: string | null
                    duration_minutes: number | null
                    memo: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    task_id: string
                    user_id: string
                    start_time: string
                    end_time?: string | null
                    memo?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    task_id?: string
                    user_id?: string
                    start_time?: string
                    end_time?: string | null
                    memo?: string | null
                    created_at?: string | null
                }
            }

            reports: {
                Row: {
                    id: string
                    group_id: string
                    user_id: string
                    date: string
                    content: string
                    generated_from_task_ids: string[] | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    group_id: string
                    user_id: string
                    date: string
                    content: string
                    generated_from_task_ids?: string[] | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    group_id?: string
                    user_id?: string
                    date?: string
                    content?: string
                    generated_from_task_ids?: string[] | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }

            notifications: {
                Row: {
                    id: string
                    group_id: string | null
                    user_id: string
                    sender_id: string | null
                    type: 'task' | 'report' | 'system' | 'comment'
                    title: string
                    description: string | null
                    related_id: string | null
                    is_read: boolean | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    group_id?: string | null
                    user_id: string
                    sender_id?: string | null
                    type: 'task' | 'report' | 'system' | 'comment'
                    title: string
                    description?: string | null
                    related_id?: string | null
                    is_read?: boolean | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    group_id?: string | null
                    user_id?: string
                    sender_id?: string | null
                    type?: 'task' | 'report' | 'system' | 'comment'
                    title?: string
                    description?: string | null
                    related_id?: string | null
                    is_read?: boolean | null
                    created_at?: string | null
                }
            }
        }
    }
}