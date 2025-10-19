"use client"
// Modules
import type React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
// UI/Components
import { Button } from "@/components/ui/button"

export default function PageHeader({
  pageTitle,
  pageDescription,
  isBackButton,
  children
}: {
  pageTitle: string
  pageDescription: string
  isBackButton: boolean
  children?: React.ReactNode
}) {
  const router = useRouter()
  return (
    <>
      {/* ページヘッダー */ }
      {isBackButton && 
        <div className="flex items-center gap-4 mb-4">
          <Link href="/teams">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              戻る
            </Button>
          </Link>
        </div>
      }
      <div className = "flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{ pageTitle }</h1>
          <p className="text-sm text-muted-foreground mt-1">{ pageDescription }</p>
        </div>
        { children }
      </div>
    </>
  )
}
