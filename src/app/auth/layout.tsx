// Layout/Components
import ClientAuthLayout from "@/components/layout/client-auth-layout"

// サーバー側レイアウト
export default function AuthLayout({ 
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
        <ClientAuthLayout>
            {children}
        </ClientAuthLayout>
    )
}