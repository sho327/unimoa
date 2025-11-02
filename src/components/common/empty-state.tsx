'use client'
// Modules
import { LucideIcon, Plus } from 'lucide-react'
// UI/Components
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
        <Card className="bg-card rounded-md border border-dashed border-slate-200">
            <CardContent className="py-16 text-center">
                {Icon && (
                    <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-xl bg-gray-100">
                        <Icon className="text-primary h-7 w-7" />
                    </div>
                )}
                <h3 className="text-foreground mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">{description}</p>
                {actionLabel && onAction && (
                    <Button
                        size="sm"
                        onClick={onAction}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-md"
                    >
                        <Plus className="h-4 w-4" />
                        {actionLabel}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
