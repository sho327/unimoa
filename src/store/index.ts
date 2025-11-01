import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Group, User, Report } from '@/types';

interface AppState {
    // ページローディング
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void;
    
    // 現在のユーザ
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;

    //   // 所属グループ
    //   groups: Group[];
    //   currentGroupId: string | null;
    //   setCurrentGroupId: (id: string | null) => void;
    //   addGroup: (group: Group) => void;

    //   // Tasks
    //   tasks: Task[];
    //   addTask: (task: Task) => void;
    //   updateTask: (id: string, updates: Partial<Task>) => void;
    //   deleteTask: (id: string) => void;
    //   completeTask: (id: string) => void;

    //   // Reports
    //   reports: Report[];
    //   generateReport: (groupId: string, date: string) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            // ページローディング
            isLoading: false,
            setIsLoading: (isLoading) => set({ isLoading: isLoading }),

            // 現在のユーザ
            currentUser: null,
            setCurrentUser: (user) => set({ currentUser: user }),

            // Groups
            //   groups: [],
            //   currentGroupId: null,
            //   setCurrentGroupId: (id) => set({ currentGroupId: id }),
            //   addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),

            // Tasks
            //   tasks: [],
            //   addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
            //   updateTask: (id, updates) =>
            //     set((state) => ({
            //       tasks: state.tasks.map((task) =>
            //         task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
            //       ),
            //     })),
            //   deleteTask: (id) =>
            //     set((state) => ({
            //       tasks: state.tasks.filter((task) => task.id !== id),
            //     })),
            //   completeTask: (id) =>
            //     set((state) => ({
            //       tasks: state.tasks.map((task) =>
            //         task.id === id
            //           ? {
            //               ...task,
            //               status: 'completed' as const,
            //               completedAt: new Date(),
            //               updatedAt: new Date(),
            //             }
            //           : task
            //       ),
            //     })),

            // Reports
            //   reports: [],
            //   generateReport: (groupId, date) => {
            //     const state = get();
            //     const completedTasks = state.tasks.filter(
            //       (task) =>
            //         task.groupId === groupId &&
            //         task.status === 'completed' &&
            //         task.completedAt &&
            //         new Date(task.completedAt).toDateString() === new Date(date).toDateString()
            //     );

            //     const content = completedTasks.length > 0
            //       ? `本日完了したタスク:\n${completedTasks.map((t) => `- ${t.title}`).join('\n')}`
            //       : '本日完了したタスクはありません。';

            //     const report: Report = {
            //       id: `report_${Date.now()}`,
            //       groupId,
            //       date,
            //       authorId: state.currentUser?.id || 'user_1',
            //       content,
            //       tasks: completedTasks,
            //       createdAt: new Date(),
            //     };

            //     set((state) => ({
            //       reports: [...state.reports, report],
            //     }));
            //   },
        }),
        {
            name: 'tasrepo-storage',
        }
    )
);

// Initialize demo data if empty
export const initializeDemoData = () => {
    const store = useStore.getState();

    if (!store.currentUser) {
        const demoUser: User = {
            id: 'user_1',
            name: 'デモユーザー',
            email: 'demo@example.com',
            createdAt: new Date("2025/10/01 00:00:00")
        };
        store.setCurrentUser(demoUser);
    }

    // if (store.groups.length === 0) {
    //     const demoGroup: Group = {
    //         id: 'group_1',
    //         name: '個人ワークスペース',
    //         ownerId: 'user_1',
    //         createdAt: new Date(),
    //     };
    //     store.addGroup(demoGroup);
    //     store.setCurrentGroupId('group_1');

    //     // Add demo tasks
    //     const demoTasks: Task[] = [
    //         {
    //             id: 'task_1',
    //             groupId: 'group_1',
    //             title: 'プロジェクト企画書の作成',
    //             description: '新規プロジェクトの企画書を作成する',
    //             status: 'completed',
    //             createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    //             updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    //             completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    //         },
    //         {
    //             id: 'task_2',
    //             groupId: 'group_1',
    //             title: 'デザインモックアップのレビュー',
    //             description: 'UIデザインを確認して修正箇所をリストアップ',
    //             status: 'in_progress',
    //             createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    //             updatedAt: new Date(),
    //         },
    //         {
    //             id: 'task_3',
    //             groupId: 'group_1',
    //             title: 'データベース設計',
    //             description: 'テーブル構造とリレーションを決定',
    //             status: 'todo',
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //         },
    //     ];

    //     demoTasks.forEach((task) => store.addTask(task));
    // }
};