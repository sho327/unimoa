import { MembershipRole } from './membership'

export interface Group {
    id: string
    name: string
    role: string
    description?: string
    ownerId?: string
    createdAt?: string
}

export interface GroupWithMembership extends Group {
    membership: MembershipRole
}
