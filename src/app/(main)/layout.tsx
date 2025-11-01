// Layout/Components
import ClientMainLayout from "@/components/layout/client-main-layout"

// サーバー側レイアウト
export default function MainLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
    /**
     * Variable
     */
    // const { session, profile } = await getSupabaseSessionAndProfile()
    /**
     * Actions
     */
    /**
     * Template
     */
    return (
        <ClientMainLayout>
            {children}
        </ClientMainLayout>
    )
}