"use client"
// Modules
import { LucideIcon, Plus } from "lucide-react"
// UI/Components
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EmptyState({
  Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  Icon?: LucideIcon
  title: string
  description: string
  actionLabel: string
  onAction: (() => void) | undefined
}) {
  return (
    <Card className="border border-dashed border-slate-200 bg-card rounded-md">
      <CardContent className="text-center py-16">
        {Icon &&
          <div className="w-13 h-13 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon className="w-7 h-7 text-primary" />
          </div>
        }
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        {actionLabel && onAction && (
          <Button size="sm" onClick={onAction} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-md">
            <Plus className="w-4 h-4" />
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
