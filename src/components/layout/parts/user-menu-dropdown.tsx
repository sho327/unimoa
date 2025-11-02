import { User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserMenuDropdownProps {
    userName?: string
    onLogout?: () => void
}

export const UserMenuDropdown = ({
    userName = 'サンプルユーザ1',
    onLogout,
}: UserMenuDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/10 hover:text-gray-700"
                >
                    <Avatar className="mr-1 h-7.5 w-7.5">
                        <AvatarImage src={''} alt={`${userName} icon`} />
                        <AvatarFallback className="bg-secondary text-sm font-medium">
                            {userName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    {userName}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-2 px-0.5 py-1">
                        <p className="text-sm leading-none font-medium">{userName}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-gray-700">
                    <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        プロフィール
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-gray-700">
                    <Link href="#" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        ログアウト
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    チーム選択に戻る
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
