// Layout/Components
import ClientAuthLayout from "@/components/layout/client-auth-layout"
import LoadingOverlay from "@/components/layout/loading-overlay"

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
            {/* ローディングオーバーレイ */}
            <LoadingOverlay />
        </ClientAuthLayout>
    )
}