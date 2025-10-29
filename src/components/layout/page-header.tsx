"use client"
// Modules
import type React from "react"
import { useRouter } from "next/navigation"
import { LucideIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
// UI/Components
import { Button } from "@/components/ui/button"

export default function PageHeader({
  Icon,
  pageTitle,
  pageDescription,
  isBackButton,
  children
}: {
  Icon?: LucideIcon
  pageTitle: string
  pageDescription: string
  isBackButton: boolean
  children?: React.ReactNode
}) {
  const router = useRouter()
  return (
    <>
      {/* ページヘッダー */ }
      {/* 戻るボタン */}
      {isBackButton && 
        <div className="flex items-center gap-4 mb-4">
          <Link href="/teams">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-700 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              戻る
            </Button>
          </Link>
        </div>
      }
      {/* ページアイコン/タイトル/詳細 */}
      <div className = "flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon &&
            <div className="p-3 bg-secondary rounded-xl">
              <Icon className="w-7 h-7 text-primary" />
            </div>
          }
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{ pageTitle }</h1>
            <p className="text-muted-foreground mt-1">{ pageDescription }</p>
          </div>
        </div>
        { children }
      </div>
    </>
  )
}
