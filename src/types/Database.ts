export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
                Update: Partial<Database['public']['Tables']['users']['Insert']>
                Relationships: []
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
                Update: Partial<Database['public']['Tables']['groups']['Insert']>
                Relationships: [
                    {
                        foreignKeyName: 'groups_owner_id_fkey'
                        columns: ['owner_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
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
                    role: 'admin' | 'member' | 'guest'
                    status: 'active' | 'invited' | 'removed'
                    invited_by?: string | null
                    joined_at?: string | null
                }
                Update: Partial<Database['public']['Tables']['memberships']['Insert']>
                Relationships: [
                    {
                        foreignKeyName: 'memberships_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'memberships_group_id_fkey'
                        columns: ['group_id']
                        referencedRelation: 'groups'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'memberships_invited_by_fkey'
                        columns: ['invited_by']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
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
                    status: 'todo' | 'in_progress' | 'done'
                    due_date?: string | null
                    start_at?: string | null
                    end_at?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: Partial<Database['public']['Tables']['tasks']['Insert']>
                Relationships: [
                    {
                        foreignKeyName: 'tasks_group_id_fkey'
                        columns: ['group_id']
                        referencedRelation: 'groups'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'tasks_assignee_id_fkey'
                        columns: ['assignee_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
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
                Update: Partial<Database['public']['Tables']['work_logs']['Insert']>
                Relationships: [
                    {
                        foreignKeyName: 'work_logs_task_id_fkey'
                        columns: ['task_id']
                        referencedRelation: 'tasks'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'work_logs_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }

            reports: {
                Row: {
                    id: string
                    group_id: string
                    user_id: string
                    date: string
                    content: string
                    generated_from_task_ids: string[]
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    group_id: string
                    user_id: string
                    date: string
                    content: string
                    generated_from_task_ids?: string[]
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: Partial<Database['public']['Tables']['reports']['Insert']>
                Relationships: [
                    {
                        foreignKeyName: 'reports_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'reports_group_id_fkey'
                        columns: ['group_id']
                        referencedRelation: 'groups'
                        referencedColumns: ['id']
                    },
                ]
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
                    is_read: boolean
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
                    is_read?: boolean
                    created_at?: string | null
                }
                Update: Partial<Database['public']['Tables']['notifications']['Insert']>
                Relationships: [
                    {
                        foreignKeyName: 'notifications_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'notifications_sender_id_fkey'
                        columns: ['sender_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'notifications_group_id_fkey'
                        columns: ['group_id']
                        referencedRelation: 'groups'
                        referencedColumns: ['id']
                    },
                ]
            }
        }

        Views: {
            user_groups_view: {
                Row: {
                    user_id: string
                    group_id: string
                    group_name: string
                    group_description: string | null
                    owner_id: string | null
                    role: 'admin' | 'member' | 'guest'
                    status: 'active' | 'invited' | 'removed'
                    joined_at: string | null
                    group_created_at: string | null
                }
            }
        }

        Functions: Record<string, never>
        Enums: Record<string, never>
    }
}
