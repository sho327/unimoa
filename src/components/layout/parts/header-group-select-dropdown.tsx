// Modules
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronDown, Plus, Check, Users } from 'lucide-react'
// UI/Conponents
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// Types
import type { GroupRow } from '@/types/group'
// Supabase
import type { MembershipWithGroup } from '@/lib/supabase/user-data'

interface HeaderGroupSelectDropdownProps {
    selectGroup: GroupRow | null
    membershipWithGroup: MembershipWithGroup[] | null
    onSelectGroup: (selectGroup: GroupRow) => void
    onCreateGroup: () => void
}

/**
 * ヘッダー/グループ選択コンポーネント
 * @args
 * @createdBy KatoShogo
 * @createdAt 2025/11/03
 */
export const HeaderGroupSelectDropdown = ({
    selectGroup,
    membershipWithGroup,
    onSelectGroup,
    onCreateGroup,
}: HeaderGroupSelectDropdownProps) => {
    // ============================================================================
    // テンプレート（Template）
    // ============================================================================
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="justify-between rounded-lg border-gray-200 bg-white hover:bg-gray-50"
                    disabled
                >
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="truncate text-gray-700">{selectGroup?.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl border-gray-200" align="start">
                <DropdownMenuLabel className="text-gray-700">グループを選択</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {membershipWithGroup &&
                    membershipWithGroup.map((membership, itemIndex) => (
                        <DropdownMenuItem
                            key={itemIndex}
                            onClick={() => onSelectGroup(membership.groups)}
                            className="flex cursor-pointer items-center justify-between rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {membership.groups.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {membership.groups.role}
                                    </p>
                                </div>
                            </div>
                            {selectGroup && selectGroup.id === membership.groups.id && (
                                <Check className="h-4 w-4 text-emerald-600" />
                            )}
                        </DropdownMenuItem>
                    ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        href="#"
                        className="flex items-center gap-2 rounded-lg"
                        onClick={onCreateGroup}
                    >
                        <Plus className="h-4 w-4 text-emerald-600" />
                        <span>新しいグループを作成</span>
                        {/* {!user.isPremium && <Crown className="w-3 h-3 text-amber-500 ml-auto" />} */}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
