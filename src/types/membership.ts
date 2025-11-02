export type MembershipRole = 'admin' | 'member' | 'guest'

export type MembershipStatus = 'active' | 'invited' | 'removed'

export interface Membership {
    id: string
    userId: string
    groupId: string
    role: MembershipRole
    status: MembershipStatus
    joinedAt: string
    invitedBy?: string
}
